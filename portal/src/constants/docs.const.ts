// ── Docs page content ────────────────────────────────
// Each section is a complete doc that can be rendered standalone.

export const DOC_GETTING_STARTED = `## Getting Started

Install Grid Table and its required CSS:

\`\`\`bash
npm install @forgedevstack/grid-table
\`\`\`

Import the CSS once in your entry file:

\`\`\`tsx
import '@forgedevstack/grid-table/grid-table.css';
\`\`\`

Create your first grid:

\`\`\`tsx
import { GridTable } from '@forgedevstack/grid-table';

const columns = [
  { id: 'name', accessor: 'name', header: 'Name', sortable: true },
  { id: 'email', accessor: 'email', header: 'Email' },
];

const data = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
];

export default function App() {
  return <GridTable data={data} columns={columns} showPagination />;
}
\`\`\`

Grid Table works seamlessly with **Bear UI** and the ForgeStack ecosystem. Every part is customizable via props — from theming and translations to row rendering and column definitions.`;

export const DOC_INSTALLATION = `## Installation

### npm
\`\`\`bash
npm install @forgedevstack/grid-table
\`\`\`

### pnpm
\`\`\`bash
pnpm add @forgedevstack/grid-table
\`\`\`

### yarn
\`\`\`bash
yarn add @forgedevstack/grid-table
\`\`\`

### Peer Dependencies

Grid Table requires **React 16.8+** and **react-dom 16.8+**.

### CSS Import

You **must** import the compiled CSS file once:

\`\`\`tsx
import '@forgedevstack/grid-table/grid-table.css';
\`\`\`

### Optional: Bear UI Provider

For best results, wrap your app with \`BearProvider\`:

\`\`\`tsx
import { BearProvider } from '@forgedevstack/bear';
import '@forgedevstack/bear/styles.css';

<BearProvider defaultMode="dark">
  <App />
</BearProvider>
\`\`\``;

export const DOC_COLUMNS = `## Column Definitions

Columns are defined as an array of \`ColumnDefinition\` objects:

\`\`\`tsx
const columns: ColumnDefinition<User>[] = [
  {
    id: 'name',
    accessor: 'name',       // key or function
    header: 'Full Name',
    sortable: true,
    filterable: true,
    width: 200,
    sticky: 'left',         // pin to left edge
  },
  {
    id: 'role',
    accessor: 'role',
    header: 'Role',
    filterType: 'select',
    filterOptions: [
      { value: 'admin', label: 'Admin' },
      { value: 'user', label: 'User' },
    ],
    render: (value) => <Badge>{String(value)}</Badge>,
  },
];
\`\`\`

### Key Properties

| Prop | Type | Description |
|------|------|-------------|
| \`id\` | string | Unique column identifier |
| \`accessor\` | string \\| function | Data field key or accessor function |
| \`header\` | ReactNode | Column header content |
| \`width\` | number \\| string | Column width |
| \`sortable\` | boolean | Enable sorting |
| \`filterable\` | boolean | Enable filtering |
| \`sticky\` | 'left' \\| 'right' | Pin column |
| \`render\` | function | Custom cell renderer |
| \`renderSubCell\` | function | Expanded row content |`;

export const DOC_SORTING = `## Sorting

Enable sorting on columns with \`sortable: true\`:

\`\`\`tsx
const columns = [
  { id: 'name', accessor: 'name', header: 'Name', sortable: true },
  { id: 'age', accessor: 'age', header: 'Age', sortable: true },
];
\`\`\`

### Multi-Sort

Enable multi-column sorting:

\`\`\`tsx
<GridTable
  data={data}
  columns={columns}
  sortConfig={{ multiSort: true }}
/>
\`\`\`

### Custom Sort Function

\`\`\`tsx
{
  id: 'date',
  accessor: 'date',
  header: 'Date',
  sortable: true,
  sortFn: (a, b, direction) => {
    const da = new Date(a as string).getTime();
    const db = new Date(b as string).getTime();
    return direction === 'asc' ? da - db : db - da;
  },
}
\`\`\`

### Sort Callback

\`\`\`tsx
<GridTable
  onSort={(sorting) => console.log('Sort changed:', sorting)}
/>
\`\`\``;

