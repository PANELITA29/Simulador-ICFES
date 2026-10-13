/**
 * Simulador Saber • ICFES Tech - Banco de 40 Preguntas Oficiales
 * Materia: Ciencia y Tecnología • Gestión Empresarial, Costos, Leyes y Operaciones
 */

export const blocksMeta = {
  1: {
    id: 1,
    title: "Bloque 1: Recursos Humanos, Análisis de Cargos y Nómina",
    range: "01 — 08",
    icon: "fa-users-gear",
    desc: "Evaluación de competencias operativas, cálculo de costos laborales y delimitación de funciones en la organización."
  },
  2: {
    id: 2,
    title: "Bloque 2: Costos Fijos, Variables, Margen y Punto de Equilibrio",
    range: "09 — 16",
    icon: "fa-calculator",
    desc: "Razonamiento cuantitativo financiero, margen de contribución unitario ($6.200) y punto de equilibrio (1.259 unidades)."
  },
  3: {
    id: 3,
    title: "Bloque 3: Comercialización, Canales y Planeación Estratégica",
    range: "17 — 24",
    icon: "fa-chart-pie",
    desc: "Visión corporativa, diagnóstico DOFA, omnicanalidad, marketing sensorial gastronómico y objetivos SMART."
  },
  4: {
    id: 4,
    title: "Bloque 4: Constitución Legal, Entidades y Normativa en Colombia",
    range: "25 — 30",
    icon: "fa-scale-balanced",
    desc: "Sociedad por Acciones Simplificada (S.A.S.), control de homonimia en RUES, DIAN (RUT), código CIIU y salubridad."
  },
  5: {
    id: 5,
    title: "Bloque 5: Principios Administrativos de Henry Fayol",
    range: "31 — 35",
    icon: "fa-sitemap",
    desc: "Unidad de mando, división del trabajo, orden material y clima organizacional (l'esprit de corps)."
  },
  6: {
    id: 6,
    title: "Bloque 6: Tecnología en Producción Turística y Servicios",
    range: "36 — 40",
    icon: "fa-mobile-screen-button",
    desc: "Menús QR interactivos, sistemas TPV/POS en la nube, reputación en geolocalización y pasarelas de pago electrónico."
  }
};

