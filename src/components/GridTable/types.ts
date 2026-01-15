import type { ReactNode, CSSProperties, RefObject } from 'react';
import type {
  RowData,
  ColumnDefinition,
  Theme,
  Translations,
  Breakpoint,
  Dimensions,
  ClassNames,
  Styles,
  PaginationConfig,
  FilterConfig,
  SortConfig,
  SortDirection,
  GridTableRef,
} from '../../types';

export interface GridTableComponentProps<T extends RowData = RowData> {
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
  paginationConfig?: PaginationConfig;
  filterConfig?: FilterConfig;
  sortConfig?: SortConfig;
  onRowClick?: (row: T, index: number) => void;
  onRowDoubleClick?: (row: T, index: number) => void;
  onCellClick?: (event: { row: T; rowIndex: number; columnId: string; value: unknown }) => void;
  onRowSelect?: (selectedRows: T[]) => void;
  onSort?: (sorting: Array<{ columnId: string; direction: SortDirection }>) => void;
  onFilter?: (filters: Array<{ columnId: string; value: unknown }>) => void;
  onPageChange?: (page: number, pageSize: number) => void;
  onError?: (error: Error) => void;
  onRetry?: () => void;
  getRowId?: (row: T) => string | number;
  getRowClassName?: (row: T, index: number) => string;
  getRowStyle?: (row: T, index: number) => CSSProperties;
  isRowDisabled?: (row: T) => boolean;
  renderRowExpansion?: (row: T) => ReactNode;
  renderHeader?: () => ReactNode;
  renderFooter?: () => ReactNode;
  tableRef?: RefObject<GridTableRef<T>>;
  className?: string;
  style?: CSSProperties;
}

