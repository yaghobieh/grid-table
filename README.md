# @forgedevstack/grid-table

<p align="center">
  <img src="docs/brand/lockup-light.png" alt="Grid Table" width="360" />
</p>

<p align="center">
  <img src="docs/brand/badge-1-1-5.png" alt="1.1.5" height="28" />
</p>

**@forgedevstack/grid-table** v1.1.5 — A powerful, feature-rich data grid for React with 40+ features including **pivot-lite**, **row group drop-zone**, **cell span**, **row height**, **cell comments**, **Bear density sync**, **RTL**, **saved views**, **advanced filter builder**, **pinned row groups**, **column formulas**, **window virtualization**, **range selection + copy/paste + fill handle**, **touch swipe actions**, **infinite scroll**, cell editing, multi-format export, keyboard navigation, context menu, tree data, row reordering, frozen rows, undo/redo, print mode, and **server-driven (manual) pagination**. Zero-config SCSS styling. Part of [ForgeStack](https://forgedevstack.dev).

## Features

### Core
- **Server-driven pagination** — `paginationConfig.manualPagination` + `totalRowCount`: pass one page in `data` and load more in `onPageChange` (see portal **Server-driven** demo).
- **Cell Editing** — Double-click to edit inline with validation (text, number, select, date, boolean)
- **Dark/Light Theme** — Built-in theme support with customizable colors
- **Filtering** — Column-level and global filtering with multiple operators
- **Sorting** — Single and multi-column sorting with custom sort functions
- **Drag & Drop** — Reorder columns by dragging
- **Column Resize** — Adjust column widths by dragging
- **Pagination** — Built-in pagination with customizable page sizes
- **Row Selection** — Single and multi-select support
- **Row Expansion** — Expandable rows with custom content
- **Responsive** — Default **horizontal scroll** table on small screens; optional **`mobileLayout="stacked"`** for card layout. Drawer for filters/sorting. Disable breakpoints with `mobileBreakpoint="none"`.

### v1.1.2

- **Fill handle** — `rangeSelection.fillHandle` drag-fill or Ctrl/Cmd+D fill-down when `enableCellEdit` is on.
- **Touch gestures** — `swipeActions` row actions + `longPressContextMenu`; `useTouchGestures` exported.
- **Range drag wired** — cell pointer events drive range selection end-to-end.

### v1.1.1

- **exportScope** — Control which rows export/copy/print: `'all' | 'filtered' | 'sorted' | 'selected'`. `resolveExportData` utility.
- **Saved view URL sync** — `savedViews.syncUrl` persists active view in `?view=` query param.
- **Set & date filters** — `filterType: 'set'` checkbox list; `filterType: 'date'` range picker in column filter popup.
- **Expandable row groups** — `rowGroups.showHeaders` with collapse/expand chevrons. `useRowGroupExpansion` hook.
- **Range selection + paste** — `rangeSelection` drag-select; Ctrl/Cmd+V pastes clipboard into range. `useRangeSelection` hook.
- **Infinite scroll** — `infiniteScroll` block loading for SSRM-style datasets. `useInfiniteScroll` hook.
- **Column group headers** — `columnGroups` + `alignColumnGroups` multi-row colspan headers.
- **Delta updates & flash** — `applyTransaction({ add, update, remove })`; `flashCells` highlights changed cells.

### v1.1.0

- **Saved views** — Named presets for sort, filters, column visibility/widths, pagination, and density. Optional view-switcher chip bar. `useSavedViews` hook.
- **Advanced filter builder** — Nested AND/OR rules via `advancedFilter` and the built-in `FilterBuilder` panel. `evaluateFilterTree` utility.
- **Pinned row groups** — `rowGroups` groups rows by field, injects aggregate footer rows (`sum:amount`, `avg:field`, etc.), and pins footers at the bottom of the scroll area.
- **Column formula engine** — `formula` on `ColumnDefinition` for computed columns (`revenue - cost`, `(profit / revenue) * 100`).
- **Window virtualization** — `virtualize` prop renders only visible rows with scroll spacers. `useVirtualizedWindow` hook.
- **Column groups band** — `columnGroups` renders grouped header labels above columns.
- **Density presets** — `density: 'compact' | 'comfortable' | 'spacious'`.
- **Column state persistence** — `columnStatePersistence.persistKey` saves column state to `localStorage`.
- **Master-detail API** — `masterDetail` prop with `renderPanel` and `expandOnRowClick`.
- **Manual server sort/filter** — `sortConfig.manualSorting` and `filterConfig.manualFiltering` skip client pipelines.

### v1.0.8

- **Mobile layout** — `mobileLayout="scroll"` (default) shows the full header and columns with swipe scrolling; `mobileLayout="stacked"` uses the stacked card layout.
- **Hover** — Softer row hover when `tableEffects.hover` is enabled.

### v1.0.7
- **Keyboard Navigation** — Arrow keys, Tab, Enter to edit, Escape, Home/End, PageUp/Down
- **Context Menu** — Right-click for copy, filter, pin, hide. Custom actions supported
- **Tree Data** — Hierarchical rows with expand/collapse, indentation, and toggle arrows
- **Status Bar** — Footer with row count, selected count, and column aggregations (sum, avg, min, max)
- **Row Reordering** — Drag-and-drop rows with visual handle
- **Excel Export** — SpreadsheetML XML export, no dependencies
- **PDF Export** — Print-dialog-based PDF with styled table
- **CSV / JSON Export** — One-click export with `enableExport`
- **Copy to Clipboard** — Tab-separated clipboard copy
- **Undo/Redo** — Edit history with Ctrl+Z / Ctrl+Y (Cmd on Mac)
- **Column Pinning** — Runtime pin/unpin columns left or right
- **Column Auto-Fit** — Double-click to auto-size, or global auto-fit
- **Frozen Rows** — Pin rows to top or bottom of viewport
- **Print Mode** — Styled printable view with title and date

### Display
- **Table Effects** — Sort animations, row entry effects, hover highlights
- **Lazy Load** — Infinite scroll with configurable batch size
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

## Export (CSV, JSON, Excel, PDF)

```tsx
<GridTable
  data={data}
  columns={columns}
  enableExport={['csv', 'json', 'excel', 'pdf']}
  exportFileName="my-data"
  enableCopy
  printConfig={{ enabled: true, title: 'My Report' }}
/>
```

Or use the utilities directly:

```tsx
import { exportToCSV, exportToJSON, exportToExcel, exportToPDF, copyToClipboard, printTable } from '@forgedevstack/grid-table';

exportToCSV(data, columns, 'my-report');
exportToJSON(data, columns, 'my-report');
exportToExcel(data, columns, 'my-report');
exportToPDF(data, columns, 'my-report', 'Report Title');
copyToClipboard(data, columns);
printTable(data, columns, 'Print Title');
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

## Tree Data

Render hierarchical data with expand/collapse:

```tsx
const treeData = [
  { id: 1, name: 'CEO', children: [
    { id: 2, name: 'CTO', children: [
      { id: 3, name: 'Lead Dev' },
    ]},
    { id: 4, name: 'CFO' },
  ]},
];

<GridTable
  data={treeData}
  columns={columns}
  treeData={{ enabled: true, childrenField: 'children', expandAll: false }}
/>
```

## Row Expansion

```tsx
<GridTable
  data={employees}
  columns={columns}
  enableRowExpansion
  defaultExpandedIds={[1, 5]}
  renderRowExpansion={(row) => <EmployeeDetail employee={row} />}
/>
```

## Keyboard Navigation

```tsx
<GridTable
  data={data}
  columns={columns}
  keyboardNavigation={{ enabled: true, enableEditOnEnter: true, wrap: true }}
/>
```

Arrow keys move between cells. Enter starts editing. Tab moves to next cell. Escape cancels editing.

## Context Menu

```tsx
<GridTable
  data={data}
  columns={columns}
  contextMenu={{
    enabled: true,
    showCopy: true,
    showFilter: true,
    showPin: true,
    showHide: true,
    actions: [
      { id: 'custom', label: 'Custom Action', onClick: (ctx) => console.log(ctx.value) },
    ],
  }}
/>
```

## Status Bar

```tsx
<GridTable
  data={data}
  columns={columns}
  statusBar={{
    enabled: true,
    showRowCount: true,
    showSelectedCount: true,
    showFilteredCount: true,
    aggregations: [
      { columnId: 'salary', type: 'sum', label: 'Total Salary', format: (v) => `$${v.toLocaleString()}` },
      { columnId: 'age', type: 'avg', label: 'Avg Age' },
    ],
  }}
/>
```

## Row Reordering

```tsx
<GridTable
  data={data}
  columns={columns}
  rowReorder={{ enabled: true }}
  onRowReorder={(newOrder) => setData(newOrder)}
/>
```

## Undo/Redo

```tsx
<GridTable
  data={data}
  columns={columns}
  enableCellEdit
  undoRedo={{ enabled: true, maxHistory: 50 }}
  onUndo={(rowId, colId, value) => console.log('Undone:', rowId, colId, value)}
  onRedo={(rowId, colId, value) => console.log('Redone:', rowId, colId, value)}
/>
```

## Frozen Rows

```tsx
<GridTable
  data={data}
  columns={columns}
  frozenRows={{
    top: [summaryRow],
    bottom: [totalRow],
  }}
/>
```

## Print Mode

```tsx
<GridTable
  data={data}
  columns={columns}
  printConfig={{
    enabled: true,
    title: 'Sales Report',
    showDate: true,
  }}
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

## Window Virtualization

Render only visible rows for large in-memory datasets:

```tsx
<GridTable
  data={largeData}
  columns={columns}
  showPagination={false}
  dimensions={{ maxHeight: 420 }}
  virtualize={{ enabled: true, rowHeight: 44, overscan: 6, threshold: 50 }}
/>
```

## Saved Views

Switch named presets that restore sort, filters, columns, and pagination:

```tsx
<GridTable
  data={data}
  columns={columns}
  savedViews={{
    views: [
      { id: 'all', label: 'All', snapshot: { sorting: [], filters: [], globalFilter: '', hiddenColumnIds: [], columnWidths: {}, page: 1, pageSize: 10 } },
      { id: 'active', label: 'Active only', snapshot: { /* ... */ } },
    ],
    activeViewId: 'all',
    showViewSwitcher: true,
  }}
/>
```

## Advanced Filter Builder

Nested AND/OR filter trees with the built-in panel:

```tsx
<GridTable
  data={data}
  columns={columns}
  advancedFilter={{
    enabled: true,
    showBuilder: true,
    where: {
      op: 'and',
      rules: [
        { field: 'region', op: 'in', value: ['US', 'EU'] },
        { field: 'status', op: 'equals', value: 'Active' },
      ],
    },
  }}
/>
```

## Pinned Row Groups + Aggregate Footers

Group rows by field and pin subtotal footers while scrolling:

```tsx
<GridTable
  data={rows}
  columns={columns}
  dimensions={{ maxHeight: 320 }}
  rowGroups={[
    {
      by: 'group',
      pinned: true,
      footer: ['sum:amount'],
      footerLabelField: 'item',
    },
  ]}
  statusBar={{
    enabled: true,
    aggregations: [{ columnId: 'amount', type: 'sum', label: 'Total Amount' }],
  }}
/>
```

Footer rows are synthesized by the grid (not in your data). The status bar shows the grand total across all detail rows.

## Column Formulas

Computed columns from safe expressions:

```tsx
const columns: ColumnDefinition<Row>[] = [
  { id: 'revenue', accessor: 'revenue', header: 'Revenue' },
  { id: 'cost', accessor: 'cost', header: 'Cost' },
  { id: 'profit', accessor: 'profit', header: 'Profit', formula: 'revenue - cost' },
  { id: 'margin', accessor: 'margin', header: 'Margin %', formula: '(profit / revenue) * 100' },
];
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
  mobileLayout="scroll"
  showMobileLabels={true}
  dimensions={{
    width: { mobile: '100%', tablet: '100%', desktop: 800 },
    height: { mobile: 400, tablet: 500, desktop: 600 },
  }}
/>
```

Use `mobileLayout="stacked"` for the previous label-per-cell mobile layout.

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
| `enableExport` | `boolean \| string \| string[]` | `false` | Export buttons: `true`, `'csv'`, `['csv','excel','pdf']` |
| `exportFileName` | `string` | `'grid-table-export'` | Export file name |
| `enableCopy` | `boolean` | `false` | Show copy-to-clipboard button |
| `contextMenu` | `ContextMenuConfig` | — | Right-click context menu |
| `statusBar` | `StatusBarConfig` | — | Footer status bar |
| `frozenRows` | `FrozenRowsConfig` | — | Pin rows to top/bottom |
| `treeData` | `TreeConfig` | — | Hierarchical tree data |
| `keyboardNavigation` | `KeyboardNavConfig` | — | Arrow key navigation |
| `rowReorder` | `RowReorderConfig` | — | Drag-and-drop row reorder |
| `onRowReorder` | `(rows) => void` | — | Row reorder callback |
| `undoRedo` | `UndoRedoConfig` | — | Edit undo/redo |
| `onUndo` | `(rowId, colId, value) => void` | — | Undo callback |
| `onRedo` | `(rowId, colId, value) => void` | — | Redo callback |
| `printConfig` | `PrintConfig` | — | Print mode config |
| `autoFit` | `AutoFitConfig` | — | Column auto-fit |
| `showPagination` | `boolean` | `true` | Pagination controls |
| `showFilter` | `boolean` | `true` | Filter controls |
| `showGlobalFilter` | `boolean` | `true` | Global search |
| `showOverflowTooltip` | `boolean` | `true` | Tooltip on truncated cells |
| `stickyHeader` | `boolean` | `true` | Sticky header |
| `tableEffects` | `TableEffects` | — | Sort/hover/row animations |
| `defaultExpandedIds` | `Array<string \| number>` | — | IDs to expand on mount |
| `lazyLoad` | `LazyLoadConfig` | — | Infinite scroll config |
| `virtualize` | `boolean \| VirtualizeConfig` | `false` | Window virtualization |
| `savedViews` | `SavedViewsConfig` | — | Named view presets + switcher |
| `advancedFilter` | `AdvancedFilterConfig` | — | Nested AND/OR filter tree |
| `rowGroups` | `RowGroupConfig[]` | — | Group-by with aggregate footers |
| `columnGroups` | `ColumnGroupConfig[]` | — | Header group band |
| `density` | `'compact' \| 'comfortable' \| 'spacious'` | `'comfortable'` | Row density preset |
| `columnStatePersistence` | `ColumnStatePersistenceConfig` | — | Persist column state |
| `masterDetail` | `MasterDetailConfig` | — | Row expansion panel API |
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
| `formula` | `string` | Computed column expression |
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
  // Components
  GridTable,
  EditableCell,
  GridHeader,
  GridBody,
  GridRow,
  GridCell,
  Pagination,
  Skeleton,
  EmptyState,
  ContextMenu,
  StatusBar,
  // Context
  TableProvider,
  useTableContext,
  // Hooks
  useTable,
  useSort,
  useFilter,
  usePagination,
  useDragDrop,
  useBreakpoint,
  useKeyboardNavigation,
  useRowReorder,
  useUndoRedo,
  useTreeData,
  useSavedViews,
  useVirtualizedWindow,
  FilterBuilder,
  // Utils
  evaluateFilterTree,
  applyFormulaColumnsToData,
  applyRowGroups,
  resolveConditionalCellFormat,
  exportToCSV,
  exportToJSON,
  exportToExcel,
  exportToPDF,
  copyToClipboard,
  printTable,
  computeAggregation,
} from '@forgedevstack/grid-table';
```

## Portal

The grid-table portal is a full documentation + demo website:

- **Home** — Feature showcase, demo mesh, ecosystem banner
- **Demos** — Saved views, filter builder, row groups, formulas, virtualization, Finance, HR, Basic
- **Playground** — Toggle props live, auto-generated code
- **Theme Builder** — Customize colors and export code
- **Docs** — Getting started, API reference, guides
- **Changelog** — Full version history
- **i18n** — English, Spanish, and Hebrew
- **Cmd+K** — Quick search across all pages

Run the portal:

```bash
cd portal && npm i && npm run dev
```

## License

MIT