export const examQuestions = [
  // Bloque 1: Recursos Humanos, Análisis de Cargos y Nómina (1 - 8)
  {
    id: 1,
    block: 1,
    blockName: "Recursos Humanos, Análisis de Cargos y Nómina",
    difficulty: "Básica",
    competencia: "Interpretación y Análisis de Información",
    stem: "En una empresa gastronómica que proyecta una remuneración mensual de $2.000.000 COP por trabajador para tres puestos (preparador, cajero y mesero), el administrador necesita presupuestar el costo mensual directo de nómina. Para este equipo de tres personas, el gasto total presupuestado en salarios corresponde a:",
    options: {
      A: "$4.000.000 COP",
      B: "$5.250.000 COP",
      C: "$6.000.000 COP",
      D: "$7.800.000 COP"
    },
    correct: "C",
    justification: "Si se contemplan tres trabajadores con una asignación mensual de $2.000.000 COP cada uno, la multiplicación directa (3 × 2.000.000) da exactamente $6.000.000 COP como costo salarial directo."
  },
  {
    id: 2,
    block: 1,
    blockName: "Recursos Humanos, Análisis de Cargos y Nómina",
    difficulty: "Media",
    competencia: "Argumentación y Toma de Decisiones",
    stem: "En el perfil ocupacional de un preparador principal de cocina (chef), se exige acreditar conocimientos en el control térmico de aceites de inmersión y BPM (Buenas Prácticas de Manufactura). Esta exigencia técnica se justifica principalmente porque:",
    options: {
      A: "Garantiza que el trabajador pueda realizar el arqueo de caja registradora en horas pico.",
      B: "Asegura la inocuidad alimentaria, el punto óptimo de cocción y evita la degradación acelerada del aceite.",
      C: "Reduce automáticamente el canon mensual de arrendamiento del establecimiento comercial.",
      D: "Facilita la radicación digital del Registro Único Empresarial y Social (RUES)."
    },
    correct: "B",
    justification: "El conocimiento en BPM y temperaturas de fritura incide de forma directa en la seguridad alimentaria (inocuidad) y la estandarización organoléptica del producto."
  },
  {
    id: 3,
    block: 1,
    blockName: "Recursos Humanos, Análisis de Cargos y Nómina",
    difficulty: "Básica",
    competencia: "Interpretación y Análisis de Información",
    stem: "Dentro de una estructura organizacional, la diferencia fundamental entre el análisis de cargo (perfil) y el manual de funciones radica en que:",
    options: {
      A: "El análisis de cargo define el salario mínimo legal y el manual de funciones liquida las prestaciones sociales.",
      B: "El análisis de cargo describe los saberes, competencias y requerimientos del ocupante, mientras que el manual de funciones detalla las tareas y responsabilidades operativas asignadas.",
      C: "El manual de funciones establece los costos fijos y el perfil del cargo calcula los costos variables.",
      D: "El análisis de cargo es un trámite obligatorio ante la DIAN y el manual de funciones solo aplica para sociedades anónimas abiertas."
    },
    correct: "B",
    justification: "El análisis de cargo se enfoca en las características y competencias que debe poseer la persona ('qué debe saber'), mientras que el manual de funciones lista las actividades y labores que debe desempeñar ('qué debe hacer')."
  },
  {
    id: 4,
    block: 1,
    blockName: "Recursos Humanos, Análisis de Cargos y Nómina",
    difficulty: "Media",
    competencia: "Solución de Problemas Operativos",
    stem: "Durante una jornada de alto volumen, el cajero de un restaurante de comidas rápidas se ausenta de su estación para picar insumos en la cocina, lo que ocasiona demoras en el cobro, filas y errores en las órdenes digitales. Para solucionar este problema con base en el manual de funciones, la administración debe:",
    options: {
      A: "Eliminar el uso de pagos electrónicos para agilizar el mostrador.",
      B: "Exigir al cajero el cumplimiento exclusivo de sus responsabilidades (cobro, registro y entrega final) respetando la delimitación de funciones.",
      C: "Fusionar de manera permanente los cargos de preparador y cajero en una sola persona.",
      D: "Aumentar el precio de venta al público para compensar los pedidos demorados."
    },
    correct: "B",
    justification: "La delimitación de funciones busca que cada colaborador atienda su frente asignado para evitar cuellos de botella en la atención y pérdidas de control en la caja."
  },
  {
    id: 5,
    block: 1,
    blockName: "Recursos Humanos, Análisis de Cargos y Nómina",
    difficulty: "Básica",
    competencia: "Interpretación y Análisis de Información",
    stem: "En el manual de funciones del auxiliar de servicio (mesero), se establece como labor prioritaria la desinfección continua de mesas y la atención rápida de pedidos. Si un cliente solicita información sobre los alérgenos de una salsa, la competencia esperada del mesero según su perfil es:",
    options: {
      A: "Remitir al cliente a consultar la página web de la DIAN.",
      B: "Desconocer los componentes por ser una tarea exclusiva del administrador.",
      C: "Poseer conocimiento completo de la carta, ingredientes y preparaciones para orientar con claridad al comensal.",
      D: "Delegar el cobro al preparador de la freidora."
    },
    correct: "C",
    justification: "El perfil del mesero exige conocer la oferta del menú y sus especificaciones para brindar un servicio asertivo y seguro."
  },
  {
    id: 6,
    block: 1,
    blockName: "Recursos Humanos, Análisis de Cargos y Nómina",
    difficulty: "Media",
    competencia: "Solución de Problemas Operativos",
    stem: "Si una empresa calcula que el costo total de la nómina mensual asciende a $6.000.000 COP y decide contratar a un cuarto colaborador de apoyo por turnos con una remuneración neta de $1.000.000 COP, el nuevo rubro total de salarios se ubicará en:",
    options: {
      A: "$5.000.000 COP",
      B: "$7.000.000 COP",
      C: "$8.000.000 COP",
      D: "$6.500.000 COP"
    },
    correct: "B",
    justification: "Sumando el costo inicial de $6.000.000 COP más el nuevo colaborador de $1.000.000 COP, la cifra total asciende a $7.000.000 COP."
  },
  {
    id: 7,
    block: 1,
    blockName: "Recursos Humanos, Análisis de Cargos y Nómina",
    difficulty: "Avanzada",
    competencia: "Argumentación y Toma de Decisiones",
    stem: "La inclusión de un rubro formal de nómina dentro del presupuesto inicial de una microempresa, aun cuando los fundadores sean quienes atiendan las labores al principio, resulta indispensable porque:",
    options: {
      A: "Permite calcular el costo real de mano de obra y fijar precios que garanticen sostenibilidad económica.",
      B: "Es un requisito exigido para la consulta de homonimia en el RUES.",
      C: "Asegura la exoneración automática del pago de servicios públicos.",
      D: "Transforma de inmediato los costos fijos en costos variables."
    },
    correct: "A",
    justification: "No incluir la mano de obra distorsiona el margen de ganancia real y genera la ilusión de utilidades falsas al no costear el tiempo productivo de las personas."
  },
  {
    id: 8,
    block: 1,
    blockName: "Recursos Humanos, Análisis de Cargos y Nómina",
    difficulty: "Básica",
    competencia: "Interpretación y Análisis de Información",
    stem: "En el organigrama vertical de un negocio de alimentos, la línea de autoridad que conecta a la Gerencia General directamente con el Chef, el Cajero y el Mesero denota:",
    options: {
      A: "Una estructura descentralizada sin responsables directos.",
      B: "Una relación jerárquica lineal donde la administración coordina y supervisa operativamente cada departamento.",
      C: "La tercerización completa de las actividades productivas de la empresa.",
      D: "Que los tres colaboradores tienen la misma responsabilidad legal y tributaria que el representante legal."
    },
    correct: "B",
    justification: "Las líneas verticales descendentes en un organigrama tradicional reflejan la cadena de mando directa y supervisión funcional."
  },

  // Bloque 2: Costos Fijos, Variables, Margen y Punto de Equilibrio (9 - 16)
  {
    id: 9,
    block: 2,
    blockName: "Costos Fijos, Variables, Margen y Punto de Equilibrio",
    difficulty: "Media",
    competencia: "Interpretación y Análisis de Información",
    stem: "Una empresa de alimentos tiene costos fijos mensuales por $7.800.000 COP. Vende su producto a un precio unitario de $10.000 COP y su costo variable unitario es de $3.800 COP. ¿Cuál es el margen de contribución bruto por unidad vendida?",
    options: {
      A: "$3.800 COP",
      B: "$6.200 COP",
      C: "$10.000 COP",
      D: "$13.800 COP"
    },
    correct: "B",
    justification: "El margen de contribución unitario se calcula: Precio de Venta - Costo Variable = 10.000 - 3.800 = $6.200 COP."
  },
  {
    id: 10,
    block: 2,
    blockName: "Costos Fijos, Variables, Margen y Punto de Equilibrio",
    difficulty: "Avanzada",
    competencia: "Solución de Problemas Operativos",
    stem: "Tomando los costos fijos de $7.800.000 COP y una ganancia marginal unitaria de $6.200 COP, el punto de equilibrio mensual en unidades aproximadas es:",
    options: {
      A: "500 unidades",
      B: "850 unidades",
      C: "1.259 unidades",
      D: "2.050 unidades"
    },
    correct: "C",
    justification: "Punto de Equilibrio = Costos Fijos / Margen Unitario = 7.800.000 / 6.200 ≈ 1.258,06 (se redondea a 1.259 unidades para cubrir los costos)."
  },
  {
    id: 11,
    block: 2,
    blockName: "Costos Fijos, Variables, Margen y Punto de Equilibrio",
    difficulty: "Básica",
    competencia: "Interpretación y Análisis de Información",
    stem: "En la producción de comidas rápidas, constituyen ejemplos representativos de costos fijos y costos variables respectivamente:",
    options: {
      A: "El canon de arriendo del local comercial y las salchichas/queso utilizados en cada porción.",
      B: "Las servilletas empacadas y el pago anual de la matrícula mercantil.",
      C: "El aceite consumido en freír y la factura del agua.",
      D: "La pauta digital en redes sociales y la depreciación de la freidora."
    },
    correct: "A",
    justification: "El arriendo debe pagarse mes a mes sin importar el volumen de ventas (fijo), mientras que los ingredientes como queso y salchicha varían en proporción directa a las unidades elaboradas (variables)."
  },
  {
    id: 12,
    block: 2,
    blockName: "Costos Fijos, Variables, Margen y Punto de Equilibrio",
    difficulty: "Avanzada",
    competencia: "Solución de Problemas Operativos",
    stem: "Si el negocio vende 1.500 unidades al mes a un precio de $10.000 COP cada una, con costos variables totales de $5.700.000 COP (1.500 × 3.800) y costos fijos de $7.800.000 COP, la utilidad neta mensual obtenida es:",
    options: {
      A: "$500.000 COP",
      B: "$1.500.000 COP",
      C: "$3.200.000 COP",
      D: "$9.300.000 COP"
    },
    correct: "B",
    justification: "Ingresos ($15.000.000) - Costos Variables ($5.700.000) = Utilidad Bruta ($9.300.000). Luego: Utilidad Bruta ($9.300.000) - Costos Fijos ($7.800.000) = Utilidad Neta ($1.500.000 COP)."
  },
  {
    id: 13,
    block: 2,
    blockName: "Costos Fijos, Variables, Margen y Punto de Equilibrio",
    difficulty: "Media",
    competencia: "Argumentación y Toma de Decisiones",
    stem: "Si el punto de equilibrio de un emprendimiento está calculado en 1.259 unidades al mes y durante un mes determinado se registran ventas efectivas de 1.100 unidades, la conclusión financiera acertada es que la empresa:",
    options: {
      A: "Generó utilidades netas superiores al 10%.",
      B: "Duplicó su margen de contribución unitario.",
      C: "Operó en zona de pérdidas, ya que no logró cubrir la totalidad de sus costos fijos.",
      D: "Redujo automáticamente sus costos variables unitarios a cero."
    },
    correct: "C",
    justification: "Toda venta ubicada por debajo del punto de equilibrio implica que los ingresos generados no alcanzan a absorber los costos fijos totales, produciendo déficit o pérdida operativa."
  },
  {
    id: 14,
    block: 2,
    blockName: "Costos Fijos, Variables, Margen y Punto de Equilibrio",
    difficulty: "Avanzada",
    competencia: "Solución de Problemas Operativos",
    stem: "Si el costo de los insumos principales (queso y aceite) se eleva, provocando que el costo variable unitario pase de $3.800 COP a $4.800 COP, manteniendo el precio de venta en $10.000 COP y los costos fijos estables, el efecto directo en el punto de equilibrio será:",
    options: {
      A: "Disminuirá, requiriendo vender menos unidades para alcanzar el equilibrio.",
      B: "Permanecerá inalterado porque el precio de venta no cambió.",
      C: "Aumentará, ya que el margen de contribución unitario se reduce de $6.200 a $5.200 COP.",
      D: "Convertirá los costos variables en costos fijos de administración."
    },
    correct: "C",
    justification: "Al encarecerse el costo variable, el margen por unidad se achica ($10.000 - $4.800 = $5.200), obligando al negocio a vender más unidades (7.800.000 / 5.200 = 1.500 unid.) para cubrir los costos fijos."
  },
  {
    id: 15,
    block: 2,
    blockName: "Costos Fijos, Variables, Margen y Punto de Equilibrio",
    difficulty: "Básica",
    competencia: "Interpretación y Análisis de Información",
    stem: "En el Estado de Resultados proyectado, la \"Utilidad Bruta\" se define formalmente como:",
    options: {
      A: "El dinero total que ingresa a la cuenta bancaria sin descontar ningún rubro.",
      B: "La diferencia entre las ventas netas totales y los costos variables de producción.",
      C: "El monto que queda después de pagar arriendo, nómina y los impuestos de renta.",
      D: "El saldo pendiente de pago a los proveedores de empaques."
    },
    correct: "B",
    justification: "La Utilidad Bruta representa los ingresos operacionales menos los costos directamente atribuibles a la producción de los bienes vendidos (costo de ventas/variables)."
  },
  {
    id: 16,
    block: 2,
    blockName: "Costos Fijos, Variables, Margen y Punto de Equilibrio",
    difficulty: "Media",
    competencia: "Solución de Problemas Operativos",
    stem: "Si la empresa establece una meta de ventas mensual de 1.500 unidades para un mes de 30 días de atención continua, la meta promedio de ventas diarias que debe monitorear el administrador es de:",
    options: {
      A: "25 unidades/día",
      B: "50 unidades/día",
      C: "75 unidades/día",
      D: "100 unidades/día"
    },
    correct: "B",
    justification: "1.500 unidades / 30 días = 50 unidades al día."
  },

  // Bloque 3: Comercialización, Canales y Planeación Estratégica (17 - 24)
  {
    id: 17,
    block: 3,
    blockName: "Comercialización, Canales y Planeación Estratégica",
    difficulty: "Básica",
    competencia: "Interpretación y Análisis de Información",
    stem: "Un emprendimiento gastronómico redacta: \"Para el año 2028, consolidarnos como la marca líder de banderillas coreanas en Santander, con múltiples puntos de venta y clientes fidelizados\". Este postulado corresponde conceptualmente a:",
    options: {
      A: "Su Misión corporativa.",
      B: "Su Visión estratégica.",
      C: "Un costo variable unitario.",
      D: "Un principio de subordinación legal."
    },
    correct: "B",
    justification: "La Visión describe la meta aspiracional de la organización a largo plazo y cómo proyecta verse en un horizonte temporal específico (año 2028)."
  },
  {
    id: 18,
    block: 3,
    blockName: "Comercialización, Canales y Planeación Estratégica",
    difficulty: "Media",
    competencia: "Interpretación y Análisis de Información",
    stem: "Dentro del análisis DOFA de una empresa emergente, la \"popularidad creciente de la gastronomía asiática y la cultura K-Pop entre jóvenes\" debe clasificarse técnicamente como:",
    options: {
      A: "Una Fortaleza.",
      B: "Una Debilidad.",
      C: "Una Oportunidad.",
      D: "Una Amenaza."
    },
    correct: "C",
    justification: "Las tendencias socioculturales del entorno externo que benefician a la empresa sin que esta las controle directamente corresponden a Oportunidades."
  },
  {
    id: 19,
    block: 3,
    blockName: "Comercialización, Canales y Planeación Estratégica",
    difficulty: "Básica",
    competencia: "Interpretación y Análisis de Información",
    stem: "En el diagnóstico interno de la misma empresa, el hecho de ser una marca nueva sin posicionamiento previo y contar con un espacio físico reducido se cataloga como:",
    options: {
      A: "Oportunidad externa.",
      B: "Amenaza legal.",
      C: "Debilidad interna.",
      D: "Ventaja competitiva fija."
    },
    correct: "C",
    justification: "Las limitaciones y carencias propias del emprendimiento frente a sus capacidades actuales constituyen Debilidades internas."
  },
  {
    id: 20,
    block: 3,
    blockName: "Comercialización, Canales y Planeación Estratégica",
    difficulty: "Media",
    competencia: "Argumentación y Toma de Decisiones",
    stem: "Un negocio de comidas que ofrece atención directa en barra, servicio para llevar (takeout) y pedidos por WhatsApp con domiciliarios locales está empleando:",
    options: {
      A: "Un canal indirecto largo con intermediación mayorista exclusiva.",
      B: "Una estrategia omnicanal directa que combina venta física presencial y canal digital corto.",
      C: "Un sistema de exportación no tradicional bajo régimen franco.",
      D: "Una estrategia de venta a pérdidas para eludir aranceles."
    },
    correct: "B",
    justification: "Integrar el punto de venta con pedidos digitales y mensajería directa sin intermediarios comerciales representa una distribución directa multicanal."
  },
  {
    id: 21,
    block: 3,
    blockName: "Comercialización, Canales y Planeación Estratégica",
    difficulty: "Media",
    competencia: "Argumentación y Toma de Decisiones",
    stem: "La implementación de un programa de fidelización tipo \"Gato Pass\", donde el comensal recibe una banderilla gratis tras acumular 8 compras registradas, tiene como objetivo principal de mercadeo:",
    options: {
      A: "Disminuir el salario de los meseros durante los días de baja venta.",
      B: "Estimular la recompra continua y aumentar el ciclo de vida del cliente con la marca.",
      C: "Cumplir con los requisitos de inscripción ante la Cámara de Comercio.",
      D: "Modificar la tasa interna de retorno de los activos fijos."
    },
    correct: "B",
    justification: "Los programas de lealtad buscan premiar la retención y la frecuencia de consumo recurrente del cliente habitual."
  },
  {
    id: 22,
    block: 3,
    blockName: "Comercialización, Canales y Planeación Estratégica",
    difficulty: "Media",
    competencia: "Argumentación y Toma de Decisiones",
    stem: "La decisión de una marca de enfocar sus publicaciones de TikTok e Instagram en videos de corta duración que destacan el sonido crujiente al morder y el estiramiento del queso (cheese pull) se fundamenta en que:",
    options: {
      A: "Este tipo de contenido genera impacto visual y sensorial inmediato, propiciando viralidad orgánica en audiencias jóvenes.",
      B: "Es la única forma de reportar el inventario mensual a la Secretaría de Salud.",
      C: "Permite suprimir la necesidad de tener personal de atención al cliente.",
      D: "Reduce automáticamente los costos fijos de servicios públicos."
    },
    correct: "A",
    justification: "El marketing gastronómico sensorial (ASMR y atractivo visual del producto) conecta con las emociones y antojo de los usuarios en redes sociales."
  },
  {
    id: 23,
    block: 3,
    blockName: "Comercialización, Canales y Planeación Estratégica",
    difficulty: "Básica",
    competencia: "Interpretación y Análisis de Información",
    stem: "El objetivo planteado por un negocio: \"Alcanzar una comunidad de 3.000 seguidores en redes sociales durante los primeros 6 meses de operación\" cumple con la metodología SMART porque es:",
    options: {
      A: "Subjetivo, abstracto, ilimitado, costoso y temporal.",
      B: "Específico, medible, alcanzable, relevante y delimitado en el tiempo.",
      C: "Legal, tributario, mercantil, fiscal y reglamentario.",
      D: "Fijo, variable, marginal, neto y presupuestado."
    },
    correct: "B",
    justification: "Posee una métrica concreta (3.000 seguidores), medible cuantitativamente y con un periodo de evaluación establecido (6 meses)."
  },
  {
    id: 24,
    block: 3,
    blockName: "Comercialización, Canales y Planeación Estratégica",
    difficulty: "Avanzada",
    competencia: "Solución de Problemas Operativos",
    stem: "Para elevar las ventas en días históricamente lentos (martes y miércoles), la estrategia comercial más efectiva de corto plazo consiste en:",
    options: {
      A: "Despedir temporalmente al cocinero principal esos dos días.",
      B: "Lanzar combos promocionales exclusivos (ej. Banderilla + Bebida a precio especial) que incentiven el consumo.",
      C: "Cerrar el punto físico y atender únicamente a través de la DIAN.",
      D: "Incrementar los precios unitarios para compensar la baja afluencia."
    },
    correct: "B",
    justification: "Los combos de precio estratégico en días valle dinamizan la afluencia de público y ayudan a cubrir los costos fijos diarios."
  },

  // Bloque 4: Constitución Legal, Entidades y Normativa en Colombia (25 - 30)
  {
    id: 25,
    block: 4,
    blockName: "Constitución Legal, Entidades y Normativa en Colombia",
    difficulty: "Media",
    competencia: "Interpretación y Análisis de Información",
    stem: "La figura jurídica de Sociedad por Acciones Simplificada (S.A.S.) es ampliamente elegida por los nuevos emprendedores en Colombia debido a que:",
    options: {
      A: "Obliga a constituir la empresa por escritura pública notarial sin importar el capital.",
      B: "Puede crearse mediante documento privado, con uno o más socios, limitando la responsabilidad patrimonial al monto aportado.",
      C: "Exime a las empresas de expedir factura y de llevar contabilidad regular.",
      D: "Exige una junta directiva obligatoria de al menos cinco miembros externos."
    },
    correct: "B",
    justification: "La S.A.S. se destaca por su agilidad contractual, posibilidad de unipersonalidad y protección del patrimonio personal de los accionistas."
  },
  {
    id: 26,
    block: 4,
    blockName: "Constitución Legal, Entidades y Normativa en Colombia",
    difficulty: "Media",
    competencia: "Solución de Problemas Operativos",
    stem: "El primer paso formal que debe realizar un emprendedor antes de redactar y radicar los estatutos societarios en la Cámara de Comercio es:",
    options: {
      A: "Solicitar una visita de inspección al Cuerpo de Bomberos.",
      B: "Efectuar el control de homonimia en el RUES para comprobar que el nombre comercial propuesto esté disponible.",
      C: "Pagar el impuesto de industria y comercio del primer trimestre.",
      D: "Diseñar el logotipo y los uniformes del personal."
    },
    correct: "B",
    justification: "Verificar la disponibilidad del nombre en el RUES evita el rechazo de la inscripción por colisión con marcas o razones sociales previamente registradas."
  },
  {
    id: 27,
    block: 4,
    blockName: "Constitución Legal, Entidades y Normativa en Colombia",
    difficulty: "Básica",
    competencia: "Interpretación y Análisis de Información",
    stem: "Para formalizar la matrícula mercantil en la Cámara de Comercio, la entidad tributaria en Colombia que expide el Pre-RUT y posteriormente el RUT definitivo con el NIT de la sociedad es:",
    options: {
      A: "El SENA.",
      B: "La DIAN (Dirección de Impuestos y Aduanas Nacionales).",
      C: "El Ministerio de Trabajo.",
      D: "La Superintendencia de Industria y Comercio."
    },
    correct: "B",
    justification: "La DIAN es la autoridad aduanera y tributaria en Colombia encargada del Registro Único Tributario (RUT)."
  },
  {
    id: 28,
    block: 4,
    blockName: "Constitución Legal, Entidades y Normativa en Colombia",
    difficulty: "Media",
    competencia: "Interpretación y Análisis de Información",
    stem: "El código CIIU exigido en los formularios de registro mercantil cumple la función técnica de:",
    options: {
      A: "Fijar el horario de apertura y cierre del establecimiento.",
      B: "Clasificar la actividad económica estandarizada que desarrollará la empresa para fines estadísticos, tributarios y de control.",
      C: "Determinar el menú exacto que debe ofrecer un restaurante.",
      D: "Sustituir el certificado de manipulación de alimentos del personal de cocina."
    },
    correct: "B",
    justification: "La Clasificación Industrial Internacional Uniforme (CIIU) categoriza formalmente las líneas productivas y de servicios de los negocios ante las autoridades del Estado."
  },
  {
    id: 29,
    block: 4,
    blockName: "Constitución Legal, Entidades y Normativa en Colombia",
    difficulty: "Básica",
    competencia: "Interpretación y Análisis de Información",
    stem: "En el documento constitutivo de una empresa (Estatutos de la S.A.S.), la cláusula que delimita las actividades mercantiles y productivas a las que se dedicará legalmente la organización se denomina:",
    options: {
      A: "Domicilio principal.",
      B: "Objeto social.",
      C: "Razón de homonimia.",
      D: "Matriz de resultados."
    },
    correct: "B",
    justification: "El objeto social describe con precisión los sectores de negocio, actividades y operaciones comerciales que la sociedad está facultada para ejecutar."
  },
  {
    id: 30,
    block: 4,
    blockName: "Constitución Legal, Entidades y Normativa en Colombia",
    difficulty: "Avanzada",
    competencia: "Argumentación y Toma de Decisiones",
    stem: "En un emprendimiento de alimentos preparados, además del registro en la Cámara de Comercio y el RUT, un requisito legal indispensable para operar abiertamente al público en Colombia es:",
    options: {
      A: "La homologación de títulos universitarios de todos los socios ante el ICFES.",
      B: "El certificado de manipulación higiénica de alimentos para el personal operativo y el cumplimiento de condiciones sanitarias mínimas.",
      C: "El registro de patentes de invención de cada salsa utilizada.",
      D: "Contar con un número superior a 10 trabajadores contratados a término indefinido."
    },
    correct: "B",
    justification: "Las normas de salud pública exigen que todo manipulador de alimentos esté capacitado y certificado para garantizar que el consumo de los productos no genere riesgos epidemiológicos."
  },

  // Bloque 5: Principios Administrativos de Henry Fayol (31 - 35)
  {
    id: 31,
    block: 5,
    blockName: "Principios Administrativos de Henry Fayol",
    difficulty: "Media",
    competencia: "Solución de Problemas Operativos",
    stem: "Si en la cocina de un negocio el Gerente le ordena al Chef freír a 170 °C, pero al mismo tiempo el Administrador del punto de venta le ordena apagar la freidora para ahorrar energía, se está violando el principio fayoliano de:",
    options: {
      A: "Subordinación del interés individual.",
      B: "Unidad de mando.",
      C: "Remuneración justa.",
      D: "Orden material."
    },
    correct: "B",
    justification: "Henry Fayol postuló que cada colaborador debe recibir órdenes de un único superior jerárquico para evitar confusiones y conflictos de autoridad."
  },
  {
    id: 32,
    block: 5,
    blockName: "Principios Administrativos de Henry Fayol",
    difficulty: "Básica",
    competencia: "Interpretación y Análisis de Información",
    stem: "Cuando una empresa delimita claramente que una persona se dedica exclusivamente a freír las preparaciones, otra a realizar los cobros en la caja y otra a servir las mesas, está aplicando el principio de:",
    options: {
      A: "División del trabajo.",
      B: "Centralización total.",
      C: "Jerarquía absoluta.",
      D: "Espíritu de cuerpo pasivo."
    },
    correct: "A",
    justification: "La división del trabajo promueve la especialización de funciones para incrementar la eficiencia, rapidez y destreza en la ejecución."
  },
  {
    id: 33,
    block: 5,
    blockName: "Principios Administrativos de Henry Fayol",
    difficulty: "Media",
    competencia: "Argumentación y Toma de Decisiones",
    stem: "De acuerdo con Fayol, la relación entre autoridad y responsabilidad sostiene que:",
    options: {
      A: "Quien tiene el derecho de dar órdenes no asume ninguna consecuencia por los resultados.",
      B: "La autoridad directiva debe ir siempre acompañada de la debida responsabilidad por los actos y decisiones tomadas.",
      C: "Solamente los operarios de menor rango tienen responsabilidad dentro de la empresa.",
      D: "La disciplina excluye la aplicación de sanciones cuando se cometen faltas graves."
    },
    correct: "B",
    justification: "Fayol concibe la autoridad como la facultad de mandar, la cual debe estar respaldada por la responsabilidad inherente al ejercicio de ese poder."
  },
  {
    id: 34,
    block: 5,
    blockName: "Principios Administrativos de Henry Fayol",
    difficulty: "Básica",
    competencia: "Argumentación y Toma de Decisiones",
    stem: "El principio de Espíritu de Equipo (l'esprit de corps) formulado por Henry Fayol sugiere que las directivas de una organización deben:",
    options: {
      A: "Fomentar la rivalidad extrema entre colaboradores para premiar solo al más productivo.",
      B: "Promover la armonía, cohesión, comunicación y trabajo colaborativo para fortalecer el clima organizacional.",
      C: "Prohibir el diálogo entre las distintas áreas de la empresa.",
      D: "Mantener una alta rotación de empleados para evitar vínculos afectivos en el trabajo."
    },
    correct: "B",
    justification: "El espíritu de equipo recalca que la unión y el clima de armonía entre los trabajadores constituyen una fortaleza fundamental para el éxito de la organización."
  },
  {
    id: 35,
    block: 5,
    blockName: "Principios Administrativos de Henry Fayol",
    difficulty: "Media",
    competencia: "Solución de Problemas Operativos",
    stem: "Fayol definió el principio de Orden bajo la premisa de \"un lugar para cada cosa y cada cosa en su lugar\". En la operación de un establecimiento de comidas, este principio se evidencia cuando:",
    options: {
      A: "Todos los ingredientes, herramientas y utensilios están estandarizados y ubicados en áreas higiénicas designadas para evitar accidentes y retrasos.",
      B: "El personal cambia de cargo todos los días de manera aleatoria.",
      C: "Los insumos se almacenan junto con los productos de limpieza química para ahorrar espacio.",
      D: "Se eliminan las áreas de almacenamiento para abaratar el canon de arriendo."
    },
    correct: "A",
    justification: "El principio de orden (tanto material como social) busca que los recursos estén disponibles y localizables en su sitio adecuado para garantizar agilidad y seguridad."
  },

  // Bloque 6: Tecnología en la Producción Turística y Servicios Gastronómicos (36 - 40)
  {
    id: 36,
    block: 6,
    blockName: "Tecnología en la Producción Turística y Servicios Gastronómicos",
    difficulty: "Básica",
    competencia: "Interpretación y Análisis de Información",
    stem: "En el sector del turismo y la gastronomía receptiva, la implementación de códigos QR dinámicos en las mesas y menús web interactivos tiene como ventaja técnica:",
    options: {
      A: "Reemplazar por completo el pago de tributos municipales.",
      B: "Facilitar la consulta en tiempo real de la oferta, actualizar precios de manera inmediata y ofrecer información multilingüe a visitantes foráneos.",
      C: "Obligar a que los turistas contraten un seguro de viaje internacional.",
      D: "Aumentar el costo variable unitario de los ingredientes frescos."
    },
    correct: "B",
    justification: "La digitalización del menú mediante códigos QR optimiza la gestión operativa, reduce costos de impresión y amplía la accesibilidad para comensales y turistas."
  },
  {
    id: 37,
    block: 6,
    blockName: "Tecnología en la Producción Turística y Servicios Gastronómicos",
    difficulty: "Media",
    competencia: "Interpretación y Análisis de Información",
    stem: "Un sistema de Punto de Venta (POS/TPV) conectado a la nube en una empresa de servicios turísticos o de alimentos permite:",
    options: {
      A: "Calcular automáticamente el tiempo de digestión de cada cliente.",
      B: "Integrar el control de comandas, registrar el flujo de ingresos en tiempo real y actualizar el inventario de materias primas con cada transacción.",
      C: "Eximir al negocio de cumplir con los principios administrativos de Fayol.",
      D: "Eliminar la necesidad de limpiar las instalaciones del local."
    },
    correct: "B",
    justification: "Los sistemas POS modernos automatizan el cruce entre órdenes vendidas, inventario de insumos en bodega y balances de caja diarios."
  },
  {
    id: 38,
    block: 6,
    blockName: "Tecnología en la Producción Turística y Servicios Gastronómicos",
    difficulty: "Media",
    competencia: "Argumentación y Toma de Decisiones",
    stem: "Las plataformas de geolocalización y recomendación turística (como Google Maps y TripAdvisor) inciden directamente en la atracción de clientes a los restaurantes locales porque:",
    options: {
      A: "Bloquean el acceso de turistas que no hablen el idioma nativo.",
      B: "Permiten que los viajeros descubran establecimientos cercanos mediante opiniones, calificaciones reales y fotos de otros usuarios.",
      C: "Convierten automáticamente al restaurante en una Sociedad Anónima Abierta.",
      D: "Fijan por ley el precio de los platos típicos en las regiones."
    },
    correct: "B",
    justification: "La reputación digital y la visibilidad geolocalizada son factores decisivos para que los visitantes elijan dónde consumir en una localidad."
  },
  {
    id: 39,
    block: 6,
    blockName: "Tecnología en la Producción Turística y Servicios Gastronómicos",
    difficulty: "Avanzada",
    competencia: "Solución de Problemas Operativos",
    stem: "Un grupo de visitantes llega a un establecimiento gastronómico turístico y no dispone de dinero en efectivo en moneda local. Si el negocio cuenta con datáfono inalámbrico y pagos interoperables mediante billeteras móviles (QR, transferencias inmediatas), el beneficio empresarial directo es:",
    options: {
      A: "La pérdida de control sobre los ingresos del día.",
      B: "La reducción de la barrera de transacción, evitando la pérdida de ventas y mejorando la satisfacción del visitante.",
      C: "El aumento desmedido de los costos fijos por nómina.",
      D: "La nulidad del contrato de arrendamiento comercial."
    },
    correct: "B",
    justification: "La adopción de pasarelas y pagos electrónicos dinamiza el consumo de turistas y elimina la fricción de depender exclusivamente de efectivo."
  },
  {
    id: 40,
    block: 6,
    blockName: "Tecnología en la Producción Turística y Servicios Gastronómicos",
    difficulty: "Avanzada",
    competencia: "Argumentación y Toma de Decisiones",
    stem: "La incorporación de software de gestión y analítica de datos en negocios turísticos y gastronómicos contribuye a la sostenibilidad del emprendimiento porque:",
    options: {
      A: "Permite predecir patrones de demanda por temporadas, planificar compras de insumos para reducir desperdicios y personalizar la experiencia del cliente.",
      B: "Sustituye la función de la Cámara de Comercio en el registro mercantil.",
      C: "Hace innecesario contar con un manual de funciones o perfiles de cargo.",
      D: "Garantiza que el punto de equilibrio siempre sea igual a cero unidades."
    },
    correct: "A",
    justification: "La toma de decisiones basada en datos ayuda a anticipar la afluencia turística, minimiza mermas de comida perecedera y maximiza la rentabilidad del negocio."
  }
];
