import type { ColumnDefinition, ColumnState, RowData } from '@/types';
import type { ColumnGroupConfig } from '@/types/features.types';
import type { ColumnGroupHeaderCell } from '@/utils/columnGroups.utils';

export interface ColumnGroupHeaderProps<T extends RowData = RowData> {
  columnGroups: ColumnGroupConfig[];
  visibleColumns: ColumnDefinition<T>[];
  columnStates: ColumnState[];
  enableSelection?: boolean;
  enableExpansion?: boolean;
  className?: string;
}

export interface ColumnGroupHeaderCellProps {
  cell: ColumnGroupHeaderCell;
  totalWidth: number;
}

export interface ColumnGroupHeaderCellView {
  cell: ColumnGroupHeaderCell;
  totalWidth: number;
}
