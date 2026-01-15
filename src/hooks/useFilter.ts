import { useCallback, useMemo, useState, useEffect } from 'react';
import { useTableContext } from '../context';
import type { FilterActions, FilterValue, FilterOperator } from '../types';
import { DEBOUNCE_DELAY } from '../constants';

export interface UseFilterReturn {
  filters: FilterValue[];
  globalFilter: string;
  activeFilterColumnId: string | null;
  hasAnyFilter: () => boolean;
  hasFilter: (columnId: string) => boolean;
  getFilterValue: (columnId: string) => FilterValue | undefined;
  setFilter: FilterActions['setFilter'];
  removeFilter: FilterActions['removeFilter'];
  clearFilters: FilterActions['clearFilters'];
  setGlobalFilter: FilterActions['setGlobalFilter'];
  clearGlobalFilter: () => void;
  openFilterPanel: (columnId: string) => void;
  closeFilterPanel: () => void;
}

export interface UseFilterOptions {
  debounceMs?: number;
}

export function useFilter(options: UseFilterOptions = {}): UseFilterReturn {
  const { debounceMs = DEBOUNCE_DELAY } = options;
  const { state, actions } = useTableContext();
  const [debouncedGlobalFilter, setDebouncedGlobalFilter] = useState(state.globalFilter);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (debouncedGlobalFilter !== state.globalFilter) {
        actions.setGlobalFilter(debouncedGlobalFilter);
      }
    }, debounceMs);
    return () => clearTimeout(timer);
  }, [debouncedGlobalFilter, debounceMs, actions, state.globalFilter]);

  const hasAnyFilter = useCallback((): boolean => {
    return state.filters.length > 0 || state.globalFilter.length > 0;
  }, [state.filters, state.globalFilter]);

  const hasFilter = useCallback(
    (columnId: string): boolean => {
      return state.filters.some((f) => f.columnId === columnId);
    },
    [state.filters]
  );

  const getFilterValue = useCallback(
    (columnId: string): FilterValue | undefined => {
      return state.filters.find((f) => f.columnId === columnId);
    },
    [state.filters]
  );

  const setFilter = useCallback(
    (columnId: string, value: unknown, operator: FilterOperator = 'contains') => {
      actions.setFilter(columnId, value, operator);
    },
    [actions]
  );

  const clearGlobalFilter = useCallback(() => {
    setDebouncedGlobalFilter('');
    actions.setGlobalFilter('');
  }, [actions]);

  const setGlobalFilterDebounced = useCallback((value: string) => {
    setDebouncedGlobalFilter(value);
  }, []);

  const openFilterPanel = useCallback(
    (columnId: string) => {
      actions.setActiveFilterColumn(columnId);
    },
    [actions]
  );

  const closeFilterPanel = useCallback(() => {
    actions.setActiveFilterColumn(null);
  }, [actions]);

  return useMemo(
    () => ({
      filters: state.filters,
      globalFilter: debouncedGlobalFilter,
      activeFilterColumnId: state.activeFilterColumnId,
      hasAnyFilter,
      hasFilter,
      getFilterValue,
      setFilter,
      removeFilter: actions.removeFilter,
      clearFilters: actions.clearFilters,
      setGlobalFilter: setGlobalFilterDebounced,
      clearGlobalFilter,
      openFilterPanel,
      closeFilterPanel,
    }),
    [
      state.filters,
      state.activeFilterColumnId,
      debouncedGlobalFilter,
      hasAnyFilter,
      hasFilter,
      getFilterValue,
      setFilter,
      actions,
      setGlobalFilterDebounced,
      clearGlobalFilter,
      openFilterPanel,
      closeFilterPanel,
    ]
  );
}

