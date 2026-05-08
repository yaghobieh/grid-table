import type { CSSProperties, ReactNode } from 'react';
import type { Alignment, ColumnDefinition, RowData } from '@/types';

export interface CellClickEvent<T extends RowData = RowData> {
  row: T;
  rowIndex: number;
  columnId: string;
  value: unknown;
}

export interface GridCellProps<T extends RowData = RowData> {
  column: ColumnDefinition<T>;
  row: T;
  rowIndex: number;
  rowId: string | number;
  value: unknown;
  width?: number | string;
  align?: Alignment;
  className?: string;
  style?: CSSProperties;
  showLabel?: boolean;
  labelText?: string;
  sticky?: 'left' | 'right';
  stickyOffset?: number;
  onClick?: (event: CellClickEvent<T>) => void;
  enableCellEdit?: boolean;
  onCellSave?: (rowId: string | number, columnId: string, oldValue: unknown, newValue: unknown) => void;
}

export interface GridCellRenderProps {
  value: unknown;
  formattedValue: ReactNode;
  column: ColumnDefinition;
  row: RowData;
  rowIndex: number;
}
