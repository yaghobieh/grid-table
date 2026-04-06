import type { DragEvent, KeyboardEvent, RefObject } from 'react';
import type { Theme, Translations, Breakpoint, ResponsiveValue, SortDirection, FilterOperator } from './common.types';
import type { ColumnDefinition, ColumnState, ColumnReorderEvent } from './column.types';
import type { FocusedCell, KeyboardNavConfig, EditHistoryEntry, TreeConfig, FlatTreeRow } from './features.types';
import type { FilterActions, FilterValue } from './filter.types';
import type { PaginationInfo, PaginationActions } from './pagination.types';
import type { RowData } from './row.types';
import type { SortActions, SortState } from './sort.types';

export interface UseDragDropReturn {
  isDragging: boolean;
  draggingColumnId: string | null;
  dragOverColumnId: string | null;
  handleDragStart: (columnId: string) => (event: DragEvent) => void;
  handleDragOver: (columnId: string) => (event: DragEvent) => void;
  handleDragEnd: () => void;
  handleDrop: (targetColumnId: string) => (event: DragEvent) => void;
  handleDragLeave: () => void;
  getDragHandleProps: (columnId: string) => DragHandleProps;
  getDropTargetProps: (columnId: string) => DropTargetProps;
}

export interface DragHandleProps {
  draggable: boolean;
  onDragStart: (event: DragEvent) => void;
  onDragEnd: () => void;
}

export interface DropTargetProps {
  onDragOver: (event: DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (event: DragEvent) => void;
}

export interface UseDragDropOptions {
  onReorder?: (event: ColumnReorderEvent) => void;
  enabled?: boolean;
}

export interface UseBreakpointReturn {
  currentBreakpoint: Breakpoint;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isMobileOrTablet: boolean;
  isTabletOrDesktop: boolean;
  breakpointValue: <T>(value: ResponsiveValue<T>, fallback: T) => T;
  shouldShowMobileView: boolean;
}

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

export interface UsePaginationReturn extends PaginationInfo, PaginationActions {
  pageSizeOptions: readonly number[];
}

export interface UsePaginationOptions {
  pageSizeOptions?: readonly number[];
}

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

export interface UseKeyboardNavigationReturn {
  focusedCell: FocusedCell | null;
  setFocusedCell: (cell: FocusedCell | null) => void;
  handleKeyDown: (e: KeyboardEvent) => void;
  containerRef: RefObject<HTMLDivElement>;
  isEditing: boolean;
  startEditing: () => void;
  stopEditing: () => void;
}

export interface RowDragHandleProps {
  draggable: boolean;
  onDragStart: () => void;
  onDragOver: (e: DragEvent) => void;
  onDragEnd: () => void;
  onDrop: (e: DragEvent) => void;
}

export interface UseRowReorderReturn<T extends RowData> {
  draggingRowId: string | number | null;
  dragOverRowId: string | number | null;
  getRowDragProps: (rowId: string | number) => RowDragHandleProps;
}

export interface UseUndoRedoReturn {
  canUndo: boolean;
  canRedo: boolean;
  undo: () => EditHistoryEntry | null;
  redo: () => EditHistoryEntry | null;
  pushEdit: (entry: Omit<EditHistoryEntry, 'timestamp'>) => void;
  clear: () => void;
  history: EditHistoryEntry[];
  cursor: number;
}

export interface UseTreeDataReturn<T extends RowData> {
  flatRows: FlatTreeRow<T>[];
  toggleExpand: (id: string | number) => void;
  expandAll: () => void;
  collapseAll: () => void;
  isExpanded: (id: string | number) => boolean;
  getIndent: (depth: number) => number;
}

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
    states: ColumnState[];
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
  theme: Theme;
  translations: Translations;
  refresh: () => void;
  reset: () => void;
}
