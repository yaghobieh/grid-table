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
| \`initialPageSize\` | number | 10 | Initial rows per page |
| \`pageSizeOptions\` | number[] | [10,20,50,100] | Page size dropdown options |

### Page Change Callback

\`\`\`tsx
<GridTable
  onPageChange={(page, pageSize) => {
    console.log('Page:', page, 'Size:', pageSize);
  }}
/>
\`\`\``;

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

Display hierarchical data with expand/collapse:

\`\`\`tsx
const data = [
  { id: 1, name: 'CEO', managerId: null, level: 0 },
  { id: 2, name: 'VP Eng', managerId: 1, level: 1 },
  { id: 3, name: 'Sr Engineer', managerId: 2, level: 2 },
];

<GridTable
  data={data}
  columns={columns}
  enableRowExpansion
  renderRowExpansion={(row) => <EmployeeDetail data={row} />}
/>
\`\`\`

### HR Demo

See the [HR Demo](/demos/hr) for a full example with an org-chart tree view, expand/collapse, and hierarchical employee data.`;

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
};
