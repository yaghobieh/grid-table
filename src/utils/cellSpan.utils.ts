import type { RowData } from '@/types';
import type { CellSpanConfig } from '@/types/features.types';
import { ONE, ZERO } from '@constants/numbers.const';

export function resolveColSpan<T extends RowData>(
  config: CellSpanConfig<T> | undefined,
  row: T,
  columnId: string,
  rowIndex: number,
): number {
  const span = config?.getColSpan?.(row, columnId, rowIndex);
  if (!span || span < ONE) return ONE;
  return span;
}

export function resolveRowSpan<T extends RowData>(
  config: CellSpanConfig<T> | undefined,
  row: T,
  columnId: string,
  rowIndex: number,
): number {
  const span = config?.getRowSpan?.(row, columnId, rowIndex);
  if (!span || span < ONE) return ONE;
  return span;
}

export function isCellCoveredBySpan<T extends RowData>(
  config: CellSpanConfig<T> | undefined,
  rows: T[],
  columnIds: string[],
  rowIndex: number,
  colIndex: number,
): boolean {
  if (!config) return false;
  const columnId = columnIds[colIndex];
  if (!columnId) return false;

  for (let prevCol = ZERO; prevCol < colIndex; prevCol += ONE) {
    const prevId = columnIds[prevCol];
    const colSpan = resolveColSpan(config, rows[rowIndex], prevId, rowIndex);
    if (prevCol + colSpan > colIndex) return true;
  }

  for (let prevRow = ZERO; prevRow < rowIndex; prevRow += ONE) {
    const rowSpan = resolveRowSpan(config, rows[prevRow], columnId, prevRow);
    if (prevRow + rowSpan > rowIndex) return true;
  }

  return false;
}
