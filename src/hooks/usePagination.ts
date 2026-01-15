import { useCallback, useMemo } from 'react';
import { useTableContext } from '../context';
import type { PaginationInfo, PaginationActions } from '../types';
import { ONE } from '../constants';

export interface UsePaginationReturn extends PaginationInfo, PaginationActions {
  pageSizeOptions: readonly number[];
}

export interface UsePaginationOptions {
  pageSizeOptions?: readonly number[];
}

export function usePagination(options: UsePaginationOptions = {}): UsePaginationReturn {
  const { pageSizeOptions = [10, 20, 50, 100] } = options;
  const { state, actions, computed } = useTableContext();

  const setPage = useCallback(
    (page: number) => {
      const validPage = Math.max(ONE, Math.min(page, computed.totalPages));
      actions.setPage(validPage);
    },
    [actions, computed.totalPages]
  );

  const setPageSize = useCallback(
    (pageSize: number) => {
      actions.setPageSize(pageSize);
    },
    [actions]
  );

  const goToFirstPage = useCallback(() => {
    actions.setPage(ONE);
  }, [actions]);

  const goToLastPage = useCallback(() => {
    actions.setPage(computed.totalPages);
  }, [actions, computed.totalPages]);

  const goToNextPage = useCallback(() => {
    if (computed.canGoNext) {
      actions.setPage(state.page + ONE);
    }
  }, [actions, computed.canGoNext, state.page]);

  const goToPreviousPage = useCallback(() => {
    if (computed.canGoPrevious) {
      actions.setPage(state.page - ONE);
    }
  }, [actions, computed.canGoPrevious, state.page]);

  const canGoToNextPage = useCallback((): boolean => {
    return computed.canGoNext;
  }, [computed.canGoNext]);

  const canGoToPreviousPage = useCallback((): boolean => {
    return computed.canGoPrevious;
  }, [computed.canGoPrevious]);

  const getPageRange = useCallback((): { start: number; end: number } => {
    const start = (state.page - ONE) * state.pageSize + ONE;
    const end = Math.min(state.page * state.pageSize, computed.sortedData.length);
    return { start, end };
  }, [state.page, state.pageSize, computed.sortedData.length]);

  const paginationInfo: PaginationInfo = useMemo(() => {
    const { start, end } = getPageRange();
    return {
      page: state.page,
      pageSize: state.pageSize,
      totalItems: computed.sortedData.length,
      totalPages: computed.totalPages,
      startIndex: start,
      endIndex: end,
      isFirstPage: state.page === ONE,
      isLastPage: state.page === computed.totalPages,
    };
  }, [state.page, state.pageSize, computed.sortedData.length, computed.totalPages, getPageRange]);

  return useMemo(
    () => ({
      ...paginationInfo,
      pageSizeOptions,
      setPage,
      setPageSize,
      goToFirstPage,
      goToLastPage,
      goToNextPage,
      goToPreviousPage,
      canGoToNextPage,
      canGoToPreviousPage,
      getPageRange,
    }),
    [
      paginationInfo,
      pageSizeOptions,
      setPage,
      setPageSize,
      goToFirstPage,
      goToLastPage,
      goToNextPage,
      goToPreviousPage,
      canGoToNextPage,
      canGoToPreviousPage,
      getPageRange,
    ]
  );
}

