# Changelog

All notable changes to grid-table will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.5] - 2026-09-04

### Added

- **Pivot-lite** — optional `pivot` with `rowFields`, `columnFields`, and `valueFields` (sum/avg/count/min/max). Client-side only.
- **Group drop-zone** — `rowGroupDropZone` plus `onRowGroupsChange`; drop a header to group, chips remove a field.
- **Cell comments** — `cellComments` with corner indicator and Bear popover (controlled get/set).
- **Row height** — `rowHeight` config for default/min/max, `auto` wrap, and a resize handle.
- **Cell span** — optional `cellSpan.getColSpan` / `getRowSpan` (row-span across a virtualize window is out of scope).
- **Bear density** — when `density` is omitted, inherit BearProvider compact/comfortable.
- **Range a11y** — polite live region for selection size and fill complete; fill handle documents Ctrl/Cmd+D.
- **RTL** — swipe actions, pin-edge shadows, and fill handle follow `dir="rtl"`.

### Changed

- **FilterPopup** — Clear / Apply use Bear `Button`.

### Portal

- `/demos/release-1-1-5` and `/demos/touch-gestures`.
- Home trailer via Torch; Demos & Examples via Rail carousel.
- New mark, lockup, favicon, and 1.1.5 badge.
- Changelog i18n + `CURRENT_VERSION` → 1.1.5 (en/es/he).

## [1.1.4] - 2026-08-22

### Added

- **Column autosize** — double-click the header resize divider to fit the column to the longest header or cell string (Excel / AG Grid), clamped to min/max width.
- **Autosize all + size to fit** — `autoFit.enabled` toolbar actions; `autoFit.onMount` sizes columns after first paint.
- **Filter chips** — `showFilterChips` (default on) lists active column filters with remove / clear all.
- **Column menu** — header kebab (`enableColumnMenu`) for autosize, pin left/right, hide.
- **Column chooser** — desktop `showColumnToggle` panel to show/hide columns.
- **Floating filters** — `floatingFilters` input row under headers.
- **Find** — Ctrl/Cmd+F focuses the global search input (`enableFind`).
- **Set-filter search** — typeahead inside `filterType="set"` lists.
- **Cut + fill series** — Ctrl/Cmd+X / context menu cut; fill handle increments numeric sequences (`rangeSelection.fillSeries`).

### Changed

- **Column chooser** — Bear `Dropdown` + aligned checkboxes; row click toggles visibility (checkbox is display-only so the menu button receives the click).
- **Bear** — library and portal use `@forgedevstack/bear` 1.3.0.
- **Code quality** — FilterPopup/FilterChips/FilterBuilder/EditableCell/HeaderCell/Skeleton follow grid-code-quality (hooks, helpers, one component per file, no const-of-const).

### Fixed

- **Fill handle + virtualize** — fill-down applies once on mouseup against absolute `displayData` indexes, and the fill focus follows the pointer after scroll so recycled rows do not write the wrong cells.
- **Column chooser toggle** — checking a column in the Columns menu now hides/shows it.

### Portal

- Changelog i18n + `CURRENT_VERSION` → 1.1.4.
- New demo `/demos/release-1-1-4` for the 1.1.4 surfaces.

## [1.1.3] - 2026-08-08

### Fixed

- **Virtualization** — main `GridBody` now renders sliced `bodyRows` when `virtualize` is enabled (spacers + windowed DOM). Absolute `rowIndexOffset` keeps range/fill/selection indexes aligned with full `displayData`.

### Added

- **Range clipboard copy** — Ctrl/Cmd+C copies the selected cell range as TSV; context menu “Copy range”; `rangeSelection.enableCopy` (default on).
- **Keyboard range extend** — Shift+Arrows grow/shrink the range from the anchor; Escape clears the range when not editing.
- **Cell editing UX** — Tab commits and moves to the next editable cell; Enter/F2 start edit with select-on-focus (`keyboardNavigation.selectOnEditFocus`, `enableEditOnF2`, `tabCommitsAndMoves`).
- **Header pin control** — pin toggle in column headers (left → right → unpin) without requiring right-click.
- **Export utilities** — `resolveExportColumns` / `shouldSkipEmptyExport` exported.

### Changed

- **Export polish** — CSV/Excel/JSON/PDF/copy/print respect column order and skip hidden/invisible columns; empty row sets (including `exportScope="selected"` with no selection) are a no-op (no empty file).
- **Column pin polish** — `columnState.pinned` drives sticky rendering; stronger pin-edge shadow separators on the last left / first right pinned column.

### Portal

- Enterprise demo copy notes range copy, Shift+Arrows, Escape clear, Tab edit commit, and header pin.
- Changelog i18n + `CURRENT_VERSION` → 1.1.3.
- `docs/GRID_TABLE_DOCS.md` refreshed for 1.1.3.

