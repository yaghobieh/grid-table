import type { TranslationStrings } from './types';

export const en: TranslationStrings = {
  nav: {
    demos: 'Demos',
    playground: 'Playground',
    themeBuilder: 'Theme Builder',
    docs: 'Docs',
    api: 'API',
    changelog: 'Changelog',
    getStarted: 'Get Started',
    gridTable: 'Grid Table',
    toggleTheme: 'Toggle theme',
    language: 'Language',
  },

  home: {
    badgeText: 'Mobile Scroll Table, Softer Hover, Portal Polish',
    title: 'Grid Table',
    subtitle: 'The React Data Grid for ForgeStack',
    typewriterTexts: [
      'Mobile scroll table, stacked layout opt-in, calmer hover.',
      'Finance dashboards & HR org charts.',
      'Drag & drop, resize, row selection.',
      'Fully customizable via props.',
      'Zero dependencies. 100% TypeScript.',
    ],
    viewDemos: 'View Demos',
    documentation: 'Documentation',
    themeBuilder: 'Theme Builder',
    seeItInAction: 'See It in Action',
    seeItDescription: 'From finance dashboards to HR org charts — Grid Table handles any data scenario.',
    interactivePreview: 'Interactive demo preview',
    launchFinanceDemo: 'Launch Finance Demo',
    demosAndExamples: 'Demos & Examples',
    exploreExamples: 'Explore real-world scenarios powered by Grid Table.',
    clickToLaunch: 'Click to launch →',
    everythingYouNeed: 'Everything You Need',
    featureRichDataGrid: 'Feature-Rich Data Grid',
    builtForReal: 'Built for real-world applications — every feature is customizable via props.',
    forgeStackEcosystem: 'ForgeStack Ecosystem',
    worksWith: 'Part of the Full ForgeStack',
    showcaseTitle: 'Built for Every Data Scenario',
    showcaseDescription: 'Finance, HR, effects, lazy loading — everything in one powerful grid.',
    showcase: {
      finance: { title: 'Finance Mode', description: 'Real-time tickers, sparklines, live P&L — data that never sleeps.' },
      hr: { title: 'HR & Tree Data', description: 'Org charts, expand/collapse, hierarchy — visualize your organization.' },
      effects: { title: 'Table Effects', description: 'Sort animations, row entry, hover accents — configurable via tableEffects prop.' },
      lazyLoad: { title: 'Lazy Loading', description: 'Infinite scroll, batch loading, skeleton loaders — handle 100k+ rows.' },
    },
    demoPreview: {
      finance: 'AAPL +2.34%  ·  MSFT −0.12%  ·  GOOG +1.87%',
      hr: 'CEO → VP Eng → Sr. Dev → Jr. Dev',
      basic: 'Sort · Filter · Paginate · Select · Drag',
      themeBuilder: '🎨  bg · accent · border · radius',
    },
    viewLive: 'View Live →',
    ecosystemBanner: 'Fully compatible with the entire ForgeStack ecosystem.',
    visitForgeStack: 'Visit ForgeStack',
    marqueeItems: [
      'Manual server pagination & effectiveTotalItems',
      'Mobile scroll table by default · stacked layout optional',
      'lazyLoad batches for long scroll regions',
      'MIT · @forgedevstack/grid-table · TypeScript-first',
    ],
  },

  stats: {
    features: 'Features',
    dependencies: 'Dependencies',
    bundleSize: 'Bundle Size',
    typescript: 'TypeScript',
  },

  features: {
    sort: { title: 'Sort Animations', description: 'Smooth animated transitions when sorting columns — arrow rotation, column highlight, and flash effects.' },
    tree: { title: 'Tree Data', description: 'Hierarchical data with expand/collapse, indentation levels, and parent-child relationships.' },
    filter: { title: 'Advanced Filtering', description: 'Column-level and global filtering with 12+ operators, custom filter functions, and filter panel.' },
    drag: { title: 'Drag & Drop', description: 'Reorder columns by dragging, with visual feedback and threshold to prevent accidental moves.' },
    theme: { title: 'Theme Builder', description: 'Customize every aspect — colors, fonts, spacing, borders. Export ready-to-use code.' },
    responsive: { title: 'Responsive Design', description: 'Default horizontal scroll keeps the full table; use mobileLayout="stacked" for cards. Drawer for filters on small screens.' },
    selection: { title: 'Row Selection', description: 'Single and multi-select with checkboxes, select-all, and indeterminate state.' },
    pagination: { title: 'Pagination', description: 'Built-in pagination with customizable page sizes, first/last buttons.' },
    resize: { title: 'Column Resize', description: 'Drag column edges to resize with min/max width constraints.' },
    expand: { title: 'Row Expansion', description: 'Expand rows to show detailed content with custom render functions.' },
    skeleton: { title: 'Skeleton Loading', description: 'Beautiful animated loading placeholder that matches table structure.' },
    typescript: { title: 'Full TypeScript', description: 'Generic type support, strict type checking, and exported type definitions.' },
  },

  demos: {
    finance: { title: 'Finance', description: 'Live-updating financial data with P&L, sparklines, and real-time tickers.' },
    hr: { title: 'HR / Org Chart', description: 'Hierarchical employee data with tree view, expand/collapse, and reporting lines.' },
    basic: { title: 'Basic Table', description: 'Full-featured grid with sorting, filtering, pagination, and row selection.' },
    features: {
      title: 'New Features',
      description:
        'Context menu, status bar, export, keyboard navigation, row reorder, tree data, undo/redo, frozen rows, print mode. On narrow screens the grid defaults to horizontal scroll; use the stacked mobile layout only when you want card-style rows.',
    },
    'theme-playground': { title: 'Theme & Playground', description: 'Theme Builder plus Playground in one hub with copy-ready setup.' },
    accessibility: { title: 'Accessibility', description: 'Keyboard navigation, focus, and screen reader friendly patterns.' },
    'master-detail': {
      title: 'Master–detail',
      description:
        'Use enableRowExpansion with renderRowExpansion to embed nested line items, previews, or a second grid.',
    },
    'persisted-state': {
      title: 'Persisted pagination',
      description:
        'Page and page size are restored from localStorage on load and updated on every change. Extend the same pattern to URL query params or your backend user settings.',
    },
    'server-driven': {
      title: 'Server-driven paging',
      description:
        'Pass only the current page in data, set manualPagination and totalRowCount, and refetch inside onPageChange. Sorting and filtering for full datasets should be applied on the server in production.',
    },
    'column-grouping': {
      title: 'Column grouping band',
      description:
        'Two header tiers: a decorative band row (regions, quarters, KPI groups) lines up with real columns below via CSS grid—no native colspan yet, but reads like enterprise grids.',
    },
    virtualization: {
      title: 'Large lists & lazy load',
      description: 'Thousands of rows in memory with lazyLoad revealing scroll batches—tune initialRows, batchSize, and maxHeight.',
    },
    themeBuilder: { title: 'Theme Builder', description: 'Customize every color, font, and spacing — export code for your project.' },
  },

  tags: {
    popular: 'Popular',
    new: 'New',
    interactive: 'Interactive',
    guide: 'Guide',
    pattern: 'Pattern',
  },

  footer: {
    partOfForgeStack: 'Part of ForgeStack',
    mitLicense: 'MIT License',
    builtWith: 'Built with',
    ecosystemText: 'Grid Table, Bear UI, Harbor, Synapse, Compass, Relay, Crucible, and Forge CLI are part of the',
  },

  themeBuilderPage: {
    title: 'Theme Builder',
    description: 'Customize every color, font, and spacing. Preview live and export ready-to-use code.',
    presets: 'Presets',
    colors: 'Colors',
    layout: 'Layout',
    background: 'Background',
    foreground: 'Foreground',
    accent: 'Accent',
    border: 'Border',
    headerBg: 'Header BG',
    headerText: 'Header Text',
    rowHover: 'Row Hover',
    fontSize: 'Font Size',
    radius: 'Radius',
    spacing: 'Spacing',
    stripedRows: 'Striped Rows',
    mode: 'Mode',
    dark: 'Dark',
    light: 'Light',
    livePreview: 'Live Preview',
    exportCode: 'Export Code',
    hideCode: 'Hide Code',
  },

  docsPage: {
    documentation: 'Documentation',
    pageNotFound: 'Page Not Found',
    pageNotFoundDesc: 'The documentation page doesn\'t exist.',
    goToGettingStarted: 'Go to Getting Started',
    apiReference: 'API Reference',
    apiDescription: 'Complete reference for all Grid Table props, column definitions, and hooks.',
    selectSection: 'Select Section',
    prop: 'Prop',
    type: 'Type',
    default: 'Default',
    description: 'Description',
    required: 'required',
  },

  financeDemo: {
    title: 'Finance Dashboard',
    description: 'Live-updating stock data with sparklines, P/E ratios, and 52-week ranges.',
    live: 'LIVE',
    pause: 'Pause',
    resume: 'Resume',
    refresh: 'Refresh',
  },

  hrDemo: {
    title: 'HR / Org Chart',
    description: 'Hierarchical employee data with tree view, expand/collapse, and reporting lines.',
    expandAll: 'Expand All',
    collapseAll: 'Collapse All',
    employees: 'employees',
  },

  basicDemo: {
    title: 'Basic Table',
    description: 'Full-featured grid with sorting, filtering, pagination, drag & drop, and row selection.',
    mobileHint: 'Below desktop width this demo uses mobileLayout="stacked" (card rows). Resize the window or use device mode to compare with the default horizontal-scroll table.',
    testLoading: 'Test Loading',
    rows: 'rows',
  },

  featuresDemo: {
    badge: 'v1.0.8 Portal + Grid',
    title: 'Feature showcase (v1.0.7 stack + v1.0.8 mobile)',
    description:
      'Context menu, status bar, export, keyboard navigation, row reorder, tree data, undo/redo, frozen rows, print mode. On narrow screens the grid defaults to horizontal scroll; use the stacked mobile layout only when you want card-style rows.',
    sections: [
      {
        title: 'Context Menu, Status Bar & Export',
        description: 'Right-click any cell for quick actions. Footer shows row count and aggregations. Export to CSV, Excel, JSON, or PDF.',
      },
      {
        title: 'Row Reorder, Undo/Redo & Keyboard Navigation',
        description:
          'Drag rows to reorder. Edit cells inline with undo/redo (Ctrl+Z/Y). Navigate with arrow keys, Enter to edit, Escape to cancel.',
      },
      {
        title: 'Tree Data — Hierarchical Rows',
        description: 'Render nested data with expand/collapse toggle arrows and automatic indentation.',
      },
      {
        title: 'Frozen Rows & Print Mode',
        description: 'Pin summary rows to the bottom of the table. Click the print icon in the toolbar to generate a styled printable view.',
      },
    ],
  },

  accessibilityDemo: {
    badge: 'A11y',
    title: 'Accessibility',
    description:
      'Grid Table exposes roles on the table shell, supports keyboard navigation between cells, Enter to edit, and Escape to cancel. Pair with visible focus rings in your global CSS and test with VoiceOver or NVDA.',
    bullets: [
      'Enable keyboardNavigation for arrow keys, Home, End, PageUp, PageDown.',
      'Keep filter and toolbar actions as real button elements (Bear handles this).',
      'Do not remove focus outlines without replacing them with a high-contrast custom ring.',
      'For row expansion, ensure the expand control has an accessible name (toggle state in your copy).',
    ],
  },

  themePlaygroundPage: {
    title: 'Theme Builder & Playground',
    description:
      'Customise tokens in the Theme Builder, then reproduce props in code. Use the Playground to toggle features and copy the generated GridTable snippet.',
    cardThemeTitle: 'Theme Builder',
    cardThemeDescription: 'Colours, typography, spacing — export Bear-compatible theme objects.',
    cardThemeCta: 'Open Theme Builder →',
    cardPlayTitle: 'Playground',
    cardPlayDescription: 'Live prop switches with copy-ready JSX for your app.',
    cardPlayCta: 'Open Playground →',
  },

  demoCodeTitles: {
    basic: 'Copy — full-featured grid sketch',
    features: 'Copy — products grid (context menu, status bar, export, frozen row)',
    finance: 'Copy — finance-style grid (calmer hover)',
    hr: 'Copy — HR grid pattern (custom expand; or use treeData)',
    accessibility: 'Copy — keyboard navigation + editing',
    masterDetail: 'Copy — expansion renderer',
    persisted: 'Copy — save page in localStorage',
    server: 'Copy — manual pagination pattern',
    columnGrouping: 'Copy — grouped header band',
    virtualization: 'Copy — lazyLoad + options',
    themePlayground: 'Copy — integration sketch',
  },

  demosIndex: {
    title: 'Demos & Examples',
    description: 'Explore interactive demos showcasing Grid Table in real-world scenarios — from finance dashboards to HR org charts.',
    viewDemo: 'View Demo',
    whatsNew: "What's in",
    seeAllFeatures: 'See all features in action',
    releaseHighlights: [
      'v1.0.8 — manualPagination + totalRowCount; server-driven demo; loading/hooks fix; Forge Compass history-friendly nav',
      'Theme & Playground hub merges theme tokens and live prop playground',
      'mobileLayout default horizontal scroll; stacked optional for card-style rows',
      'Softer tableEffects.hover accent',
      'Demos: accessibility, master–detail, persisted pagination, server paging, grouping band, lazy lists',
    ],
  },

  virtualizationDemo: {
    title: 'Large lists & lazy load',
    lead: 'This sample keeps 500 rows in memory while lazyLoad reveals them in scroll batches. Adjust presets or numbers, disable lazyLoad to load all rows at once, then use the tour to walk the UI.',
    presets: 'Presets',
    presetDense: 'Dense (fast reveal)',
    presetDefault: 'Default',
    presetHeavy: 'Heavy batches',
    initialRows: 'initialRows',
    batchSize: 'batchSize',
    maxHeight: 'maxHeight (px)',
    lazyEnabled: 'lazyLoad.enabled',
    startTour: 'Tour controls',
    tourToolbarTitle: 'Lazy-load settings',
    tourToolbarBody: 'Switch presets or edit numbers. Smaller batches feel snappier; larger ones mean fewer reveals while scrolling.',
    tourGridTitle: 'Scroll the body',
    tourGridBody: 'Only loaded rows render; scroll down to pull in the next batch until all rows are mounted.',
  },

  changelog: {
    title: 'Changelog',
    description: 'Every release, every improvement — tracked here.',
    latest: 'Latest',
  },

  playground: {
    title: 'Playground',
    description: 'Toggle props, effects, and themes — see the result live.',
    props: 'Props',
    effects: 'Effects',
    theme: 'Theme',
    reset: 'Reset to Defaults',
    generatedCode: 'Generated Code',
    livePreview: 'Live Preview',
  },

  common: {
    demos: 'Demos',
    back: 'Back',
    modeLabel: 'mode',
  },
};
