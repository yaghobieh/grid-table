export const DEFAULT_PLAYGROUND_ROWS = 8;

export const TOGGLE_OPTIONS = [
  { key: 'enableRowSelection', label: 'Row Selection' },
  { key: 'enableDragDrop', label: 'Drag & Drop' },
  { key: 'enableColumnResize', label: 'Column Resize' },
  { key: 'showPagination', label: 'Pagination' },
  { key: 'showFilter', label: 'Filters' },
  { key: 'showGlobalFilter', label: 'Global Search' },
  { key: 'stickyHeader', label: 'Sticky Header' },
  { key: 'enableExport', label: 'Export' },
  { key: 'enableCellEdit', label: 'Cell Editing' },
] as const;

export const EFFECT_OPTIONS = [
  { key: 'hover', label: 'Hover Effect' },
  { key: 'sort', label: 'Sort Animation' },
  { key: 'row', label: 'Row Animation' },
] as const;

export const THEME_MODES = ['dark', 'light'] as const;
