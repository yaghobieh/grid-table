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
  reorderColumn: (sourceId: string, targetId: string) => void;
  resizeColumn: (columnId: string, width: number) => void;
  toggleColumnVisibility: (columnId: string) => void;
  resetColumns: () => void;
  setDraggingColumn: (columnId: string | null) => void;
  setResizingColumn: (columnId: string | null) => void;
  setActiveFilterColumn: (columnId: string | null) => void;
  openMobileDrawer: (content: 'filter' | 'sort' | 'columns') => void;
  closeMobileDrawer: () => void;
  refresh: () => void;
  reset: () => void;
}

export interface TableContextValue<T extends RowData = RowData> {
  state: TableContextState<T>;
  actions: TableContextActions<T>;
  computed: {
    filteredData: T[];
    sortedData: T[];
    paginatedData: T[];
    visibleColumns: ColumnDefinition<T>[];
    totalPages: number;
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
}

