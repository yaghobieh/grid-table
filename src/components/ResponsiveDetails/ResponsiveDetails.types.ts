import type { ColumnDefinition, RowData } from '@/types';

export interface ResponsiveDetailsProps<T extends RowData = RowData> {
  columns: ColumnDefinition<T>[];
  row: T;
  label: string;
}
