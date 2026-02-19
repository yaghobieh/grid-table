import type { NavItem, FooterLink, VersionInfo, DemoMeta, Stat, FeatureItem, DocSection, ApiSection, ThemePreset } from '@/types';
import { CURRENT_VERSION } from './numbers.const';

export const NAV_ITEMS: NavItem[] = [
  { id: 'demos', label: 'Demos', href: '/demos', isLink: true },
  { id: 'playground', label: 'Playground', href: '/playground', isLink: true },
  { id: 'docs', label: 'Docs', href: '/docs/getting-started', isLink: true },
  { id: 'api', label: 'API', href: '/docs/api-reference', isLink: true },
  { id: 'changelog', label: 'Changelog', href: '/changelog', isLink: true },
];

export const FOOTER_LINKS: FooterLink[] = [
  { label: 'npm', href: 'https://www.npmjs.com/package/@forgedevstack/grid-table' },
  { label: 'ForgeStack', href: 'https://forgedevstack.com' },
  { label: 'Bear UI', href: 'https://www.npmjs.com/package/@forgedevstack/bear' },
  { label: 'Harbor', href: 'https://www.npmjs.com/package/@forgedevstack/harbor' },
];

export const VERSIONS: VersionInfo[] = [
  {
    version: '1.0.6',
    date: '2026-02-19',
    highlights: [
      'Cell editing with inline validation',
      'CSV and JSON export',
      'Interactive Playground with live code generation',
      'Cmd+K search modal across docs and demos',
      'Changelog page with full version history',
      'Sort, hover, and row entry animation effects',
      'Tree data with defaultExpandedIds prop',
      'Lazy load / infinite scroll',
      'Finance demo with live updates and sparklines',
      'HR demo with org-chart tree view',
      'Theme Builder with code export',
      'Internationalization (English / Spanish)',
    ],
  },
  {
    version: '1.0.2',
    date: '2026-01-17',
    highlights: [
      'Migrated from Tailwind CSS to SCSS',
      'Zero-config styling — compiled CSS included',
      'Fixed package.json exports order',
    ],
  },
  {
    version: '1.0.1',
    date: '2026-01-17',
    highlights: [
      'Initial npm publication with @forgedevstack scope',
    ],
  },
  {
    version: '1.0.0',
    date: '2026-01-15',
    highlights: [
      'Initial release',
      'Sorting, filtering, pagination',
      'Drag & drop columns, resize',
      'Row selection, row expansion',
      'Mobile responsive drawer',
      'Dark/light theme, skeleton loading',
    ],
  },
];

export const DEMOS: DemoMeta[] = [
  {
    id: 'finance',
    title: 'Finance',
    description: 'Live-updating financial data with P&L, sparklines, and real-time tickers.',
    icon: 'TrendingUpIcon',
    path: '/demos/finance',
    tag: 'Popular',
  },
  {
    id: 'hr',
    title: 'HR / Org Chart',
    description: 'Hierarchical employee data with tree view, expand/collapse, and reporting lines.',
    icon: 'UsersIcon',
    path: '/demos/hr',
    tag: 'New',
  },
  {
    id: 'basic',
    title: 'Basic Table',
    description: 'Full-featured grid with sorting, filtering, pagination, and row selection.',
    icon: 'TableIcon',
    path: '/demos/basic',
  },
  {
    id: 'theme-builder',
    title: 'Theme Builder',
    description: 'Customize every color, font, and spacing — export code for your project.',
    icon: 'PaletteIcon',
    path: '/theme-builder',
    tag: 'Interactive',
  },
];

export const STATS: Stat[] = [
  { value: '25+', label: 'Features' },
  { value: '0', label: 'Dependencies' },
  { value: '42KB', label: 'Bundle Size' },
  { value: '100%', label: 'TypeScript' },
];

