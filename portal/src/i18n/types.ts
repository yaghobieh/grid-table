export type Locale = 'en' | 'es' | 'he';

export interface TranslationStrings {
  nav: {
    demos: string;
    playground: string;
    themeBuilder: string;
    docs: string;
    api: string;
    changelog: string;
    skills: string;
    getStarted: string;
    gridTable: string;
    toggleTheme: string;
    language: string;
  };

  home: {
    badgeText: string;
    title: string;
    subtitle: string;
    typewriterTexts: string[];
    viewDemos: string;
    documentation: string;
    themeBuilder: string;
    seeItInAction: string;
    seeItDescription: string;
    interactivePreview: string;
    launchFinanceDemo: string;
    demosAndExamples: string;
    exploreExamples: string;
    clickToLaunch: string;
    everythingYouNeed: string;
    featureRichDataGrid: string;
    builtForReal: string;
    forgeStackEcosystem: string;
    worksWith: string;
    showcaseTitle: string;
    showcaseDescription: string;
    showcase: {
      finance: { title: string; description: string };
      hr: { title: string; description: string };
      effects: { title: string; description: string };
      lazyLoad: { title: string; description: string };
    };
    demoPreview: {
      finance: string;
      hr: string;
      basic: string;
      themeBuilder: string;
    };
    viewLive: string;
    ecosystemBanner: string;
    visitForgeStack: string;
    marqueeItems: string[];
  };

  stats: {
    features: string;
    dependencies: string;
    bundleSize: string;
    typescript: string;
  };

  features: Record<string, { title: string; description: string }>;

  demos: Record<string, { title: string; description: string }>;

  tags: {
    popular: string;
    new: string;
    interactive: string;
    guide: string;
    pattern: string;
  };

  footer: {
    partOfForgeStack: string;
    mitLicense: string;
    builtWith: string;
    ecosystemText: string;
  };

  themeBuilderPage: {
    title: string;
    description: string;
    presets: string;
    colors: string;
    layout: string;
    background: string;
    foreground: string;
    accent: string;
    border: string;
    headerBg: string;
    headerText: string;
    rowHover: string;
    fontSize: string;
    radius: string;
    spacing: string;
    stripedRows: string;
    mode: string;
    dark: string;
    light: string;
    livePreview: string;
    exportCode: string;
    hideCode: string;
  };

  docsPage: {
    documentation: string;
    pageNotFound: string;
    pageNotFoundDesc: string;
    goToGettingStarted: string;
    apiReference: string;
    apiDescription: string;
    selectSection: string;
    prop: string;
    type: string;
    default: string;
    description: string;
    required: string;
  };

  financeDemo: {
    title: string;
    description: string;
    live: string;
    pause: string;
    resume: string;
    refresh: string;
  };

  hrDemo: {
    title: string;
    description: string;
    expandAll: string;
    collapseAll: string;
    employees: string;
  };

  basicDemo: {
    title: string;
    description: string;
    mobileHint: string;
    testLoading: string;
    rows: string;
  };

  demosIndex: {
    title: string;
    description: string;
    viewDemo: string;
    whatsNew: string;
    seeAllFeatures: string;
    releaseHighlights: string[];
  };

  featuresDemo: {
    badge: string;
    title: string;
    description: string;
    sections: { title: string; description: string }[];
    relatedTitle: string;
    relatedDescription: string;
    relatedLinks: Record<string, { title: string; summary: string }>;
  };

  enterpriseGridDemo: {
    title: string;
    description: string;
    exportScopeLabel: string;
    addRow: string;
    filtersHint: string;
    swipeCopy: string;
    swipeDelete: string;
    sections: {
      range: { title: string; description: string };
    };
  };

  infiniteScrollDemo: {
    title: string;
    description: string;
    compareHint: string;
    loading: string;
  };

  accessibilityDemo: {
    badge: string;
    title: string;
    description: string;
    bullets: string[];
  };

  themePlaygroundPage: {
    title: string;
    description: string;
    cardThemeTitle: string;
    cardThemeDescription: string;
    cardThemeCta: string;
    cardPlayTitle: string;
    cardPlayDescription: string;
    cardPlayCta: string;
  };

  demoCodeTitles: {
    basic: string;
    features: string;
    finance: string;
    hr: string;
    accessibility: string;
    masterDetail: string;
    persisted: string;
    server: string;
    columnGrouping: string;
    virtualization: string;
    themePlayground: string;
    enterpriseGrid: string;
    infiniteScroll: string;
  };

  savedViewsDemo: {
    title: string;
    description: string;
  };

  advancedFilterDemo: {
    title: string;
    description: string;
  };

  pinnedRowGroupsDemo: {
    title: string;
    description: string;
    explainerTitle: string;
    explainerItems: string[];
    scrollHint: string;
  };

  formulaDemo: {
    title: string;
    description: string;
  };

  virtualizationDemo: {
    title: string;
    lead: string;
    presets: string;
    presetDense: string;
    presetDefault: string;
    presetHeavy: string;
    initialRows: string;
    batchSize: string;
    maxHeight: string;
    lazyEnabled: string;
    virtualizeEnabled: string;
    startTour: string;
    tourToolbarTitle: string;
    tourToolbarBody: string;
    tourGridTitle: string;
    tourGridBody: string;
  };

  changelog: {
    title: string;
    description: string;
    latest: string;
    versions: Record<string, { highlights: string[] }>;
  };

  skillsPage: {
    badge: string;
    title: string;
    description: string;
    installTitle: string;
    installDescription: string;
    includedTitle: string;
    examplesTitle: string;
    copy: string;
    copied: string;
    copyFor: string;
  };

  playground: {
    title: string;
    description: string;
    props: string;
    effects: string;
    theme: string;
    reset: string;
    generatedCode: string;
    livePreview: string;
  };

  common: {
    demos: string;
    back: string;
    modeLabel: string;
  };
}
