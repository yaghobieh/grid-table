import type { CSSProperties } from 'react';

export interface PaginationProps {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  pageSizeOptions?: readonly number[];
  showFirstLast?: boolean;
  showPageNumbers?: boolean;
  maxPageButtons?: number;
  className?: string;
  style?: CSSProperties;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

