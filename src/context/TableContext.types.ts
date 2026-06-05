import type { ReactNode } from 'react';
import type {
  RowData,
  ColumnDefinition,
  ColumnState,
  FilterValue,
  SortValue,
  Theme,
  Translations,
  Breakpoint,
  SortDirection,
  FilterOperator,
  PaginationConfig,
  FilterConfig,
  SortConfig,
} from '../types';
import { TABLE_ACTION } from './TableContext.constants';

export interface TableContextState<T extends RowData = RowData> {
  data: T[];
  originalData: T[];
  columns: ColumnDefinition<T>[];
  columnStates: ColumnState[];
  sorting: SortValue[];
  filters: FilterValue[];
  globalFilter: string;
  page: number;
  pageSize: number;
  totalItems: number;
  selectedIds: Set<string | number>;
  expandedIds: Set<string | number>;
  expandedCellIds: Set<string>;
  autoSizedColumnIds: Set<string>;
  loading: boolean;
  error: Error | string | null;
  theme: Theme;
  translations: Translations;
  currentBreakpoint: Breakpoint;
  mobileBreakpoint: Breakpoint;
  draggingColumnId: string | null;
  resizingColumnId: string | null;
  activeFilterColumnId: string | null;
  showMobileDrawer: boolean;
  mobileDrawerContent: 'filter' | 'sort' | 'columns' | null;
}

export interface TableContextActions<T extends RowData = RowData> {
  setData: (data: T[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | string | null) => void;
  setSorting: (columnId: string, direction: SortDirection) => void;
  toggleSorting: (columnId: string) => void;
  clearSorting: () => void;
  setFilter: (columnId: string, value: unknown, operator?: FilterOperator) => void;
  removeFilter: (columnId: string) => void;
  clearFilters: () => void;
  setGlobalFilter: (value: string) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  selectRow: (id: string | number) => void;
  deselectRow: (id: string | number) => void;
  toggleRow: (id: string | number) => void;
  selectAll: () => void;
  deselectAll: () => void;
  expandRow: (id: string | number) => void;
  collapseRow: (id: string | number) => void;
  toggleRowExpansion: (id: string | number) => void;
  expandAllRows: () => void;
  collapseAllRows: () => void;
  toggleCellExpansion: (rowId: string | number, columnId: string) => void;
  toggleColumnAutoSize: (columnId: string) => void;
  reorderColumn: (sourceId: string, targetId: string) => void;
  resizeColumn: (columnId: string, width: number) => void;
  toggleColumnVisibility: (columnId: string) => void;
  pinColumn: (columnId: string, side: 'left' | 'right' | null) => void;
  resetColumns: () => void;
  setColumnStates: (states: ColumnState[]) => void;
  setDraggingColumn: (columnId: string | null) => void;
  setResizingColumn: (columnId: string | null) => void;
  setActiveFilterColumn: (columnId: string | null) => void;
  openMobileDrawer: (content: 'filter' | 'sort' | 'columns') => void;
  closeMobileDrawer: () => void;
  refresh: () => void;
  reset: () => void;
}

export type SubCellExpandTrigger = 'doubleClick' | 'arrow' | 'both';

export interface TableOptions {
  showOverflowTooltip?: boolean;
  enableCellAutoSizeOnDoubleClick?: boolean;
  subCellExpandTrigger?: SubCellExpandTrigger;
  expandRowOnDoubleClick?: boolean;
  globalFilterColumns?: string[];
}

export interface TableContextValue<T extends RowData = RowData> {
  state: TableContextState<T>;
  actions: TableContextActions<T>;
  tableOptions: TableOptions;
  computed: {
    filteredData: T[];
    sortedData: T[];
    paginatedData: T[];
    visibleColumns: ColumnDefinition<T>[];
    totalPages: number;
    effectiveTotalItems: number;
    canGoNext: boolean;
    canGoPrevious: boolean;
    allSelected: boolean;
    someSelected: boolean;
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
  };
}

export interface TableProviderProps<T extends RowData = RowData> {
  children: ReactNode;
  data: T[];
  columns: ColumnDefinition<T>[];
  loading?: boolean;
  error?: Error | string | null;
  theme?: Partial<Theme>;
  translations?: Partial<Translations>;
  mobileBreakpoint?: Breakpoint;
  paginationConfig?: PaginationConfig;
  filterConfig?: FilterConfig;
  sortConfig?: SortConfig;
  enableMultiSort?: boolean;
  enableRowSelection?: boolean;
  enableMultiSelect?: boolean;
  getRowId?: (row: T) => string | number;
  onStateChange?: (state: TableContextState<T>) => void;
  showOverflowTooltip?: boolean;
  enableCellAutoSizeOnDoubleClick?: boolean;
  subCellExpandTrigger?: SubCellExpandTrigger;
  expandRowOnDoubleClick?: boolean;
  globalFilterColumns?: string[];
  defaultExpandedIds?: Array<string | number>;
}

export type TableReducerAction<T extends RowData = RowData> =
  | { type: typeof TABLE_ACTION.SET_DATA; payload: T[] }
  | { type: typeof TABLE_ACTION.SET_LOADING; payload: boolean }
  | { type: typeof TABLE_ACTION.SET_ERROR; payload: Error | string | null }
  | { type: typeof TABLE_ACTION.SET_SORTING; payload: SortValue[] }
  | { type: typeof TABLE_ACTION.SET_FILTERS; payload: FilterValue[] }
  | { type: typeof TABLE_ACTION.SET_GLOBAL_FILTER; payload: string }
  | { type: typeof TABLE_ACTION.SET_PAGE; payload: number }
  | { type: typeof TABLE_ACTION.SET_PAGE_SIZE; payload: number }
  | { type: typeof TABLE_ACTION.SET_SELECTED_IDS; payload: Set<string | number> }
  | { type: typeof TABLE_ACTION.SET_EXPANDED_IDS; payload: Set<string | number> }
  | { type: typeof TABLE_ACTION.SET_EXPANDED_CELL_IDS; payload: Set<string> }
  | { type: typeof TABLE_ACTION.SET_AUTO_SIZED_COLUMN_IDS; payload: Set<string> }
  | { type: typeof TABLE_ACTION.SET_COLUMN_STATES; payload: ColumnState[] }
  | { type: typeof TABLE_ACTION.SET_DRAGGING_COLUMN; payload: string | null }
  | { type: typeof TABLE_ACTION.SET_RESIZING_COLUMN; payload: string | null }
  | { type: typeof TABLE_ACTION.SET_ACTIVE_FILTER_COLUMN; payload: string | null }
  | { type: typeof TABLE_ACTION.SET_CURRENT_BREAKPOINT; payload: 'mobile' | 'tablet' | 'desktop' }
  | { type: typeof TABLE_ACTION.SET_MOBILE_DRAWER; payload: { show: boolean; content: 'filter' | 'sort' | 'columns' | null } }
  | { type: typeof TABLE_ACTION.RESET; payload: Partial<TableContextState<T>> };
