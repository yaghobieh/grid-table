import type { ReactNode } from 'react';
import type { ColumnDefinition, ColumnState } from './column.types';
import type { RowData, RowSelectionState, RowExpansionState } from './row.types';
import type { FilterState, FilterConfig } from './filter.types';
import type { SortState, SortConfig } from './sort.types';
import type { PaginationState, PaginationConfig } from './pagination.types';
import type {
  Theme,
  Translations,
  Breakpoint,
  Dimensions,
  ClassNames,
  Styles,
} from './common.types';

export interface GridTableProps<T extends RowData = RowData> {
  data: T[];
  columns: ColumnDefinition<T>[];
  loading?: boolean;
  error?: Error | string | null;
  emptyContent?: ReactNode;
  loadingContent?: ReactNode;
  errorContent?: ReactNode | ((error: Error | string) => ReactNode);
  theme?: Partial<Theme>;
  translations?: Partial<Translations>;
  dimensions?: Dimensions;
  classNames?: ClassNames;
  styles?: Styles;
  mobileBreakpoint?: Breakpoint;
  showMobileLabels?: boolean;
  enableDragDrop?: boolean;
  enableColumnResize?: boolean;
  enableRowSelection?: boolean;
  enableMultiSelect?: boolean;
  enableRowExpansion?: boolean;
  stickyHeader?: boolean;
  showPagination?: boolean;
  showFilter?: boolean;
  showGlobalFilter?: boolean;
  showColumnToggle?: boolean;
  showSortIndicator?: boolean;
  virtualize?: boolean;
  virtualizeThreshold?: number;
  rowHeight?: number;
  headerHeight?: number;
  paginationConfig?: PaginationConfig;
  filterConfig?: FilterConfig;
  sortConfig?: SortConfig;
  initialState?: Partial<TableState<T>>;
  onStateChange?: (state: TableState<T>) => void;
  onRowClick?: (row: T, index: number) => void;
  onRowDoubleClick?: (row: T, index: number) => void;
  onCellClick?: (event: { row: T; rowIndex: number; columnId: string; value: unknown }) => void;
  onRowSelect?: (selectedRows: T[]) => void;
  onRowExpand?: (expandedRows: T[]) => void;
  onSort?: (sorting: SortState['sorting']) => void;
  onFilter?: (filters: FilterState) => void;
  onPageChange?: (page: number, pageSize: number) => void;
  onColumnReorder?: (columns: ColumnState[]) => void;
  onColumnResize?: (columnId: string, width: number) => void;
  onColumnVisibilityChange?: (columnId: string, visible: boolean) => void;
  onError?: (error: Error) => void;
  onRetry?: () => void;
  getRowId?: (row: T) => string | number;
  getRowClassName?: (row: T, index: number) => string;
  getRowStyle?: (row: T, index: number) => React.CSSProperties;
  isRowDisabled?: (row: T) => boolean;
  isRowSelectable?: (row: T) => boolean;
  renderRowExpansion?: (row: T) => ReactNode;
  renderHeader?: () => ReactNode;
  renderFooter?: () => ReactNode;
  renderEmpty?: () => ReactNode;
  renderLoading?: () => ReactNode;
  renderError?: (error: Error | string) => ReactNode;
  children?: ReactNode;
}

export interface TableState<T extends RowData = RowData> {
  data: T[];
  columns: ColumnState[];
  sorting: SortState;
  filtering: FilterState;
  pagination: PaginationState;
  selection: RowSelectionState;
  expansion: RowExpansionState;
  loading: boolean;
  error: Error | string | null;
}

export interface TableInstance<T extends RowData = RowData> {
  state: TableState<T>;
  data: T[];
  filteredData: T[];
  sortedData: T[];
  paginatedData: T[];
  columns: ColumnDefinition<T>[];
  visibleColumns: ColumnDefinition<T>[];
  setData: (data: T[]) => void;
  refresh: () => void;
  reset: () => void;
}

export interface GridTableRef<T extends RowData = RowData> {
  getInstance: () => TableInstance<T>;
  scrollToRow: (index: number) => void;
  scrollToTop: () => void;
  scrollToBottom: () => void;
  focusRow: (index: number) => void;
  selectRow: (id: string | number) => void;
  deselectRow: (id: string | number) => void;
  expandRow: (id: string | number) => void;
  collapseRow: (id: string | number) => void;
  setFilter: (columnId: string, value: unknown) => void;
  clearFilters: () => void;
  setSorting: (columnId: string, direction: 'asc' | 'desc' | null) => void;
  clearSorting: () => void;
  goToPage: (page: number) => void;
  exportData: (format: 'json' | 'csv') => void;
}

