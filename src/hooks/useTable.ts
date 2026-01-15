import { useMemo } from 'react';
import { useTableContext } from '../context';
import { useSort, type UseSortReturn } from './useSort';
import { useFilter, type UseFilterReturn } from './useFilter';
import { usePagination, type UsePaginationReturn } from './usePagination';
import { useDragDrop, type UseDragDropReturn } from './useDragDrop';
import { useBreakpoint, type UseBreakpointReturn } from './useBreakpoint';
import type { RowData, ColumnDefinition } from '../types';

export interface UseTableReturn<T extends RowData = RowData> {
  data: T[];
  filteredData: T[];
  sortedData: T[];
  paginatedData: T[];
  columns: ColumnDefinition<T>[];
  visibleColumns: ColumnDefinition<T>[];
  loading: boolean;
  error: Error | string | null;
  isEmpty: boolean;
  sort: UseSortReturn;
  filter: UseFilterReturn;
  pagination: UsePaginationReturn;
  dragDrop: UseDragDropReturn;
  breakpoint: UseBreakpointReturn;
  selection: {
    selectedIds: Set<string | number>;
    allSelected: boolean;
    someSelected: boolean;
    selectRow: (id: string | number) => void;
    deselectRow: (id: string | number) => void;
    toggleRow: (id: string | number) => void;
    selectAll: () => void;
    deselectAll: () => void;
    isSelected: (id: string | number) => boolean;
  };
  expansion: {
    expandedIds: Set<string | number>;
    expandRow: (id: string | number) => void;
    collapseRow: (id: string | number) => void;
    toggleRow: (id: string | number) => void;
    isExpanded: (id: string | number) => boolean;
  };
  columnApi: {
    states: import('../types').ColumnState[];
    reorder: (sourceId: string, targetId: string) => void;
    resize: (columnId: string, width: number) => void;
    toggleVisibility: (columnId: string) => void;
    reset: () => void;
    getWidth: (columnId: string) => number;
    isVisible: (columnId: string) => boolean;
  };
  mobile: {
    showDrawer: boolean;
    drawerContent: 'filter' | 'sort' | 'columns' | null;
    openDrawer: (content: 'filter' | 'sort' | 'columns') => void;
    closeDrawer: () => void;
  };
  theme: import('../types').Theme;
  translations: import('../types').Translations;
  refresh: () => void;
  reset: () => void;
}

export function useTable<T extends RowData = RowData>(): UseTableReturn<T> {
  const { state, actions, computed } = useTableContext<T>();

  const sort = useSort();
  const filter = useFilter();
  const pagination = usePagination();
  const dragDrop = useDragDrop();
  const breakpoint = useBreakpoint();

  const selection = useMemo(
    () => ({
      selectedIds: state.selectedIds,
      allSelected: computed.allSelected,
      someSelected: computed.someSelected,
      selectRow: actions.selectRow,
      deselectRow: actions.deselectRow,
      toggleRow: actions.toggleRow,
      selectAll: actions.selectAll,
      deselectAll: actions.deselectAll,
      isSelected: (id: string | number) => state.selectedIds.has(id),
    }),
    [state.selectedIds, computed.allSelected, computed.someSelected, actions]
  );

  const expansion = useMemo(
    () => ({
      expandedIds: state.expandedIds,
      expandRow: actions.expandRow,
      collapseRow: actions.collapseRow,
      toggleRow: actions.toggleRowExpansion,
      isExpanded: (id: string | number) => state.expandedIds.has(id),
    }),
    [state.expandedIds, actions]
  );

  const columnsApi = useMemo(
    () => ({
      states: state.columnStates,
      reorder: actions.reorderColumn,
      resize: actions.resizeColumn,
      toggleVisibility: actions.toggleColumnVisibility,
      reset: actions.resetColumns,
      getWidth: (columnId: string) => {
        const colState = state.columnStates.find((c) => c.id === columnId);
        return colState?.width ?? 150;
      },
      isVisible: (columnId: string) => {
        const colState = state.columnStates.find((c) => c.id === columnId);
        return colState?.visible !== false;
      },
    }),
    [state.columnStates, actions]
  );

  const mobile = useMemo(
    () => ({
      showDrawer: state.showMobileDrawer,
      drawerContent: state.mobileDrawerContent,
      openDrawer: actions.openMobileDrawer,
      closeDrawer: actions.closeMobileDrawer,
    }),
    [state.showMobileDrawer, state.mobileDrawerContent, actions]
  );

  return useMemo(
    () => ({
      data: state.data,
      filteredData: computed.filteredData,
      sortedData: computed.sortedData,
      paginatedData: computed.paginatedData,
      columns: state.columns,
      visibleColumns: computed.visibleColumns,
      loading: state.loading,
      error: state.error,
      isEmpty: computed.paginatedData.length === 0 && !state.loading,
      sort,
      filter,
      pagination,
      dragDrop,
      breakpoint,
      selection,
      expansion,
      columnApi: columnsApi,
      mobile,
      theme: state.theme,
      translations: state.translations,
      refresh: actions.refresh,
      reset: actions.reset,
    }),
    [state, computed, sort, filter, pagination, dragDrop, breakpoint, selection, expansion, columnsApi, mobile, actions]
  );
}

