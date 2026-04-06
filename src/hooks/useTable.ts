import { useMemo } from 'react';
import { useTableContext } from '../context';
import { useSort } from './useSort';
import { useFilter } from './useFilter';
import { usePagination } from './usePagination';
import { useDragDrop } from './useDragDrop';
import { useBreakpoint } from './useBreakpoint';
import type { RowData } from '../types';
import type { UseTableReturn } from '../types/hooks.types';

/**
 * Composed table API: sort, filter, pagination, drag-drop, breakpoint, selection, and columns.
 */
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
