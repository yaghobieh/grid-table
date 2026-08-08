import type { ColumnDefinition, ColumnState, RowData } from '@/types';
import { DEFAULT_COLUMN_WIDTH, ZERO } from '@constants/numbers.const';

export type ResolvedStickySide = 'left' | 'right' | undefined;

export function resolveColumnSticky<T = unknown>(
  column: ColumnDefinition<T>,
  columnState?: ColumnState,
): ResolvedStickySide {
  return columnState?.pinned ?? column.sticky ?? undefined;
}

export function getStickyOffsetsFromStates<T extends RowData>(
  columns: ColumnDefinition<T>[],
  columnStateIndex: Map<string, ColumnState>,
): Map<string, number> {
  const offsets = new Map<string, number>();
  let leftOffset = ZERO;
  for (const column of columns) {
    const sticky = resolveColumnSticky(column, columnStateIndex.get(column.id));
    if (sticky === 'left') {
      offsets.set(column.id, leftOffset);
      leftOffset += columnStateIndex.get(column.id)?.width ?? DEFAULT_COLUMN_WIDTH;
    }
  }
  let rightOffset = ZERO;
  for (let index = columns.length - 1; index >= ZERO; index -= 1) {
    const column = columns[index];
    if (!column) continue;
    const sticky = resolveColumnSticky(column, columnStateIndex.get(column.id));
    if (sticky === 'right') {
      offsets.set(column.id, rightOffset);
      rightOffset += columnStateIndex.get(column.id)?.width ?? DEFAULT_COLUMN_WIDTH;
    }
  }
  return offsets;
}

export function getPinEdgeColumnIds<T extends RowData>(
  columns: ColumnDefinition<T>[],
  columnStateIndex: Map<string, ColumnState>,
): { lastLeftId: string | null; firstRightId: string | null } {
  let lastLeftId: string | null = null;
  let firstRightId: string | null = null;

  for (const column of columns) {
    const sticky = resolveColumnSticky(column, columnStateIndex.get(column.id));
    if (sticky === 'left') lastLeftId = column.id;
  }
  for (const column of columns) {
    const sticky = resolveColumnSticky(column, columnStateIndex.get(column.id));
    if (sticky === 'right') {
      firstRightId = column.id;
      break;
    }
  }

  return { lastLeftId, firstRightId };
}
