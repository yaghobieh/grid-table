import type { ColumnDefinition, ColumnState, RowData } from '@/types';
import { GRID_ROW_DEFAULT_STICKY_WIDTH } from './GridRow.const';

export function buildColumnStateIndex(columnStates: ColumnState[]): Map<string, ColumnState> {
  return new Map(columnStates.map((columnState) => [columnState.id, columnState]));
}

export function getVisibleColumns<T extends RowData = RowData>(
  columns: ColumnDefinition<T>[],
  columnStateIndex: Map<string, ColumnState>,
  applyHiddenOnMobile: boolean,
): ColumnDefinition<T>[] {
  return columns
    .filter((column) => {
      const state = columnStateIndex.get(column.id);
      if (state?.visible === false) return false;
      if (applyHiddenOnMobile && column.hiddenOnMobile) return false;
      return true;
    })
    .sort((a, b) => (columnStateIndex.get(a.id)?.order ?? 0) - (columnStateIndex.get(b.id)?.order ?? 0));
}

export function getStickyOffsets<T extends RowData = RowData>(
  columns: ColumnDefinition<T>[],
  columnStateIndex: Map<string, ColumnState>,
): Map<string, number> {
  const offsets = new Map<string, number>();
  let leftOffset = 0;
  for (const column of columns) {
    if (column.sticky === 'left') {
      offsets.set(column.id, leftOffset);
      leftOffset += columnStateIndex.get(column.id)?.width ?? GRID_ROW_DEFAULT_STICKY_WIDTH;
    }
  }
  let rightOffset = 0;
  for (let index = columns.length - 1; index >= 0; index -= 1) {
    const column = columns[index];
    if (column?.sticky === 'right') {
      offsets.set(column.id, rightOffset);
      rightOffset += columnStateIndex.get(column.id)?.width ?? GRID_ROW_DEFAULT_STICKY_WIDTH;
    }
  }
  return offsets;
}