export const DOC_FILTERING = `## Filtering

Enable filtering on columns with \`filterable: true\`. Grid Table supports **global search** and **column-level filters**.

### Global Search

\`\`\`tsx
<GridTable data={data} columns={columns} showGlobalFilter />
\`\`\`

### Column Filters

\`\`\`tsx
<GridTable data={data} columns={columns} showFilter />
\`\`\`

### Filter Types

- \`text\` — Free-text search (default)
- \`number\` — Numeric comparison
- \`date\` — Date range
- \`select\` — Dropdown selection
- \`boolean\` — True/false toggle
- \`custom\` — Custom filter function

### Select Filter Example

\`\`\`tsx
{
  id: 'status',
  accessor: 'status',
  header: 'Status',
  filterable: true,
  filterType: 'select',
  filterOptions: [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
  ],
}
\`\`\``;

export const DOC_PAGINATION = `## Pagination

Enable pagination with \`showPagination\`:

\`\`\`tsx
<GridTable
  data={data}
  columns={columns}
  showPagination
  paginationConfig={{
    initialPageSize: 10,
    pageSizeOptions: [5, 10, 20, 50],
  }}
/>
\`\`\`

### PaginationConfig

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`initialPage\` | number | 1 | Initial page index |
| \`initialPageSize\` | number | 10 | Initial rows per page |
| \`pageSizeOptions\` | number[] | [10,20,50,100] | Page size dropdown options |
| \`manualPagination\` | boolean | false | Parent supplies one page; grid does not slice |
| \`totalRowCount\` | number | — | Total rows when \`manualPagination\` is true |

### Page Change Callback

\`\`\`tsx
<GridTable
  onPageChange={(page, pageSize) => {
    console.log('Page:', page, 'Size:', pageSize);
  }}
/>
\`\`\`

### Server-driven (manual) pagination

When the server returns one page at a time, pass the slice as \`data\`, set \`paginationConfig.manualPagination: true\`, and \`paginationConfig.totalRowCount\` to the full result count. Fetch the next slice inside \`onPageChange\`.

See the [Server-driven demo](/demos/server-driven) and [Advanced patterns](/docs/advanced-patterns).`;

export const DOC_SELECTION = `## Row Selection

Enable row selection with checkboxes:

\`\`\`tsx
<GridTable
  data={data}
  columns={columns}
  enableRowSelection
  onRowSelect={(selectedRows) => {
    console.log('Selected:', selectedRows);
  }}
/>
\`\`\`

### Multi-Select

\`\`\`tsx
<GridTable
  enableRowSelection
  enableMultiSelect
/>
\`\`\`

### Controlled Selection

Use \`getRowId\` to control which property identifies each row:

\`\`\`tsx
<GridTable
  enableRowSelection
  getRowId={(row) => row.uniqueKey}
/>
\`\`\``;

export const DOC_DRAG_DROP = `## Drag & Drop

Enable column reordering via drag:

\`\`\`tsx
<GridTable
  data={data}
  columns={columns}
  enableDragDrop
/>
\`\`\`

Columns can be reordered by dragging the header cells. A visual indicator shows where the column will be dropped.

### Column Resize

Enable resize handles on column edges:

\`\`\`tsx
<GridTable enableColumnResize />
\`\`\`

### Constraints

Use \`minWidth\` and \`maxWidth\` on column definitions:

\`\`\`tsx
{ id: 'name', accessor: 'name', header: 'Name', minWidth: 100, maxWidth: 400 }
\`\`\``;

export const DOC_THEMING = `## Theming

Grid Table supports full theming via CSS variables and the \`themeOverride\` prop.

### Theme Mode

\`\`\`tsx
<GridTable themeMode="dark" />
<GridTable themeMode="light" />
\`\`\`

### Custom Theme Override

\`\`\`tsx
<GridTable
  themeOverride={{
    colors: {
      background: { primary: '#0a0a14', secondary: '#111122', tertiary: '#1a1a2e', hover: '#222240' },
      text: { primary: '#f8fafc', secondary: '#94a3b8', muted: '#64748b' },
      border: { default: 'rgba(255,255,255,0.06)', hover: 'rgba(255,255,255,0.12)' },
      accent: { primary: '#22c55e', success: '#22c55e', warning: '#eab308', error: '#ef4444' },
    },
  }}
/>
\`\`\`

### CSS Variables

Override at the CSS level:

\`\`\`css
.grid-table {
  --gt-bg-primary: #0a0a14;
  --gt-text-primary: #f8fafc;
  --gt-accent-primary: #22c55e;
  --gt-border-color: rgba(255,255,255,0.06);
}
\`\`\`

### Use the Theme Builder

Visit the [Theme Builder](/theme-builder) to create and export custom themes interactively.`;

