# Changelog

All notable changes to grid-table will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

