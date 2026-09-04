import type { NavItem, FooterLink, VersionInfo, DemoMeta, Stat, FeatureItem, DocSection, ApiSection, ThemePreset } from '@/types';
import { CURRENT_VERSION } from './numbers.const';

export const NAV_ITEMS: NavItem[] = [
  { id: 'demos', label: 'Demos', href: '/demos', isLink: true },
  { id: 'playground', label: 'Playground', href: '/playground', isLink: true },
  { id: 'docs', label: 'Docs', href: '/docs/getting-started', isLink: true },
  { id: 'api', label: 'API', href: '/docs/api-reference', isLink: true },
  { id: 'changelog', label: 'Changelog', href: '/changelog', isLink: true },
  { id: 'skills', label: 'Skills', href: '/skills', isLink: true },
];

export const FOOTER_LINKS: FooterLink[] = [
  { label: 'npm', href: 'https://www.npmjs.com/package/@forgedevstack/grid-table' },
  { label: 'ForgeStack', href: 'https://forgedevstack.com' },
  { label: 'Bear UI', href: 'https://www.npmjs.com/package/@forgedevstack/bear' },
  { label: 'Harbor', href: 'https://www.npmjs.com/package/@forgedevstack/harbor' },
];

export const VERSIONS: VersionInfo[] = [
  { version: '1.1.5', date: '2026-09-04' },
  { version: '1.1.4', date: '2026-08-22' },
  { version: '1.1.3', date: '2026-08-08' },
  { version: '1.1.2', date: '2026-07-24' },
  { version: '1.1.1', date: '2026-07-11' },
  { version: '1.1.0', date: '2026-05-20' },
  { version: '1.0.9', date: '2026-03-28' },
  { version: '1.0.7', date: '2026-02-24' },
  { version: '1.0.6', date: '2026-02-19' },
  { version: '1.0.2', date: '2026-01-17' },
  { version: '1.0.1', date: '2026-01-17' },
  { version: '1.0.0', date: '2026-01-15' },
];

export const DEMOS: DemoMeta[] = [
  { id: 'release-1-1-5', icon: 'SparklesIcon', path: '/demos/release-1-1-5', tag: 'New' },
  { id: 'touch-gestures', icon: 'SparklesIcon', path: '/demos/touch-gestures', tag: 'New' },
  { id: 'release-1-1-4', icon: 'SparklesIcon', path: '/demos/release-1-1-4' },
  { id: 'enterprise-grid', icon: 'SparklesIcon', path: '/demos/enterprise-grid' },
  { id: 'infinite-scroll', icon: 'LoaderIcon', path: '/demos/infinite-scroll', tag: 'New' },
  { id: 'features', icon: 'SparklesIcon', path: '/demos/features', tag: 'Popular' },
  { id: 'pinned-row-groups', icon: 'LayersIcon', path: '/demos/pinned-row-groups' },
  { id: 'column-formula-engine', icon: 'CodeIcon', path: '/demos/column-formula-engine' },
  { id: 'saved-views', icon: 'SaveIcon', path: '/demos/saved-views' },
  { id: 'advanced-filter-builder', icon: 'FilterIcon', path: '/demos/advanced-filter-builder' },
  { id: 'basic', icon: 'TableIcon', path: '/demos/basic', tag: 'Popular' },
  { id: 'theme-playground', icon: 'PaletteIcon', path: '/demos/theme-playground', tag: 'Interactive' },
  { id: 'accessibility', icon: 'KeyboardIcon', path: '/demos/accessibility', tag: 'Guide' },
  { id: 'master-detail', icon: 'LayersIcon', path: '/demos/master-detail' },
  { id: 'persisted-state', icon: 'SaveIcon', path: '/demos/persisted-state' },
  { id: 'server-driven', icon: 'ServerIcon', path: '/demos/server-driven' },
  { id: 'column-grouping', icon: 'GridIcon', path: '/demos/column-grouping', tag: 'Pattern' },
  { id: 'virtualization', icon: 'LoaderIcon', path: '/demos/virtualization' },
  { id: 'finance', icon: 'TrendingUpIcon', path: '/demos/finance' },
  { id: 'hr', icon: 'UsersIcon', path: '/demos/hr' },
];

