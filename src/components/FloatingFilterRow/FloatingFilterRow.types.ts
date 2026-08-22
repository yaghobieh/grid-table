import type { ColumnDefinition, ColumnState, FilterValue, RowData } from '@/types';

export interface FloatingFilterRowProps<T extends RowData = RowData> {
  columns: ColumnDefinition<T>[];
  columnStates: ColumnState[];
  filters: FilterValue[];
  enableSelection?: boolean;
  enableExpansion?: boolean;
  onFilterChange: (columnId: string, value: string) => void;
  onFilterClear: (columnId: string) => void;
}
