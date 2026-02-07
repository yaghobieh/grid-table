# grid-table

A powerful, headless grid table component for React with SCSS styling, drag-and-drop columns, filtering, sorting, and responsive mobile support. Zero-config - no Tailwind CSS required!

## Features

- **SCSS Styling**: Self-contained SCSS styles, no Tailwind CSS dependency required
- **React 16.8+**: Works with all React versions that support hooks
- **Dark/Light Theme**: Built-in theme support with customizable colors
- **Filtering**: Column-level and global filtering with multiple operators
- **Sorting**: Single and multi-column sorting with custom sort functions
- **Drag & Drop**: Reorder columns by dragging
- **Column Resize**: Adjust column widths by dragging
- **Pagination**: Built-in pagination with customizable page sizes
- **Row Selection**: Single and multi-select support
- **Row Expansion**: Expandable rows with custom content
- **Responsive**: Mobile-first design with drawer for filters/sorting
- **Skeleton Loading**: Beautiful loading states
- **Empty States**: Customizable empty state component
- **Overflow tooltip**: Show full cell content on hover when truncated (per-column `showOverflowTooltip`)
- **Expandable sub-cell**: Extra content per cell via double-click or arrow; `renderSubCell` and `subCellExpandTrigger`
- **Context API**: No prop drilling, access state from anywhere
- **TypeScript**: Full type safety
- **Accessible**: ARIA attributes and keyboard navigation

## Installation

```bash
npm install @forgedevstack/grid-table
# or
pnpm add @forgedevstack/grid-table
# or
yarn add @forgedevstack/grid-table
```

### Dependencies

Grid-table is part of ForgeStack and uses **@forgedevstack/bear** for checkboxes, tooltips, and theming. Install Bear (peer dependency):

```bash
npm install @forgedevstack/grid-table @forgedevstack/bear
```

### Import CSS (Required)

Import the grid-table CSS once in your app. Bear styles are loaded automatically when you import from grid-table:

```tsx
import '@forgedevstack/grid-table/grid-table.css';
```

No need to import Bear styles separately; the grid-table entry pulls them in.

## Quick Start

```tsx
import { GridTable, ColumnDefinition } from 'grid-table';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const columns: ColumnDefinition<User>[] = [
  {
    id: 'name',
    accessor: 'name',
    header: 'Name',
    sortable: true,
    filterable: true,
  },
  {
    id: 'email',
    accessor: 'email',
    header: 'Email',
    sortable: true,
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
  },
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
    />
  );
}
```

## Theming

```tsx
import { GridTable, Theme } from 'grid-table';

const customTheme: Partial<Theme> = {
  mode: 'dark',
  colors: {
    background: {
      primary: '#1a1a2e',
      secondary: '#16213e',
      tertiary: '#0f3460',
      hover: '#1a1a2e',
    },
    text: {
      primary: '#eaeaea',
      secondary: '#a0a0a0',
      muted: '#707070',
    },
    accent: {
      primary: '#e94560',
      success: '#4ade80',
      warning: '#fbbf24',
      error: '#f87171',
    },
  },
};

<GridTable data={data} columns={columns} theme={customTheme} />;
```

## Translations

```tsx
import { GridTable, Translations } from 'grid-table';

const customTranslations: Partial<Translations> = {
  empty: 'No records found',
  loading: 'Fetching data...',
  search: 'Search users...',
  rowsPerPage: 'Show',
};

<GridTable data={data} columns={columns} translations={customTranslations} />;
```

## Responsive Breakpoints

```tsx
<GridTable
  data={data}
  columns={columns}
  mobileBreakpoint="tablet" // 'mobile' | 'tablet' | 'desktop'
  showMobileLabels={true} // Show column labels on mobile cards
  dimensions={{
    width: { mobile: '100%', tablet: '100%', desktop: 800 },
    height: { mobile: 400, tablet: 500, desktop: 600 },
  }}
/>
```

## Using Hooks

