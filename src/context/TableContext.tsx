import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useMemo,
  useEffect,
  type ReactNode,
} from 'react';
import type { RowData, ColumnState, FilterValue, SortValue, SortDirection, FilterOperator } from '../types';
import type { TableContextState, TableContextActions, TableContextValue, TableProviderProps } from './types';
import { DEFAULT_THEME, DEFAULT_TRANSLATIONS, DEFAULT_TABLE_CONFIG } from '../constants';
import { ZERO, ONE, MOBILE_BREAKPOINT, TABLET_BREAKPOINT } from '../constants';

type Action<T extends RowData = RowData> =
  | { type: 'SET_DATA'; payload: T[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: Error | string | null }
  | { type: 'SET_SORTING'; payload: SortValue[] }
  | { type: 'SET_FILTERS'; payload: FilterValue[] }
  | { type: 'SET_GLOBAL_FILTER'; payload: string }
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'SET_PAGE_SIZE'; payload: number }
  | { type: 'SET_SELECTED_IDS'; payload: Set<string | number> }
  | { type: 'SET_EXPANDED_IDS'; payload: Set<string | number> }
  | { type: 'SET_COLUMN_STATES'; payload: ColumnState[] }
  | { type: 'SET_DRAGGING_COLUMN'; payload: string | null }
  | { type: 'SET_RESIZING_COLUMN'; payload: string | null }
  | { type: 'SET_ACTIVE_FILTER_COLUMN'; payload: string | null }
  | { type: 'SET_CURRENT_BREAKPOINT'; payload: 'mobile' | 'tablet' | 'desktop' }
  | { type: 'SET_MOBILE_DRAWER'; payload: { show: boolean; content: 'filter' | 'sort' | 'columns' | null } }
  | { type: 'RESET'; payload: Partial<TableContextState<T>> };

