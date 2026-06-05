# Changelog

All notable changes to grid-table will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-05-20

### Added

- **Saved views** — `savedViews` prop with named presets (`sort`, `filters`, `hiddenColumnIds`, `columnWidths`, `page`, `pageSize`, `density`). Optional `showViewSwitcher` chip bar. `useSavedViews` hook for external control.
- **Advanced filter builder** — `FilterTreeGroup` / `FilterTreeRule` types, `evaluateFilterTree` utility, `advancedFilter` prop with optional Bear `FilterBuilder` panel. Operators include `in` / `notIn`.
- **Pinned row groups** — `rowGroups` prop groups rows by field, injects aggregate footer rows (`sum:field`, `avg:field`, etc.), pins footers via `pinned: true`.
- **Column formula engine** — `formula` on `ColumnDefinition`; safe expression evaluation (`revenue - cost`, `(profit / revenue) * 100`).
- **Window virtualization** — `virtualize` prop (boolean or `VirtualizeConfig`) renders only visible rows with scroll spacers. `useVirtualizedWindow` hook exported.
- **Column groups band** — `columnGroups` prop renders grouped header labels above the table.
- **Conditional formatting** — `conditionalFormat` prop with per-row/column rules (`when`, `className`, `cellStyle`).
- **Master-detail API** — `masterDetail` prop with `renderPanel`, `panelHeight`, `expandOnRowClick`.
- **Density presets** — `density: 'compact' | 'comfortable' | 'spacious'` on `GridTable`.
- **Column state persistence** — `columnStatePersistence.persistKey` writes column state to `localStorage`.
- **Touch gestures** — `touchGestures` prop adds `gt-touch-gestures` surface class for mobile-friendly tables.
- **Manual server sort/filter** — `sortConfig.manualSorting` and `filterConfig.manualFiltering` skip client-side sort/filter pipelines.

### Changed

- `TableContext` applies `filterConfig.advancedFilter` in the computed data pipeline.
- `setColumnStates` action added for saved-view application.
- Portal demos for saved views, advanced filters, row groups, and formulas now use real library APIs.

### Portal

- v1.1.0 demo pages wired to library features; i18n for new demo copy (en, es, he).

## [1.0.8] - 2026-03-28

### Added

- **`mobileLayout` prop** — `'scroll'` (default) keeps a real table on small viewports: header visible, row flex nowrap, horizontal scroll in the table body. `'stacked'` restores the previous card layout with `hiddenOnMobile` column hiding and cell labels.
- **Manual (server) pagination** — `paginationConfig.manualPagination` skips client slicing of `data`; `paginationConfig.totalRowCount` drives page counts and the footer “of N” label. Use with `onPageChange` to fetch each page from an API.

### Changed

- **Hover effect** — `tableEffects.hover` uses a lighter inset accent and no keyframed glow animation.
- **Toolbar** — Action-button SVGs use a slightly larger size for readability on touch layouts.
- **Computed pagination** — `effectiveTotalItems` for hooks and footer text when manual pagination is enabled.

### Fixed

- **Loading state + hooks** — `GridTableContent` always runs the same hooks before `loading` / `error` early returns, fixing “Rendered more hooks than during the previous render” when `loading` toggles (e.g. server-driven demo).

### Portal

- Theme & Playground hub, Accessibility, Master–detail, Persisted pagination, Server-driven paging, Column grouping band, Lazy load demos; **Advanced patterns** doc; copyable code on demos.
- **Browser back/forward** — portal can depend on **@forgedevstack/forge-compass** ≥ 1.0.3 (popstate no longer replaces the history entry URL).

## [1.0.7] - 2026-02-24

### Added

- **Keyboard Navigation** — Arrow keys to move between cells, Enter to edit, Escape to cancel, Tab to move, Home/End/PageUp/PageDown. Configurable via `keyboardNavigation` prop.
- **Column Pinning UI** — Runtime pin/unpin columns via `pinColumn` action on context. Right-click context menu includes pin left/right options.
- **Context Menu** — Right-click on any cell for built-in actions: copy value, filter by value, pin column, hide column. Custom actions supported via `contextMenu.actions`. Toggle individual defaults with `showCopy`, `showFilter`, `showPin`, `showHide`.
- **Tree Data** — Hierarchical rows with expand/collapse. `treeData` prop with `childrenField`, `idField`, `indentSize`, `expandAll`. Visual tree toggle arrows with indentation.
- **Status Bar** — Footer bar showing row count, filtered count, selected count, and column aggregations (sum, avg, min, max, count). Configurable via `statusBar` prop.
- **Row Reordering** — Drag-and-drop row reordering with visual drag handle. `rowReorder` prop and `onRowReorder` callback.
- **Excel Export** — Export to SpreadsheetML XML (`.xls`) with `exportToExcel()` utility. No external dependencies required.
- **PDF Export** — Export to PDF via print dialog with `exportToPDF()` utility. Styled HTML table in new window.
- **Copy to Clipboard** — `copyToClipboard()` utility copies table data as tab-separated values. `enableCopy` prop adds toolbar button.
- **Undo/Redo** — Edit history for cell edits with Ctrl+Z / Ctrl+Y (Cmd on Mac). `undoRedo` prop, `onUndo`/`onRedo` callbacks. Max history configurable.
- **Column Auto-Fit** — Double-click column edge to auto-fit width. Enhanced with `autoFit` config for global auto-fit.
- **Frozen Rows** — Pin rows to top or bottom of table via `frozenRows` prop with `{ top, bottom }` arrays. Frozen rows stay visible while scrolling.
- **Print Mode** — `printConfig` prop adds print button. Opens styled printable view with optional title and date. Configurable page size and orientation.
- **Enhanced Export** — `enableExport` now accepts `true`, a single format string, or an array: `['csv', 'json', 'excel', 'pdf']`.

