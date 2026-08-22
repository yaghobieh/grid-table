import type { ColumnDefinition, ColumnState, RowData } from '@/types';
import { MAX_COLUMN_WIDTH, MIN_COLUMN_WIDTH, ONE, ZERO } from '@constants/numbers.const';
import type { ColumnGroupHeaderCell } from '@/utils/columnGroups.utils';
import type { ColumnGroupHeaderCellView } from './ColumnGroupHeader.types';

function resolveColumnWidth<T extends RowData>(
  column: ColumnDefinition<T> | undefined,
  stateById: Map<string, ColumnState>,
): number {
  const state = column ? stateById.get(column.id) : undefined;
  const width = state?.width ?? column?.width ?? MIN_COLUMN_WIDTH;
  return typeof width === 'number' ? width : MIN_COLUMN_WIDTH;
}

export function resolveGroupCellWidth<T extends RowData>(
  visibleColumns: ColumnDefinition<T>[],
  stateById: Map<string, ColumnState>,
  startIndex: number,
  colspan: number,
): number {
  let totalWidth = ZERO;
  for (let index = ZERO; index < colspan; index += ONE) {
    totalWidth += resolveColumnWidth(visibleColumns[startIndex + index], stateById);
  }
  return totalWidth;
}

export function buildColumnGroupHeaderViews<T extends RowData>(
  cells: ColumnGroupHeaderCell[],
  visibleColumns: ColumnDefinition<T>[],
  columnStates: ColumnState[],
): ColumnGroupHeaderCellView[] {
  const stateById = new Map<string, ColumnState>();
  for (const state of columnStates) {
    stateById.set(state.id, state);
  }

  let columnCursor = ZERO;
  return cells.map((cell) => {
    const totalWidth = resolveGroupCellWidth(visibleColumns, stateById, columnCursor, cell.colspan);
    columnCursor += cell.colspan;
    return { cell, totalWidth };
  });
}

export function resolveGroupCellMaxWidth(colspan: number): number {
  return MAX_COLUMN_WIDTH * colspan;
}
