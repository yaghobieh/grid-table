import type { RowData } from '@/types';
import type { RowTransaction } from '@/types/features.types';
import { EMPTY_STRING } from '@constants/strings.const';

export function applyTransaction<T extends RowData>(
  data: T[],
  transaction: RowTransaction<T>,
  getRowId: (row: T) => string | number,
): T[] {
  let next = [...data];

  if (transaction.remove && transaction.remove.length > 0) {
    const removeSet = new Set(transaction.remove.map(String));
    next = next.filter((row) => !removeSet.has(String(getRowId(row))));
  }

  if (transaction.update && transaction.update.length > 0) {
    const updateMap = new Map(transaction.update.map((row) => [String(getRowId(row)), row]));
    next = next.map((row) => updateMap.get(String(getRowId(row))) ?? row);
  }

  if (transaction.add && transaction.add.length > 0) {
    next = [...next, ...transaction.add];
  }

  return next;
}

export function parseClipboardGrid(text: string): string[][] {
  const normalized = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim();
  if (!normalized) return [];
  return normalized.split('\n').map((line) => line.split('\t'));
}

export function applyClipboardToRange<T extends RowData>(
  matrix: string[][],
  rows: T[],
  columns: Array<{ id: string }>,
  range: { startRow: number; endRow: number; startCol: number; endCol: number },
  onCellUpdate: (row: T, columnId: string, value: string) => void,
): void {
  const rowSpan = range.endRow - range.startRow + 1;
  const colSpan = range.endCol - range.startCol + 1;

  for (let r = 0; r < matrix.length; r += 1) {
    const targetRowIndex = range.startRow + (r % rowSpan);
    const targetRow = rows[targetRowIndex];
    if (!targetRow) continue;

    for (let c = 0; c < matrix[r].length; c += 1) {
      const targetColIndex = range.startCol + (c % colSpan);
      const column = columns[targetColIndex];
      if (!column) continue;
      onCellUpdate(targetRow, column.id, matrix[r][c] ?? EMPTY_STRING);
    }
  }
}
