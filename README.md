# 🎓 Simulador Saber • ICFES TecnoEmpresarial

> **Simulador interactivo oficial de evaluación estandarizada tipo ICFES / Saber Pro**, diseñado específicamente para el área de **Ciencia y Tecnología: Gestión Empresarial, Costos, Leyes y Operaciones**.

![Versión](https://img.shields.io/badge/Versión-2025.2-06B6D4?style=for-the-badge)
![ICFES Scale](https://img.shields.io/badge/Puntaje_ICFES-0--500-1D4ED8?style=for-the-badge)
![Deploy](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)

---

## 📌 Descripción del Proyecto

Este proyecto traslada el diseño generado en **Google Stitch** a una aplicación web interactiva de alto rendimiento y cero dependencias pesadas. Emula de manera fidedigna la experiencia de los cuadernillos de evaluación nacional en Colombia (Saber 11 y Saber Pro) junto con una **Hoja de Respuestas Óptica (OMR)** interactiva.

---

## 🚀 Características Principales

- **40 Preguntas Oficiales Curadas:**
  - **Bloque 1:** Recursos Humanos, Análisis de Cargos y Nómina (Preguntas 01–08).
  - **Bloque 2:** Costos Fijos, Variables, Margen y Punto de Equilibrio (Preguntas 09–16).
  - **Bloque 3:** Comercialización, Canales y Planeación Estratégica (Preguntas 17–24).
  - **Bloque 4:** Constitución Legal, Entidades y Normativa en Colombia (Preguntas 25–30).
  - **Bloque 5:** Principios Administrativos de Henry Fayol (Preguntas 31–35).
  - **Bloque 6:** Tecnología en Producción Turística y Servicios Gastronómicos (Preguntas 36–40).

- **Modo Dual de Aprendizaje:**
  - 📝 **Modo Simulacro (Examen a ciegas):** Restricciones de examen real, cronómetro en cuenta regresiva y sin revelar respuestas hasta finalizar.
  - 💡 **Modo Estudio:** Retroalimentación inmediata con **Justificación Pedagógica Técnica** desglosada por cada opción.

- **Hoja de Respuestas Óptica (OMR):**
  - Panel interactivo derecho con burbujas A, B, C, D sincronizadas en tiempo real con las tarjetas del examen.
  - Marcador de preguntas **En Duda / Flagged** para revisión rápida.

- **Filtros Avanzados y Búsqueda en Vivo:**
  - Filtro por Bloque Temático (1 a 6 o Ver Todas).
  - Filtro por Nivel de Dificultad (Básica, Media, Avanzada).
  - Filtro por Competencia ICFES (Interpretación, Argumentación, Solución de Problemas).
  - Filtro de preguntas marcadas en duda.
  - Búsqueda en tiempo real por palabras clave (ej. *nómina*, *equilibrio*, *Fayol*, *S.A.S.*).

- **Cronómetro de Prueba con Control:**
  - Tiempo oficial de 2 horas y 40 minutos.
  - Alerta visual y sonora en los últimos 15 minutos.
  - Opción de pausar/reanudar.

- **Motor de Audio Táctil (Web Audio API):**
  - Efectos de sonido sintetizados sin descargar archivos de audio externos.
  - Botón de silenciar/activar con persistencia en `localStorage`.

- **Informe Oficial de Calificación (Escala 0–500):**
  - Cálculo de puntaje global sobre 500 puntos.
  - Estimación de percentil nacional (0–99%).
  - Conteo de aciertos netos, errores y descarte.
  - Desglose porcentual gráfico por cada bloque temático.
  - Diagnóstico cualitativo según los 4 Niveles de Desempeño del ICFES.
  - Animación de confeti festivo para altos puntajes.
  - Formato listo para imprimir o exportar como PDF (`window.print()`).

- **Persistencia Local Automática (`localStorage`):**
  - Guarda automáticamente respuestas marcadas, cronómetro y preguntas en duda.

- **Atajos de Teclado:**
  - `←` / `→`: Navegar a la pregunta anterior / siguiente.
  - `A`, `B`, `C`, `D`: Marcar opción de respuesta.
  - `F`: Marcar / desmarcar pregunta en duda.
  - `ESC`: Cerrar ventana modal de resultados.

---

## 📂 Estructura del Código

```text
PREGUNTAS-ICFES/
├── css/
│   └── styles.css          # Estilos personalizados, efectos OMR, print stylesheet
├── js/
│   ├── app.js              # Controlador principal, estado, filtros, modal, atajos
│   ├── audio.js            # Motor de sonido sintetizado Web Audio API
│   ├── confetti.js         # Efecto de confeti en Canvas sin librerías externas
│   └── questions.js        # Banco de 40 preguntas y metadatos pedagógicos
├── index.html              # Estructura semántica accesible con Tailwind CSS
├── vercel.json             # Configuración de despliegue y headers de seguridad
├── .gitignore              # Archivos ignorados por git
└── README.md               # Documentación oficial
```

---

## 💻 Ejecución Local

No requiere instalar Node.js ni paquetes adicionales. Puedes abrirlo directamente o mediante un servidor estático:

### Opción 1: Con Python
```bash
python -m http.server 3000
```
Luego abre tu navegador en `http://localhost:3000`.

### Opción 2: Con Node (npx serve)
```bash
npx serve .
```

---

## 🌐 Cómo Subirlo a GitHub y Publicarlo en Vercel

### 1. Inicializar Git y Subir a GitHub
```bash
# 1. Iniciar el repositorio en la carpeta del proyecto
git init
git add .
git commit -m "feat: Simulador ICFES TecnoEmpresarial interactivo completo"

# 2. Conectar con tu repositorio en GitHub (reemplaza con tu URL)
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git branch -M main
git push -u origin main
```

### 2. Desplegar en Vercel

#### Método A (Automático desde GitHub - Recomendado):
1. Ingresa a [vercel.com](https://vercel.com) e inicia sesión con tu cuenta de GitHub.
2. Haz clic en **"Add New Project"** y selecciona tu repositorio `TU_REPO`.
3. Deja la configuración de Framework en **"Other"** (es un sitio estático HTML/JS).
4. Haz clic en **"Deploy"**. En 10 segundos tu simulador estará en vivo con un enlace HTTPS gratuito.

#### Método B (Por Terminal con Vercel CLI):
```bash
# Ejecuta en la raíz del proyecto:
vercel
```
Sigue los pasos interactivos en pantalla y quedará publicado al instante.
