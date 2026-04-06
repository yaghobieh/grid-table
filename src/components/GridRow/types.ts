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
  applyHiddenOnMobile?: boolean;
  stackedMobileLayout?: boolean;
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
  renderExpansion?: (row: T, rowId: string | number) => ReactNode;
  getRowId: (row: T) => string | number;
  draggable?: boolean;
  onDragStart?: () => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDragEnd?: () => void;
  onDrop?: (e: React.DragEvent) => void;
  treeToggle?: () => void;
  treeHasChildren?: boolean;
  treeIsExpanded?: boolean;
  treeIndent?: number;
  enableCellEdit?: boolean;
  onCellSave?: (rowId: string | number, columnId: string, oldValue: unknown, newValue: unknown) => void;
}

