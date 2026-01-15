export interface PaginationState {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface PaginationActions {
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  goToFirstPage: () => void;
  goToLastPage: () => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  canGoToNextPage: () => boolean;
  canGoToPreviousPage: () => boolean;
  getPageRange: () => { start: number; end: number };
}

export interface PaginationConfig {
  initialPage?: number;
  initialPageSize?: number;
  pageSizeOptions?: readonly number[];
  showFirstLast?: boolean;
  showPageNumbers?: boolean;
  maxPageButtons?: number;
  persistPagination?: boolean;
  paginationStorageKey?: string;
}

export interface PaginationInfo {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  isFirstPage: boolean;
  isLastPage: boolean;
}

