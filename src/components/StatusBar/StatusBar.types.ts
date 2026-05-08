import type { ColumnDefinition, RowData, StatusBarConfig } from '@/types';

export interface StatusBarLabels {
  rows?: string;
  filtered?: string;
  selected?: string;
}

export interface StatusBarProps<T extends RowData = RowData> {
  config: StatusBarConfig;
  data: T[];
  totalCount: number;
  filteredCount: number;
  selectedCount: number;
  columns: ColumnDefinition<T>[];
  className?: string;
  labels?: StatusBarLabels;
}
