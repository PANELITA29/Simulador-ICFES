/**
 * Simulador ICFES TecnoEmpresarial - Core Application Engine
 */

import { examQuestions, blocksMeta } from './questions.js';
import { sound } from './audio.js';
import { fireConfetti } from './confetti.js';

// Application State
const state = {
  questions: examQuestions,
  userAnswers: JSON.parse(localStorage.getItem('icfes_answers') || '{}'),
  flaggedQuestions: new Set(JSON.parse(localStorage.getItem('icfes_flagged') || '[]')),
  currentQuestionIndex: parseInt(localStorage.getItem('icfes_last_index') || '0', 10),
  activeBlockFilter: localStorage.getItem('icfes_block_filter') || 1,
  activeDifficultyFilter: 'all',
  activeCompetenciaFilter: 'all',
  activeSearchQuery: '',
  onlyFlaggedFilter: false,
  currentMode: localStorage.getItem('icfes_mode') || 'eval', // 'eval' or 'study'
  showAllQuestions: false,
  timerSeconds: parseInt(localStorage.getItem('icfes_timer') || `${2 * 3600 + 40 * 60}`, 10),
  timerInterval: null,
  isTimerRunning: true
};

// Ensure currentQuestionIndex is within bounds
if (state.currentQuestionIndex < 0 || state.currentQuestionIndex >= state.questions.length) {
  state.currentQuestionIndex = 0;
}

// -----------------------------------------------------------------------------
// Initialization
// -----------------------------------------------------------------------------
export function initApp() {
  initTheme();
  initSoundButton();
  initEventListeners();
  populateJumpSelect();
  renderOpticalSheet();
  renderQuestions();
  updateProgress();
  startTimer();
  syncFilteredView();
  initKeyboardShortcuts();
}

