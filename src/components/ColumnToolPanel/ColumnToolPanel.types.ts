import type { ColumnDefinition, ColumnState, RowData } from '@/types';

export interface ColumnToolPanelProps<T extends RowData = RowData> {
  columns: ColumnDefinition<T>[];
  columnStates: ColumnState[];
  label: string;
  pinLeftLabel: string;
  pinRightLabel: string;
  unpinLabel: string;
  side: 'left' | 'right';
  onToggleColumn: (columnId: string) => void;
  onPinColumn: (columnId: string, side: 'left' | 'right' | null) => void;
}
