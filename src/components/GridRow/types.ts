import type { ReactNode, CSSProperties, MouseEvent } from 'react';
import type { RowData, ColumnDefinition, ColumnState } from '../../types';
import type { CellClickEvent } from '../GridCell/types';

export interface GridRowProps<T extends RowData = RowData> {
  row: T;
  rowIndex: number;
  columns: ColumnDefinition<T>[];
  columnStates: ColumnState[];
  isSelected?: boolean;
  isExpanded?: boolean;
  isDisabled?: boolean;
  isMobile?: boolean;
  showMobileLabels?: boolean;
  className?: string;
  style?: CSSProperties;
  onClick?: (row: T, index: number) => void;
  onDoubleClick?: (row: T, index: number) => void;
  onContextMenu?: (row: T, index: number, event: MouseEvent) => void;
  onCellClick?: (event: CellClickEvent<T>) => void;
  onSelect?: (selected: boolean) => void;
  onExpand?: (expanded: boolean) => void;
  enableSelection?: boolean;
  enableExpansion?: boolean;
  renderExpansion?: (row: T) => ReactNode;
  getRowId: (row: T) => string | number;
}