export const DOC_TREE_DATA = `## Tree Data

Use \`treeData\` with rows that contain a \`children\` array (or configure \`childrenField\`). The grid flattens, indents, and shows expand toggles.

\`\`\`tsx
const data = [
  {
    id: 1,
    name: 'CEO',
    children: [
      { id: 2, name: 'VP Eng', children: [{ id: 5, name: 'Engineer' }] },
    ],
  },
];

<GridTable
  data={data}
  columns={columns}
  treeData={{ enabled: true, childrenField: 'children', indentSize: 24 }}
/>
\`\`\`

### Row expansion (flat tables)

For master–detail on **flat** rows (no nested \`children\`), use \`enableRowExpansion\` and \`renderRowExpansion\` — see [Master–detail demo](/demos/master-detail).

### HR Demo

See the [HR Demo](/demos/hr) for an org-chart style tree.`;

export const DOC_ADVANCED_PATTERNS = `## Advanced patterns

Guides that pair with the new portal demos. Each page under **Demos** includes a copy-ready code block.

### Accessibility

Enable \`keyboardNavigation\` and, when editing, \`enableCellEdit\` with \`onCellEdit\`. Keep toolbar controls as real focusable buttons. Do not remove \`:focus-visible\` outlines without substituting a visible focus ring. Test with VoiceOver, NVDA, or Chrome Accessibility Insights.

Live: [Accessibility demo](/demos/accessibility)

### Master–detail

Use \`enableRowExpansion\` and \`renderRowExpansion\` to show line items, notes, or a nested grid under a row.

Live: [Master–detail demo](/demos/master-detail)

### Persisted pagination

Read \`initialPage\` / \`initialPageSize\` from \`localStorage\` (or your API) into \`paginationConfig\`, then write back inside \`onPageChange\`.

Live: [Persisted state demo](/demos/persisted-state)

### Server-driven paging

Set \`paginationConfig.manualPagination: true\`, \`paginationConfig.totalRowCount\` to the server total, pass only the current page in \`data\`, and refetch in \`onPageChange\`. Apply sort/filter on the server when the dataset is large.

Live: [Server-driven demo](/demos/server-driven)

### Column grouping band

Multi-row headers with colspan are not built in yet. Use \`renderHeader\` to render a labelled band above the grid that lines up with your column count (see demo).

Live: [Column grouping demo](/demos/column-grouping)

### Large lists and virtualization

Use \`lazyLoad\` with \`dimensions.maxHeight\` to reveal rows in batches while scrolling. For window virtualization (only visible rows in the DOM), set \`virtualize\` to \`true\` or pass \`VirtualizeConfig\` with \`rowHeight\` and \`overscan\`.

See the dedicated [Virtualization guide](/docs/virtualization).

Live: [Virtualization demo](/demos/virtualization)

### Export scope (1.1.1)

Control which rows are included in CSV/Excel/PDF export, clipboard copy, and print with \`exportScope\`: \`'all'\`, \`'filtered'\`, \`'sorted'\` (default), or \`'selected'\`.

See [Export scope](/docs/export-scope).`;

export const DOC_SAVED_VIEWS = `## Saved views

Named presets capture sort, filters, hidden columns, column widths, pagination, and density. Pass \`savedViews\` with a \`views\` array and optional \`activeViewId\`.

\`\`\`tsx
<GridTable
  savedViews={{
    views: [
      { id: 'default', label: 'Default', snapshot: { sort: [], filters: {} } },
      { id: 'active', label: 'Active only', snapshot: { filters: { status: 'active' } } },
    ],
    activeViewId: 'default',
    showViewSwitcher: true,
  }}
/>
\`\`\`

### URL sync (1.1.1)

Set \`syncUrl: true\` to read and write the active view id to the query string (\`?view=\` by default). Share links restore the same table state.

\`\`\`tsx
savedViews={{ views, syncUrl: true, urlParam: 'view' }}
\`\`\`

Live: [Saved views demo](/demos/saved-views)`;

export const DOC_ADVANCED_FILTERS = `## Advanced filter builder

Build nested AND/OR filter trees with \`advancedFilter\`. Rules support operators including \`in\` and \`notIn\`. Enable the Bear \`FilterBuilder\` panel with \`showPanel: true\`.

\`\`\`tsx
<GridTable
  advancedFilter={{
    tree: filterTree,
    showPanel: true,
    onTreeChange: setFilterTree,
  }}
/>
\`\`\`

Use \`evaluateFilterTree\` from \`@forgedevstack/grid-table\` for standalone filtering.

Live: [Advanced filter builder demo](/demos/advanced-filter-builder)`;

