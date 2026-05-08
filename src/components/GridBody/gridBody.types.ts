import type { ReactNode, CSSProperties } from 'react';
import type { RowData, ColumnDefinition, ColumnState, RowDragHandleProps } from '@/types';
import type { CellClickEvent } from '../GridCell/GridCell.types';

export interface GridBodyProps<T extends RowData = RowData> {
  data: T[];
  columns: ColumnDefinition<T>[];
  columnStates: ColumnState[];
  className?: string;
  style?: CSSProperties;
  applyHiddenOnMobile?: boolean;
  stackedMobileLayout?: boolean;
  showMobileLabels?: boolean;
  enableSelection?: boolean;
  enableExpansion?: boolean;
  selectedIds?: Set<string | number>;
  expandedIds?: Set<string | number>;
  onRowClick?: (row: T, index: number) => void;
  onRowDoubleClick?: (row: T, index: number) => void;
  onCellClick?: (event: CellClickEvent<T>) => void;
  onRowSelect?: (id: string | number, selected: boolean) => void;
  onRowExpand?: (id: string | number, expanded: boolean) => void;
  getRowId: (row: T) => string | number;
  getRowClassName?: (row: T, index: number) => string;
  getRowStyle?: (row: T, index: number) => CSSProperties;
  isRowDisabled?: (row: T) => boolean;
  renderRowExpansion?: (row: T, rowId: string | number) => ReactNode;
  onRowContextMenu?: (row: T, index: number, event: React.MouseEvent) => void;
  rowDragProps?: (rowId: string | number) => RowDragHandleProps;
  draggingRowId?: string | number | null;
  dragOverRowId?: string | number | null;
  treeIndents?: Map<string | number, number>;
  treeToggle?: (id: string | number) => void;
  treeHasChildren?: (id: string | number) => boolean;
  treeIsExpanded?: (id: string | number) => boolean;
  focusedCell?: { rowIndex: number; colIndex: number } | null;
  enableCellEdit?: boolean;
  onCellSave?: (rowId: string | number, columnId: string, oldValue: unknown, newValue: unknown) => void;
}

export interface GridBodyRowDerivedState {
  rowId: string | number;
  isSelected: boolean;
  isExpanded: boolean;
  isDisabled: boolean;
  rowClassName: string;
  rowStyle: CSSProperties | undefined;
  dragProps: RowDragHandleProps | undefined;
  isDragging: boolean;
  isDragOver: boolean;
  indent: number;
  hasChildren: boolean;
  isTreeExpanded: boolean;
}

export interface GetGridBodyRowDerivedStateParams<T extends RowData> {
  row: T;
  index: number;
  getRowId: (row: T) => string | number;
  selectedIds: Set<string | number>;
  expandedIds: Set<string | number>;
  isRowDisabled?: (row: T) => boolean;
  getRowClassName?: (row: T, index: number) => string;
  getRowStyle?: (row: T, index: number) => CSSProperties | undefined;
  rowDragProps?: (id: string | number) => RowDragHandleProps;
  draggingRowId?: string | number | null;
  dragOverRowId?: string | number | null;
  treeIndents?: Map<string | number, number>;
  treeHasChildren?: (id: string | number) => boolean;
  treeIsExpanded?: (id: string | number) => boolean;
}
