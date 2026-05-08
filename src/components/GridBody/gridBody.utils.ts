import type { RowData } from '@/types';
import type { GetGridBodyRowDerivedStateParams, GridBodyRowDerivedState } from './gridBody.types';
import { EMPTY_STRING } from '@/constants';
import { ZERO } from '@constants/numbers.const';

export function getGridBodyRowDerivedState<T extends RowData>({
  row,
  index,
  getRowId,
  selectedIds,
  expandedIds,
  isRowDisabled,
  getRowClassName,
  getRowStyle,
  rowDragProps,
  draggingRowId,
  dragOverRowId,
  treeIndents,
  treeHasChildren,
  treeIsExpanded,
}: GetGridBodyRowDerivedStateParams<T>): GridBodyRowDerivedState {
  const rowId = getRowId(row);
  return {
    rowId,
    isSelected: selectedIds.has(rowId),
    isExpanded: expandedIds.has(rowId),
    isDisabled: isRowDisabled?.(row) ?? false,
    rowClassName: getRowClassName?.(row, index) ?? EMPTY_STRING,
    rowStyle: getRowStyle?.(row, index),
    dragProps: rowDragProps?.(rowId),
    isDragging: draggingRowId === rowId,
    isDragOver: dragOverRowId === rowId,
    indent: treeIndents?.get(rowId) ?? ZERO,
    hasChildren: treeHasChildren?.(rowId) ?? false,
    isTreeExpanded: treeIsExpanded?.(rowId) ?? false,
  };
}
