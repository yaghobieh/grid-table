import type { ColumnDefinition, FilterValue, RowData } from '@/types';

export interface FilterChipsProps<T extends RowData = RowData> {
  filters: FilterValue[];
  columns: ColumnDefinition<T>[];
  onRemove: (columnId: string) => void;
  onClearAll: () => void;
  clearAllLabel: string;
  className?: string;
}
