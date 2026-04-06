import type { ReactNode } from 'react';
import type { CellEditConfig } from '../../types/column.types';
import type { RowData } from '../../types/row.types';

export interface EditableCellProps<T extends RowData> {
  value: unknown;
  row: T;
  columnId: string;
  config: CellEditConfig<T>;
  onSave: (row: T, columnId: string, oldValue: unknown, newValue: unknown) => void;
  children: ReactNode;
}