Access table state and actions from any child component:

```tsx
import { TableProvider, useTable, ColumnDefinition } from 'grid-table';

function TableControls() {
  const { filter, sort, pagination, selection } = useTable();

  return (
    <div>
      <button onClick={() => filter.clearFilters()}>Clear Filters</button>
      <button onClick={() => sort.clearSorting()}>Clear Sort</button>
      <span>{selection.selectedIds.size} rows selected</span>
    </div>
  );
}

function App() {
  return (
    <TableProvider data={data} columns={columns}>
      <TableControls />
      <GridTableContent {...props} />
    </TableProvider>
  );
}
```

## Custom Cell Rendering

```tsx
const columns: ColumnDefinition<User>[] = [
  {
    id: 'status',
    accessor: 'status',
    header: 'Status',
    render: (value, row, index) => (
      <span className={value === 'active' ? 'text-green-500' : 'text-red-500'}>
        {value}
      </span>
    ),
  },
  {
    id: 'actions',
    accessor: (row) => row.id,
    header: 'Actions',
    sortable: false,
    filterable: false,
    render: (value, row) => (
      <button onClick={() => handleEdit(row)}>Edit</button>
    ),
  },
];
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
| `mobileBreakpoint` | `Breakpoint` | `'tablet'` | When to switch to mobile view |
| `enableDragDrop` | `boolean` | `true` | Allow column reordering |
| `enableColumnResize` | `boolean` | `true` | Allow column resizing |
| `enableRowSelection` | `boolean` | `false` | Enable row selection |
| `enableMultiSelect` | `boolean` | `false` | Allow multi-row selection |
| `showPagination` | `boolean` | `true` | Show pagination controls |
| `showFilter` | `boolean` | `true` | Show filter controls |
| `showGlobalFilter` | `boolean` | `true` | Show global search |
| `showOverflowTooltip` | `boolean` | `true` | Show full content on hover when cell is truncated |
| `enableCellAutoSizeOnDoubleClick` | `boolean` | `false` | Double-click cell to expand width to fit content |
| `subCellExpandTrigger` | `'doubleClick' \| 'arrow' \| 'both'` | `'both'` | Default trigger for sub-cell expand |
| `expandRowOnDoubleClick` | `boolean` | `false` | Double-click row to toggle row expansion |
| `themeMode` | `'light' \| 'dark' \| 'system'` | — | Control theme for table (and Bear components) |
| `stickyHeader` | `boolean` | `true` | Sticky header on scroll |

### ColumnDefinition

| Property | Type | Description |
|----------|------|-------------|
| `id` | `string` | Unique column identifier |
| `accessor` | `string \| (row) => any` | Data accessor |
| `header` | `ReactNode \| () => ReactNode` | Header content |
| `width` | `ResponsiveValue<number \| string>` | Column width |
| `align` | `'left' \| 'center' \| 'right'` | Text alignment |
| `sortable` | `boolean` | Enable sorting |
| `filterable` | `boolean` | Enable filtering |
| `draggable` | `boolean` | Allow drag to reorder |
| `resizable` | `boolean` | Allow resize |
| `hidden` | `boolean` | Initially hidden |
| `hiddenOnMobile` | `boolean` | Hide on mobile |
| `render` | `(value, row, index) => ReactNode` | Custom cell renderer |
| `filterType` | `'text' \| 'number' \| 'select' \| ...` | Filter input type |
| `filterOptions` | `FilterOption[]` | Options for select filter |
| `sortFn` | `(a, b, dir) => number` | Custom sort function |
| `filterFn` | `(value, filter, op) => boolean` | Custom filter function |
| `showOverflowTooltip` | `boolean` | When truncated, show full content on hover (default true) |
| `renderSubCell` | `(row) => ReactNode` | Optional expandable sub-content below cell |
| `subCellExpandTrigger` | `'doubleClick' \| 'arrow' \| 'both'` | How to expand sub-cell (default `'both'`) |

## License

MIT