export const DOC_FORMULAS = `## Column formulas

Add a \`formula\` string to any \`ColumnDefinition\`. Expressions reference other column accessors and support safe arithmetic (\`revenue - cost\`, \`(profit / revenue) * 100\`).

\`\`\`tsx
{ id: 'margin', accessor: 'margin', header: 'Margin %', formula: '(profit / revenue) * 100' }
\`\`\`

Formulas are evaluated via \`applyFormulaColumns\` in the data pipeline.

Live: [Column formula engine demo](/demos/column-formula-engine)`;

export const DOC_VIRTUALIZATION = `## Virtualization

Grid Table ships two strategies for large datasets:

### Lazy load

\`lazyLoad\` reveals rows in batches as the user scrolls. Pair with \`dimensions.maxHeight\` for a scrollable body.

### Window virtualization

\`virtualize\` renders only visible rows plus an overscan buffer. Pass a boolean or config:

\`\`\`tsx
<GridTable
  virtualize={{ rowHeight: 44, overscan: 6 }}
  dimensions={{ maxHeight: 420 }}
/>
\`\`\`

Export \`useVirtualizedWindow\` for custom table layouts.

Live: [Virtualization demo](/demos/virtualization)`;

export const DOC_EXPORT_SCOPE = `## Export scope

The \`exportScope\` prop controls which rows are included when exporting, copying to clipboard, or printing:

| Value | Rows included |
|-------|---------------|
| \`'all'\` | Full \`data\` prop |
| \`'filtered'\` | After filters (before sort) |
| \`'sorted'\` | After filters and sort (default) |
| \`'selected'\` | Only checked rows (requires row selection) |

\`\`\`tsx
<GridTable
  enableExport="csv"
  enableCopy
  exportScope="selected"
  enableRowSelection
/>
\`\`\`

Use \`resolveExportData\` from \`@forgedevstack/grid-table\` when building custom export UIs.`;

export const DOC_ENTERPRISE_GRID = `## Enterprise grid features

Grid Table 1.1.1 adds AG Grid–style capabilities for dense data apps.

### Set and date column filters

On \`ColumnDefinition\`, set \`filterType: 'set'\` with \`filterOptions\` for checkbox filters (uses \`in\` operator). Set \`filterType: 'date'\` for a from/to date range (\`between\`).

### Expandable row groups

\`rowGroups\` supports \`showHeaders: true\` to inject collapsible group header rows. Use \`defaultExpanded\` and click the chevron to toggle. Pair with \`pinned: true\` and \`footer\` for aggregate footers.

Live: [Pinned row groups demo](/demos/pinned-row-groups)

### Range selection and clipboard paste

\`\`\`tsx
<GridTable
  enableCellEdit
  rangeSelection={{ enabled: true, enablePaste: true }}
/>
\`\`\`

Drag to select a cell range. Ctrl/Cmd+V pastes tab-separated values from Excel or Sheets into the range.

### Infinite scroll (SSRM-style)

\`\`\`tsx
<GridTable
  infiniteScroll={{
    enabled: true,
    totalRowCount: 10000,
    blockSize: 50,
    onLoadBlock: async (start, end) => fetchRows(start, end),
  }}
/>
\`\`\`

Export \`useInfiniteScroll\` for custom scroll containers.

### Multi-row column group headers

Pass \`columnGroups\` with \`alignColumnGroups\` (default \`true\`) to render a real colspan header row above column labels.

Live: [Column grouping demo](/demos/column-grouping)

### Delta updates and flash cells

\`applyTransaction({ add, update, remove })\` mutates row arrays in place. \`flashCells\` highlights changed cells after paste or programmatic edits.`;

export const DOC_CONTENT_MAP: Record<string, string> = {
  'getting-started': DOC_GETTING_STARTED,
  'installation': DOC_INSTALLATION,
  'columns': DOC_COLUMNS,
  'sorting': DOC_SORTING,
  'filtering': DOC_FILTERING,
  'pagination': DOC_PAGINATION,
  'selection': DOC_SELECTION,
  'drag-drop': DOC_DRAG_DROP,
  'theming': DOC_THEMING,
  'tree-data': DOC_TREE_DATA,
  'saved-views': DOC_SAVED_VIEWS,
  'advanced-filters': DOC_ADVANCED_FILTERS,
  'formulas': DOC_FORMULAS,
  'virtualization': DOC_VIRTUALIZATION,
  'export-scope': DOC_EXPORT_SCOPE,
  'enterprise-grid': DOC_ENTERPRISE_GRID,
  'advanced-patterns': DOC_ADVANCED_PATTERNS,
};
