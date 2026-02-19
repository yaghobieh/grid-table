export type Locale = 'en' | 'es';

export interface TranslationStrings {
  nav: {
    demos: string;
    playground: string;
    themeBuilder: string;
    docs: string;
    api: string;
    changelog: string;
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
  };

  stats: {
    features: string;
    dependencies: string;
    bundleSize: string;
    typescript: string;
  };

  features: Record<string, { title: string; description: string }>;

  demos: {
    finance: { title: string; description: string };
    hr: { title: string; description: string };
    basic: { title: string; description: string };
    themeBuilder: { title: string; description: string };
  };

  tags: {
    popular: string;
    new: string;
    interactive: string;
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
    testLoading: string;
    rows: string;
  };

  demosIndex: {
    title: string;
    description: string;
    viewDemo: string;
  };

  changelog: {
    title: string;
    description: string;
    latest: string;
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
