import type { ColumnDefinition, ColumnState, RowData, SortDirection } from '@/types';

export interface GridHeaderCellProps<T extends RowData = RowData> {
  column: ColumnDefinition<T>;
  columnState: ColumnState;
  sortDirection?: SortDirection;
  sortIndex?: number;
  isMultiSort?: boolean;
  enableSort?: boolean;
  enableFilter?: boolean;
  enableDragDrop?: boolean;
  enableResize?: boolean;
  enablePinControls?: boolean;
  enableColumnMenu?: boolean;
  menuOpen?: boolean;
  onMenuToggle?: () => void;
  onMenuAutosize?: () => void;
  onMenuPinLeft?: () => void;
  onMenuPinRight?: () => void;
  onMenuHide?: () => void;
  hasFilter?: boolean;
  isDragging?: boolean;
  isDragOver?: boolean;
  isLastColumn?: boolean;
  isPinEdgeLeft?: boolean;
  isPinEdgeRight?: boolean;
  isColumnAutoSized?: boolean;
  onSort?: () => void;
  onFilterOpen?: () => void;
  onPinToggle?: () => void;
  onResizeStart?: (event: React.MouseEvent) => void;
  onResizeAutoSize?: (event: React.MouseEvent) => void;
  dragHandleProps?: {
    draggable: boolean;
    onDragStart: (event: React.DragEvent) => void;
    onDragEnd: () => void;
  };
  dropTargetProps?: {
    onDragOver: (event: React.DragEvent) => void;
    onDragLeave: () => void;
    onDrop: (event: React.DragEvent) => void;
  };
}

export interface HeaderCellSortIconProps {
  sortDirection?: SortDirection;
}
