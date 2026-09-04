import type { TranslationStrings } from './types';

export const he: TranslationStrings = {
  nav: {
    demos: 'דמוים',
    playground: 'מתחם ניסוי',
    themeBuilder: 'בונה ערכת נושא',
    docs: 'מסמכים',
    api: 'API',
    changelog: 'יומן שינויים',
    skills: 'Skills',
    getStarted: 'מתחילים',
    gridTable: 'Grid Table',
    toggleTheme: 'החלפת ערכת נושא',
    language: 'שפה',
  },

  home: {
    badgeText: 'תצוגות שמורות, מסננים, קבוצות, נוסחאות, וירטואליזציה',
    title: 'Grid Table',
    subtitle: 'גריד הנתונים של React ל־ForgeStack',
    typewriterTexts: [
      'גלילה אופקית בנייד, פריסת כרטיסים אופציונלית, hover רגוע.',
      'לוחות פיננסים ותרשימי ארגון HR.',
      'גרירה, שינוי גודל, בחירת שורות.',
      'מותאם במלואו באמצעות props.',
      'אפס תלויות. TypeScript בלבד.',
    ],
    viewDemos: 'לדמוים',
    documentation: 'תיעוד',
    themeBuilder: 'בונה ערכת נושא',
    seeItInAction: 'רואים בפעולה',
    seeItDescription: 'מלוחות פיננסים ועד תרשימי ארגון — Grid Table מטפל בכל תרחיש נתונים.',
    interactivePreview: 'תצוגה אינטראקטיבית',
    launchFinanceDemo: 'הפעלת דמו פיננסי',
    demosAndExamples: 'דמוים ודוגמאות',
    exploreExamples: 'תרחישים מהעולם האמיתי עם Grid Table.',
    clickToLaunch: 'לחיצה להפעלה →',
    everythingYouNeed: 'כל מה שצריך',
    featureRichDataGrid: 'גריד עשיר בתכונות',
    builtForReal: 'נבנה לאפליקציות אמיתיות — כל תכונה ניתנת להתאמה ב־props.',
    forgeStackEcosystem: 'אקוסיסטם ForgeStack',
    worksWith: 'חלק מ־ForgeStack המלא',
    showcaseTitle: 'תראו',
    showcaseDescription: 'Pivot, קיבוץ, הערות ומילוי — 1.1.5 בתנועה.',
    trailerTitle: 'Grid Table 1.1.5',
    showcase: {
      finance: { title: 'מצב פיננסי', description: 'מחירים בזמן אמת, גרפים קטנים, P&L חי.' },
      hr: { title: 'HR ונתוני עץ', description: 'תרשימי ארגון, הרחבה/כיווץ, היררכיה.' },
      effects: { title: 'אפקטי טבלה', description: 'מיון, כניסת שורות, hover — דרך tableEffects.' },
      lazyLoad: { title: 'טעינה עצלה', description: 'גלילה אינסופית, אצוות, Skeleton — עשרות אלפי שורות.' },
    },
    demoPreview: {
      finance: 'AAPL +2.34%  ·  MSFT −0.12%  ·  GOOG +1.87%',
      hr: 'מנכ״ל ← סמנכ״ל הנדסה ← מפתח בכיר',
      basic: 'מיון · סינון · עימוד · בחירה · גרירה',
      themeBuilder: '🎨  רקע · הדגשה · גבול · רדיוס',
    },
    viewLive: 'תצוגה חיה →',
    ecosystemBanner: 'תואם במלואו לאקוסיסטם ForgeStack.',
    visitForgeStack: 'לאתר ForgeStack',
    marqueeItems: [
      'עימוד בשרת ידני ו־effectiveTotalItems',
      'טבלה עם גלילה ניידת כברירת מחדל · פריסת כרטיסים אופציונלית',
      'lazyLoad באצוות לגלילות ארוכות',
      'MIT · @forgedevstack/grid-table · TypeScript קודם',
    ],
  },

  stats: {
    features: 'תכונות',
    dependencies: 'תלויות',
    bundleSize: 'גודל חבילה',
    typescript: 'TypeScript',
  },

  features: {
    sort: { title: 'אנימציות מיון', description: 'מעברים חלקים בעמודות — סיבוב חצים, הדגשה, הבזק.' },
    tree: { title: 'נתוני עץ', description: 'נתונים היררכיים עם הרחבה/כיווץ ורמות הזחה.' },
    filter: { title: 'סינון מתקדם', description: 'סינון לפי עמודה וגלובלי עם 12+ אופרטורים ופאנל סינון.' },
    drag: { title: 'גרירה ושחרור', description: 'סידור מחדש של עמודות עם משוב ויזואלי וסף למניעת טעויות.' },
    theme: { title: 'בונה ערכת נושא', description: 'התאמת צבעים, גופנים, ריווח, גבולות — ייצוא קוד מוכן.' },
    responsive: { title: 'רספונסיביות', description: 'גלילה אופקית שומרת על הטבלה המלאה; mobileLayout="stacked" לכרטיסים.' },
    selection: { title: 'בחירת שורות', description: 'בחירה בודדת ומרובת תיבות, בחור הכול, מצב לא מוגדר.' },
    pagination: { title: 'עימוד', description: 'עימוד מובנה עם גדלי עמוד וכפתורי ראשון/אחרון.' },
    resize: { title: 'שינוי רוחב עמודות', description: 'גרירת קצוות עמודות עם מגבלות min/max.' },
    expand: { title: 'הרחבת שורות', description: 'הרחבת שורות לתוכן מפורט עם רנדר מותאם.' },
    skeleton: { title: 'טעינת Skeleton', description: 'מצב טעינה אנימצייתי התואם למבנה הטבלה.' },
    typescript: { title: 'TypeScript מלא', description: 'גנריות, בדיקת טיפוסים מחמירה והגדרות מיוצאות.' },
  },

  demos: {
    finance: { title: 'פיננסים', description: 'נתונים בזמן אמת עם P&L, גרפים קטנים ומחירונים חיים.' },
    hr: { title: 'HR / תרשים ארגון', description: 'נתוני עובדים היררכיים עם עץ, הרחבה וקווי דיווח.' },
    basic: { title: 'טבלה בסיסית', description: 'גריד מלא עם מיון, סינון, עימוד ובחירת שורות.' },
    features: {
      title: 'תכונות חדשות',
      description:
        'תפריט הקשר, שורת מצב, ייצוא, ניווט מקלדת, סידור שורות מחדש, עץ נתונים, ביטול/שחזור, שורות קפואות, הדפסה. במסכים צרים ברירת המחדל היא גלילה אופקית.',
    },
    'theme-playground': { title: 'ערכת נושא ומתחם ניסוי', description: 'בונה ערכות ומתחם ניסוי במרכז אחד עם הגדרה מוכנה להעתקה.' },
    accessibility: { title: 'נגישות', description: 'מקלדת, פוקוס ותבניות ידידותיות לקוראי מסך.' },
    'master-detail': {
      title: 'אב—פרט',
      description: 'הפעלת enableRowExpansion עם renderRowExpansion לתוכן מקונן, תצוגות מקדימות או גריד שני.',
    },
    'persisted-state': {
      title: 'עימוד מתמיד',
      description: 'מספר עמוד וגודל משוחזרים מ־localStorage ומתעדכנים בכל שינוי. ניתן להרחיב ל־URL או הגדרות משתמש בשרת.',
    },
    'server-driven': {
      title: 'עימוד מונע שרת',
      description: 'שליחת עמוד נוכחי ב־data, הפעלת manualPagination ו־totalRowCount, וטעינה מחדש ב־onPageChange. מיון וסינון על כל הנתונים בייצור בשרת.',
    },
    'column-grouping': {
      title: 'כותרות קבוצת עמודות',
      description: 'כותרות colspan אמיתיות עם columnGroups + alignColumnGroups.',
    },
    'release-1-1-5': {
      title: 'יכולות 1.1.5',
      description:
        'Pivot, אזור קיבוץ, הערות תא, גובה שורה, span, צפיפות Bear, RTL והכרזות טווח.',
    },
    'touch-gestures': {
      title: 'מחוות מגע',
      description: 'החלקה לפעולות ולחיצה ארוכה לתפריט, כולל סימולציה במחשב.',
    },
    'release-1-1-4': {
      title: 'תכונות 1.1.4',
      description: 'Autosize, שיבולת, תפריט עמודה, בורר עמודות, מסננים צפים, גזירה, סדרה וחיפוש.',
    },
    'enterprise-grid': {
      title: 'גריד ארגוני',
      description: 'בחירת טווח, fill handle, מסנני set/תאריך, exportScope, flash cells ומחוות מגע.',
    },
    'infinite-scroll': {
      title: 'גלילה אינסופית (SSRM)',
      description: 'טעינת בלוקים עם onLoadBlock — נפרד מ־lazyLoad, virtualize ו־manualPagination.',
    },
    virtualization: {
      title: 'רשימות גדולות וטעינה עצלה',
      description: 'אלפי שורות בזיכרון עם lazyLoad באצוות גלילה — התאמת initialRows, batchSize ו־maxHeight.',
    },
    themeBuilder: { title: 'בונה ערכת נושא', description: 'התאמת צבעים, גופנים וריווח — ייצוא קוד לפרויקט.' },
  },

  tags: {
    popular: 'פופולרי',
    new: 'חדש',
    interactive: 'אינטראקטיבי',
    guide: 'מדריך',
    pattern: 'תבנית',
  },

  footer: {
    partOfForgeStack: 'חלק מ־ForgeStack',
    mitLicense: 'רישיון MIT',
    builtWith: 'נבנה עם',
    ecosystemText: 'Grid Table, Bear UI, Harbor, Synapse, Compass, Relay, Crucible ו־Forge CLI הם חלק מ־',
  },

  themeBuilderPage: {
    title: 'בונה ערכת נושא',
    description: 'התאמת צבעים, גופנים וריווח. תצוגה חיה וייצוא קוד.',
    presets: 'ערכות מוכנות',
    colors: 'צבעים',
    layout: 'פריסה',
    background: 'רקע',
    foreground: 'טקסט ראשי',
    accent: 'הדגשה',
    border: 'גבול',
    headerBg: 'רקע כותרת',
    headerText: 'טקסט כותרת',
    rowHover: 'רעידת שורה',
    fontSize: 'גודל גופן',
    radius: 'רדיוס',
    spacing: 'ריווח',
    stripedRows: 'שורות משורטטות',
    mode: 'מצב',
    dark: 'כהה',
    light: 'בהיר',
    livePreview: 'תצוגה חיה',
    exportCode: 'ייצוא קוד',
    hideCode: 'הסתרת קוד',
  },

  docsPage: {
    documentation: 'תיעוד',
    pageNotFound: 'הדף לא נמצא',
    pageNotFoundDesc: 'דף התיעוד לא קיים.',
    goToGettingStarted: 'למתחילים',
    apiReference: 'התייחסות API',
    apiDescription: 'התייחסות מלאה לכל ה־props, הגדרות עמודות וה־hooks של Grid Table.',
    selectSection: 'בחירת מקטע',
    prop: 'Prop',
    type: 'טיפוס',
    default: 'ברירת מחדל',
    description: 'תיאור',
    required: 'חובה',
  },

  financeDemo: {
    title: 'לוח פיננסי',
    description: 'מניות בזמן אמת עם גרפים קטנים, יחסי P/E וטווחי 52 שבועות.',
    live: 'חי',
    pause: 'השהיה',
    resume: 'המשך',
    refresh: 'רענון',
  },

  hrDemo: {
    title: 'HR / תרשים ארגון',
    description: 'נתוני עובדים היררכיים עם עץ, הרחבה וקווי דיווח.',
    expandAll: 'הרחבת הכול',
    collapseAll: 'כיווץ הכול',
    employees: 'עובדים',
  },

  basicDemo: {
    title: 'טבלה בסיסית',
    description: 'גריד מלא עם מיון, סינון, עימוד, גרירה ובחירת שורות.',
    mobileHint: 'מתחת לרוחב שולחן עבודה הדוגמה משתמשת ב-mobileLayout="stacked" (שורות ככרטיסים). כווצו את החלון או השתמשו במצב מכשיר כדי להשוות לטבלה עם גלילה אופקית כברירת מחדל.',
    testLoading: 'בדיקת טעינה',
    rows: 'שורות',
  },

  featuresDemo: {
    badge: 'v1.1.4',
    title: 'תצוגת תכונות',
    description:
      'גרידים אינטראקטיביים לתפריט הקשר, שורת מצב, ייצוא, מקלדת, סידור מחדש, עץ, ביטול/שחזור, שורות קפואות והדפסה. ל־APIs של 1.1.x יש דמוים ייעודיים.',
    relatedTitle: 'דמוים ייעודיים',
    relatedDescription: 'תכונות שכבר שוחררו ב־1.1.x זמינות בנתיבים נפרדים — לא כ"מתוכנן".',
    relatedLinks: {
      'release-1-1-4': {
        title: 'תכונות 1.1.4',
        summary: 'Autosize, שיבולת, תפריט/בורר עמודות, מסננים צפים, גזירה, סדרה וחיפוש.',
      },
      'enterprise-grid': {
        title: 'גריד ארגוני',
        summary: 'העתקה/הדבקה בטווח, Shift+חיצים, Tab בעריכה, fill handle, exportScope, מחוות מגע.',
      },
      'infinite-scroll': {
        title: 'גלילה אינסופית (SSRM)',
        summary: 'טעינת בלוקים עם onLoadBlock — נפרד מ־lazyLoad ו־virtualize.',
      },
      'pinned-row-groups': {
        title: 'קבוצות שורות נעוצות',
        summary: 'כותרות קבוצה וסיכומים נעוצים בגלילה.',
      },
      'saved-views': {
        title: 'תצוגות שמורות',
        summary: 'פריסות בשם למיון, מסננים, עמודות וצפיפות.',
      },
    },
    sections: [
      {
        title: 'תפריט הקשר, שורת מצב וייצוא',
        description: 'לחיצה ימנית על תא לפעולות מהירות. תחתית מציגה ספירות ואגרגציות. ייצוא ל־CSV, Excel, JSON או PDF.',
      },
      {
        title: 'סידור שורות מחדש, ביטול/שחזור ומקלדת',
        description:
          'גרירת שורות לסידור מחדש. עריכת תאים עם ביטול/שחזור (Ctrl+Z/Y). חיצים, Enter לעריכה, Escape לביטול.',
      },
      {
        title: 'נתוני עץ — שורות היררכיות',
        description: 'נתונים מקוננים עם חצי הרחבה/כיווץ והזחה אוטומטית.',
      },
      {
        title: 'שורות קפואות ומצב הדפסה',
        description: 'הצמדת שורות סיכום לתחתית. סמל הדפסה בסרגל לתצוגה להדפסה.',
      },
    ],
  },

  release114Demo: {
    title: 'מעבדת 1.1.4',
    description: 'קישור מקומי — בדקו את משטחי 1.1.4. הפורטל טוען את הספרייה מהמקור.',
    bullets: [
      'דאבל־קליק על מפריד, או Autosize all / Size to fit בסרגל.',
      'סננו Region או Status (חיפוש ברשימת set). שיבולת מופיעה מעל הגריד.',
      'תפריט ⋮: autosize, pin, הסתרה. כפתור Columns משנה נראות.',
      'שורת מסננים צפה. Ctrl/Cmd+F ממקד חיפוש.',
      'בחרו Qty וגררו את ידית המילוי ל־10, 20, 30… גזירה ב־Ctrl/Cmd+X.',
    ],
  },

  enterpriseGridDemo: {
    title: 'גריד ארגוני',
    description:
      'גרירה לבחירת טווח; העתקה ב־Ctrl/Cmd+C או הדבקה ב־Ctrl/Cmd+V; Shift+חיצים מרחיבים את הטווח; Escape מנקה. Tab מאשר עריכה ועובר לתא הבא. מילוי עם הידית או Ctrl/Cmd+D. Pin בכותרת מקבע עמודות. מגע: החלקה שמאלה ולחיצה ארוכה לתפריט.',
    exportScopeLabel: 'exportScope',
    addRow: 'הוספת שורה (flash)',
    filtersHint: 'פתחו מסנן Region/Status לרשימת set, או Ship date לטווח from/to. exportScope="selected" בלי בחירה הוא no-op.',
    swipeCopy: 'העתקה',
    swipeDelete: 'מחיקה',
    sections: {
      range: {
        title: 'טווח, fill handle, מסננים ו־exportScope',
        description: 'בחרו תאים, העתיקו/הדביקו או מלאו, ואז ייצאו לפי ה־scope. Flash cells מדגיש עריכות.',
      },
    },
  },

  infiniteScrollDemo: {
    title: 'גלילה אינסופית (SSRM)',
    description: 'גללו לתחתית כדי לטעון את הבלוק הבא עם onLoadBlock. totalRowCount קובע כמה בלוקים נותרו.',
    compareHint:
      'השתמשו ב־infiniteScroll לבלוקים מהשרת. העדיפו lazyLoad כשכל השורות כבר בזיכרון, virtualize לחלון DOM, ו־manualPagination לכפתורי עמוד.',
    loading: 'טוען בלוק הבא…',
  },

  accessibilityDemo: {
    badge: 'נגישות',
    title: 'נגישות',
    description:
      'ל־Grid Table יש תפקידי shell, ניווט מקלדת בין תאים, Enter לעריכה ו־Escape לביטול. שילוב עם טבעות פוקוס גלויות ובדיקה ב־VoiceOver או NVDA.',
    bullets: [
      'הפעלת keyboardNavigation לחיצים, Home, End, PageUp, PageDown.',
      'שמירת פילטרים ופעולות סרגל כ־button אמיתיים (Bear מטפל).',
      'אל תסיר קווי מתאר בלי להחליף בטבעת ניגודית.',
      'בהרחבת שורות ודא ששליטת ההרחבה בעלת שם נגיש.',
    ],
  },

  release115Demo: {
    title: 'יכולות 1.1.5',
    description:
      'קבצו בגרירת כותרת, pivot בצד הלקוח, הערות תא וגובה שורה. החליפו לעברית לבדיקת RTL.',
    bullets: [
      'גררו Region או Product לאזור הקיבוץ — צ׳יפים מסירים שדה.',
      'הפעילו pivot לטבלת Region × Quarter עם סכום Amount.',
      'פינה ירוקה היא הערה. הערות גדלות עם גובה אוטומטי.',
      'בחרו טווח — האזור החי מכריז על מספר התאים. מלאו ב-Ctrl/Cmd+D.',
    ],
    pivotToggle: 'Pivot-lite',
  },

  touchGesturesDemo: {
    title: 'מחוות מגע',
    description:
      'החליקו שורה לפעולות. לחיצה ארוכה פותחת תפריט. במחשב השתמשו במצב מכשיר ב-DevTools.',
    steps: [
      'Chrome: DevTools → סרגל מכשיר → בחרו טלפון → החליקו שמאלה.',
      'Safari: Develop → Responsive Design Mode.',
      'לחיצה ארוכה (~500ms) פותחת את אותו תפריט כמו קליק ימני.',
      'דמו Enterprise כולל גם מחוות; כאן המסלול הייעודי ל-QA.',
    ],
    swipeCopy: 'העתק',
    swipeDelete: 'מחק',
  },

  themePlaygroundPage: {
    title: 'בונה ערכת נושא ומתחם ניסוי',
    description:
      'התאמת אסימונים בבונה ערכות ואז שחזור props בקוד. השתמשו במתחם הניסוי להחלפת תכונות והעתקת קטע GridTable.',
    cardThemeTitle: 'בונה ערכת נושא',
    cardThemeDescription: 'צבעים, טיפוגרפיה, ריווח — ייצוא אובייקטי ערכת נושא תואמים ל־Bear.',
    cardThemeCta: 'פתיחת בונה ערכות →',
    cardPlayTitle: 'מתחם ניסוי',
    cardPlayDescription: 'מתגי props חיים עם JSX מוכן להעתקה.',
    cardPlayCta: 'פתיחת מתחם ניסוי →',
  },

  demoCodeTitles: {
    basic: 'העתקה — תרשים גריד מלא',
    features: 'העתקה — גריד מוצרים (תפריט הקשר, שורת מצב, ייצוא, שורה קפואה)',
    finance: 'העתקה — גריד בסגנון פיננסי (hover רגוע)',
    hr: 'העתקה — תבנית HR (הרחבה מותאמת או treeData)',
    accessibility: 'העתקה — מקלדת ועריכה',
    masterDetail: 'העתקה — רנדר הרחבה',
    persisted: 'העתקה — שמירת עמוד ב־localStorage',
    server: 'העתקה — תבנית עימוד ידני',
    columnGrouping: 'העתקה — columnGroups + alignColumnGroups',
    virtualization: 'העתקה — lazyLoad ואפשרויות',
    themePlayground: 'העתקה — שלד אינטגרציה',
    enterpriseGrid: 'העתקה — גריד ארגוני (טווח, fill, exportScope)',
    infiniteScroll: 'העתקה — infiniteScroll לפי בלוקים',
    release114: 'העתקה — תכונות 1.1.4',
    release115: 'העתקה — תכונות 1.1.5',
    touchGestures: 'העתקה — מחוות מגע',
  },

  demosIndex: {
    title: 'דמוים ודוגמאות',
    description: 'דמוים אינטראקטיביים לתרחישים אמיתיים — מלוחות פיננסים ועד תרשימי ארגון.',
    viewDemo: 'צפייה בדמו',
    whatsNew: 'מה חדש ב־',
    seeAllFeatures: 'לראות את כל התכונות בפעולה',
    releaseHighlights: [
      'v1.1.4 — דאבל־קליק על מפריד העמודה מתאים לרוחב הטקסט; fill handle מיושר עם virtualize',
      'Ctrl/Cmd+C מעתיק טווח; Escape מנקה; pin בכותרת בלי לחיצה ימנית',
      'ייצוא מכבד סדר/עמודות מוסתרות; selected ריק הוא no-op',
      'דמו enterprise עודכן למקלדת ועריכה',
      'docs/GRID_TABLE_DOCS.md ו־changelog ל־1.1.3',
    ],
  },

  savedViewsDemo: {
    title: 'תצוגות שמורות',
    description: 'החלפת פריסות שמורות שמשחזרות מיון, מסננים, עמודות מוסתרות וצפיפות.',
  },

  advancedFilterDemo: {
    title: 'בונה מסננים מתקדם',
    description: 'בניית כללי AND/OR מקוננים עם פאנל FilterBuilder מובנה.',
  },

  pinnedRowGroupsDemo: {
    title: 'קבוצות שורות נעוצות + סיכומי תחתית',
    description:
      'העבר rowGroups עם by, footer (למשל sum:amount) ו־pinned: true. שורות הפירוט נגללות; הטבלה יוצרת שורת סיכום לכל קבוצה ומצמידה אותה לתחתית אזור הגלילה. שונה מהסכום הכולל בשורת הסטטוס.',
    explainerTitle: 'מה רואים כאן',
    explainerItems: [
      'שורות פירוט מקובצות לפי עמודת group — Finance, Marketing, Operations.',
      'שורות הסיכום נוצרות על ידי הטבלה ואינן בנתוני המקור.',
      'Finance Total / Marketing Total / Operations Total מסכמים amount לכל קבוצה.',
      'בגלילה, שורות הסיכום הנעוצות נשארות בתחתית אזור הגלילה.',
      'Total Amount בשורת הסטטוס הוא הסכום הכולל של כל שורות הפירוט.',
    ],
    scrollHint: 'גלול בתוך גוף הטבלה כדי לראות שהסיכומים נשארים נעוצים.',
  },

  formulaDemo: {
    title: 'מנוע נוסחאות עמודות',
    description: 'עמודות מחושבות משדות מקור עם ביטויי נוסחה בטוחים.',
  },

  virtualizationDemo: {
    title: 'רשימות גדולות וטעינה עצלה',
    lead: 'הדוגמה שומרת 500 שורות בזיכרון בזמן ש־lazyLoad חושף אצוות בגלילה. התאימו ערכים או בטלו lazyLoad לטעינה מלאה, והשתמשו בסיור לבקרת הממשק.',
    presets: 'ערכות מוכנות',
    presetDense: 'צפוף (מהיר)',
    presetDefault: 'ברירת מחדל',
    presetHeavy: 'אצוות גדולות',
    initialRows: 'initialRows',
    batchSize: 'batchSize',
    maxHeight: 'maxHeight (px)',
    lazyEnabled: 'lazyLoad.enabled',
    virtualizeEnabled: 'virtualize (חלון)',
    startTour: 'סיור בבקרים',
    tourToolbarTitle: 'הגדרות lazy load',
    tourToolbarBody: 'החלפת ערכות או מספרים. אצוות קטנות זריזות יותר; גדולות פחות חשיפות בגלילה.',
    tourGridTitle: 'גלילת גוף הטבלה',
    tourGridBody: 'רק שורות טעונות מרונדרות; גלילה למטה מביאה אצווה הבאה עד שכל השורות מותקנות.',
  },

  changelog: {
    title: 'יומן שינויים',
    description: 'כל גרסה ושיפור — מתועד כאן.',
    latest: 'אחרון',
    versions: {
      '1.1.5': {
        highlights: [
          'Pivot-lite בצד הלקוח',
          'גרירת כותרת לאזור קיבוץ',
          'הערות, גובה שורה אוטומטי ו-span',
          'צפיפות Bear, RTL והכרזות טווח',
          'דמו ייעודי למחוות מגע',
        ],
      },
      '1.1.4': {
        highlights: [
          'דאבל־קליק על מפריד הכותרת מתאים את העמודה למחרוזת הארוכה ביותר',
          'Autosize all, size-to-fit, שיבולת, תפריט עמודה ובורר עמודות',
          'מסננים צפים, חיפוש Ctrl/Cmd+F, חיפוש ב־set, גזירת טווח וסדרת מילוי',
          'Fill handle עם virtualize כותב לשורות המוחלטות הנכונות אחרי גלילה',
          'דמו פורטל ב־/demos/release-1-1-4',
        ],
      },
      '1.1.3': {
        highlights: [
          'תיקון virtualize: bodyRows בחלון עם offset אינדקס מוחלט',
          'העתקת טווח (Ctrl/Cmd+C), Shift+חיצים, Escape מנקה בחירה',
          'Tab מאשר עריכה ומתקדם; pin בכותרת + צלליות קצה',
          'ייצוא מכבד סדר/מוסתרות; selected ריק הוא no-op',
          'פורטל ומסמכים עודכנו ל־1.1.3',
        ],
      },
      '1.1.2': {
        highlights: [
          'Fill handle + Ctrl/Cmd+D למילוי למטה בבחירת טווח',
          'מחוות מגע: swipeActions ו־longPressContextMenu',
          'פורטל: דמוי enterprise וגלילה אינסופית; colspan אמיתי בקיבוץ עמודות',
          'API reference עם filterType set/date ו־hooks של 1.1.x',
          'Playwright אינטראקציה לטווח, מסנן set ו־exportScope',
        ],
      },
      '1.1.1': {
        highlights: [
          'exportScope — שורות לייצוא/העתקה/הדפסה: all, filtered, sorted או selected',
          'מסנני set ותאריך, קבוצות מתקפלות, בחירת טווח + הדבקה מלוח',
          'גלילה אינסופית (SSRM), כותרות קבוצת עמודות, flash cells, applyTransaction',
          'סנכרון URL לתצוגות, דף Skills, Husky pre-commit + Playwright',
          'תיעוד enterprise grid; דמו קבוצות עם כותרות מתקפלות',
        ],
      },
      '1.1.0': {
        highlights: [
          'תצוגות שמורות — presets למיון, מסננים, עמודות, עימוד וצפיפות',
          'בונה מסננים מתקדם — כללי AND/OR מקוננים עם FilterBuilder',
          'קבוצות שורות נעוצות — קיבוץ לפי שדה עם סיכומי תחתית',
          'מנוע נוסחאות עמודות — עמודות מחושבות מביטויים בטוחים',
          'וירטואליזציה — virtualize מרנדר רק שורות גלויות',
          'קבוצות עמודות, עיצוב מותנה, master-detail, צפיפות, שמירת מצב',
        ],
      },
      '1.0.9': {
        highlights: [
          'mobileLayout — גלילה אופקית כברירת מחדל במסכים קטנים',
          'manualPagination + totalRowCount לעימוד בשרת',
          'פורטל: Theme & Playground, דמוים חדשים, תיעוד דפוסים',
          'hover רך יותר; אייקונים למגע; תיקון popstate ב־Forge Compass',
        ],
      },
      '1.0.7': {
        highlights: [
          'ניווט מקלדת, תפריט הקשר, נתוני עץ, שורת סטטוס',
          'סידור שורות, ייצוא Excel/PDF, לוח, ביטול/ביצוע מחדש',
          'נעיצת עמודות, שורות קפואות, מצב הדפסה',
        ],
      },
      '1.0.6': {
        highlights: [
          'עריכת תאים, ייצוא CSV/JSON, Playground אינטראקטיבי',
          'חיפוש Cmd+K, changelog, אפקטים, lazy load, דמוי Finance ו־HR',
          'Theme Builder ותרגום',
        ],
      },
      '1.0.2': {
        highlights: ['מעבר ל־SCSS', 'CSS מקומפל כלול', 'תיקון סדר exports'],
      },
      '1.0.1': {
        highlights: ['פרסום npm ראשון תחת @forgedevstack'],
      },
      '1.0.0': {
        highlights: [
          'שחרור ראשון',
          'מיון, סינון, עימוד',
          'גרירת עמודות, שינוי גודל',
          'בחירת שורות והרחבה',
          'מגירה במובייל, ערכות נושא',
        ],
      },
    },
  },

  skillsPage: {
    badge: 'סוכני Cursor',
    title: 'Skills',
    description: 'תנו לעוזר ה-AI ידע מעמיק על Grid Table, דמוים בפורטל ותהליכי שחרור.',
    installTitle: 'התקנה',
    installDescription: 'ה-skills נמצאים ב-grid-table/.cursor/skills/. פתחו את הפרויקט ב-Cursor — הם מופעלים כשמפנים אליהם או משתמשים ב-/grid-table-code-review.',
    includedTitle: 'מה כלול',
    examplesTitle: 'דוגמאות לפרומפטים',
    copy: 'העתק',
    copied: 'הועתק!',
    copyFor: 'העתק עבור',
  },

  playground: {
    title: 'מתחם ניסוי',
    description: 'החלפת props, אפקטים וערכות נושא — תוצאה חיה.',
    props: 'Props',
    effects: 'אפקטים',
    theme: 'ערכת נושא',
    reset: 'איפוס לברירת מחדל',
    generatedCode: 'קוד שנוצר',
    livePreview: 'תצוגה חיה',
  },

  common: {
    demos: 'דמוים',
    back: 'חזרה',
    modeLabel: 'מצב',
  },
};