// -----------------------------------------------------------------------------
// Theme Management
// -----------------------------------------------------------------------------
function initTheme() {
  const savedTheme = localStorage.getItem('icfes_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
  applyTheme(isDark);
}

export function toggleTheme() {
  const isCurrentlyDark = document.documentElement.classList.contains('dark');
  applyTheme(!isCurrentlyDark);
  localStorage.setItem('icfes_theme', !isCurrentlyDark ? 'dark' : 'light');
  sound.playTick();
}

function applyTheme(enableDark) {
  const icon = document.getElementById('theme-toggle-icon');
  const text = document.getElementById('theme-toggle-text');
  if (enableDark) {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
    if (icon) icon.className = 'fa-solid fa-sun text-amber-300 text-sm';
    if (text) text.textContent = 'Modo Día';
  } else {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
    if (icon) icon.className = 'fa-solid fa-moon text-cyan-300 text-sm';
    if (text) text.textContent = 'Modo Noche';
  }
}

// -----------------------------------------------------------------------------
// Sound Engine Management
// -----------------------------------------------------------------------------
function initSoundButton() {
  const btn = document.getElementById('sound-toggle-btn');
  const icon = document.getElementById('sound-toggle-icon');
  if (!btn || !icon) return;

  if (sound.enabled) {
    icon.className = 'fa-solid fa-volume-high text-cyan-400 text-sm';
    btn.setAttribute('title', 'Sonido activado (clic para silenciar)');
  } else {
    icon.className = 'fa-solid fa-volume-xmark text-slate-400 text-sm';
    btn.setAttribute('title', 'Sonido silenciado (clic para activar)');
  }
}

export function toggleSound() {
  const isNowActive = sound.toggle();
  const icon = document.getElementById('sound-toggle-icon');
  const btn = document.getElementById('sound-toggle-btn');
  if (icon) {
    icon.className = isNowActive 
      ? 'fa-solid fa-volume-high text-cyan-400 text-sm'
      : 'fa-solid fa-volume-xmark text-slate-400 text-sm';
  }
  if (btn) {
    btn.setAttribute('title', isNowActive ? 'Sonido activado' : 'Sonido silenciado');
  }
}

// -----------------------------------------------------------------------------
// Timer Implementation
// -----------------------------------------------------------------------------
function startTimer() {
  if (state.timerInterval) clearInterval(state.timerInterval);

  state.timerInterval = setInterval(() => {
    if (!state.isTimerRunning) return;
    if (state.timerSeconds <= 0) {
      clearInterval(state.timerInterval);
      showTimeOutAlert();
      return;
    }
    state.timerSeconds--;
    updateTimerDisplay();

    // Auto-save timer state periodically
    if (state.timerSeconds % 5 === 0) {
      localStorage.setItem('icfes_timer', state.timerSeconds);
    }
  }, 1000);
  updateTimerDisplay();
}

export function toggleTimerPause() {
  state.isTimerRunning = !state.isTimerRunning;
  const icon = document.getElementById('timer-pause-icon');
  if (icon) {
    icon.className = state.isTimerRunning ? 'fa-solid fa-pause' : 'fa-solid fa-play';
  }
  sound.playTick();
}

function updateTimerDisplay() {
  const display = document.getElementById('timer-display');
  if (!display) return;

  const hrs = Math.floor(state.timerSeconds / 3600);
  const mins = Math.floor((state.timerSeconds % 3600) / 60);
  const secs = state.timerSeconds % 60;
  display.textContent = `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  // Visual urgency when under 15 minutes
  if (state.timerSeconds < 900) {
    display.classList.add('text-rose-400', 'animate-pulse');
    display.classList.remove('text-slate-200');
  } else {
    display.classList.remove('text-rose-400', 'animate-pulse');
    display.classList.add('text-slate-200');
  }
}

function showTimeOutAlert() {
  sound.playWrong();
  alert('⏱️ ¡Tiempo de evaluación finalizado! Se abrirá el resumen de tu simulación.');
  openResultsModal();
}

// -----------------------------------------------------------------------------
// Filtering Engine
// -----------------------------------------------------------------------------
export function getFilteredQuestions() {
  return state.questions.filter(q => {
    // Topic / Block filter
    if (state.activeBlockFilter !== 'all' && q.block !== Number(state.activeBlockFilter)) {
      return false;
    }
    // Difficulty filter
    if (state.activeDifficultyFilter !== 'all' && q.difficulty !== state.activeDifficultyFilter) {
      return false;
    }
    // Competency filter
    if (state.activeCompetenciaFilter !== 'all') {
      if (!q.competencia.toLowerCase().includes(state.activeCompetenciaFilter.toLowerCase())) {
        return false;
      }
    }
    // Only Flagged filter
    if (state.onlyFlaggedFilter && !state.flaggedQuestions.has(q.id)) {
      return false;
    }
    // Keyword Search query
    if (state.activeSearchQuery.trim() !== '') {
      const query = state.activeSearchQuery.toLowerCase().trim();
      const matchesStem = q.stem.toLowerCase().includes(query);
      const matchesBlock = q.blockName.toLowerCase().includes(query);
      const matchesCompetencia = q.competencia.toLowerCase().includes(query);
      const matchesOptions = Object.values(q.options).some(opt => opt.toLowerCase().includes(query));
      const matchesJustification = q.justification ? q.justification.toLowerCase().includes(query) : false;
      if (!matchesStem && !matchesBlock && !matchesCompetencia && !matchesOptions && !matchesJustification) {
        return false;
      }
    }
    return true;
  });
}

export function filterBlock(blockNum) {
  state.activeBlockFilter = blockNum;
  localStorage.setItem('icfes_block_filter', blockNum);
  sound.playTick();

  // Update tab buttons
  document.querySelectorAll('.block-tab').forEach(tab => {
    tab.className = 'block-tab px-3 py-1 rounded-lg font-medium border border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-600 transition';
  });
  const activeTab = document.getElementById(`tab-block-${blockNum}`);
  if (activeTab) {
    activeTab.className = 'block-tab active px-3 py-1 rounded-lg font-medium border border-cyan-500 bg-cyan-950/80 text-cyan-300 transition shadow-sm';
  }

  // Update Header Card Info
  const cardTitle = document.getElementById('current-block-title');
  const cardDesc = document.getElementById('current-block-desc');
  const cardRange = document.getElementById('current-block-range');

  if (blockNum === 'all') {
    if (cardTitle) cardTitle.textContent = 'Examen Completo: Todos los Bloques';
    if (cardDesc) cardDesc.textContent = 'Visión general de las 40 preguntas del simulador ICFES Ciencia y Tecnología.';
    if (cardRange) cardRange.textContent = '01 — 40';
  } else {
    const meta = blocksMeta[blockNum];
    if (meta) {
      if (cardTitle) cardTitle.textContent = meta.title;
      if (cardDesc) cardDesc.textContent = meta.desc;
      if (cardRange) cardRange.textContent = meta.range;
    }
  }

  syncFilteredView();
}

export function setDifficultyFilter(diff) {
  state.activeDifficultyFilter = diff;
  sound.playTick();

  document.querySelectorAll('#difficulty-chips-group .diff-chip').forEach(btn => {
    const btnDiff = btn.getAttribute('data-diff');
    if (btnDiff === diff) {
      btn.className = 'diff-chip px-2.5 py-1 rounded-lg font-bold border transition text-white bg-blue-600 dark:bg-cyan-600 border-blue-600 dark:border-cyan-500 shadow-sm';
    } else {
      if (btnDiff === 'Básica') {
        btn.className = 'diff-chip px-2.5 py-1 rounded-lg font-medium border transition text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/80 hover:border-emerald-400';
      } else if (btnDiff === 'Media') {
        btn.className = 'diff-chip px-2.5 py-1 rounded-lg font-medium border transition text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/80 hover:border-amber-400';
      } else if (btnDiff === 'Avanzada') {
        btn.className = 'diff-chip px-2.5 py-1 rounded-lg font-medium border transition text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800/80 hover:border-rose-400';
      } else {
        btn.className = 'diff-chip px-2.5 py-1 rounded-lg font-medium border transition text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-[#0c1322] border-slate-200 dark:border-slate-700 hover:border-blue-400';
      }
    }
  });
  syncFilteredView();
}

export function setCompetenciaFilter(comp) {
  state.activeCompetenciaFilter = comp;
  sound.playTick();

  document.querySelectorAll('#competencia-chips-group .comp-chip').forEach(btn => {
    const btnComp = btn.getAttribute('data-comp');
    if (btnComp === comp) {
      btn.className = 'comp-chip px-2.5 py-1 rounded-lg font-bold border transition text-white bg-blue-600 dark:bg-cyan-600 border-blue-600 dark:border-cyan-500 shadow-sm';
    } else {
      btn.className = 'comp-chip px-2.5 py-1 rounded-lg font-medium border transition text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-[#0c1322] border-slate-200 dark:border-slate-700 hover:border-blue-400';
    }
  });
  syncFilteredView();
}

export function toggleOnlyFlagged() {
  state.onlyFlaggedFilter = !state.onlyFlaggedFilter;
  sound.playTick();
  const btn = document.getElementById('filter-flagged-btn');
  if (btn) {
    if (state.onlyFlaggedFilter) {
      btn.className = 'px-3 py-1 rounded-xl text-xs font-bold bg-amber-500 text-white border border-amber-600 shadow-sm flex items-center gap-1.5 transition';
    } else {
      btn.className = 'px-3 py-1 rounded-xl text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-amber-400 flex items-center gap-1.5 transition';
    }
  }
  syncFilteredView();
}

export function onSearchInput(val) {
  state.activeSearchQuery = val;
  const clearBtn = document.getElementById('filter-clear-search-btn');
  if (clearBtn) {
    if (val.trim().length > 0) {
      clearBtn.classList.remove('hidden');
    } else {
      clearBtn.classList.add('hidden');
    }
  }
  syncFilteredView();
}

export function clearSearchInput() {
  const input = document.getElementById('filter-search-input');
  if (input) input.value = '';
  onSearchInput('');
}

export function resetAllFilters() {
  sound.playTick();
  state.activeDifficultyFilter = 'all';
  state.activeCompetenciaFilter = 'all';
  state.activeSearchQuery = '';
  state.onlyFlaggedFilter = false;

  const searchInput = document.getElementById('filter-search-input');
  if (searchInput) searchInput.value = '';
  const clearBtn = document.getElementById('filter-clear-search-btn');
  if (clearBtn) clearBtn.classList.add('hidden');

  const flaggedBtn = document.getElementById('filter-flagged-btn');
  if (flaggedBtn) {
    flaggedBtn.className = 'px-3 py-1 rounded-xl text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-amber-400 flex items-center gap-1.5 transition';
  }

  setDifficultyFilter('all');
  setCompetenciaFilter('all');
  filterBlock(1);
}

export function syncFilteredView() {
  const filtered = getFilteredQuestions();
  const resultsText = document.getElementById('filter-results-text');
  if (resultsText) {
    resultsText.textContent = `Mostrando ${filtered.length} de 40 preguntas`;
  }

  // Update flagged counter in filter button
  const flaggedCountSpan = document.getElementById('flagged-count-badge');
  if (flaggedCountSpan) {
    flaggedCountSpan.textContent = state.flaggedQuestions.size;
  }

  // If current question is outside filtered set, jump to first match
  if (filtered.length > 0) {
    const currentPos = filtered.findIndex(q => q.id === state.questions[state.currentQuestionIndex].id);
    if (currentPos === -1) {
      state.currentQuestionIndex = state.questions.findIndex(q => q.id === filtered[0].id);
    }
  }

  populateJumpSelect();
  renderQuestions();
  renderOpticalSheet();
}

// -----------------------------------------------------------------------------
// Question Navigation & Answering
// -----------------------------------------------------------------------------
export function selectAnswer(questionId, letter) {
  const q = state.questions.find(item => item.id === questionId);
  state.userAnswers[questionId] = letter;
  localStorage.setItem('icfes_answers', JSON.stringify(state.userAnswers));

  // Audio feedback based on mode
  if (state.currentMode === 'study' && q) {
    if (letter === q.correct) {
      sound.playCorrect();
    } else {
      sound.playWrong();
    }
  } else {
    sound.playBubble();
  }

  renderOpticalSheet();
  renderQuestions();
  updateProgress();
}

export function toggleFlagQuestion(questionId) {
  sound.playFlag();
  if (state.flaggedQuestions.has(questionId)) {
    state.flaggedQuestions.delete(questionId);
  } else {
    state.flaggedQuestions.add(questionId);
  }
  localStorage.setItem('icfes_flagged', JSON.stringify(Array.from(state.flaggedQuestions)));

  const badge = document.getElementById('flagged-count-badge');
  if (badge) badge.textContent = state.flaggedQuestions.size;

  renderQuestions();
  renderOpticalSheet();
}

export function jumpToQuestion(index) {
  if (index < 0 || index >= state.questions.length) return;
  state.currentQuestionIndex = index;
  localStorage.setItem('icfes_last_index', index);
  sound.playTick();

  const select = document.getElementById('select-jump-question');
  if (select) select.value = index;

  const q = state.questions[index];
  if (state.activeBlockFilter !== 'all' && Number(state.activeBlockFilter) !== q.block) {
    filterBlock(q.block);
  } else {
    renderQuestions();
    renderOpticalSheet();
  }
}

export function prevQuestion() {
  const filtered = getFilteredQuestions();
  if (filtered.length === 0) return;
  const currentPos = filtered.findIndex(q => q.id === state.questions[state.currentQuestionIndex].id);
  if (currentPos > 0) {
    const prevQ = filtered[currentPos - 1];
    jumpToQuestion(state.questions.findIndex(q => q.id === prevQ.id));
  } else if (currentPos === -1 && filtered.length > 0) {
    jumpToQuestion(state.questions.findIndex(q => q.id === filtered[0].id));
  }
}

export function nextQuestion() {
  const filtered = getFilteredQuestions();
  if (filtered.length === 0) return;
  const currentPos = filtered.findIndex(q => q.id === state.questions[state.currentQuestionIndex].id);
  if (currentPos !== -1 && currentPos < filtered.length - 1) {
    const nextQ = filtered[currentPos + 1];
    jumpToQuestion(state.questions.findIndex(q => q.id === nextQ.id));
  } else if (currentPos === -1 && filtered.length > 0) {
    jumpToQuestion(state.questions.findIndex(q => q.id === filtered[0].id));
  }
}

export function toggleViewMode() {
  const chk = document.getElementById('chk-show-all-questions');
  state.showAllQuestions = chk ? chk.checked : false;
  sound.playTick();
  renderQuestions();
}

export function setMode(mode) {
  state.currentMode = mode;
  localStorage.setItem('icfes_mode', mode);
  sound.playTick();

  const btnEval = document.getElementById('btn-mode-eval');
  const btnStudy = document.getElementById('btn-mode-study');

  if (mode === 'eval') {
    if (btnEval) btnEval.className = 'px-3 py-1 rounded-lg font-medium transition text-white bg-blue-600 dark:bg-cyan-600 shadow-sm';
    if (btnStudy) btnStudy.className = 'px-3 py-1 rounded-lg font-medium transition text-slate-400 hover:text-white';
  } else {
    if (btnStudy) btnStudy.className = 'px-3 py-1 rounded-lg font-medium transition text-slate-900 bg-amber-400 shadow-sm font-bold';
    if (btnEval) btnEval.className = 'px-3 py-1 rounded-lg font-medium transition text-slate-400 hover:text-white';
  }
  renderQuestions();
  renderOpticalSheet();
}

// -----------------------------------------------------------------------------
// Rendering UI Components
// -----------------------------------------------------------------------------
export function renderQuestions() {
  const container = document.getElementById('questions-container');
  if (!container) return;
  container.innerHTML = '';

  const filtered = getFilteredQuestions();

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="bg-white dark:bg-[#131d33] rounded-2xl border border-slate-200/90 dark:border-slate-800 p-12 text-center space-y-3">
        <div class="w-12 h-12 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center text-xl">
          <i class="fa-solid fa-filter-circle-xmark"></i>
        </div>
        <h3 class="text-base font-bold text-slate-800 dark:text-slate-200">No se encontraron preguntas coincidentes</h3>
        <p class="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
          Prueba cambiando el nivel de dificultad, limpiando la búsqueda o desactivando el filtro de dudas.
        </p>
        <button onclick="window.app.resetAllFilters()" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition">
          <i class="fa-solid fa-arrow-rotate-left"></i> Restablecer filtros
        </button>
      </div>
    `;
    const navIndicator = document.getElementById('nav-question-indicator');
    if (navIndicator) navIndicator.textContent = '0 preguntas encontradas';
    return;
  }

  const questionsToRender = state.showAllQuestions
    ? filtered
    : [state.questions[state.currentQuestionIndex]];

  const currentPos = filtered.findIndex(q => q.id === state.questions[state.currentQuestionIndex].id);
  const posLabel = currentPos !== -1 ? (currentPos + 1) : 1;
  const navIndicator = document.getElementById('nav-question-indicator');
  if (navIndicator) {
    navIndicator.textContent = `Pregunta ${state.questions[state.currentQuestionIndex].id} (${posLabel} de ${filtered.length} filtradas)`;
  }

  const select = document.getElementById('select-jump-question');
  if (select) select.value = state.currentQuestionIndex;

  questionsToRender.forEach(q => {
    const isAnswered = !!state.userAnswers[q.id];
    const selected = state.userAnswers[q.id];
    const isFlagged = state.flaggedQuestions.has(q.id);

    const card = document.createElement('article');
    card.className = 'bg-white dark:bg-[#131d33] rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm p-6 space-y-5 transition relative overflow-hidden';
    card.id = `question-card-${q.id}`;

    const diffBadge = getDifficultyBadge(q.difficulty);

    const header = `
      <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
        <div class="flex items-center gap-3">
          <span class="w-9 h-9 rounded-xl bg-slate-900 dark:bg-black/60 text-cyan-300 font-mono font-extrabold flex items-center justify-center text-sm shadow-inner border border-cyan-800/40">
            ${String(q.id).padStart(2, '0')}
          </span>
          <div>
            <span class="text-xs font-mono font-semibold text-slate-400 dark:text-slate-400 uppercase tracking-wider block">
              Bloque ${q.block} • ${q.blockName}
            </span>
            <div class="flex items-center gap-2 mt-0.5 flex-wrap">
              <span class="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 dark:text-cyan-300 bg-blue-50 dark:bg-cyan-950/60 px-2.5 py-0.5 rounded-full border border-blue-200/80 dark:border-cyan-800">
                <i class="fa-solid fa-bullseye text-blue-600 dark:text-cyan-400"></i> Competencia: ${q.competencia}
              </span>
              ${diffBadge}
            </div>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="window.app.toggleFlagQuestion(${q.id})" class="px-2.5 py-1 rounded-lg border text-xs font-medium transition flex items-center gap-1.5 ${isFlagged ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-700' : 'bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:text-amber-500'}" title="${isFlagged ? 'Pregunta marcada en duda' : 'Marcar para revisión posterior'}">
            <i class="fa-solid fa-bookmark ${isFlagged ? 'text-amber-500' : ''}"></i>
            <span>${isFlagged ? 'En Duda' : 'Marcar'}</span>
          </button>
          ${isAnswered ? '<span class="text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2.5 py-1 rounded-lg font-bold"><i class="fa-solid fa-check mr-1"></i>Marcada</span>' : '<span class="text-xs font-mono text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 px-2.5 py-1 rounded-lg">Sin responder</span>'}
        </div>
      </div>
    `;

    const stem = `
      <div class="text-slate-900 dark:text-slate-100 font-medium text-base sm:text-lg leading-relaxed pt-1">
        ${q.stem}
      </div>
    `;

    let optionsHtml = '<div class="space-y-3 pt-2">';
    ['A', 'B', 'C', 'D'].forEach(letter => {
      const isThisSelected = selected === letter;
      const isCorrect = letter === q.correct;

      let btnClass = 'w-full text-left p-4 rounded-xl border transition flex items-start gap-3.5 ';
      let bubbleClass = 'w-7 h-7 rounded-full border flex-shrink-0 flex items-center justify-center font-bold text-xs font-mono transition ';

      if (state.currentMode === 'study' && isAnswered) {
        if (isCorrect) {
          btnClass += 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-500 text-emerald-950 dark:text-emerald-200 font-medium ring-1 ring-emerald-400';
          bubbleClass += 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-500/20';
        } else if (isThisSelected) {
          btnClass += 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-500 text-rose-950 dark:text-rose-200';
          bubbleClass += 'bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-500/20';
        } else {
          btnClass += 'bg-slate-50 dark:bg-[#0c1322] border-slate-200 dark:border-slate-800 opacity-60 text-slate-700 dark:text-slate-400';
          bubbleClass += 'bg-white dark:bg-slate-800 text-slate-400 border-slate-300 dark:border-slate-700';
        }
      } else {
        if (isThisSelected) {
          btnClass += 'bg-blue-50/90 dark:bg-cyan-950/40 border-blue-600 dark:border-cyan-400 text-blue-950 dark:text-cyan-100 font-medium shadow-xs ring-1 ring-blue-500 dark:ring-cyan-400';
          bubbleClass += 'bg-blue-700 dark:bg-cyan-500 text-white border-blue-700 dark:border-cyan-500 shadow-sm';
        } else {
          btnClass += 'bg-white dark:bg-[#0e172a] hover:bg-slate-50 dark:hover:bg-slate-800/80 border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-800 dark:text-slate-200';
          bubbleClass += 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700';
        }
      }

      optionsHtml += `
        <button onclick="window.app.selectAnswer(${q.id}, '${letter}')" class="${btnClass}">
          <div class="${bubbleClass}">
            ${letter}
          </div>
          <div class="text-sm sm:text-base leading-snug pt-0.5 flex-1">
            ${q.options[letter]}
          </div>
          ${state.currentMode === 'study' && isAnswered && isCorrect ? '<i class="fa-solid fa-circle-check text-emerald-600 dark:text-emerald-400 text-lg self-center"></i>' : ''}
          ${state.currentMode === 'study' && isAnswered && isThisSelected && !isCorrect ? '<i class="fa-solid fa-circle-xmark text-rose-500 dark:text-rose-400 text-lg self-center"></i>' : ''}
        </button>
      `;
    });
    optionsHtml += '</div>';

    let justificationHtml = '';
    if (state.currentMode === 'study' && isAnswered) {
      justificationHtml = `
        <div class="mt-4 p-4 rounded-xl bg-gradient-to-r from-slate-900 to-blue-950 dark:from-[#0a101f] dark:to-[#071329] text-white text-xs border border-cyan-800/60 dark:border-cyan-700/60 shadow-inner">
          <div class="flex items-center justify-between mb-1.5 pb-1.5 border-b border-slate-700 dark:border-slate-800">
            <span class="font-bold text-cyan-300 flex items-center gap-1.5 font-mono">
              <i class="fa-solid fa-graduation-cap text-cyan-400"></i> JUSTIFICACIÓN PEDAGÓGICA (ICFES)
            </span>
            <span class="font-mono text-[11px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold">
              Opción Correcta: ${q.correct}
            </span>
          </div>
          <p class="text-slate-200 dark:text-slate-300 text-sm leading-relaxed">
            ${q.justification}
          </p>
        </div>
      `;
    }

    card.innerHTML = header + stem + optionsHtml + justificationHtml;
    container.appendChild(card);
  });
}

