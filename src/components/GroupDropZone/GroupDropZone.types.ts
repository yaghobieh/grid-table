import type { ColumnDefinition, RowData, RowGroupConfig } from '@/types';

export interface GroupDropZoneProps<T extends RowData = RowData> {
  groups: RowGroupConfig[];
  columns: ColumnDefinition<T>[];
  onChange: (groups: RowGroupConfig[]) => void;
  label: string;
  hint: string;
}
