import '@forgedevstack/bear/styles.css';

// Main component
export { GridTable } from './components';
export type { GridTableComponentProps } from './components';

export {
  GridHeader,
  GridBody,
  GridRow,
  GridCell,
  Pagination,
  Skeleton,
  EmptyState,
  MobileDrawer,
  ContextMenu,
  StatusBar,
} from './components';

export { EditableCell } from './components/EditableCell';

export type {
  GridHeaderProps,
  GridBodyProps,
  GridRowProps,
  GridCellProps,
  PaginationProps,
  SkeletonProps,
  EmptyStateProps,
  MobileDrawerProps,
  ContextMenuProps,
  StatusBarProps,
} from './components';

// Context and Provider
export { TableProvider, TableContext, useTableContext } from './context';
export type {
  TableContextState,
  TableContextActions,
  TableContextValue,
  TableProviderProps,
  TableOptions,
  SubCellExpandTrigger,
} from './context';

// Hooks
export {
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
} from './hooks';

export type {
  UseTableReturn,
  UseSortReturn,
  UseFilterReturn,
  UseFilterOptions,
  UsePaginationReturn,
  UsePaginationOptions,
  UseDragDropReturn,
  UseDragDropOptions,
  DragHandleProps,
  DropTargetProps,
  UseBreakpointReturn,
  UseKeyboardNavigationReturn,
  UseRowReorderReturn,
  RowDragHandleProps,
  UseUndoRedoReturn,
  UseTreeDataReturn,
} from './hooks';

// Types
export type {
  // Common types
  ThemeMode,
  Breakpoint,
  MobileLayout,
  ResponsiveValue,
  SortDirection,
  FilterOperator,
  Alignment,
  Dimensions,
  ThemeColors,
  Theme,
  Translations,
  ClassNames,
  Styles,
  RenderFunction,
  ColumnDefinition,
  CellEditConfig,
  FilterOption,
  ColumnState,
  ColumnReorderEvent,
  ColumnResizeEvent,
  ColumnVisibilityEvent,
  // Row types
  RowData,
  RowState,
  RowProps,
  RowSelectionState,
  RowSelectionActions,
  RowExpansionState,
  RowExpansionActions,
  // Filter types
  FilterValue,
  FilterState,
  FilterActions,
  FilterConfig,
  FilterPanelProps,
  // Sort types
  SortValue,
  SortState,
  SortActions,
  SortConfig,
  // Pagination types
  PaginationState,
  PaginationActions,
  PaginationConfig,
  PaginationInfo,
  // Table types
  GridTableProps,
  TableState,
  TableInstance,
  GridTableRef,
  // v1.0.6 — Effects, Lazy Load
  TableEffects,
  HoverEffectConfig,
  SortEffectConfig,
  RowEffectConfig,
  LazyLoadConfig,
  // v1.0.7 — New feature types
  ContextMenuAction,
  ContextMenuContext,
  ContextMenuConfig,
  StatusBarConfig,
  AggregationType,
  FrozenRowsConfig,
  TreeConfig,
  FlatTreeRow,
  KeyboardNavConfig,
  FocusedCell,
  RowReorderConfig,
  EditHistoryEntry,
  UndoRedoConfig,
  PrintConfig,
  AutoFitConfig,
  ColumnAggregation,
} from './types';

// Constants
export {
  BREAKPOINTS,
  BREAKPOINT_KEYS,
  RESPONSIVE_MODES,
  DEFAULT_TRANSLATIONS,
  DEFAULT_THEME,
  DEFAULT_LIGHT_THEME,
  DEFAULT_TABLE_CONFIG,
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGE_SIZES,
  MIN_COLUMN_WIDTH,
  DEFAULT_COLUMN_WIDTH,
  MAX_COLUMN_WIDTH,
  MOBILE_BREAKPOINT,
  TABLET_BREAKPOINT,
  DESKTOP_BREAKPOINT,
} from './constants';

export {
  exportToCSV,
  exportToJSON,
  exportToExcel,
  exportToPDF,
  copyToClipboard,
  printTable,
  computeAggregation,
} from './utils';
