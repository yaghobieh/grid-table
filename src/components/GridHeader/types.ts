import type { CSSProperties } from 'react';
import type { ColumnDefinition, ColumnState, SortDirection, RowData } from '../../types';

export interface GridHeaderProps<T extends RowData = RowData> {
  columns: ColumnDefinition<T>[];
  columnStates: ColumnState[];
  className?: string;
  style?: CSSProperties;
  sticky?: boolean;
  enableSort?: boolean;
  enableFilter?: boolean;
  enableDragDrop?: boolean;
  enableResize?: boolean;
  enableSelection?: boolean;
  allSelected?: boolean;
  someSelected?: boolean;
  onSelectAll?: () => void;
  onSort?: (columnId: string, direction: SortDirection) => void;
  onFilterOpen?: (columnId: string) => void;
  getSortDirection?: (columnId: string) => SortDirection;
}

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
  hasFilter?: boolean;
  isDragging?: boolean;
  isDragOver?: boolean;
  onSort?: () => void;
  onFilterOpen?: () => void;
  onResizeStart?: (event: React.MouseEvent) => void;
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

