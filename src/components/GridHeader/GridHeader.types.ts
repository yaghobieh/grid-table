import type { CSSProperties } from 'react';
import type { ColumnDefinition, ColumnState, RowData, SortDirection } from '@/types';

export type { GridHeaderCellProps } from './HeaderCell';

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
  enablePinControls?: boolean;
  enableColumnMenu?: boolean;
  enableSelection?: boolean;
  enableExpansion?: boolean;
  allSelected?: boolean;
  someSelected?: boolean;
  onSelectAll?: () => void;
  onSort?: (columnId: string, direction: SortDirection) => void;
  onFilterOpen?: (columnId: string) => void;
  getSortDirection?: (columnId: string) => SortDirection;
}