### Types

- `ContextMenuConfig`, `ContextMenuAction`, `ContextMenuContext` — Context menu configuration.
- `StatusBarConfig`, `AggregationType` — Status bar configuration.
- `FrozenRowsConfig` — Frozen row configuration.
- `TreeConfig`, `FlatTreeRow` — Tree data types.
- `KeyboardNavConfig`, `FocusedCell` — Keyboard navigation types.
- `RowReorderConfig` — Row reorder config.
- `EditHistoryEntry`, `UndoRedoConfig` — Undo/redo types.
- `PrintConfig`, `AutoFitConfig`, `ColumnAggregation` — Print and auto-fit types.

### Hooks

- `useKeyboardNavigation` — Cell focus and keyboard event handling.
- `useRowReorder` — Row drag-and-drop state and handlers.
- `useUndoRedo` — Edit history with undo/redo and keyboard shortcuts.
- `useTreeData` — Tree flattening, expand/collapse, indent calculation.

### Components

- `ContextMenu` — Floating right-click menu with configurable actions.
- `StatusBar` — Footer status bar with counts and aggregations.

### Context

- `pinColumn(columnId, side)` action added to `TableContextActions`.

## [1.0.6] - 2026-02-19

### Added

- **Cell Editing** — Inline edit with `editable` on `ColumnDefinition`. Supports `text`, `number`, `select`, `date`, `boolean` types. Validates via `validate` callback, saves via `onSave`. Double-click to edit, Enter to save, Escape to cancel.
- **CSV / JSON Export** — `exportToCSV()` and `exportToJSON()` utilities. `enableExport` prop adds toolbar buttons. `exportFileName` for custom download name.
- **Table Effects (TE)** — Unified `tableEffects` prop replaces individual animation booleans. Supports `{ hover, sort, row }` with `boolean` or config object per effect. Custom `className` on root when effects are active.
- **Lazy Load / Infinite Scroll** — `lazyLoad` prop with `enabled`, `initialRows`, `batchSize`, `showLoader`, `loadingContent`. Uses `IntersectionObserver` internally.
- **Tree Data Expand** — `defaultExpandedIds` prop sets which rows are expanded on mount. `expandAllRows` and `collapseAllRows` actions in context.
- **EditableCell component** — Standalone component for custom compositions.
- **Editable cell styles** — `_editable-cell.scss` with dashed hover outline and green focus ring.

### Portal

- **Playground page** (`/playground`) — Toggle every prop live, auto-generated code, dark/light switch.
- **Changelog page** (`/changelog`) — Timeline with version history.
- **Cmd+K search modal** — Keyboard shortcut to search all pages, demos, docs.
- **i18n** — English and Spanish translations via context + hook.
- **Navbar** — Language dropdown (Bear `Dropdown`), GitHub icon, npm icon, `⌘K` search button.
- **Routing** — Migrated from `react-router-dom` to `@forgedevstack/forge-compass`.
- **Home page** — Showcase mesh, demo previews, ForgeStack ecosystem banner, typewriter effect.
- **Finance demo** — Live-updating stock data with sparklines.
- **HR demo** — Hierarchical tree view with expand/collapse.
- **Basic demo** — Full-featured table with all props.
- **Theme Builder** — Interactive theme customization with code export.
- **Docs page** — Sidebar navigation with Bear UI, mobile drawer.

## [1.0.5] - 2026-02-15

### Added

- **Portal** — Full documentation website built with Bear UI and Vite.
- **Demos** — Finance, HR, Basic Table, Theme Builder pages.
- **Documentation** — Getting Started, API Reference, installation guides.
- **Theme Builder** — Interactive theme customization with live preview and code export.
- **Global filter columns** — `globalFilterColumns` prop to limit which columns global search applies to.
- **Striped rows** — `gt-striped` CSS class for alternating row colors.
- **Row color customization** — CSS custom properties for row backgrounds.

## [1.0.3] - 2026-02-07

### Added

