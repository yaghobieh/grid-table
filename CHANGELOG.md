# Changelog

All notable changes to grid-table will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

- Virtualization for large datasets
- Column pinning (left/right)
- Column groups
- Export to CSV/Excel
- Keyboard navigation (full)
- Touch gestures for mobile
- Row reordering via drag and drop
- Infinite scroll pagination
- Server-side data support
- Column search
- Saved views/presets

