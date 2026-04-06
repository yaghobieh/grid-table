import type { TranslationStrings } from './types';

export const he: TranslationStrings = {
  nav: {
    demos: 'דמוים',
    playground: 'מתחם ניסוי',
    themeBuilder: 'בונה ערכת נושא',
    docs: 'מסמכים',
    api: 'API',
    changelog: 'יומן שינויים',
    getStarted: 'מתחילים',
    gridTable: 'Grid Table',
    toggleTheme: 'החלפת ערכת נושא',
    language: 'שפה',
  },

  home: {
    badgeText: 'גלילה ניידת, hover רגוע, פורטל מלוטש',
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
    showcaseTitle: 'נבנה לכל תרחיש נתונים',
    showcaseDescription: 'פיננסים, HR, אפקטים, טעינה עצלה — הכול בגריד אחד.',
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
      title: 'רצועת קיבוץ עמודות',
      description: 'שני מפלסי כותרת: רצועה דקורטיבית מיושרת לעמודות אמיתיות דרך CSS grid.',
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
    badge: 'v1.0.8 פורטל + גריד',
    title: 'תצוגת תכונות (מחסנית v1.0.7 + נייד v1.0.8)',
    description:
      'תפריט הקשר, שורת מצב, ייצוא, מקלדת, סידור שורות מחדש, עץ, ביטול/שחזור, שורות קפואות, הדפסה. במסכים צרים ברירת המחדל היא גלילה אופקית.',
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
    columnGrouping: 'העתקה — רצועת כותרת מקובצת',
    virtualization: 'העתקה — lazyLoad ואפשרויות',
    themePlayground: 'העתקה — שלד אינטגרציה',
  },

  demosIndex: {
    title: 'דמוים ודוגמאות',
    description: 'דמוים אינטראקטיביים לתרחישים אמיתיים — מלוחות פיננסים ועד תרשימי ארגון.',
    viewDemo: 'צפייה בדמו',
    whatsNew: 'מה חדש ב־',
    seeAllFeatures: 'לראות את כל התכונות בפעולה',
    releaseHighlights: [
      'v1.0.8 — manualPagination + totalRowCount; דמו שרת; תיקון טעינה/hooks; ניווט Compass ידידותי להיסטוריה',
      'מרכז ערכת נושא ומתחם ניסוי מאחדים אסימונים וניסוי props',
      'mobileLayout גלילה אופקית כברירת מחדל; מוערם אופציונלי',
      'hover רגוע יותר עם tableEffects.hover',
      'דמוים: נגישות, אב—פרט, עימוד מתמיד, שרת, רצועת קיבוץ, רשימות עצלות',
    ],
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