- **Overflow tooltip**: When cell content is truncated, show full content on hover. Table prop `showOverflowTooltip` (default `true`); override per column with `showOverflowTooltip: true | false`.
- **Expandable sub-cell**: Optional extra content per cell, expandable by double-click or arrow. Column: `renderSubCell: (row) => ReactNode`, `subCellExpandTrigger: 'doubleClick' | 'arrow' | 'both'`. Table prop `subCellExpandTrigger` sets default for all columns. State in context (`expandedCellIds`, `toggleCellExpansion`).
- **Cell auto-size on double-click**: Table prop `enableCellAutoSizeOnDoubleClick`. When `true`, double-clicking a truncated cell (without sub-cell) expands that cell to fit content. State: `autoSizedCellIds`, `toggleCellAutoSize` in context.
- **Expand row on double-click**: Table prop `expandRowOnDoubleClick`. When `true`, double-clicking a row toggles row expansion (`renderRowExpansion`). All rows can show one full-width sub-row when expanded.
- **Table-level options**: All cell/row expand and tooltip options are configurable via GridTable props: `showOverflowTooltip`, `enableCellAutoSizeOnDoubleClick`, `subCellExpandTrigger`, `expandRowOnDoubleClick`. Column definitions can override where applicable.
- **@forgedevstack/bear integration**: Grid-table uses Bear (ForgeStack) for checkboxes, overflow tooltip, and theme. Peer dependency `@forgedevstack/bear`; Bear styles are imported from grid-table entry so one import brings them in. Theme controllable via `themeMode: 'light' | 'dark' | 'system'` prop.
- **Header/body alignment**: Expand column spacer in header when `enableRowExpansion` so column names align with data. Header cell widths use explicit px for consistency.
- **Sub-row (renderRowExpansion)**: Signature is now `(row: T, rowId: string | number) => ReactNode`. User controls content (editable form, sub-table, etc.) and can use `rowId` for save/update.

## [1.0.2] - 2026-01-17

### Changed

- **BREAKING**: Migrated from Tailwind CSS to SCSS for zero-config styling
  - Removed Tailwind CSS dependency completely
  - All styles now self-contained in SCSS
  - Compiled CSS included in package
  - No Tailwind configuration required
- Fixed package.json exports order - moved `types` before `import` and `require` to resolve TypeScript warnings
- Updated package name to `@forgedevstack/grid-table` to match npm organization

### Added

- SCSS source files for better maintainability
- Compiled CSS file in dist for zero-config usage
- Build process now compiles SCSS to CSS automatically

## [1.0.1] - 2026-01-17

### Changed

- Initial npm publication with `@forgedevstack` scope

## [0.1.0] - 2026-01-15

### Added

- Initial release of grid-table
- **GridTable** - Main table component with all features
- **TableProvider** - Context provider for state management
- **Theming** - Dark/Light theme support with customizable colors
- **Filtering** - Column-level and global filtering
  - Multiple filter operators (equals, contains, startsWith, etc.)
  - Custom filter functions
  - Filter panel for each column
  - Mobile drawer for filters
- **Sorting** - Single and multi-column sorting
  - Custom sort functions
  - Sort direction indicators
  - Clear sort functionality
- **Drag & Drop** - Column reordering via drag and drop
  - Visual feedback during drag
  - Threshold to prevent accidental reorder
- **Column Resize** - Adjust column widths
  - Min/max width constraints
  - Resize handle on header cells
- **Pagination** - Built-in pagination
  - Customizable page sizes
  - First/Last page buttons
  - Page number navigation
- **Row Selection** - Single and multi-select
  - Select all/deselect all
  - Indeterminate checkbox state
- **Row Expansion** - Expandable rows
  - Custom expansion content
  - Expand/collapse all
- **Responsive Design** - Mobile-first approach
  - Configurable mobile breakpoint
  - Mobile card layout with labels
  - Mobile drawer for filters, sorting, columns
- **Skeleton Loading** - Animated loading placeholder
  - Configurable rows and columns
  - Matches table structure
- **Empty State** - Customizable empty state
  - Custom icon, title, description
  - Action button support
- **Translations** - Full i18n support
  - All UI text is translatable
  - Default English translations
- **Hooks** - Access state and actions programmatically
  - `useTable` - Main hook with all features
  - `useSort` - Sorting state and actions
  - `useFilter` - Filter state and actions
  - `usePagination` - Pagination state and actions
  - `useDragDrop` - Drag and drop state and handlers
  - `useBreakpoint` - Responsive breakpoint utilities
- **TypeScript** - Full type definitions
  - Generic type support for row data
  - Strict type checking
- **Accessibility** - ARIA attributes
  - Role attributes
  - Keyboard navigation (partial)

### Technical Details

- React 16.8+ compatible (uses hooks)
- No external dependencies (except React)
- Tailwind CSS for styling (peer dependency)
- ESM and CommonJS builds
- Tree-shakeable exports

## [Unreleased]

### Planned

- Virtualization for large datasets (virtual scrolling)
- Column groups (grouped headers)
- Touch gestures for mobile
- Server-side data support
- Master-detail (nested grids in expanded rows)
- Conditional formatting
- Multi-column header groups