function reducer<T extends RowData>(
  state: TableContextState<T>,
  action: Action<T>
): TableContextState<T> {
  switch (action.type) {
    case 'SET_DATA':
      return { ...state, data: action.payload, originalData: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_SORTING':
      return { ...state, sorting: action.payload };
    case 'SET_FILTERS':
      return { ...state, filters: action.payload };
    case 'SET_GLOBAL_FILTER':
      return { ...state, globalFilter: action.payload };
    case 'SET_PAGE':
      return { ...state, page: action.payload };
    case 'SET_PAGE_SIZE':
      return { ...state, pageSize: action.payload, page: ONE };
    case 'SET_SELECTED_IDS':
      return { ...state, selectedIds: action.payload };
    case 'SET_EXPANDED_IDS':
      return { ...state, expandedIds: action.payload };
    case 'SET_COLUMN_STATES':
      return { ...state, columnStates: action.payload };
    case 'SET_DRAGGING_COLUMN':
      return { ...state, draggingColumnId: action.payload };
    case 'SET_RESIZING_COLUMN':
      return { ...state, resizingColumnId: action.payload };
    case 'SET_ACTIVE_FILTER_COLUMN':
      return { ...state, activeFilterColumnId: action.payload };
    case 'SET_CURRENT_BREAKPOINT':
      return { ...state, currentBreakpoint: action.payload };
    case 'SET_MOBILE_DRAWER':
      return {
        ...state,
        showMobileDrawer: action.payload.show,
        mobileDrawerContent: action.payload.content,
      };
    case 'RESET':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

const TableContext = createContext<TableContextValue<RowData> | null>(null);

export function TableProvider<T extends RowData>({
  children,
  data,
  columns,
  loading = false,
  error = null,
  theme,
  translations,
  mobileBreakpoint = 'tablet',
  paginationConfig,
  filterConfig: _filterConfig,
  sortConfig: _sortConfig,
  enableMultiSort = false,
  getRowId,
  onStateChange,
}: TableProviderProps<T>): ReactNode {
  const initialColumnStates: ColumnState[] = columns.map((col, index) => ({
    id: col.id,
    visible: !col.hidden,
    width: typeof col.width === 'number' ? col.width : DEFAULT_TABLE_CONFIG.columnWidth,
    order: index,
    pinned: col.sticky || null,
  }));

  const mergedTheme = useMemo(
    () => ({ ...DEFAULT_THEME, ...theme, colors: { ...DEFAULT_THEME.colors, ...theme?.colors } }),
    [theme]
  );

  const mergedTranslations = useMemo(
    () => ({ ...DEFAULT_TRANSLATIONS, ...translations }),
    [translations]
  );

  const initialState: TableContextState<T> = {
    data,
    originalData: data,
    columns,
    columnStates: initialColumnStates,
    sorting: [],
    filters: [],
    globalFilter: '',
    page: paginationConfig?.initialPage ?? ONE,
    pageSize: paginationConfig?.initialPageSize ?? DEFAULT_TABLE_CONFIG.pageSize,
    totalItems: data.length,
    selectedIds: new Set(),
    expandedIds: new Set(),
    loading,
    error,
    theme: mergedTheme,
    translations: mergedTranslations,
    currentBreakpoint: 'desktop',
    mobileBreakpoint,
    draggingColumnId: null,
    resizingColumnId: null,
    activeFilterColumnId: null,
    showMobileDrawer: false,
    mobileDrawerContent: null,
  };

  const [state, dispatch] = useReducer(reducer<T>, initialState);

  useEffect(() => {
    dispatch({ type: 'SET_DATA', payload: data });
  }, [data]);

  useEffect(() => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  }, [loading]);

  useEffect(() => {
    dispatch({ type: 'SET_ERROR', payload: error });
  }, [error]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let breakpoint: 'mobile' | 'tablet' | 'desktop' = 'desktop';
      if (width < MOBILE_BREAKPOINT) {
        breakpoint = 'mobile';
      } else if (width < TABLET_BREAKPOINT) {
        breakpoint = 'tablet';
      }
      dispatch({ type: 'SET_CURRENT_BREAKPOINT', payload: breakpoint });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    onStateChange?.(state as TableContextState<T>);
  }, [state, onStateChange]);

  const getRowIdFn = useCallback(
    (row: T): string | number => {
      if (getRowId) return getRowId(row);
      if ('id' in row) return row.id as string | number;
      return data.indexOf(row);
    },
    [getRowId, data]
  );

  const actions: TableContextActions<T> = useMemo(
    () => ({
      setData: (newData) => dispatch({ type: 'SET_DATA', payload: newData }),
      setLoading: (value) => dispatch({ type: 'SET_LOADING', payload: value }),
      setError: (value) => dispatch({ type: 'SET_ERROR', payload: value }),

      setSorting: (columnId: string, direction: SortDirection) => {
        const newSorting = enableMultiSort
          ? [...state.sorting.filter((s) => s.columnId !== columnId), { columnId, direction }]
          : direction
          ? [{ columnId, direction }]
          : [];
        dispatch({ type: 'SET_SORTING', payload: newSorting.filter((s) => s.direction !== null) });
      },

      toggleSorting: (columnId: string) => {
        const current = state.sorting.find((s) => s.columnId === columnId);
        let newDirection: SortDirection = 'asc';
        if (current?.direction === 'asc') newDirection = 'desc';
        else if (current?.direction === 'desc') newDirection = null;
        actions.setSorting(columnId, newDirection);
      },

      clearSorting: () => dispatch({ type: 'SET_SORTING', payload: [] }),

      setFilter: (columnId: string, value: unknown, operator: FilterOperator = 'contains') => {
        const newFilters = [
          ...state.filters.filter((f) => f.columnId !== columnId),
          { columnId, value, operator },
        ];
        dispatch({ type: 'SET_FILTERS', payload: newFilters });
        dispatch({ type: 'SET_PAGE', payload: ONE });
      },

      removeFilter: (columnId: string) => {
        const newFilters = state.filters.filter((f) => f.columnId !== columnId);
        dispatch({ type: 'SET_FILTERS', payload: newFilters });
      },

      clearFilters: () => {
        dispatch({ type: 'SET_FILTERS', payload: [] });
        dispatch({ type: 'SET_GLOBAL_FILTER', payload: '' });
      },

      setGlobalFilter: (value: string) => {
        dispatch({ type: 'SET_GLOBAL_FILTER', payload: value });
        dispatch({ type: 'SET_PAGE', payload: ONE });
      },

      setPage: (page: number) => dispatch({ type: 'SET_PAGE', payload: page }),
      setPageSize: (pageSize: number) => dispatch({ type: 'SET_PAGE_SIZE', payload: pageSize }),

      selectRow: (id: string | number) => {
        const newSet = new Set(state.selectedIds);
        newSet.add(id);
        dispatch({ type: 'SET_SELECTED_IDS', payload: newSet });
      },

      deselectRow: (id: string | number) => {
        const newSet = new Set(state.selectedIds);
        newSet.delete(id);
        dispatch({ type: 'SET_SELECTED_IDS', payload: newSet });
      },

      toggleRow: (id: string | number) => {
        if (state.selectedIds.has(id)) {
          actions.deselectRow(id);
        } else {
          actions.selectRow(id);
        }
      },

      selectAll: () => {
        const allIds = new Set(state.data.map(getRowIdFn));
        dispatch({ type: 'SET_SELECTED_IDS', payload: allIds });
      },

      deselectAll: () => dispatch({ type: 'SET_SELECTED_IDS', payload: new Set() }),

      expandRow: (id: string | number) => {
        const newSet = new Set(state.expandedIds);
        newSet.add(id);
        dispatch({ type: 'SET_EXPANDED_IDS', payload: newSet });
      },

      collapseRow: (id: string | number) => {
        const newSet = new Set(state.expandedIds);
        newSet.delete(id);
        dispatch({ type: 'SET_EXPANDED_IDS', payload: newSet });
      },

      toggleRowExpansion: (id: string | number) => {
        if (state.expandedIds.has(id)) {
          actions.collapseRow(id);
        } else {
          actions.expandRow(id);
        }
      },

      reorderColumn: (sourceId: string, targetId: string) => {
        const newStates = [...state.columnStates];
        const sourceIndex = newStates.findIndex((c) => c.id === sourceId);
        const targetIndex = newStates.findIndex((c) => c.id === targetId);
        if (sourceIndex === -ONE || targetIndex === -ONE) return;
        const [removed] = newStates.splice(sourceIndex, ONE);
        newStates.splice(targetIndex, ZERO, removed);
        newStates.forEach((col, i) => (col.order = i));
        dispatch({ type: 'SET_COLUMN_STATES', payload: newStates });
      },

      resizeColumn: (columnId: string, width: number) => {
        const newStates = state.columnStates.map((col) =>
          col.id === columnId ? { ...col, width } : col
        );
        dispatch({ type: 'SET_COLUMN_STATES', payload: newStates });
      },

      toggleColumnVisibility: (columnId: string) => {
        const newStates = state.columnStates.map((col) =>
          col.id === columnId ? { ...col, visible: !col.visible } : col
        );
        dispatch({ type: 'SET_COLUMN_STATES', payload: newStates });
      },

      resetColumns: () => dispatch({ type: 'SET_COLUMN_STATES', payload: initialColumnStates }),

      setDraggingColumn: (columnId) => dispatch({ type: 'SET_DRAGGING_COLUMN', payload: columnId }),
      setResizingColumn: (columnId) => dispatch({ type: 'SET_RESIZING_COLUMN', payload: columnId }),
      setActiveFilterColumn: (columnId) =>
        dispatch({ type: 'SET_ACTIVE_FILTER_COLUMN', payload: columnId }),

      openMobileDrawer: (content) =>
        dispatch({ type: 'SET_MOBILE_DRAWER', payload: { show: true, content } }),
      closeMobileDrawer: () =>
        dispatch({ type: 'SET_MOBILE_DRAWER', payload: { show: false, content: null } }),

      refresh: () => dispatch({ type: 'SET_DATA', payload: state.originalData }),
      reset: () =>
        dispatch({
          type: 'RESET',
          payload: {
            sorting: [],
            filters: [],
            globalFilter: '',
            page: ONE,
            selectedIds: new Set(),
            expandedIds: new Set(),
            columnStates: initialColumnStates,
          },
        }),
    }),
    [state, enableMultiSort, getRowIdFn, initialColumnStates]
  );

  const computed = useMemo(() => {
    let filteredData = [...state.data];

    if (state.globalFilter) {
      const searchLower = state.globalFilter.toLowerCase();
      filteredData = filteredData.filter((row) =>
        Object.values(row).some((val) =>
          String(val).toLowerCase().includes(searchLower)
        )
      );
    }

    state.filters.forEach((filter) => {
      const column = columns.find((c) => c.id === filter.columnId);
      if (!column) return;

      filteredData = filteredData.filter((row) => {
        const accessor = column.accessor;
        const value = typeof accessor === 'function' ? accessor(row) : row[accessor as keyof T];
        const filterValue = filter.value;

        if (column.filterFn) {
          return column.filterFn(value, filterValue, filter.operator);
        }

        const strValue = String(value ?? '').toLowerCase();
        const strFilter = String(filterValue ?? '').toLowerCase();

        switch (filter.operator) {
          case 'equals':
            return strValue === strFilter;
          case 'notEquals':
            return strValue !== strFilter;
          case 'contains':
            return strValue.includes(strFilter);
          case 'notContains':
            return !strValue.includes(strFilter);
          case 'startsWith':
            return strValue.startsWith(strFilter);
          case 'endsWith':
            return strValue.endsWith(strFilter);
          case 'isEmpty':
            return !value || strValue === '';
          case 'isNotEmpty':
            return value && strValue !== '';
          default:
            return strValue.includes(strFilter);
        }
      });
    });

    let sortedData = [...filteredData];

    if (state.sorting.length > ZERO) {
      sortedData.sort((a, b) => {
        for (const sort of state.sorting) {
          const column = columns.find((c) => c.id === sort.columnId);
          if (!column) continue;

          const accessor = column.accessor;
          const aVal = typeof accessor === 'function' ? accessor(a) : a[accessor as keyof T];
          const bVal = typeof accessor === 'function' ? accessor(b) : b[accessor as keyof T];

          if (column.sortFn) {
            const result = column.sortFn(aVal, bVal, sort.direction);
            if (result !== ZERO) return result;
            continue;
          }

          if (aVal === bVal) continue;
          if (aVal == null) return ONE;
          if (bVal == null) return -ONE;

          const comparison = aVal < bVal ? -ONE : ONE;
          const result = sort.direction === 'desc' ? -comparison : comparison;
          if (result !== ZERO) return result;
        }
        return ZERO;
      });
    }

    const totalPages = Math.ceil(sortedData.length / state.pageSize) || ONE;
    const startIndex = (state.page - ONE) * state.pageSize;
    const paginatedData = sortedData.slice(startIndex, startIndex + state.pageSize);

    const visibleColumns = columns.filter((col) => {
      const colState = state.columnStates.find((cs) => cs.id === col.id);
      return colState?.visible !== false;
    });

    const allSelected =
      state.data.length > ZERO && state.selectedIds.size === state.data.length;
    const someSelected = state.selectedIds.size > ZERO && !allSelected;

    const isMobile = state.currentBreakpoint === 'mobile';
    const isTablet = state.currentBreakpoint === 'tablet';
    const isDesktop = state.currentBreakpoint === 'desktop';

    return {
      filteredData,
      sortedData,
      paginatedData,
      visibleColumns,
      totalPages,
      canGoNext: state.page < totalPages,
      canGoPrevious: state.page > ONE,
      allSelected,
      someSelected,
      isMobile,
      isTablet,
      isDesktop,
    };
  }, [state, columns]);

  const contextValue: TableContextValue<T> = {
    state: state as TableContextState<T>,
    actions: actions as TableContextActions<T>,
    computed,
  };

  return (
    <TableContext.Provider value={contextValue as unknown as TableContextValue<RowData>}>
      {children}
    </TableContext.Provider>
  );
}

export function useTableContext<T extends RowData = RowData>(): TableContextValue<T> {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error('useTableContext must be used within a TableProvider');
  }
  return context as unknown as TableContextValue<T>;
}

export { TableContext };

