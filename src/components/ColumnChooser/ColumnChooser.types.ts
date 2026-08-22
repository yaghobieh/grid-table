import type { ColumnDefinition, ColumnState, RowData } from '@/types';

export interface ColumnChooserProps<T extends RowData = RowData> {
  columns: ColumnDefinition<T>[];
  columnStates: ColumnState[];
  open: boolean;
  onToggle: () => void;
  onToggleColumn: (columnId: string) => void;
  label: string;
}