export const STATS: Stat[] = [
  { value: '40+', label: 'Features' },
  { value: '0', label: 'Dependencies' },
  { value: '45KB', label: 'Bundle Size' },
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
    icon: 'keyboard',
    title: 'Keyboard Navigation',
    description: 'Arrow keys, Tab, Enter to edit, Escape, Home/End, PageUp/Down for full keyboard control.',
  },
  {
    icon: 'menu',
    title: 'Context Menu',
    description: 'Right-click for copy, filter by value, pin column, hide column. Add custom actions.',
  },
  {
    icon: 'export',
    title: 'Multi-Format Export',
    description: 'Export to CSV, JSON, Excel (SpreadsheetML), and PDF. Copy to clipboard.',
  },
  {
    icon: 'undo',
    title: 'Undo / Redo',
    description: 'Cell edit history with Ctrl+Z / Ctrl+Y. Configurable max history depth.',
  },
  {
    icon: 'pin',
    title: 'Frozen Rows',
    description: 'Pin summary or total rows to top or bottom of viewport while scrolling.',
  },
  {
    icon: 'reorder',
    title: 'Row Reordering',
    description: 'Drag-and-drop row reordering with visual handle and drop target.',
  },
  {
    icon: 'print',
    title: 'Print Mode',
    description: 'Styled printable table view with title, date, and page size options.',
  },
  {
    icon: 'bar',
    title: 'Status Bar',
    description: 'Footer showing row count, selection count, and column aggregations (sum, avg, min, max).',
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
  { id: 'saved-views', title: 'Saved Views', path: '/docs/saved-views', icon: 'SaveIcon' },
  { id: 'advanced-filters', title: 'Advanced Filters', path: '/docs/advanced-filters', icon: 'FilterIcon' },
  { id: 'formulas', title: 'Column Formulas', path: '/docs/formulas', icon: 'CodeIcon' },
  { id: 'virtualization', title: 'Virtualization', path: '/docs/virtualization', icon: 'LoaderIcon' },
  { id: 'export-scope', title: 'Export Scope', path: '/docs/export-scope', icon: 'DownloadIcon' },
  { id: 'enterprise-grid', title: 'Enterprise Grid', path: '/docs/enterprise-grid', icon: 'LayersIcon' },
  { id: 'release-1-1-5', title: '1.1.5', path: '/docs/release-1-1-5', icon: 'SparklesIcon' },
  { id: 'advanced-patterns', title: 'Advanced patterns', path: '/docs/advanced-patterns', icon: 'LayersIcon' },
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
      { name: 'pivot', type: 'PivotConfig', default: '—', description: 'Client-side pivot: rowFields × columnFields → value aggregations.' },
      { name: 'rowGroupDropZone', type: 'boolean | RowGroupDropZoneConfig', default: '—', description: 'Show a drop-zone to add row groups from column headers.' },
      { name: 'onRowGroupsChange', type: '(groups: RowGroupConfig[]) => void', default: '—', description: 'Controlled row-groups after drop-zone or chip remove.' },
      { name: 'cellComments', type: 'CellCommentsConfig', default: '—', description: 'Excel-style cell notes with indicator and popover.' },
      { name: 'rowHeight', type: 'RowHeightConfig', default: '—', description: 'Default/min/max row height, auto wrap, and resize handle.' },
      { name: 'cellSpan', type: 'CellSpanConfig', default: '—', description: 'Optional getColSpan / getRowSpan for body cells.' },
      { name: 'enableRowSelection', type: 'boolean', default: 'false', description: 'Enable row checkboxes for selection.' },
      { name: 'enableMultiSelect', type: 'boolean', default: 'false', description: 'Allow selecting multiple rows.' },
      { name: 'enableDragDrop', type: 'boolean', default: 'true', description: 'Enable column reordering via drag.' },
      { name: 'enableColumnResize', type: 'boolean', default: 'true', description: 'Enable column edge resize handles.' },
      { name: 'enableRowExpansion', type: 'boolean', default: 'false', description: 'Allow rows to expand with additional content.' },
      { name: 'stickyHeader', type: 'boolean', default: 'true', description: 'Keep header fixed while scrolling.' },
      { name: 'showPagination', type: 'boolean', default: 'true', description: 'Show pagination controls.' },
      { name: 'showFilter', type: 'boolean', default: 'true', description: 'Show column-level filter icons.' },
      { name: 'showGlobalFilter', type: 'boolean', default: 'true', description: 'Show global search toolbar.' },
      { name: 'paginationConfig', type: 'PaginationConfig', default: '{ initialPageSize: 10 }', description: 'Page size, initial page, manualPagination, totalRowCount for server slices.' },
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
      { name: 'contextMenu', type: 'ContextMenuConfig', default: '—', description: 'Right-click context menu with copy, filter, pin, hide, and custom actions.' },
      { name: 'statusBar', type: 'StatusBarConfig', default: '—', description: 'Footer bar with row count, selected count, and aggregations.' },
      { name: 'frozenRows', type: 'FrozenRowsConfig', default: '—', description: 'Pin rows to top or bottom of viewport.' },
      { name: 'treeData', type: 'TreeConfig', default: '—', description: 'Hierarchical tree data with expand/collapse.' },
      { name: 'keyboardNavigation', type: 'KeyboardNavConfig', default: '—', description: 'Keyboard navigation between cells.' },
      { name: 'rowReorder', type: 'RowReorderConfig', default: '—', description: 'Drag-and-drop row reordering.' },
      { name: 'undoRedo', type: 'UndoRedoConfig', default: '—', description: 'Undo/redo for cell edits.' },
      { name: 'printConfig', type: 'PrintConfig', default: '—', description: 'Print mode with title and date.' },
      { name: 'enableCopy', type: 'boolean', default: 'false', description: 'Show copy-to-clipboard button in toolbar.' },
      { name: 'enableExport', type: "boolean | string | string[]", default: 'false', description: "Export: true, 'csv', ['csv','excel','pdf']." },
      { name: 'exportScope', type: "'all' | 'filtered' | 'sorted' | 'selected'", default: "'sorted'", description: 'Which rows to include in export, copy, and print. selected with no rows is a no-op.' },
      { name: 'savedViews', type: 'SavedViewsConfig', default: '—', description: 'Named view presets with optional URL sync via syncUrl.' },
      { name: 'virtualize', type: 'boolean | VirtualizeConfig', default: 'false', description: 'Window virtualization — render only visible rows.' },
      { name: 'advancedFilter', type: 'AdvancedFilterConfig', default: '—', description: 'Nested AND/OR filter tree with FilterBuilder panel.' },
      { name: 'rowGroups', type: 'RowGroupConfig', default: '—', description: 'Group rows by field with aggregate footers and optional collapsible headers.' },
      { name: 'rangeSelection', type: 'RangeSelectionConfig', default: '—', description: 'Excel-style range selection with copy/paste, Shift+Arrows, Escape clear, and fillHandle / Ctrl+D.' },
      { name: 'infiniteScroll', type: 'InfiniteScrollConfig', default: '—', description: 'Block loading on scroll for large server-side datasets.' },
      { name: 'flashCells', type: 'FlashCellsConfig', default: '—', description: 'Brief highlight on cells after paste or programmatic updates.' },
      { name: 'touchGestures', type: 'TouchGesturesConfig', default: '—', description: 'Mobile swipe actions and long-press context menu when enabled.' },
      { name: 'alignColumnGroups', type: 'boolean', default: 'true', description: 'Render columnGroups as aligned multi-row header with colspan.' },
      { name: 'columnGroups', type: 'ColumnGroupConfig[]', default: '—', description: 'Grouped column header labels spanning child columns.' },
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
      { name: 'filterType', type: "'text' | 'number' | 'date' | 'select' | 'set' | 'boolean' | 'custom'", default: "'text'", description: "Filter UI type. 'set' uses checkbox list + 'in' operator; 'date' shows from/to range with 'between'." },
      { name: 'filterOptions', type: 'FilterOption[]', default: '—', description: "Options for select and set filters (label/value pairs)." },
      { name: 'hidden', type: 'boolean', default: 'false', description: 'Hide this column.' },
      { name: 'renderSubCell', type: '(row) => ReactNode', default: '—', description: 'Render expanded sub-row content.' },
      { name: 'formula', type: 'string', default: '—', description: 'Computed column expression evaluated from other fields.' },
      { name: 'groupId', type: 'string', default: '—', description: 'Optional column group id for colspan headers.' },
      { name: 'editable', type: 'boolean | EditableConfig', default: 'false', description: 'Enable inline cell editing for this column.' },
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
      { name: 'useKeyboardNavigation', type: 'hook', default: '—', description: 'Arrow key navigation, focus management, edit mode.' },
      { name: 'useRowReorder', type: 'hook', default: '—', description: 'Row drag-and-drop state and handlers.' },
      { name: 'useUndoRedo', type: 'hook', default: '—', description: 'Edit history with undo/redo and keyboard shortcuts.' },
      { name: 'useTreeData', type: 'hook', default: '—', description: 'Tree flattening, expand/collapse, indent calculation.' },
      { name: 'useSavedViews', type: 'hook', default: '—', description: 'Apply and switch named view presets externally.' },
      { name: 'useVirtualizedWindow', type: 'hook', default: '—', description: 'Compute visible window indexes for virtualized rows.' },
      { name: 'useRangeSelection', type: 'hook', default: '—', description: 'Excel-style range selection state, drag, and fill-handle helpers.' },
      { name: 'useInfiniteScroll', type: 'hook', default: '—', description: 'SSRM-style block loading driven by scroll position.' },
      { name: 'useRowGroupExpansion', type: 'hook', default: '—', description: 'Collapse/expand state for grouped header rows.' },
      { name: 'useTouchGestures', type: 'hook', default: '—', description: 'Swipe offset and long-press handlers for touch rows.' },
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
