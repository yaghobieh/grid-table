import type { ColumnDefinition, RowData } from '@/types';
import type { CellRange } from '@/types/features.types';
import { getCellAccessorValue } from './fillRange.utils';
import { EMPTY_STRING } from '@constants/strings.const';
import { ONE, ZERO } from '@constants/numbers.const';

export function buildRangeClipboardText<T extends RowData>(
  rows: T[],
  columns: ColumnDefinition<T>[],
  range: CellRange,
): string {
  const lines: string[] = [];

  for (let rowIndex = range.startRow; rowIndex <= range.endRow; rowIndex += ONE) {
    const row = rows[rowIndex];
    if (!row) continue;
    const cells: string[] = [];
    for (let colIndex = range.startCol; colIndex <= range.endCol; colIndex += ONE) {
      const column = columns[colIndex];
      if (!column) {
        cells.push(EMPTY_STRING);
        continue;
      }
      const value = getCellAccessorValue(row, column);
      cells.push(value == null ? EMPTY_STRING : String(value));
    }
    lines.push(cells.join('\t'));
  }

  return lines.join('\n');
}

export function copyRangeToClipboard<T extends RowData>(
  rows: T[],
  columns: ColumnDefinition<T>[],
  range: CellRange | null,
): boolean {
  if (!range) return false;
  const text = buildRangeClipboardText(rows, columns, range);
  if (text.length === ZERO) return false;
  void navigator.clipboard?.writeText(text);
  return true;
}

export function clearRangeCells<T extends RowData>(
  rows: T[],
  columns: ColumnDefinition<T>[],
  range: CellRange,
  onCellUpdate: (row: T, columnId: string, value: unknown) => void,
): void {
  for (let rowIndex = range.startRow; rowIndex <= range.endRow; rowIndex += ONE) {
    const row = rows[rowIndex];
    if (!row) continue;
    for (let colIndex = range.startCol; colIndex <= range.endCol; colIndex += ONE) {
      const column = columns[colIndex];
      if (!column) continue;
      onCellUpdate(row, column.id, EMPTY_STRING);
    }
  }
}
