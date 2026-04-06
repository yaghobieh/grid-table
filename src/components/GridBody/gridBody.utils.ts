import type { CSSProperties } from 'react';
import type { RowData } from '../../types';
import type { RowDragHandleProps } from '../../types/hooks.types';

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

export function getGridBodyRowDerivedState<T extends RowData>(
  row: T,
  index: number,
  getRowId: (row: T) => string | number,
  selectedIds: Set<string | number>,
  expandedIds: Set<string | number>,
  isRowDisabled: ((row: T) => boolean) | undefined,
  getRowClassName: ((row: T, index: number) => string) | undefined,
  getRowStyle: ((row: T, index: number) => CSSProperties | undefined) | undefined,
  rowDragProps: ((id: string | number) => RowDragHandleProps) | undefined,
  draggingRowId: string | number | null | undefined,
  dragOverRowId: string | number | null | undefined,
  treeIndents: Map<string | number, number> | undefined,
  treeHasChildren: ((id: string | number) => boolean) | undefined,
  treeIsExpanded: ((id: string | number) => boolean) | undefined,
): GridBodyRowDerivedState {
  const rowId = getRowId(row);
  return {
    rowId,
    isSelected: selectedIds.has(rowId),
    isExpanded: expandedIds.has(rowId),
    isDisabled: isRowDisabled?.(row) ?? false,
    rowClassName: getRowClassName?.(row, index) ?? '',
    rowStyle: getRowStyle?.(row, index),
    dragProps: rowDragProps?.(rowId),
    isDragging: draggingRowId === rowId,
    isDragOver: dragOverRowId === rowId,
    indent: treeIndents?.get(rowId) ?? 0,
    hasChildren: treeHasChildren?.(rowId) ?? false,
    isTreeExpanded: treeIsExpanded?.(rowId) ?? false,
  };
}
