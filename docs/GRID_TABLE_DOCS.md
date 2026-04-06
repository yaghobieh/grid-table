# Grid Table — ForgeStack Data Grid

**@forgedevstack/grid-table** is a powerful, feature-rich React data grid with 30+ features: cell editing, multi-format export, keyboard navigation, context menu, tree data, row reordering, frozen rows, undo/redo, and print mode. Zero-config SCSS styling. Part of [ForgeStack](https://forgedevstack.com).

- **Live site:** [grid-table.com](https://grid-table.com/)
- **npm:** `@forgedevstack/grid-table` · **Version:** 1.0.7
- **License:** MIT

---

## Table of Contents

1. [What We Have](#what-we-have)
2. [New in 1.0.7](#new-in-107)
3. [Benefits](#benefits)
4. [Screenshots from grid-table.com](#screenshots-from-grid-tablecom)
5. [Quick Start](#quick-start)
6. [Links & Resources](#links--resources)

---

## What We Have

### Core Features

| Feature | Description |
|--------|-------------|
| **Cell editing** | Inline edit with validation (text, number, select, date, boolean). Double-click to edit, Enter to save, Escape to cancel. |
| **Dark / light theme** | Built-in theme support with customizable colors. |
| **Filtering** | Column-level and global filtering with multiple operators (equals, contains, startsWith, etc.). |
| **Sorting** | Single and multi-column sorting with custom sort functions. |
| **Drag & drop** | Reorder columns by dragging headers. |
| **Column resize** | Adjust column widths by dragging the resize handle. |
| **Pagination** | Built-in pagination with configurable page sizes. |
| **Row selection** | Single and multi-select with select-all / deselect-all. |
| **Row expansion** | Expandable rows with custom content (`renderRowExpansion`). |
| **Responsive** | Mobile-first design; optional mobile drawer for filters/sorting. |

### Display & UX

| Feature | Description |
|--------|-------------|
| **Table effects** | Sort animations, row entry effects, hover highlights via `tableEffects`. |
| **Lazy load** | Infinite scroll with configurable batch size. |
| **Skeleton loading** | Loading states that match table structure. |
| **Overflow tooltip** | Full cell content on hover when truncated. |
| **Expandable sub-cell** | Extra content per cell (double-click or arrow). |
| **Studio panel** | Dev/prototyping panel for inspecting data and props. |
| **Context API** | No prop drilling; access state via `useTable` and context. |
| **TypeScript** | Full type safety and generics for row data. |
| **Accessibility** | ARIA attributes and keyboard navigation. |

### v1.0.7 Feature Set (see [New in 1.0.7](#new-in-107))

Keyboard navigation, context menu, tree data, status bar, row reordering, Excel/PDF/CSV/JSON export, copy to clipboard, undo/redo, column pinning, column auto-fit, frozen rows, print mode.

---

## New in 1.0.7

Release: **2026-02-24**. Highlights:

### Added

- **Keyboard navigation** — Arrow keys to move between cells, Enter to edit, Escape to cancel, Tab, Home/End, PageUp/PageDown. Configure via `keyboardNavigation` prop.
- **Context menu** — Right-click any cell for copy, filter by value, pin column, hide column. Custom actions via `contextMenu.actions`.
- **Tree data** — Hierarchical rows with expand/collapse, indent, and toggle arrows. `treeData` with `childrenField`, `expandAll`, etc.
- **Status bar** — Footer with row count, filtered/selected count, and column aggregations (sum, avg, min, max, count). Configure via `statusBar`.
- **Row reordering** — Drag-and-drop rows with visual handle. `rowReorder` and `onRowReorder`.
- **Excel export** — SpreadsheetML XML (`.xls`) via `exportToExcel()`. No extra dependencies.
- **PDF export** — PDF via print dialog with `exportToPDF()`. Styled HTML table.
- **Copy to clipboard** — Tab-separated copy with `copyToClipboard()` and `enableCopy` toolbar button.
- **Undo/redo** — Edit history for cell edits (Ctrl+Z / Ctrl+Y). `undoRedo`, `onUndo`/`onRedo`, configurable max history.
- **Column pinning** — Runtime pin/unpin columns (left/right) via context menu or context action.
- **Column auto-fit** — Double-click column edge to auto-fit; optional global auto-fit via `autoFit`.
- **Frozen rows** — Pin rows to top or bottom via `frozenRows` (e.g. totals). Stay visible while scrolling.
- **Print mode** — `printConfig` adds print button; styled printable view with title and date.

### New types, hooks, components

- **Types:** `ContextMenuConfig`, `StatusBarConfig`, `FrozenRowsConfig`, `TreeConfig`, `KeyboardNavConfig`, `RowReorderConfig`, `UndoRedoConfig`, `PrintConfig`, `AutoFitConfig`, etc.
- **Hooks:** `useKeyboardNavigation`, `useRowReorder`, `useUndoRedo`, `useTreeData`.
- **Components:** `ContextMenu`, `StatusBar`.

---

## Benefits

- **One dependency** — React 16.8+ and optional Bear UI for controls. No heavy grid framework.
- **Zero-config styling** — SCSS compiled to CSS; import one CSS file. Works with or without Bear.
- **Fully typed** — TypeScript generics for rows and columns; full IntelliSense.
- **Composable** — Use `TableProvider` + hooks for custom layouts and toolbars.
- **Export out of the box** — CSV, JSON, Excel, PDF, copy, and print without extra libs.
- **Accessible** — ARIA and keyboard support for better a11y.
- **Portal & docs** — Live demos, playground, theme builder, and docs at [grid-table.com](https://grid-table.com/).
- **ForgeStack ecosystem** — Fits with Bear UI, Forge Compass, and other ForgeStack packages.

---

## Screenshots from grid-table.com

Screenshots below are from the live demos at [https://grid-table.com/](https://grid-table.com/). Add your own screenshots into `docs/screenshots/` and reference them here.

### 1. Basic Demo — full-featured table

Full table with pagination, filters, export, context menu, status bar, frozen row, and loading test.

- **URL:** [https://grid-table.com/demos/basic](https://grid-table.com/demos/basic)
- **Screenshot:** Add `docs/screenshots/basic-demo.png` (e.g. full table with status bar and toolbar).

<!-- Add when you have the file:
![Basic Demo](screenshots/basic-demo.png)
-->

### 2. Features Demo — v1.0.7 highlights

Four sections: Context Menu + Status Bar + Export; Row Reorder + Undo/Redo + Keyboard Nav; Tree Data; Frozen Rows + Print.

- **URL:** [https://grid-table.com/demos/features](https://grid-table.com/demos/features)
- **Screenshots:** Add as needed, e.g.:
  - `docs/screenshots/features-context-menu.png` — Product table with context menu and status bar
  - `docs/screenshots/features-row-reorder.png` — Task table with row reorder and status bar
  - `docs/screenshots/features-tree.png` — Tree data (hierarchical employees)
  - `docs/screenshots/features-frozen-print.png` — Frozen rows and print

<!-- Example when files exist:
![Context Menu & Status Bar](screenshots/features-context-menu.png)
![Row Reorder & Undo/Redo](screenshots/features-row-reorder.png)
![Tree Data](screenshots/features-tree.png)
![Frozen Rows & Print](screenshots/features-frozen-print.png)
-->

### 3. Finance Demo — live data

Live-updating table with sparklines (if applicable).

- **URL:** [https://grid-table.com/demos/finance](https://grid-table.com/demos/finance)
- **Screenshot:** Add `docs/screenshots/finance-demo.png`

### 4. HR Demo — tree view

Hierarchical HR tree with expand/collapse.

- **URL:** [https://grid-table.com/demos/hr](https://grid-table.com/demos/hr)
- **Screenshot:** Add `docs/screenshots/hr-demo.png`

### 5. Theme Builder

Interactive theme customization and code export.

- **URL:** [https://grid-table.com/theme-builder](https://grid-table.com/theme-builder)
- **Screenshot:** Add `docs/screenshots/theme-builder.png`

### 6. Playground

Toggle props live and see generated code.

- **URL:** [https://grid-table.com/playground](https://grid-table.com/playground)
- **Screenshot:** Add `docs/screenshots/playground.png`

---

## Quick Start

### Install

```bash
npm i @forgedevstack/grid-table
```

### Import CSS (required)

```tsx
import '@forgedevstack/grid-table/grid-table.css';
```

### Minimal example

```tsx
import { GridTable } from '@forgedevstack/grid-table';
import type { ColumnDefinition } from '@forgedevstack/grid-table';
import '@forgedevstack/grid-table/grid-table.css';

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
  { id: 'role', accessor: 'role', header: 'Role', filterType: 'select', filterOptions: [
    { value: 'admin', label: 'Admin' },
    { value: 'user', label: 'User' },
  ]},
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
      enableExport={['csv', 'json', 'excel', 'pdf']}
      tableEffects={{ hover: true, sort: true, row: true }}
    />
  );
}
```

---

## Links & Resources

| Resource | URL |
|--------|-----|
| **Live portal** | [grid-table.com](https://grid-table.com/) |
| **Basic demo** | [grid-table.com/demos/basic](https://grid-table.com/demos/basic) |
| **Features demo (1.0.7)** | [grid-table.com/demos/features](https://grid-table.com/demos/features) |
| **Finance demo** | [grid-table.com/demos/finance](https://grid-table.com/demos/finance) |
| **HR demo** | [grid-table.com/demos/hr](https://grid-table.com/demos/hr) |
| **Theme builder** | [grid-table.com/theme-builder](https://grid-table.com/theme-builder) |
| **Playground** | [grid-table.com/playground](https://grid-table.com/playground) |
| **npm** | [npmjs.com/package/@forgedevstack/grid-table](https://www.npmjs.com/package/@forgedevstack/grid-table) |
| **GitHub** | [github.com/yaghobieh/grid-table](https://github.com/yaghobieh/grid-table) |
| **ForgeStack** | [forgedevstack.com](https://forgedevstack.com) |

---

*Grid Table v1.0.7 — part of the ForgeStack ecosystem.*
