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
  onEditNavigate?: (rowIndex: number, colIndex: number, direction: 1 | -1) => void;
  selectOnEditFocus?: boolean;
  colIndex?: number;
  showFillHandle?: boolean;
  onRangeMouseDown?: (rowIndex: number, colIndex: number, event: React.MouseEvent) => void;
  onRangeMouseEnter?: (rowIndex: number, colIndex: number) => void;
  onFillHandleMouseDown?: (rowIndex: number, colIndex: number, event: React.MouseEvent) => void;
  colSpan?: number;
  rowSpan?: number;
  comment?: string;
  commentLabel?: string;
  commentSaveLabel?: string;
  commentClearLabel?: string;
  onCommentSave?: (comment: string) => void;
  onCommentClear?: () => void;
  fillHandleLabel?: string;
}

export interface GridCellRenderProps {
  value: unknown;
  formattedValue: ReactNode;
  column: ColumnDefinition;
  row: RowData;
  rowIndex: number;
}
