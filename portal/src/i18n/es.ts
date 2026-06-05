import type { TranslationStrings } from './types';

export const es: TranslationStrings = {
  nav: {
    demos: 'Demos',
    playground: 'Playground',
    themeBuilder: 'Constructor de Temas',
    docs: 'Documentación',
    api: 'API',
    changelog: 'Cambios',
    getStarted: 'Comenzar',
    gridTable: 'Grid Table',
    toggleTheme: 'Cambiar tema',
    language: 'Idioma',
  },

  home: {
    badgeText: 'Vistas guardadas, filtros, grupos, fórmulas, virtualización',
    title: 'Grid Table',
    subtitle: 'El Data Grid de React para ForgeStack',
    typewriterTexts: [
      'Tabla con scroll móvil, diseño apilado opcional, hover más suave.',
      'Paneles financieros y organigramas de RRHH.',
      'Arrastrar y soltar, redimensionar, selección de filas.',
      'Totalmente personalizable vía props.',
      'Sin dependencias. 100% TypeScript.',
    ],
    viewDemos: 'Ver Demos',
    documentation: 'Documentación',
    themeBuilder: 'Constructor de Temas',
    seeItInAction: 'Véalo en Acción',
    seeItDescription: 'Desde paneles financieros hasta organigramas — Grid Table maneja cualquier escenario de datos.',
    interactivePreview: 'Vista previa interactiva',
    launchFinanceDemo: 'Abrir Demo Financiero',
    demosAndExamples: 'Demos y Ejemplos',
    exploreExamples: 'Escenarios reales impulsados por Grid Table.',
    clickToLaunch: 'Clic para abrir →',
    everythingYouNeed: 'Todo lo que Necesitas',
    featureRichDataGrid: 'Data Grid Completo',
    builtForReal: 'Construido para aplicaciones reales — cada función es personalizable vía props.',
    forgeStackEcosystem: 'Ecosistema ForgeStack',
    worksWith: 'Parte del ForgeStack Completo',
    showcaseTitle: 'Diseñado para Cada Escenario de Datos',
    showcaseDescription: 'Finanzas, RRHH, efectos, carga diferida — todo en un solo grid poderoso.',
    showcase: {
      finance: { title: 'Modo Finanzas', description: 'Cotizaciones en tiempo real, gráficos, P&L en vivo — datos que nunca duermen.' },
      hr: { title: 'RRHH y Datos Jerárquicos', description: 'Organigramas, expandir/contraer, jerarquía — visualiza tu organización.' },
      effects: { title: 'Efectos de Tabla', description: 'Animaciones de orden, entrada de filas, acentos hover — configurable vía tableEffects.' },
      lazyLoad: { title: 'Carga Diferida', description: 'Scroll infinito, carga por lotes, esqueletos — maneja 100k+ filas.' },
    },
    demoPreview: {
      finance: 'AAPL +2.34%  ·  MSFT −0.12%  ·  GOOG +1.87%',
      hr: 'CEO → VP Ing → Sr. Dev → Jr. Dev',
      basic: 'Ordenar · Filtrar · Paginar · Seleccionar · Arrastrar',
      themeBuilder: '🎨  fondo · acento · borde · radio',
    },
    viewLive: 'Ver en Vivo →',
    ecosystemBanner: 'Totalmente compatible con todo el ecosistema ForgeStack.',
    visitForgeStack: 'Visitar ForgeStack',
    marqueeItems: [
      'Paginación manual en servidor y effectiveTotalItems',
      'Tabla con scroll móvil por defecto · apilado opcional',
      'lazyLoad por lotes en regiones largas',
      'MIT · @forgedevstack/grid-table · TypeScript primero',
    ],
  },

  stats: {
    features: 'Funciones',
    dependencies: 'Dependencias',
    bundleSize: 'Tamaño',
    typescript: 'TypeScript',
  },

  features: {
    sort: { title: 'Animaciones de Orden', description: 'Transiciones suaves al ordenar columnas — rotación de flechas, resaltado de columnas y efectos flash.' },
    tree: { title: 'Datos Jerárquicos', description: 'Datos jerárquicos con expandir/contraer, niveles de indentación y relaciones padre-hijo.' },
    filter: { title: 'Filtrado Avanzado', description: 'Filtrado a nivel de columna y global con 12+ operadores, funciones personalizadas y panel de filtros.' },
    drag: { title: 'Arrastrar y Soltar', description: 'Reordena columnas arrastrando, con retroalimentación visual y umbral para prevenir movimientos accidentales.' },
    theme: { title: 'Constructor de Temas', description: 'Personaliza cada aspecto — colores, fuentes, espaciado, bordes. Exporta código listo para usar.' },
    responsive: { title: 'Diseño Responsivo', description: 'Por defecto scroll horizontal mantiene la tabla completa; mobileLayout="stacked" para tarjetas. Cajón de filtros en pantallas pequeñas.' },
    selection: { title: 'Selección de Filas', description: 'Selección simple y múltiple con casillas, seleccionar todo y estado indeterminado.' },
    pagination: { title: 'Paginación', description: 'Paginación incorporada con tamaños de página personalizables, botones de primero/último.' },
    resize: { title: 'Redimensionar Columnas', description: 'Arrastra los bordes de las columnas para redimensionar con restricciones de ancho mín/máx.' },
    expand: { title: 'Expansión de Filas', description: 'Expande filas para mostrar contenido detallado con funciones de renderizado personalizadas.' },
    skeleton: { title: 'Carga Esqueleto', description: 'Hermoso marcador de posición de carga animado que coincide con la estructura de la tabla.' },
    typescript: { title: 'TypeScript Completo', description: 'Soporte de tipos genéricos, verificación de tipos estricta y definiciones de tipos exportadas.' },
  },

  demos: {
    finance: { title: 'Finanzas', description: 'Datos financieros en tiempo real con P&L, gráficos y cotizaciones en vivo.' },
    hr: { title: 'RRHH / Organigrama', description: 'Datos jerárquicos de empleados con vista de árbol, expandir/contraer y líneas de reporte.' },
    basic: { title: 'Tabla Básica', description: 'Tabla completa con ordenamiento, filtrado, paginación y selección de filas.' },
    features: {
      title: 'Novedades',
      description:
        'Menú contextual, barra de estado, exportación, navegación por teclado, reordenar filas, datos en árbol, deshacer/rehacer, filas congeladas, modo impresión. En pantallas estrechas el grid usa scroll horizontal por defecto; el diseño apilado solo si quieres filas tipo tarjeta.',
    },
    'theme-playground': { title: 'Tema y Playground', description: 'Constructor de temas y playground en un solo lugar.' },
    accessibility: { title: 'Accesibilidad', description: 'Navegación por teclado y patrones para lectores de pantalla.' },
    'master-detail': {
      title: 'Maestro-detalle',
      description:
        'Usa enableRowExpansion con renderRowExpansion para incrustar partidas, vistas previas o un segundo grid.',
    },
    'persisted-state': {
      title: 'Paginación persistente',
      description:
        'La página y el tamaño se restauran desde localStorage al cargar y se actualizan en cada cambio. Extiende el mismo patrón a la URL o a preferencias en el backend.',
    },
    'server-driven': {
      title: 'Paginación en servidor',
      description:
        'Pasa solo la página actual en data, activa manualPagination y totalRowCount, y vuelve a pedir datos en onPageChange. Orden y filtros sobre el dataset completo deben aplicarse en el servidor en producción.',
    },
    'column-grouping': {
      title: 'Banda de agrupación de columnas',
      description:
        'Dos niveles de cabecera: una franja visual (regiones, trimestres, KPIs) se alinea con las columnas reales mediante CSS grid—sin colspan nativo aún, pero con aspecto de grid empresarial.',
    },
    virtualization: {
      title: 'Listas grandes y lazy load',
      description: 'Miles de filas en memoria con lazyLoad que revela lotes al scroll—ajusta initialRows, batchSize y maxHeight.',
    },
    themeBuilder: { title: 'Constructor de Temas', description: 'Personaliza cada color, fuente y espaciado — exporta código para tu proyecto.' },
  },

  tags: {
    popular: 'Popular',
    new: 'Nuevo',
    interactive: 'Interactivo',
    guide: 'Guía',
    pattern: 'Patrón',
  },

  footer: {
    partOfForgeStack: 'Parte de ForgeStack',
    mitLicense: 'Licencia MIT',
    builtWith: 'Construido con',
    ecosystemText: 'Grid Table, Bear UI, Harbor, Synapse, Compass, Relay, Crucible y Forge CLI son parte del',
  },

  themeBuilderPage: {
    title: 'Constructor de Temas',
    description: 'Personaliza cada color, fuente y espaciado. Vista previa en vivo y exporta código listo para usar.',
    presets: 'Preajustes',
    colors: 'Colores',
    layout: 'Diseño',
    background: 'Fondo',
    foreground: 'Texto Principal',
    accent: 'Acento',
    border: 'Borde',
    headerBg: 'Fondo Encabezado',
    headerText: 'Texto Encabezado',
    rowHover: 'Hover de Fila',
    fontSize: 'Tamaño de Fuente',
    radius: 'Radio',
    spacing: 'Espaciado',
    stripedRows: 'Filas Rayadas',
    mode: 'Modo',
    dark: 'Oscuro',
    light: 'Claro',
    livePreview: 'Vista Previa',
    exportCode: 'Exportar Código',
    hideCode: 'Ocultar Código',
  },

  docsPage: {
    documentation: 'Documentación',
    pageNotFound: 'Página No Encontrada',
    pageNotFoundDesc: 'La página de documentación no existe.',
    goToGettingStarted: 'Ir a Comenzar',
    apiReference: 'Referencia de API',
    apiDescription: 'Referencia completa para todos los props de Grid Table, definiciones de columnas y hooks.',
    selectSection: 'Seleccionar Sección',
    prop: 'Prop',
    type: 'Tipo',
    default: 'Defecto',
    description: 'Descripción',
    required: 'requerido',
  },

  financeDemo: {
    title: 'Panel Financiero',
    description: 'Datos bursátiles en tiempo real con gráficos, ratios P/E y rangos de 52 semanas.',
    live: 'EN VIVO',
    pause: 'Pausar',
    resume: 'Reanudar',
    refresh: 'Actualizar',
  },

  hrDemo: {
    title: 'RRHH / Organigrama',
    description: 'Datos jerárquicos de empleados con vista de árbol, expandir/contraer y líneas de reporte.',
    expandAll: 'Expandir Todo',
    collapseAll: 'Contraer Todo',
    employees: 'empleados',
  },

  basicDemo: {
    title: 'Tabla Básica',
    description: 'Tabla completa con ordenamiento, filtrado, paginación, arrastrar y soltar, y selección de filas.',
    mobileHint: 'Por debajo del ancho de escritorio este demo usa mobileLayout="stacked" (filas en tarjetas). Redimensiona o usa el modo dispositivo para compararlo con la tabla con scroll horizontal por defecto.',
    testLoading: 'Probar Carga',
    rows: 'filas',
  },

  featuresDemo: {
    badge: 'v1.0.9 Portal + Grid',
    title: 'Escaparate de funciones (móvil + portal v1.0.9)',
    description:
      'Menú contextual, barra de estado, exportación, teclado, reordenar filas, árbol, deshacer/rehacer, filas congeladas, impresión. En pantallas estrechas el grid usa scroll horizontal por defecto.',
    sections: [
      {
        title: 'Menú contextual, barra de estado y exportación',
        description: 'Clic derecho en una celda para acciones rápidas. El pie muestra conteos y agregaciones. Exporta a CSV, Excel, JSON o PDF.',
      },
      {
        title: 'Reordenar filas, deshacer/rehacer y teclado',
        description:
          'Arrastra filas para reordenar. Edita celdas con deshacer/rehacer (Ctrl+Z/Y). Flechas, Enter para editar, Escape para cancelar.',
      },
      {
        title: 'Datos en árbol — filas jerárquicas',
        description: 'Anida datos con flechas expandir/contraer e indentación automática.',
      },
      {
        title: 'Filas congeladas e impresión',
        description: 'Fija filas resumen al fondo. Usa el icono de impresión en la barra para una vista imprimible.',
      },
    ],
  },

  accessibilityDemo: {
    badge: 'A11y',
    title: 'Accesibilidad',
    description:
      'Grid Table expone roles en el contenedor, admite teclado entre celdas, Enter para editar y Escape para cancelar. Añade anillos de foco visibles y prueba con VoiceOver o NVDA.',
    bullets: [
      'Activa keyboardNavigation para flechas, Inicio, Fin, RePág, AvPág.',
      'Mantén filtros y acciones de barra como elementos button (Bear lo cubre).',
      'No quites los contornos de foco sin sustituirlos por un anillo de alto contraste.',
      'En expansión de filas, asegura nombre accesible en el control de expandir.',
    ],
  },

  themePlaygroundPage: {
    title: 'Theme Builder y Playground',
    description:
      'Ajusta tokens en el Theme Builder y luego refleja props en código. Usa el Playground para alternar props y copiar el JSX generado de GridTable.',
    cardThemeTitle: 'Theme Builder',
    cardThemeDescription: 'Colores, tipografía, espaciado — exporta temas compatibles con Bear.',
    cardThemeCta: 'Abrir Theme Builder →',
    cardPlayTitle: 'Playground',
    cardPlayDescription: 'Interruptores de props en vivo con JSX listo para copiar.',
    cardPlayCta: 'Abrir Playground →',
  },

  demoCodeTitles: {
    basic: 'Copiar — boceto de grid completo',
    features: 'Copiar — grid de productos (menú contextual, barra de estado, exportación, fila congelada)',
    finance: 'Copiar — grid estilo finanzas (hover más suave)',
    hr: 'Copiar — patrón RRHH (expandir personalizado; o treeData)',
    accessibility: 'Copiar — teclado + edición',
    masterDetail: 'Copiar — render de expansión',
    persisted: 'Copiar — guardar página en localStorage',
    server: 'Copiar — patrón de paginación manual',
    columnGrouping: 'Copiar — banda de cabecera agrupada',
    virtualization: 'Copiar — lazyLoad + opciones',
    themePlayground: 'Copiar — boceto de integración',
  },

  demosIndex: {
    title: 'Demos y Ejemplos',
    description: 'Explora demos interactivos que muestran Grid Table en escenarios del mundo real — desde paneles financieros hasta organigramas de RRHH.',
    viewDemo: 'Ver Demo',
    whatsNew: 'Novedades de',
    seeAllFeatures: 'Ver todas las funciones en acción',
    releaseHighlights: [
      'v1.0.9 — Mobile Scroll Table, Softer Hover, Portal Polish',
      'Ejemplos añadidos: grupos de filas fijados + pies agregados, fórmulas por columna, vistas guardadas, constructor de filtros avanzado',
      'Hub Tema y Playground reúne tokens y playground de props',
      'mobileLayout con scroll horizontal por defecto; apilado opcional',
      'Hover más suave con tableEffects.hover',
      'Demos: accesibilidad, maestro-detalle, paginación persistida, servidor, banda de grupos, listas perezosas',
    ],
  },

  savedViewsDemo: {
    title: 'Vistas guardadas',
    description: 'Cambia presets con nombre que restauran orden, filtros, columnas ocultas y densidad.',
  },

  advancedFilterDemo: {
    title: 'Constructor de filtros avanzado',
    description: 'Crea reglas AND/OR anidadas con el panel FilterBuilder integrado.',
  },

  pinnedRowGroupsDemo: {
    title: 'Grupos fijados + pies agregados',
    description:
      'Pasa rowGroups con by, footer (p. ej. sum:amount) y pinned: true. Las filas de detalle hacen scroll; la cuadrícula genera un pie por grupo (Finance Total, Marketing Total) y lo fija al fondo del cuerpo. Distinto del total global en la barra de estado.',
    explainerTitle: 'Qué estás viendo',
    explainerItems: [
      'Filas de detalle agrupadas por la columna group — Finance, Marketing, Operations.',
      'Los pies son filas sintéticas generadas por la cuadrícula, no están en tus datos.',
      'Finance Total / Marketing Total / Operations Total suman amount por grupo.',
      'Al hacer scroll, los pies fijados permanecen visibles al fondo del área de scroll.',
      'Total Amount en la barra de estado es el gran total de todas las filas de detalle.',
    ],
    scrollHint: 'Consejo: desplázate dentro del cuerpo de la tabla para ver los pies fijados.',
  },

  formulaDemo: {
    title: 'Motor de fórmulas de columna',
    description: 'Columnas calculadas a partir de campos base con expresiones seguras.',
  },

  virtualizationDemo: {
    title: 'Listas grandes y lazy load',
    lead: 'La muestra mantiene 500 filas en memoria mientras lazyLoad las muestra por lotes al hacer scroll. Cambia preajustes o números, desactiva lazyLoad para cargar todo de golpe, y usa el tour para recorrer la UI.',
    presets: 'Preajustes',
    presetDense: 'Denso (rápido)',
    presetDefault: 'Por defecto',
    presetHeavy: 'Lotes grandes',
    initialRows: 'initialRows',
    batchSize: 'batchSize',
    maxHeight: 'maxHeight (px)',
    lazyEnabled: 'lazyLoad.enabled',
    virtualizeEnabled: 'virtualize (ventana)',
    startTour: 'Tour de controles',
    tourToolbarTitle: 'Ajustes de lazy load',
    tourToolbarBody: 'Cambia preajustes o edita números. Lotes pequeños se sienten más ágiles; los grandes reducen revelados al scroll.',
    tourGridTitle: 'Desplaza el cuerpo',
    tourGridBody: 'Solo las filas cargadas renderizan; baja para traer el siguiente lote hasta montar todas.',
  },

  changelog: {
    title: 'Historial de Cambios',
    description: 'Cada versión, cada mejora — registrada aquí.',
    latest: 'Última',
    versions: {
      '1.1.0': {
        highlights: [
          'Vistas guardadas — presets con orden, filtros, columnas, paginación y densidad',
          'Constructor de filtros avanzado — reglas AND/OR anidadas con FilterBuilder',
          'Grupos de filas fijados — agrupar por campo con pies agregados al fondo',
          'Motor de fórmulas de columna — columnas calculadas con expresiones seguras',
          'Virtualización por ventana — virtualize renderiza solo filas visibles',
          'Grupos de columnas, formato condicional, master-detail, densidad, persistencia',
        ],
      },
      '1.0.9': {
        highlights: [
          'mobileLayout — scroll horizontal por defecto en pantallas pequeñas',
          'manualPagination + totalRowCount para paginación en servidor',
          'Portal: hub Theme & Playground, nuevos demos, documentación de patrones',
          'Hover más suave; iconos táctiles; corrección popstate en Forge Compass',
        ],
      },
      '1.0.7': {
        highlights: [
          'Navegación por teclado',
          'Menú contextual, datos en árbol, barra de estado',
          'Reordenar filas, export Excel/PDF, portapapeles, deshacer/rehacer',
          'Fijar columnas, filas congeladas, modo impresión',
        ],
      },
      '1.0.6': {
        highlights: [
          'Edición de celdas, export CSV/JSON, Playground interactivo',
          'Búsqueda Cmd+K, changelog, efectos, lazy load, demos Finance y HR',
          'Theme Builder e internacionalización',
        ],
      },
      '1.0.2': {
        highlights: ['Migración a SCSS', 'CSS compilado incluido', 'Orden de exports en package.json'],
      },
      '1.0.1': {
        highlights: ['Primera publicación npm con alcance @forgedevstack'],
      },
      '1.0.0': {
        highlights: [
          'Lanzamiento inicial',
          'Ordenar, filtrar, paginar',
          'Arrastrar columnas, redimensionar',
          'Selección y expansión de filas',
          'Drawer móvil, tema claro/oscuro',
        ],
      },
    },
  },

  playground: {
    title: 'Playground',
    description: 'Activa props, efectos y temas — ve el resultado en vivo.',
    props: 'Props',
    effects: 'Efectos',
    theme: 'Tema',
    reset: 'Restaurar valores',
    generatedCode: 'Código Generado',
    livePreview: 'Vista Previa',
  },

  common: {
    demos: 'Demos',
    back: 'Volver',
    modeLabel: 'modo',
  },
};