export function renderOpticalSheet() {
  const grid = document.getElementById('optical-bubble-grid');
  if (!grid) return;
  grid.innerHTML = '';

  const filtered = getFilteredQuestions();
  const filteredIds = new Set(filtered.map(q => q.id));

  state.questions.forEach(q => {
    const isAnswered = !!state.userAnswers[q.id];
    const selectedLetter = state.userAnswers[q.id];
    const isMatchFilter = filteredIds.has(q.id);
    const isFlagged = state.flaggedQuestions.has(q.id);

    const row = document.createElement('div');
    const isActiveCurrent = state.currentQuestionIndex === (q.id - 1);

    let borderClass = 'border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-[#131d33] hover:bg-slate-100/50 dark:hover:bg-slate-800/40';
    let opacityClass = isMatchFilter ? 'opacity-100' : 'opacity-40 grayscale-[40%]';

    if (isActiveCurrent) {
      borderClass = 'bg-blue-100/70 dark:bg-cyan-950/60 border-blue-400 dark:border-cyan-500/80 font-bold';
    } else if (isMatchFilter && (state.activeDifficultyFilter !== 'all' || state.activeCompetenciaFilter !== 'all' || state.activeSearchQuery !== '' || state.onlyFlaggedFilter)) {
      borderClass = 'border-blue-300 dark:border-cyan-800/90 bg-blue-50/40 dark:bg-cyan-950/20';
    }

    row.className = `flex items-center justify-between p-1.5 rounded-lg border transition ${borderClass} ${opacityClass}`;

    const diffDot = q.difficulty === 'Básica' ? 'bg-emerald-500' : (q.difficulty === 'Media' ? 'bg-amber-500' : 'bg-rose-500');

    const label = document.createElement('div');
    label.className = 'flex items-center gap-1.5 cursor-pointer';
    label.onclick = () => jumpToQuestion(q.id - 1);
    label.innerHTML = `
      <span class="w-1.5 h-1.5 rounded-full ${diffDot}" title="Dificultad: ${q.difficulty}"></span>
      <span class="w-5 text-right font-bold text-slate-700 dark:text-slate-200">${String(q.id).padStart(2, '0')}.</span>
      <span class="text-[9px] px-1 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-sans border border-slate-200/50 dark:border-slate-700">B${q.block}</span>
      ${isFlagged ? '<i class="fa-solid fa-bookmark text-[9px] text-amber-500 ml-0.5 flagged-pulse" title="Pregunta en duda"></i>' : ''}
    `;
    row.appendChild(label);

    const bubblesGroup = document.createElement('div');
    bubblesGroup.className = 'flex items-center gap-1.5';

    ['A', 'B', 'C', 'D'].forEach(letter => {
      const btn = document.createElement('button');
      btn.className = 'w-5 h-5 rounded-full border border-slate-300 dark:border-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-700 dark:text-slate-300 bubble-opt bg-white dark:bg-slate-900';
      btn.textContent = letter;

      if (isAnswered && selectedLetter === letter) {
        btn.classList.add('selected');
        if (state.currentMode === 'study') {
          if (letter === q.correct) {
            btn.className = 'w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold correct-answer';
          } else {
            btn.className = 'w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold wrong-answer';
          }
        }
      } else if (state.currentMode === 'study' && letter === q.correct && isAnswered) {
        btn.className = 'w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-emerald-500 text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60';
      }

      btn.onclick = (e) => {
        e.stopPropagation();
        selectAnswer(q.id, letter);
      };

      bubblesGroup.appendChild(btn);
    });

    row.appendChild(bubblesGroup);
    grid.appendChild(row);
  });

  const count = Object.keys(state.userAnswers).length;
  const sheetCounter = document.getElementById('sheet-answered-count');
  const badgeCounter = document.getElementById('answered-counter-badge');
  if (sheetCounter) sheetCounter.textContent = count;
  if (badgeCounter) badgeCounter.textContent = `${count}/40`;
}