export const FEATURES: FeatureItem[] = [
  {
    icon: 'sort',
    title: 'Sort Animations',
    description: 'Smooth animated transitions when sorting columns — arrow rotation, column highlight, and flash effects.',
  },
  {
    icon: 'tree',
    title: 'Tree Data',
    description: 'Hierarchical data with expand/collapse, indentation levels, and parent-child relationships.',
  },
  {
    icon: 'filter',
    title: 'Advanced Filtering',
    description: 'Column-level and global filtering with 12+ operators, custom filter functions, and filter panel.',
  },
  {
    icon: 'drag',
    title: 'Drag & Drop',
    description: 'Reorder columns by dragging, with visual feedback and threshold to prevent accidental moves.',
  },
  {
    icon: 'theme',
    title: 'Theme Builder',
    description: 'Customize every aspect — colors, fonts, spacing, borders. Export ready-to-use code.',
  },
  {
    icon: 'responsive',
    title: 'Responsive Design',
    description: 'Mobile card layout with drawer for filters/sorting, configurable breakpoints.',
  },
  {
    icon: 'selection',
    title: 'Row Selection',
    description: 'Single and multi-select with checkboxes, select-all, and indeterminate state.',
  },
  {
    icon: 'pagination',
    title: 'Pagination',
    description: 'Built-in pagination with customizable page sizes, first/last buttons.',
  },
  {
    icon: 'resize',
    title: 'Column Resize',
    description: 'Drag column edges to resize with min/max width constraints.',
  },
  {
    icon: 'expand',
    title: 'Row Expansion',
    description: 'Expand rows to show detailed content with custom render functions.',
  },
  {
    icon: 'skeleton',
    title: 'Skeleton Loading',
    description: 'Beautiful animated loading placeholder that matches table structure.',
  },
  {
    icon: 'typescript',
    title: 'Full TypeScript',
    description: 'Generic type support, strict type checking, and exported type definitions.',
  },
];

export const QUICK_START_CODE = `import { GridTable } from '@forgedevstack/grid-table';
import '@forgedevstack/grid-table/grid-table.css';

const columns = [
  { id: 'name', accessor: 'name', header: 'Name', sortable: true },
  { id: 'email', accessor: 'email', header: 'Email', sortable: true },
  { id: 'role', accessor: 'role', header: 'Role', filterable: true },
];

const data = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
];

export default function App() {
  return (
    <GridTable
      data={data}
      columns={columns}
      enableRowSelection
      showPagination
      showFilter
    />
  );
}`;

export const THEME_EXPORT_TEMPLATE = `import { GridTable } from '@forgedevstack/grid-table';
import '@forgedevstack/grid-table/grid-table.css';

// Theme generated by Grid Table Theme Builder
export const myTheme = {
  mode: '{{mode}}',
  colors: {
    background: {
      primary: '{{backgroundColor}}',
      secondary: '{{headerBg}}',
      tertiary: '{{borderColor}}',
      hover: '{{rowHoverBg}}',
    },
    text: {
      primary: '{{foregroundColor}}',
      secondary: '{{headerText}}',
      muted: '{{headerText}}88',
    },
    border: {
      default: '{{borderColor}}',
      hover: '{{accentColor}}44',
    },
    accent: {
      primary: '{{accentColor}}',
      success: '#22c55e',
      warning: '#eab308',
      error: '#ef4444',
    },
  },
};

<GridTable
  data={data}
  columns={columns}
  themeMode="{{mode}}"
  themeOverride={myTheme}
/>`;

export const FORGESTACK_PACKAGES = [
  { name: 'Grid Table', description: 'Data grid with animations', command: 'npm i @forgedevstack/grid-table' },
  { name: 'Bear UI', description: 'Component library', command: 'npm i @forgedevstack/bear' },
  { name: 'Harbor', description: 'Backend framework', command: 'npm i @forgedevstack/harbor' },
  { name: 'Synapse', description: 'State management', command: 'npm i @forgedevstack/synapse' },
  { name: 'Compass', description: 'Routing library', command: 'npm i @forgedevstack/compass' },
  { name: 'Crucible', description: 'Testing toolkit', command: 'npm i @forgedevstack/crucible' },
];

export const DOC_SECTIONS: DocSection[] = [
  { id: 'getting-started', title: 'Getting Started', path: '/docs/getting-started', icon: 'RocketIcon' },
  { id: 'installation', title: 'Installation', path: '/docs/installation', icon: 'DownloadIcon' },
  { id: 'columns', title: 'Column Definitions', path: '/docs/columns', icon: 'ColumnsIcon' },
  { id: 'sorting', title: 'Sorting', path: '/docs/sorting', icon: 'ArrowUpIcon' },
  { id: 'filtering', title: 'Filtering', path: '/docs/filtering', icon: 'FilterIcon' },
  { id: 'pagination', title: 'Pagination', path: '/docs/pagination', icon: 'ListIcon' },
  { id: 'selection', title: 'Row Selection', path: '/docs/selection', icon: 'CheckSquareIcon' },
  { id: 'drag-drop', title: 'Drag & Drop', path: '/docs/drag-drop', icon: 'MoveIcon' },
  { id: 'theming', title: 'Theming', path: '/docs/theming', icon: 'PaletteIcon' },
  { id: 'tree-data', title: 'Tree Data', path: '/docs/tree-data', icon: 'GitBranchIcon' },
  { id: 'api-reference', title: 'API Reference', path: '/docs/api-reference', icon: 'CodeIcon' },
];