## [1.1.2] - 2026-07-24

### Added

- **Fill handle** — `rangeSelection.fillHandle` (default on when range selection is enabled) shows a drag handle on the bottom-right cell of the selection. Drag down or press Ctrl/Cmd+D to fill cells from the top row of the range when `enableCellEdit` is on.
- **Touch swipe actions** — `touchGestures.swipeActions` reveals configurable row actions (defaults: Copy / Delete). Optional `swipeActionItems` for custom buttons.
- **Long-press context menu** — `touchGestures.longPressContextMenu` opens the existing context menu on touch/pen long-press.
- **`useTouchGestures` hook** — exported for custom touch row compositions.
- **Wired range drag** — cell `mousedown` / `mouseenter` now drive `useRangeSelection` so drag-select works end-to-end.

### Portal

- **Enterprise grid demo** (`/demos/enterprise-grid`) — range + paste + fill handle, set/date filters, exportScope toggle, flash cells, applyTransaction add, touch swipe/long-press.
- **Infinite scroll demo** (`/demos/infinite-scroll`) — SSRM-style `onLoadBlock` distinct from lazyLoad / virtualize / manualPagination.
- **Column grouping demo** migrated to `columnGroups` + `alignColumnGroups` colspan headers.
- **FeaturesDemo** links to shipped 1.1.x demos; hard-coded “planned” cards removed; copy through i18n (en/es/he).
- **API Reference** — `filterType` includes `set`; date range behavior documented; hooks list includes `useRangeSelection`, `useInfiniteScroll`, `useSavedViews`, `useVirtualizedWindow`, `useRowGroupExpansion`, `useTouchGestures`.
- Playwright interaction smoke for range highlight, set filter, and exportScope toolbar.
- Changelog i18n + `CURRENT_VERSION` → 1.1.2.

### Docs

- Cleared stale `[Unreleased] Planned` items that already shipped in 1.1.0 / 1.1.1.
- `docs/GRID_TABLE_DOCS.md` refreshed through 1.1.2.

## [1.1.1] - 2026-07-11

### Added

- **`exportScope` prop** — `'all' | 'filtered' | 'sorted' | 'selected'` controls which rows are included in CSV/Excel/PDF export, clipboard copy, and print. Default `'sorted'`. `resolveExportData` utility exported.
- **Saved view URL sync** — `savedViews.syncUrl` reads/writes active view id to the query string (`urlParam`, default `'view'`).
- **Set filter UI** — `filterType: 'set'` on columns shows checkbox list in the filter popup; applies `'in'` operator.
- **Date range filter UI** — `filterType: 'date'` with from/to inputs and `between` operator in the filter popup.
- **Expandable group rows** — `rowGroups.showHeaders`, `defaultExpanded`, collapse/expand via chevron on group header rows. `useRowGroupExpansion` hook exported.
- **Excel-style range selection** — `rangeSelection` prop with drag-to-select cells. `useRangeSelection` hook exported.
- **Clipboard paste into range** — Ctrl/Cmd+V pastes tab-separated clipboard data into selected range when `enableCellEdit` is on.
- **SSRM-style infinite scroll** — `infiniteScroll` prop with `onLoadBlock`, `blockSize`, `totalRowCount`. `useInfiniteScroll` hook exported.
- **Multi-row column group headers** — `columnGroups` + `alignColumnGroups` render real colspan header row via `ColumnGroupHeader`.
- **Delta row updates** — `applyTransaction` utility for `{ add, update, remove }` batch mutations.
- **Flash cells** — `flashCells` prop highlights cells after paste or programmatic updates.
- **Cursor agent skills** — `.cursor/skills/` with code-review, component-workflow, code-quality, and release-workflow guides.
- **Husky pre-commit** — `scripts/pre-commit.sh` runs library typecheck, build, portal typecheck, and Playwright portal sanity.
- **Playwright e2e** — portal route render + dark-mode specs; `Sanity/sanity-release-{version}.md` report.

### Fixed

- **Loading state hooks** — removed `useMemo` after loading early return in `GridTableContent` that broke server-driven and other loading demos.

### Portal

- **Skills page** at `/skills` with copy-ready prompts for Cursor, Claude, and ChatGPT.
- **Docs** — saved views, advanced filters, column formulas, virtualization, export scope, enterprise grid features; fixed virtualization text (no longer "on the roadmap").
- Saved views demo enables `syncUrl: true`; pinned row groups demo enables `showHeaders: true`.
- i18n for Skills and 1.1.1 changelog (en, es, he).

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

- Tracked on GitHub milestone **1.1.3** (open issues after this release).

