import type { ColumnDefinition, RowData } from '@/types';
import type { CellRange } from '@/types/features.types';
import { FILL_MODE_COPY, FILL_MODE_SERIES } from '@constants/fillSeries.const';
import { ONE, ZERO } from '@constants/numbers.const';

export type FillDownMode = typeof FILL_MODE_COPY | typeof FILL_MODE_SERIES;

export function getCellAccessorValue<T extends RowData>(
  row: T,
  column: ColumnDefinition<T>,
): unknown {
  if (typeof column.accessor === 'function') {
    return column.accessor(row);
  }
  return row[column.accessor as keyof T];
}

function toFiniteNumber(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return null;
}

function resolveSeriesStep<T extends RowData>(
  rows: T[],
  column: ColumnDefinition<T>,
  range: CellRange,
): number | null {
  const firstRow = rows[range.startRow];
  if (!firstRow) return null;
  const first = toFiniteNumber(getCellAccessorValue(firstRow, column));
  if (first == null) return null;
  const secondRow = rows[range.startRow + ONE];
  if (!secondRow) return ONE;
  const second = toFiniteNumber(getCellAccessorValue(secondRow, column));
  if (second == null) return ONE;
  return second - first;
}

export function applyFillDownFromRange<T extends RowData>(
  rows: T[],
  columns: ColumnDefinition<T>[],
  range: CellRange,
  onCellUpdate: (row: T, columnId: string, value: unknown) => void,
  mode: FillDownMode = FILL_MODE_COPY,
): void {
  if (range.endRow <= range.startRow) return;

  for (let colIndex = range.startCol; colIndex <= range.endCol; colIndex += ONE) {
    const column = columns[colIndex];
    if (!column) continue;
    const sourceRow = rows[range.startRow];
    if (!sourceRow) continue;
    const sourceValue = getCellAccessorValue(sourceRow, column);
    const seriesStep = mode === FILL_MODE_SERIES ? resolveSeriesStep(rows, column, range) : null;

    for (let rowIndex = range.startRow + ONE; rowIndex <= range.endRow; rowIndex += ONE) {
      const targetRow = rows[rowIndex];
      if (!targetRow) continue;
      if (seriesStep != null) {
        const first = toFiniteNumber(sourceValue);
        if (first != null) {
          onCellUpdate(targetRow, column.id, first + (rowIndex - range.startRow) * seriesStep);
          continue;
        }
      }
      onCellUpdate(targetRow, column.id, sourceValue);
    }
  }
}

export function extendRangeDown(range: CellRange, extraRows: number, maxRow: number): CellRange {
  if (extraRows <= ZERO) return range;
  return {
    ...range,
    endRow: Math.min(maxRow, range.endRow + extraRows),
  };
}

export function isBottomRightOfRange(range: CellRange | null, rowIndex: number, colIndex: number): boolean {
  if (!range) return false;
  return rowIndex === range.endRow && colIndex === range.endCol;
}
