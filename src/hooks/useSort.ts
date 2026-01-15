import { useCallback, useMemo } from 'react';
import { useTableContext } from '../context';
import type { SortDirection, SortActions, SortState } from '../types';

export interface UseSortReturn {
  sorting: SortState['sorting'];
  getSortDirection: (columnId: string) => SortDirection;
  getSortIndex: (columnId: string) => number;
  isSorted: (columnId: string) => boolean;
  setSorting: SortActions['setSorting'];
  toggleSorting: SortActions['toggleSorting'];
  clearSorting: SortActions['clearSorting'];
  clearColumnSorting: (columnId: string) => void;
}

export function useSort(): UseSortReturn {
  const { state, actions } = useTableContext();

  const getSortDirection = useCallback(
    (columnId: string): SortDirection => {
      const sort = state.sorting.find((s) => s.columnId === columnId);
      return sort?.direction ?? null;
    },
    [state.sorting]
  );

  const getSortIndex = useCallback(
    (columnId: string): number => {
      return state.sorting.findIndex((s) => s.columnId === columnId);
    },
    [state.sorting]
  );

  const isSorted = useCallback(
    (columnId: string): boolean => {
      return state.sorting.some((s) => s.columnId === columnId);
    },
    [state.sorting]
  );

  const clearColumnSorting = useCallback(
    (columnId: string) => {
      actions.setSorting(columnId, null);
    },
    [actions]
  );

  return useMemo(
    () => ({
      sorting: state.sorting,
      getSortDirection,
      getSortIndex,
      isSorted,
      setSorting: actions.setSorting,
      toggleSorting: actions.toggleSorting,
      clearSorting: actions.clearSorting,
      clearColumnSorting,
    }),
    [state.sorting, getSortDirection, getSortIndex, isSorted, actions, clearColumnSorting]
  );
}

