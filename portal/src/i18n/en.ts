import type { TranslationStrings } from './types';

export const en: TranslationStrings = {
  nav: {
    demos: 'Demos',
    playground: 'Playground',
    themeBuilder: 'Theme Builder',
    docs: 'Docs',
    api: 'API',
    changelog: 'Changelog',
    skills: 'Skills',
    getStarted: 'Get Started',
    gridTable: 'Grid Table',
    toggleTheme: 'Toggle theme',
    language: 'Language',
  },

  home: {
    badgeText: 'Saved Views, Filter Builder, Row Groups, Formulas, Virtualization',
    title: 'Grid Table',
    subtitle: 'The React Data Grid for ForgeStack',
    typewriterTexts: [
      'Pinned row groups, formula engine, saved views, advanced filter builder.',
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
    showcaseTitle: 'See it play',
    showcaseDescription: 'Pivot, group, comment, and fill — 1.1.5 in motion.',
    trailerTitle: 'Grid Table 1.1.5',
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
      'Pinned row groups · formula engine · saved views · advanced filter builder',
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
    'pinned-row-groups': {
      title: 'Pinned Row Groups + Aggregate Footers',
      description:
        'Group detail rows by a field, auto-build sum/avg footers per group, and pin those subtotal rows at the bottom of the scroll viewport.',
    },
    'column-formula-engine': {
      title: 'Column Formula Engine',
      description: 'Define computed columns from formulas for profit, margin, and derived KPIs.',
    },
    'saved-views': {
      title: 'Saved Views',
      description: 'Save and restore sorting, filtering, visibility, and pagination as named presets.',
    },
    'advanced-filter-builder': {
      title: 'Advanced Filter Builder',
      description: 'Create nested AND/OR filter rules with reusable groups.',
    },
    'column-grouping': {
      title: 'Column group headers',
      description:
        'Native multi-row colspan headers via columnGroups + alignColumnGroups — Catalog and Performance groups span their child columns.',
    },
    'release-1-1-5': {
      title: '1.1.5 features',
      description:
        'Pivot-lite, group drop-zone, cell comments, row height, cell span, Bear density, RTL, and range/fill announcements.',
    },
    'touch-gestures': {
      title: 'Touch gestures',
      description: 'Swipe actions and long-press context menu, plus how to simulate them on a desktop pointer.',
    },
    'release-1-1-4': {
      title: '1.1.4 features',
      description:
        'Divider autosize, autosize-all, size-to-fit, filter chips, column menu, column chooser, floating filters, cut, fill series, find, and set-filter search.',
    },
    'enterprise-grid': {
      title: 'Enterprise grid',
      description:
        'Range selection, fill handle, set/date filters, exportScope, flash cells, applyTransaction, and touch swipe / long-press context menu.',
    },
    'infinite-scroll': {
      title: 'Infinite scroll (SSRM)',
      description:
        'Block-loading infinite scroll with onLoadBlock — distinct from lazyLoad, virtualize, and manualPagination.',
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
    badge: 'v1.1.4',
    title: 'Feature showcase',
    description:
      'Interactive grids for context menu, status bar, export, keyboard navigation, row reorder, tree data, undo/redo, frozen rows, and print. Dedicated demos cover 1.1.x enterprise APIs.',
    relatedTitle: 'Explore dedicated demos',
    relatedDescription: 'Shipped 1.1.x surfaces live on their own routes — open them instead of treating them as “planned”.',
    relatedLinks: {
      'release-1-1-4': {
        title: '1.1.4 features',
        summary: 'Autosize, chips, column menu/chooser, floating filters, cut, fill series, find, set-filter search.',
      },
      'enterprise-grid': {
        title: 'Enterprise grid',
        summary: 'Range copy/paste, Shift+Arrows, Tab edit, fill handle, exportScope, flash cells, touch gestures.',
      },
      'infinite-scroll': {
        title: 'Infinite scroll (SSRM)',
        summary: 'Block loading with onLoadBlock — separate from lazyLoad and virtualize.',
      },
      'pinned-row-groups': {
        title: 'Pinned row groups',
        summary: 'Group-by headers and aggregate footers pinned while scrolling.',
      },
      'saved-views': {
        title: 'Saved views',
        summary: 'Named presets for sort, filters, columns, and density.',
      },
    },
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

  release114Demo: {
    title: '1.1.4 feature lab',
    description:
      'Local package link — try the new 1.1.4 surfaces on this grid. Portal resolves @forgedevstack/grid-table from the library source.',
    bullets: [
      'Double-click a column divider, or use Autosize all / Size to fit in the toolbar.',
      'Filter Region or Status (search inside the set list). Chips appear above the grid.',
      'Header ⋮ menu: autosize, pin, hide. Columns button toggles visibility.',
      'Floating filter row under headers. Ctrl/Cmd+F focuses find.',
      'Select Qty cells and drag the fill handle for 10, 20, 30… Cut with Ctrl/Cmd+X.',
    ],
  },

  enterpriseGridDemo: {
    title: 'Enterprise grid',
    description:
      'Drag to select a range; copy with Ctrl/Cmd+C or paste with Ctrl/Cmd+V; Shift+Arrows extend the range; Escape clears it. Tab commits an edit and moves to the next editable cell. Fill down with the corner handle or Ctrl/Cmd+D. Header pin toggles sticky columns. Touch: swipe left for actions, long-press for the context menu.',
    exportScopeLabel: 'exportScope',
    addRow: 'Add row (flash)',
    filtersHint: 'Open a Region/Status column filter for set checkboxes, or Ship date for a from/to range. exportScope="selected" with no rows selected is a no-op.',
    swipeCopy: 'Copy',
    swipeDelete: 'Delete',
    sections: {
      range: {
        title: 'Range, fill handle, filters & export scope',
        description: 'Select cells, copy/paste or fill, then export using the selected scope. Flash cells highlight after edits.',
      },
    },
  },

  infiniteScrollDemo: {
    title: 'Infinite scroll (SSRM)',
    description: 'Scroll to the bottom to load the next block via onLoadBlock. totalRowCount drives how many blocks remain.',
    compareHint:
      'Use infiniteScroll for server block fetches. Prefer lazyLoad when all rows are already in memory, virtualize for windowed DOM, and manualPagination for page buttons.',
    loading: 'Loading next block…',
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
      'Range selection announces size in a live region; fill completes with Ctrl/Cmd+D as the keyboard alternative to the handle.',
    ],
  },

  release115Demo: {
    title: '1.1.5 features',
    description:
      'Group by dropping a header, pivot client-side, leave cell notes, grow row height, and hear range/fill announcements. Switch locale to Hebrew to check RTL.',
    bullets: [
      'Drop Region or Product on the group zone — chips remove a grouping field.',
      'Toggle pivot to cross-tab Region × Quarter with summed Amount (client-side only).',
      'Green corner marks a comment; click to edit. Notes wrap with auto row height.',
      'Select a range — a live region announces the cell count. Fill with Ctrl/Cmd+D.',
    ],
    pivotToggle: 'Pivot-lite',
  },

  touchGesturesDemo: {
    title: 'Touch gestures',
    description:
      'Swipe a row to reveal actions. Long-press opens the context menu. On desktop, open DevTools device mode or use a pointer that sends touch events.',
    steps: [
      'Chrome: DevTools → Toggle device toolbar → pick a phone → swipe the row left.',
      'Safari: Develop → Enter Responsive Design Mode, then drag with a touch simulation.',
      'Long-press (~500ms) on a row to open the same context menu as right-click.',
      'Enterprise demo also ships swipe + long-press; this route is the focused QA walkthrough.',
    ],
    swipeCopy: 'Copy',
    swipeDelete: 'Delete',
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
    columnGrouping: 'Copy — columnGroups + alignColumnGroups',
    virtualization: 'Copy — lazyLoad + options',
    themePlayground: 'Copy — integration sketch',
    enterpriseGrid: 'Copy — enterprise grid (range, fill, exportScope)',
    infiniteScroll: 'Copy — infiniteScroll block loading',
    release114: 'Copy — 1.1.4 features (autosize, chips, cut, series)',
    release115: 'Copy — 1.1.5 features (pivot, groups, comments)',
    touchGestures: 'Copy — touch gestures',
  },

  demosIndex: {
    title: 'Demos & Examples',
    description: 'Explore interactive demos showcasing Grid Table in real-world scenarios — from finance dashboards to HR org charts.',
    viewDemo: 'View Demo',
    whatsNew: "What's in",
    seeAllFeatures: 'See all features in action',
    releaseHighlights: [
      'v1.1.4 — Double-click column divider autosize; fill handle stays aligned with virtualize',
      'Ctrl/Cmd+C copies selected range; Escape clears; header pin without right-click',
      'Export respects column order/hidden columns; empty selected scope is a no-op',
      'Enterprise demo updated for keyboard range + edit UX',
      'docs/GRID_TABLE_DOCS.md and changelog for 1.1.3',
    ],
  },

  savedViewsDemo: {
    title: 'Saved Views',
    description: 'Switch named presets that restore sort, filters, hidden columns, and density.',
  },

  advancedFilterDemo: {
    title: 'Advanced Filter Builder',
    description: 'Build nested AND/OR rules with the built-in FilterBuilder panel.',
  },

  pinnedRowGroupsDemo: {
    title: 'Pinned Row Groups + Aggregate Footers',
    description:
      'Pass rowGroups with by, footer (e.g. sum:amount), and pinned: true. Detail rows scroll normally; the grid synthesizes one footer row per group (Finance Total, Marketing Total) and keeps them fixed at the bottom of the table body. This is different from the status bar grand total below the grid.',
    explainerTitle: 'What you are seeing',
    explainerItems: [
      'Detail rows are grouped by the group column — Finance, Marketing, Operations.',
      'Footer rows are generated by the grid, not present in your source data.',
      'Finance Total / Marketing Total / Operations Total sum amount for each group.',
      'Scroll the table — pinned footers stay visible at the bottom of the scroll area.',
      'Click group header rows (Finance, Marketing, Operations) to collapse or expand child rows.',
      'Status bar Total Amount is the grand total across all detail rows.',
    ],
    scrollHint: 'Tip: scroll inside the grid body to see pinned footers stay put while detail rows move.',
  },

  formulaDemo: {
    title: 'Column Formula Engine',
    description: 'Computed columns recalculate from source fields using safe formula expressions.',
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
    virtualizeEnabled: 'virtualize (window)',
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
    versions: {
      '1.1.5': {
        highlights: [
          'Pivot-lite: client-side row × column aggregations (sum/avg/count/min/max)',
          'Drag a header onto the group drop-zone; chips remove grouping fields',
          'Cell comments, auto/resizable row height, and optional col/row span',
          'Bear density when density is omitted; RTL polish for swipe, pins, and fill handle',
          'Range/fill live region + Ctrl/Cmd+D; dedicated touch-gestures demo',
        ],
      },
      '1.1.4': {
        highlights: [
          'Double-click the header resize divider to fit the longest header or cell string',
          'Autosize all, size-to-fit, filter chips, header column menu, and column chooser',
          'Floating filters, Ctrl/Cmd+F find, set-filter search, range cut, numeric fill series',
          'Fill handle with virtualize writes the correct absolute rows after scroll',
          'Portal demo at /demos/release-1-1-4',
        ],
      },
      '1.1.3': {
        highlights: [
          'Fix virtualize to render sliced bodyRows with absolute row index offset',
          'Range copy (Ctrl/Cmd+C), Shift+Arrows extend range, Escape clears selection',
          'Cell edit Tab commit/move + select-on-focus; header pin control + pin-edge shadows',
          'Export respects column order/hidden columns; empty selected scope is a no-op',
          'Portal enterprise demo + docs updated for 1.1.3',
        ],
      },
      '1.1.2': {
        highlights: [
          'Fill handle + Ctrl/Cmd+D fill-down for range selection with enableCellEdit',
          'Touch gestures: swipeActions reveal row actions; longPressContextMenu opens context menu',
          'Portal: enterprise grid + infinite scroll demos; column grouping uses real colspan',
          'API reference documents filterType set/date and 1.1.x hooks',
          'Playwright interaction smoke for range, set filter, and exportScope',
        ],
      },
      '1.1.1': {
        highlights: [
          'exportScope — control export/copy/print rows: all, filtered, sorted, or selected',
          'Set & date column filters, expandable row groups, range selection + clipboard paste',
          'Infinite scroll (SSRM-style), multi-row column group headers, flash cells, applyTransaction',
          'Saved view URL sync, Skills page, Husky pre-commit + Playwright portal sanity',
          'Docs for enterprise grid features; pinned row groups demo with collapsible headers',
        ],
      },
      '1.1.0': {
        highlights: [
          'Saved views — named presets for sort, filters, columns, pagination, density',
          'Advanced filter builder — nested AND/OR rules with FilterBuilder panel',
          'Pinned row groups — group-by field with aggregate footers pinned at bottom',
          'Column formula engine — computed columns from safe expressions',
          'Window virtualization — virtualize prop renders visible rows only',
          'Column groups, conditional format, master-detail API, density, column persistence',
        ],
      },
      '1.0.9': {
        highlights: [
          'mobileLayout — horizontal scroll table by default on small screens; stacked layout optional',
          'manualPagination + totalRowCount for server-driven slices; fix loading/hooks order in GridTableContent',
          'Portal: Theme & Playground hub, new demos, Advanced patterns doc, copy-ready demo code',
          'Softer tableEffects hover; toolbar icons sized for touch; Forge Compass popstate fix',
        ],
      },
      '1.0.7': {
        highlights: [
          'Keyboard navigation — arrow keys, Tab, Enter, Escape, Home/End, PageUp/Down',
          'Context menu — right-click for copy, filter, pin, hide with custom actions',
          'Tree data — hierarchical rows with expand/collapse and indentation',
          'Status bar — row count, selected count, and aggregations (sum, avg, min, max)',
          'Row reordering, Excel/PDF export, copy to clipboard, undo/redo, column pinning, frozen rows, print mode',
        ],
      },
      '1.0.6': {
        highlights: [
          'Cell editing with inline validation',
          'CSV and JSON export',
          'Interactive Playground with live code generation',
          'Cmd+K search modal across docs and demos',
          'Changelog page, table effects, lazy load, Finance & HR demos, Theme Builder, i18n',
        ],
      },
      '1.0.2': {
        highlights: [
          'Migrated from Tailwind CSS to SCSS',
          'Zero-config styling — compiled CSS included',
          'Fixed package.json exports order',
        ],
      },
      '1.0.1': {
        highlights: ['Initial npm publication with @forgedevstack scope'],
      },
      '1.0.0': {
        highlights: [
          'Initial release',
          'Sorting, filtering, pagination',
          'Drag & drop columns, resize',
          'Row selection, row expansion',
          'Mobile responsive drawer',
          'Dark/light theme, skeleton loading',
        ],
      },
    },
  },

  skillsPage: {
    badge: 'Cursor Agents',
    title: 'Skills',
    description: 'Give your AI assistant deep knowledge of Grid Table patterns, portal demos, and release workflows.',
    installTitle: 'Install',
    installDescription: 'Grid Table skills ship inside the repo under grid-table/.cursor/skills/. Open the project in Cursor — skills activate when you reference them or use /grid-table-code-review.',
    includedTitle: 'What\'s included',
    examplesTitle: 'Example prompts',
    copy: 'Copy',
    copied: 'Copied!',
    copyFor: 'Copy for',
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