export const API_SECTIONS: ApiSection[] = [
  {
    id: 'grid-table-props',
    title: 'GridTable Props',
    description: 'All props accepted by the <GridTable /> component.',
    props: [
      { name: 'data', type: 'T[]', default: '—', description: 'Array of row data objects.', required: true },
      { name: 'columns', type: 'ColumnDefinition<T>[]', default: '—', description: 'Column definitions array.', required: true },
      { name: 'loading', type: 'boolean', default: 'false', description: 'Show skeleton loading state.' },
      { name: 'error', type: 'Error | string | null', default: 'null', description: 'Display an error state.' },
      { name: 'themeMode', type: "'light' | 'dark' | 'system'", default: "'system'", description: 'Force a specific theme mode.' },
      { name: 'themeOverride', type: 'Record<string, unknown>', default: '{}', description: 'Override theme colors and styles.' },
      { name: 'enableRowSelection', type: 'boolean', default: 'false', description: 'Enable row checkboxes for selection.' },
      { name: 'enableMultiSelect', type: 'boolean', default: 'false', description: 'Allow selecting multiple rows.' },
      { name: 'enableDragDrop', type: 'boolean', default: 'true', description: 'Enable column reordering via drag.' },
      { name: 'enableColumnResize', type: 'boolean', default: 'true', description: 'Enable column edge resize handles.' },
      { name: 'enableRowExpansion', type: 'boolean', default: 'false', description: 'Allow rows to expand with additional content.' },
      { name: 'stickyHeader', type: 'boolean', default: 'true', description: 'Keep header fixed while scrolling.' },
      { name: 'showPagination', type: 'boolean', default: 'true', description: 'Show pagination controls.' },
      { name: 'showFilter', type: 'boolean', default: 'true', description: 'Show column-level filter icons.' },
      { name: 'showGlobalFilter', type: 'boolean', default: 'true', description: 'Show global search toolbar.' },
      { name: 'paginationConfig', type: 'PaginationConfig', default: '{ initialPageSize: 10 }', description: 'Configure page sizes and initial page.' },
      { name: 'dimensions', type: 'Dimensions', default: '{}', description: 'Width, height, maxHeight constraints.' },
      { name: 'classNames', type: 'ClassNames', default: '{}', description: 'CSS class overrides for every part.' },
      { name: 'styles', type: 'Styles', default: '{}', description: 'Inline style overrides for every part.' },
      { name: 'emptyContent', type: 'ReactNode', default: 'default', description: 'Custom content when data is empty.' },
      { name: 'loadingContent', type: 'ReactNode', default: 'default', description: 'Custom content while loading.' },
      { name: 'renderHeader', type: '() => ReactNode', default: '—', description: 'Render a custom header above the grid.' },
      { name: 'renderFooter', type: '() => ReactNode', default: '—', description: 'Render a custom footer below the grid.' },
      { name: 'onRowClick', type: '(row, index) => void', default: '—', description: 'Callback when a row is clicked.' },
      { name: 'onCellClick', type: '(event) => void', default: '—', description: 'Callback when a cell is clicked.' },
      { name: 'onRowSelect', type: '(rows) => void', default: '—', description: 'Callback when row selection changes.' },
      { name: 'onSort', type: '(sorting) => void', default: '—', description: 'Callback when sorting changes.' },
      { name: 'onFilter', type: '(filters) => void', default: '—', description: 'Callback when filters change.' },
      { name: 'onPageChange', type: '(page, pageSize) => void', default: '—', description: 'Callback when page or page size changes.' },
      { name: 'getRowId', type: '(row) => string | number', default: 'row.id', description: 'Custom row identifier function.' },
      { name: 'getRowClassName', type: '(row, index) => string', default: '—', description: 'Dynamic class name per row.' },
      { name: 'getRowStyle', type: '(row, index) => CSSProperties', default: '—', description: 'Dynamic inline style per row.' },
      { name: 'studio', type: 'boolean', default: 'false', description: 'Enable studio panel for live editing.' },
    ],
  },
  {
    id: 'column-definition',
    title: 'ColumnDefinition',
    description: 'Shape of each column definition object.',
    props: [
      { name: 'id', type: 'string', default: '—', description: 'Unique column identifier.', required: true },
      { name: 'accessor', type: 'string | ((row) => unknown)', default: '—', description: 'Field key or accessor function.', required: true },
      { name: 'header', type: 'ReactNode | (() => ReactNode)', default: '—', description: 'Column header content.', required: true },
      { name: 'width', type: 'ResponsiveValue<number | string>', default: '150', description: 'Column width in pixels or responsive.' },
      { name: 'minWidth', type: 'number', default: '50', description: 'Minimum column width.' },
      { name: 'maxWidth', type: 'number', default: '500', description: 'Maximum column width.' },
      { name: 'align', type: "'left' | 'center' | 'right'", default: "'left'", description: 'Content alignment.' },
      { name: 'sortable', type: 'boolean', default: 'false', description: 'Enable sorting for this column.' },
      { name: 'filterable', type: 'boolean', default: 'false', description: 'Enable filtering for this column.' },
      { name: 'sticky', type: "'left' | 'right'", default: '—', description: 'Pin column to left or right edge.' },
      { name: 'render', type: '(value, row, index) => ReactNode', default: '—', description: 'Custom cell renderer.' },
      { name: 'filterType', type: "'text' | 'number' | 'date' | 'select'", default: "'text'", description: 'Filter input type.' },
      { name: 'filterOptions', type: 'FilterOption[]', default: '—', description: 'Options for select-type filters.' },
      { name: 'hidden', type: 'boolean', default: 'false', description: 'Hide this column.' },
      { name: 'renderSubCell', type: '(row) => ReactNode', default: '—', description: 'Render expanded sub-row content.' },
    ],
  },
  {
    id: 'hooks',
    title: 'Hooks',
    description: 'Custom hooks exported from @forgedevstack/grid-table.',
    props: [
      { name: 'useTable', type: 'hook', default: '—', description: 'Core table state management hook.' },
      { name: 'useSort', type: 'hook', default: '—', description: 'Sorting state and handlers.' },
      { name: 'useFilter', type: 'hook', default: '—', description: 'Filter state and handlers.' },
      { name: 'usePagination', type: 'hook', default: '—', description: 'Pagination state and handlers.' },
      { name: 'useDragDrop', type: 'hook', default: '—', description: 'Column drag-and-drop logic.' },
      { name: 'useBreakpoint', type: 'hook', default: '—', description: 'Responsive breakpoint detection.' },
    ],
  },
];

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: 'midnight',
    label: 'Midnight',
    mode: 'dark',
    backgroundColor: '#0a0a14',
    foregroundColor: '#f8fafc',
    accentColor: '#22c55e',
    borderColor: 'rgba(255,255,255,0.06)',
    headerBg: '#111122',
    headerText: '#94a3b8',
    rowHoverBg: '#1a1a2e',
  },
  {
    id: 'ocean',
    label: 'Ocean',
    mode: 'dark',
    backgroundColor: '#0c1222',
    foregroundColor: '#e2e8f0',
    accentColor: '#38bdf8',
    borderColor: 'rgba(56,189,248,0.12)',
    headerBg: '#0f1a30',
    headerText: '#94a3b8',
    rowHoverBg: '#162033',
  },
  {
    id: 'forest',
    label: 'Forest',
    mode: 'dark',
    backgroundColor: '#0a120a',
    foregroundColor: '#d4e8d4',
    accentColor: '#4ade80',
    borderColor: 'rgba(74,222,128,0.1)',
    headerBg: '#0f1a0f',
    headerText: '#86a886',
    rowHoverBg: '#142214',
  },
  {
    id: 'clean-light',
    label: 'Clean Light',
    mode: 'light',
    backgroundColor: '#ffffff',
    foregroundColor: '#1e293b',
    accentColor: '#2563eb',
    borderColor: 'rgba(0,0,0,0.08)',
    headerBg: '#f8fafc',
    headerText: '#475569',
    rowHoverBg: '#f1f5f9',
  },
  {
    id: 'warm-light',
    label: 'Warm Light',
    mode: 'light',
    backgroundColor: '#fffbf5',
    foregroundColor: '#292524',
    accentColor: '#ea580c',
    borderColor: 'rgba(0,0,0,0.06)',
    headerBg: '#fef3e2',
    headerText: '#78716c',
    rowHoverBg: '#fef7ed',
  },
  {
    id: 'purple-haze',
    label: 'Purple Haze',
    mode: 'dark',
    backgroundColor: '#110f1a',
    foregroundColor: '#e8e4f0',
    accentColor: '#a78bfa',
    borderColor: 'rgba(167,139,250,0.1)',
    headerBg: '#1a1726',
    headerText: '#9e8ec0',
    rowHoverBg: '#1f1a2e',
  },
];