export function updateProgress() {
  const answeredCount = Object.keys(state.userAnswers).length;
  const pct = Math.round((answeredCount / 40) * 100);
  const progressBar = document.getElementById('top-progress-bar');
  const badgeCounter = document.getElementById('answered-counter-badge');
  const sheetCounter = document.getElementById('sheet-answered-count');

  if (progressBar) progressBar.style.width = `${pct}%`;
  if (badgeCounter) badgeCounter.textContent = `${answeredCount}/40`;
  if (sheetCounter) sheetCounter.textContent = answeredCount;
}

function getDifficultyBadge(difficulty) {
  if (difficulty === 'Básica') {
    return '<span class="inline-flex items-center gap-1 text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Básica</span>';
  } else if (difficulty === 'Media') {
    return '<span class="inline-flex items-center gap-1 text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800"><span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Media</span>';
  } else {
    return '<span class="inline-flex items-center gap-1 text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800"><span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span> Avanzada</span>';
  }
}

function populateJumpSelect() {
  const select = document.getElementById('select-jump-question');
  if (!select) return;
  select.innerHTML = '';
  const filtered = getFilteredQuestions();

  if (filtered.length === 0) {
    const opt = document.createElement('option');
    opt.value = '';
    opt.textContent = 'Sin preguntas con este filtro';
    select.appendChild(opt);
    return;
  }

  filtered.forEach(q => {
    const opt = document.createElement('option');
    const realIdx = state.questions.findIndex(item => item.id === q.id);
    opt.value = realIdx;
    opt.textContent = `Pregunta ${q.id} [${q.difficulty}] (B${q.block})`;
    if (realIdx === state.currentQuestionIndex) {
      opt.selected = true;
    }
    select.appendChild(opt);
  });
}

