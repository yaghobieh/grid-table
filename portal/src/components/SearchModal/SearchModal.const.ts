export interface SearchItem {
  id: string;
  title: string;
  section: string;
  path: string;
  keywords: string[];
}

export const SEARCH_ITEMS: SearchItem[] = [
  { id: 'home', title: 'Home', section: 'Pages', path: '/', keywords: ['home', 'landing'] },
  { id: 'demos', title: 'Demos & Examples', section: 'Pages', path: '/demos', keywords: ['demo', 'example'] },
  { id: 'finance', title: 'Finance Demo', section: 'Demos', path: '/demos/finance', keywords: ['finance', 'stock', 'live', 'ticker'] },
  { id: 'hr', title: 'HR / Org Chart', section: 'Demos', path: '/demos/hr', keywords: ['hr', 'org', 'tree', 'employee', 'hierarchy'] },
  { id: 'basic', title: 'Basic Table', section: 'Demos', path: '/demos/basic', keywords: ['basic', 'simple', 'table'] },
  { id: 'playground', title: 'Playground', section: 'Pages', path: '/playground', keywords: ['playground', 'try', 'interactive', 'live'] },
  { id: 'theme-builder', title: 'Theme Builder', section: 'Pages', path: '/theme-builder', keywords: ['theme', 'color', 'customize', 'builder'] },
  { id: 'changelog', title: 'Changelog', section: 'Pages', path: '/changelog', keywords: ['changelog', 'version', 'release', 'history'] },
  { id: 'skills', title: 'Skills', section: 'Pages', path: '/skills', keywords: ['cursor', 'agent', 'ai', 'skills'] },
  { id: 'getting-started', title: 'Getting Started', section: 'Docs', path: '/docs/getting-started', keywords: ['start', 'install', 'setup', 'quick'] },
  { id: 'installation', title: 'Installation', section: 'Docs', path: '/docs/installation', keywords: ['install', 'npm', 'yarn'] },
  { id: 'columns', title: 'Column Definitions', section: 'Docs', path: '/docs/columns', keywords: ['column', 'definition', 'accessor'] },
  { id: 'sorting', title: 'Sorting', section: 'Docs', path: '/docs/sorting', keywords: ['sort', 'order', 'asc', 'desc'] },
  { id: 'filtering', title: 'Filtering', section: 'Docs', path: '/docs/filtering', keywords: ['filter', 'search', 'query'] },
  { id: 'pagination', title: 'Pagination', section: 'Docs', path: '/docs/pagination', keywords: ['page', 'pagination', 'size'] },
  { id: 'selection', title: 'Row Selection', section: 'Docs', path: '/docs/selection', keywords: ['select', 'checkbox', 'row'] },
  { id: 'theming', title: 'Theming', section: 'Docs', path: '/docs/theming', keywords: ['theme', 'dark', 'light', 'color'] },
  { id: 'tree-data', title: 'Tree Data', section: 'Docs', path: '/docs/tree-data', keywords: ['tree', 'hierarchy', 'expand', 'collapse'] },
  { id: 'api-reference', title: 'API Reference', section: 'Docs', path: '/docs/api-reference', keywords: ['api', 'props', 'reference'] },
  { id: 'cell-editing', title: 'Cell Editing', section: 'Docs', path: '/docs/cell-editing', keywords: ['edit', 'cell', 'inline', 'input'] },
  { id: 'export', title: 'Export (CSV / JSON)', section: 'Docs', path: '/docs/export', keywords: ['export', 'csv', 'json', 'download'] },
];
