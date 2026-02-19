# @forgedevstack/grid-table

<p align="center">
  <img src="https://github.com/yaghobieh/grid-table/docs/logo.svg" alt="Grid Table logo" width="120" />
</p>

**@forgedevstack/grid-table** v1.0.6 — A powerful, feature-rich data grid for React with cell editing, CSV/JSON export, sort/hover/row animations, tree data, lazy loading, and theme builder. Zero-config SCSS styling. Part of [ForgeStack](https://forgedevstack.dev).

## Features

- **Cell Editing** — Double-click to edit inline with validation (text, number, select, date, boolean)
- **CSV / JSON Export** — One-click export with `enableExport` prop
- **Table Effects** — Sort animations, row entry effects, hover highlights via `tableEffects` prop
- **Tree Data** — Hierarchical views with `defaultExpandedIds`, expand/collapse all
- **Lazy Load** — Infinite scroll with `lazyLoad` prop (configurable batch size and loader)
- **Dark/Light Theme** — Built-in theme support with customizable colors
- **Filtering** — Column-level and global filtering with multiple operators
- **Sorting** — Single and multi-column sorting with custom sort functions
- **Drag & Drop** — Reorder columns by dragging
- **Column Resize** — Adjust column widths by dragging
- **Pagination** — Built-in pagination with customizable page sizes
- **Row Selection** — Single and multi-select support
- **Row Expansion** — Expandable rows with custom content
- **Responsive** — Mobile-first design with drawer for filters/sorting
- **Skeleton Loading** — Beautiful loading states
- **Overflow Tooltip** — Show full cell content on hover when truncated
- **Expandable Sub-cell** — Extra content per cell via double-click or arrow
- **Studio Panel** — Development/prototyping side panel
- **Context API** — No prop drilling, access state from anywhere
- **TypeScript** — Full type safety
- **Accessible** — ARIA attributes and keyboard navigation

## Installation

```bash
npm i @forgedevstack/grid-table
```

### Import CSS (Required)

```tsx
import '@forgedevstack/grid-table/grid-table.css';
```

Bear styles are loaded automatically.

## Quick Start

```tsx
import { GridTable } from '@forgedevstack/grid-table';
import type { ColumnDefinition } from '@forgedevstack/grid-table';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  [key: string]: unknown;
}

const columns: ColumnDefinition<User>[] = [
  { id: 'name', accessor: 'name', header: 'Name', sortable: true, filterable: true },
  { id: 'email', accessor: 'email', header: 'Email', sortable: true },
  { id: 'role', accessor: 'role', header: 'Role', filterType: 'select', filterOptions: [{ value: 'admin', label: 'Admin' }, { value: 'user', label: 'User' }] },
];

const data: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
];

function App() {
  return (
    <GridTable
      data={data}
      columns={columns}
      enableRowSelection
      showPagination
      showFilter
      enableExport
      tableEffects={{ hover: true, sort: true, row: true }}
    />
  );
}
```

## Cell Editing

Double-click any editable cell to edit inline. Press Enter to save, Escape to cancel.

```tsx
const columns: ColumnDefinition<User>[] = [
  {
    id: 'name',
    accessor: 'name',
    header: 'Name',
    editable: true,
  },
  {
    id: 'role',
    accessor: 'role',
    header: 'Role',
    editable: {
      enabled: true,
      type: 'select',
      options: [
        { value: 'admin', label: 'Admin' },
        { value: 'editor', label: 'Editor' },
        { value: 'viewer', label: 'Viewer' },
      ],
      validate: (value) => value ? true : 'Role is required',
      onSave: (row, columnId, oldValue, newValue) => {
        console.log('Saved:', { row, columnId, oldValue, newValue });
      },
    },
  },
];

<GridTable
  data={data}
  columns={columns}
  enableCellEdit
  onCellEdit={(row, columnId, oldValue, newValue) => {
    console.log('Cell edited:', { row, columnId, oldValue, newValue });
  }}
/>
```

## CSV / JSON Export

```tsx
<GridTable
  data={data}
  columns={columns}
  enableExport
  exportFileName="my-data"
/>
```

Or use the utilities directly:

```tsx
import { exportToCSV, exportToJSON } from '@forgedevstack/grid-table';

exportToCSV(data, columns, 'my-report');
exportToJSON(data, columns, 'my-report');
```

## Table Effects

Unified `tableEffects` prop controls all animations:

```tsx
<GridTable
  data={data}
  columns={columns}
  tableEffects={{
    hover: true,
    sort: true,
    row: true,
  }}
/>
```

Each effect accepts `true` for defaults or a config object:

```tsx
tableEffects={{
  hover: { enabled: true, bgColor: '#1a1a2e', accentBorder: true, className: 'my-hover' },
  sort: { enabled: true, flash: true, bounce: true },
  row: { enabled: true, staggerMs: 50, className: 'my-row-enter' },
  className: 'effects-active',
}}
```

## Tree Data / Expand

```tsx
<GridTable
  data={employees}
  columns={columns}
  enableRowExpansion
  defaultExpandedIds={[1, 5]}
  renderRowExpansion={(row) => <EmployeeDetail employee={row} />}
/>
```

## Lazy Load / Infinite Scroll

```tsx
<GridTable
  data={data}
  columns={columns}
  lazyLoad={{
    enabled: true,
    initialRows: 10,
    batchSize: 10,
    showLoader: true,
  }}
/>
```

## Theming

```tsx
const customTheme: Partial<Theme> = {
  mode: 'dark',
  colors: {
    background: { primary: '#1a1a2e', secondary: '#16213e', tertiary: '#0f3460', hover: '#1a1a2e' },
    text: { primary: '#eaeaea', secondary: '#a0a0a0', muted: '#707070' },
    accent: { primary: '#22c55e', success: '#4ade80', warning: '#fbbf24', error: '#f87171' },
  },
};

<GridTable data={data} columns={columns} theme={customTheme} />
```

## Bear Integration

Grid-table uses **@forgedevstack/bear** for UI controls. Set `themeMode` and `themeOverride` on GridTable to control Bear components inside:

```tsx
<GridTable
  data={data}
  columns={columns}
  themeMode="dark"
  themeOverride={{
    colors: {
      primary: '#22c55e',
      background: { default: '#0a0a14', paper: '#1a1a2e' },
      text: { primary: '#f8fafc', secondary: '#94a3b8' },
    },
  }}
/>
```

## Translations

```tsx
const customTranslations: Partial<Translations> = {
  empty: 'No records found',
  loading: 'Fetching data...',
  search: 'Search users...',
  rowsPerPage: 'Show',
};

<GridTable data={data} columns={columns} translations={customTranslations} />
```

## Responsive Breakpoints

```tsx
<GridTable
  data={data}
  columns={columns}
  mobileBreakpoint="tablet"
  showMobileLabels={true}
  dimensions={{
    width: { mobile: '100%', tablet: '100%', desktop: 800 },
    height: { mobile: 400, tablet: 500, desktop: 600 },
  }}
/>
```

## Using Hooks

```tsx
import { TableProvider, useTable } from '@forgedevstack/grid-table';

function TableControls() {
  const { filter, sort, selection } = useTable();
  return (
    <div>
      <button onClick={() => filter.clearFilters()}>Clear Filters</button>
      <button onClick={() => sort.clearSorting()}>Clear Sort</button>
      <span>{selection.selectedIds.size} rows selected</span>
    </div>
  );
}
```

## Studio

Development panel for inspecting data, props, and generating sample rows:

```tsx
<GridTable data={data} columns={columns} studio />
```

## API Reference

### GridTable Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `T[]` | Required | Array of data objects |
| `columns` | `ColumnDefinition<T>[]` | Required | Column definitions |
| `loading` | `boolean` | `false` | Show loading skeleton |
| `error` | `Error \| string` | `null` | Error to display |
| `theme` | `Partial<Theme>` | Dark theme | Custom theme colors |
| `translations` | `Partial<Translations>` | English | Custom text labels |
| `themeMode` | `'light' \| 'dark' \| 'system'` | — | Light/dark mode |
| `themeOverride` | `Record<string, unknown>` | — | Bear theme object |
| `enableDragDrop` | `boolean` | `true` | Column reordering |
| `enableColumnResize` | `boolean` | `true` | Column resizing |
| `enableRowSelection` | `boolean` | `false` | Row selection |
| `enableMultiSelect` | `boolean` | `false` | Multi-row selection |
| `enableRowExpansion` | `boolean` | `false` | Row expansion |
| `enableCellEdit` | `boolean` | `false` | Enable inline cell editing |
| `enableExport` | `boolean` | `false` | Show CSV/JSON export buttons |
| `exportFileName` | `string` | `'grid-table-export'` | Export file name |
| `showPagination` | `boolean` | `true` | Pagination controls |
| `showFilter` | `boolean` | `true` | Filter controls |
| `showGlobalFilter` | `boolean` | `true` | Global search |
| `showOverflowTooltip` | `boolean` | `true` | Tooltip on truncated cells |
| `stickyHeader` | `boolean` | `true` | Sticky header |
| `tableEffects` | `TableEffects` | — | Sort/hover/row animations |
| `defaultExpandedIds` | `Array<string \| number>` | — | IDs to expand on mount |
| `lazyLoad` | `LazyLoadConfig` | — | Infinite scroll config |
| `onCellEdit` | `(row, colId, old, new) => void` | — | Cell edit callback |
| `onRowClick` | `(row, index) => void` | — | Row click callback |
| `onRowSelect` | `(selectedRows) => void` | — | Selection callback |
| `onSort` | `(sorting) => void` | — | Sort change callback |
| `onPageChange` | `(page, pageSize) => void` | — | Page change callback |
| `studio` | `boolean` | `false` | Show Studio panel |

### ColumnDefinition

| Property | Type | Description |
|----------|------|-------------|
| `id` | `string` | Unique column identifier |
| `accessor` | `string \| (row) => unknown` | Data accessor |
| `header` | `ReactNode \| () => ReactNode` | Header content |
| `width` | `ResponsiveValue<number \| string>` | Column width |
| `align` | `'left' \| 'center' \| 'right'` | Text alignment |
| `sortable` | `boolean` | Enable sorting |
| `filterable` | `boolean` | Enable filtering |
| `draggable` | `boolean` | Allow drag reorder |
| `resizable` | `boolean` | Allow resize |
| `hidden` | `boolean` | Initially hidden |
| `editable` | `boolean \| CellEditConfig` | Enable inline editing |
| `render` | `(value, row, index) => ReactNode` | Custom cell renderer |
| `filterType` | `'text' \| 'number' \| 'select' \| ...` | Filter input type |
| `showOverflowTooltip` | `boolean` | Tooltip on truncated cell |
| `renderSubCell` | `(row) => ReactNode` | Expandable sub-content |

### TableEffects

| Property | Type | Description |
|----------|------|-------------|
| `hover` | `boolean \| HoverEffectConfig` | Hover highlight effect |
| `sort` | `boolean \| SortEffectConfig` | Sort animation effect |
| `row` | `boolean \| RowEffectConfig` | Row entry animation |
| `className` | `string` | Custom class on root |

### LazyLoadConfig

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `enabled` | `boolean` | Required | Enable lazy loading |
| `initialRows` | `number` | `20` | Rows shown initially |
| `batchSize` | `number` | `10` | Rows per scroll load |
| `showLoader` | `boolean` | `true` | Show loading indicator |
| `loadingContent` | `ReactNode` | — | Custom loader |

### CellEditConfig

| Property | Type | Description |
|----------|------|-------------|
| `enabled` | `boolean` | Enable editing for this column |
| `type` | `'text' \| 'number' \| 'select' \| 'date' \| 'boolean'` | Input type |
| `options` | `Array<{ value, label }>` | Options for select type |
| `validate` | `(value, row) => string \| true` | Validation function |
| `onSave` | `(row, colId, old, new) => void` | Save callback |
| `placeholder` | `string` | Input placeholder |

### Exports

```tsx
import {
  GridTable,
  EditableCell,
  GridHeader,
  GridBody,
  GridRow,
  GridCell,
  Pagination,
  Skeleton,
  EmptyState,
  TableProvider,
  useTableContext,
  useTable,
  useSort,
  useFilter,
  usePagination,
  useDragDrop,
  useBreakpoint,
  exportToCSV,
  exportToJSON,
} from '@forgedevstack/grid-table';
```

## Portal

The grid-table portal is a full documentation + demo website:

- **Home** — Feature showcase, demo mesh, ecosystem banner
- **Demos** — Finance (live data), HR (tree view), Basic (all props)
- **Playground** — Toggle props live, auto-generated code
- **Theme Builder** — Customize colors and export code
- **Docs** — Getting started, API reference, guides
- **Changelog** — Full version history
- **i18n** — English and Spanish
- **Cmd+K** — Quick search across all pages

Run the portal:

```bash
cd portal && npm i && npm run dev
```

## License

MIT
