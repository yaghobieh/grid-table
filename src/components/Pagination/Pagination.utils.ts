import { ONE } from '@/constants';

interface GetPaginationDerivedStateParams {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export function getPaginationDerivedState({
  page,
  pageSize,
  totalItems,
  totalPages,
}: GetPaginationDerivedStateParams) {
  const canGoPrevious = page > ONE;
  const canGoNext = page < totalPages;
  const startItem = (page - ONE) * pageSize + ONE;
  const endItem = Math.min(page * pageSize, totalItems);

  return {
    canGoPrevious,
    canGoNext,
    startItem,
    endItem,
  };
}