// -----------------------------------------------------------------------------
// Results and Score Report Calculation
// -----------------------------------------------------------------------------
export function openResultsModal() {
  const total = state.questions.length;
  let correct = 0;
  const blockStats = {
    1: { correct: 0, total: 8, name: 'Talento Humano & Nómina' },
    2: { correct: 0, total: 8, name: 'Costos & Equilibrio' },
    3: { correct: 0, total: 8, name: 'Comercialización & DOFA' },
    4: { correct: 0, total: 6, name: 'Constitución Legal (S.A.S.)' },
    5: { correct: 0, total: 5, name: 'Principios de Henry Fayol' },
    6: { correct: 0, total: 5, name: 'Tecnología & Turismo' }
  };

  state.questions.forEach(q => {
    if (state.userAnswers[q.id] === q.correct) {
      correct++;
      blockStats[q.block].correct++;
    }
  });

  const wrong = total - correct;
  const scoreIcfes = Math.round((correct / total) * 500);
  const scorePct = Math.round((correct / total) * 100);

  // Percentile Estimation (Standardized distribution curve approximation)
  const percentile = Math.min(99, Math.round(scorePct * 0.98 + (correct > 30 ? 5 : 0)));

  // Populate Modal Fields
  const scoreEl = document.getElementById('modal-icfes-score');
  const correctEl = document.getElementById('modal-correct-count');
  const wrongEl = document.getElementById('modal-wrong-count');
  const pctEl = document.getElementById('modal-correct-pct');
  const percEl = document.getElementById('modal-score-percentile');

  if (scoreEl) scoreEl.textContent = `${scoreIcfes} / 500`;
  if (correctEl) correctEl.textContent = `${correct} / 40`;
  if (wrongEl) wrongEl.textContent = `${wrong}`;
  if (pctEl) pctEl.textContent = `${scorePct}% de efectividad`;
  if (percEl) percEl.textContent = `Percentil Estimado: ${percentile}%`;

  // Blocks Breakdown
  const breakdownContainer = document.getElementById('modal-blocks-breakdown');
  if (breakdownContainer) {
    breakdownContainer.innerHTML = '';
    Object.keys(blockStats).forEach(bKey => {
      const b = blockStats[bKey];
      const bPct = Math.round((b.correct / b.total) * 100);
      const row = `
        <div class="space-y-1 bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700/80">
          <div class="flex justify-between font-semibold text-slate-700 dark:text-slate-300">
            <span>${b.name}</span>
            <span class="font-mono font-bold text-blue-700 dark:text-cyan-400">${b.correct}/${b.total} (${bPct}%)</span>
          </div>
          <div class="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
            <div class="h-full transition-all duration-500 ${bPct >= 75 ? 'bg-emerald-500' : (bPct >= 50 ? 'bg-amber-500' : 'bg-rose-500')}" style="width: ${bPct}%"></div>
          </div>
        </div>
      `;
      breakdownContainer.innerHTML += row;
    });
  }

  // Qualitative Feedback
  const feedbackBox = document.getElementById('modal-feedback-box');
  if (feedbackBox) {
    if (scoreIcfes >= 400) {
      feedbackBox.innerHTML = `
        <strong class="text-emerald-700 dark:text-emerald-300 text-sm block mb-1">🎉 Nivel de Desempeño: EXCELENTE / AVANZADO (Nivel 4)</strong>
        Has demostrado un dominio sobresaliente en análisis de costos, fórmulas financieras de equilibrio ($6.200 MC, 1.259 unid), normativa S.A.S. en Colombia, principios fayolianos y aplicación tecnológica gastronómica. ¡Listo para pruebas de estado oficiales!
      `;
      sound.playCelebration();
      fireConfetti();
    } else if (scoreIcfes >= 300) {
      feedbackBox.innerHTML = `
        <strong class="text-blue-700 dark:text-cyan-300 text-sm block mb-1">👍 Nivel de Desempeño: SATISFACTORIO (Nivel 3)</strong>
        Buen entendimiento general de los conceptos. Revisa especialmente los ejercicios cuantitativos del Bloque 2 y la delimitación de funciones o código CIIU para consolidar el puntaje máximo.
      `;
      sound.playCorrect();
    } else {
      feedbackBox.innerHTML = `
        <strong class="text-amber-700 dark:text-amber-400 text-sm block mb-1">⚠️ Nivel de Desempeño: EN DESARROLLO (Nivel 1-2)</strong>
        Te sugerimos activar el <strong>Modo Estudio</strong> para revisar la justificación técnica de cada pregunta y afianzar las competencias de cálculo y legislación comercial.
      `;
      sound.playWrong();
    }
  }

  const modal = document.getElementById('results-modal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

export function closeResultsModal() {
  const modal = document.getElementById('results-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

export function reviewAllAnswersInStudyMode() {
  closeResultsModal();
  setMode('study');
  filterBlock('all');
}

export function resetExamAnswers() {
  if (confirm('¿Estás seguro de que deseas reiniciar la hoja de respuestas? Se borrarán tus selecciones y marcas de duda.')) {
    state.userAnswers = {};
    state.flaggedQuestions.clear();
    state.timerSeconds = 2 * 3600 + 40 * 60;
    localStorage.removeItem('icfes_answers');
    localStorage.removeItem('icfes_flagged');
    localStorage.removeItem('icfes_timer');

    sound.playTick();
    renderOpticalSheet();
    renderQuestions();
    updateProgress();
    updateTimerDisplay();
  }
}

export function printResultsReport() {
  sound.playTick();
  window.print();
}

// -----------------------------------------------------------------------------
// Keyboard Shortcuts
// -----------------------------------------------------------------------------
function initKeyboardShortcuts() {
  window.addEventListener('keydown', (e) => {
    // Ignore keystrokes when typing in search input
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
      return;
    }

    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevQuestion();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextQuestion();
    } else if (['a', 'b', 'c', 'd', 'A', 'B', 'C', 'D'].includes(e.key)) {
      const q = state.questions[state.currentQuestionIndex];
      if (q) {
        selectAnswer(q.id, e.key.toUpperCase());
      }
    } else if (e.key === 'f' || e.key === 'F') {
      const q = state.questions[state.currentQuestionIndex];
      if (q) {
        toggleFlagQuestion(q.id);
      }
    } else if (e.key === 'Escape') {
      closeResultsModal();
    }
  });
}

function initEventListeners() {
  // Expose methods to global window for HTML inline onclick handlers
  window.app = {
    toggleTheme,
    toggleSound,
    toggleTimerPause,
    filterBlock,
    setDifficultyFilter,
    setCompetenciaFilter,
    toggleOnlyFlagged,
    onSearchInput,
    clearSearchInput,
    resetAllFilters,
    selectAnswer,
    toggleFlagQuestion,
    jumpToQuestion,
    prevQuestion,
    nextQuestion,
    toggleViewMode,
    setMode,
    openResultsModal,
    closeResultsModal,
    reviewAllAnswersInStudyMode,
    resetExamAnswers,
    printResultsReport
  };
}

// Auto-boot on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
