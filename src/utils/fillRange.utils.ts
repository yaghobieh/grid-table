import type { ColumnDefinition, RowData } from '@/types';
import type { CellRange } from '@/types/features.types';
import { ONE, ZERO } from '@constants/numbers.const';

export function getCellAccessorValue<T extends RowData>(
  row: T,
  column: ColumnDefinition<T>,
): unknown {
  if (typeof column.accessor === 'function') {
    return column.accessor(row);
  }
  return row[column.accessor as keyof T];
}

export function applyFillDownFromRange<T extends RowData>(
  rows: T[],
  columns: ColumnDefinition<T>[],
  range: CellRange,
  onCellUpdate: (row: T, columnId: string, value: unknown) => void,
): void {
  if (range.endRow <= range.startRow) return;

  for (let colIndex = range.startCol; colIndex <= range.endCol; colIndex += ONE) {
    const column = columns[colIndex];
    if (!column) continue;
    const sourceRow = rows[range.startRow];
    if (!sourceRow) continue;
    const sourceValue = getCellAccessorValue(sourceRow, column);

    for (let rowIndex = range.startRow + ONE; rowIndex <= range.endRow; rowIndex += ONE) {
      const targetRow = rows[rowIndex];
      if (!targetRow) continue;
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
