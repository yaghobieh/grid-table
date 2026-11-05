import type { ColumnDefinition, RowData } from '@/types';
import type { BulkEditConfig, CellRange } from '@/types/features.types';
import { ONE, ZERO } from '@constants/numbers.const';

export function resolveBulkEditRowIds<T extends RowData>(props: {
  config: BulkEditConfig | undefined;
  rowId: string | number;
  columnId: string;
  rows: T[];
  selectedIds: Set<string | number>;
  range: CellRange | null;
  columns: ColumnDefinition<T>[];
  getRowId: (row: T) => string | number;
}): Array<string | number> {
  const { config, rowId, columnId, rows, selectedIds, range, columns, getRowId } = props;
  if (!config?.enabled || config.applyToSelection === false) return [rowId];

  const columnIndex = columns.findIndex((column) => column.id === columnId);
  if (range && columnIndex >= range.startCol && columnIndex <= range.endCol) {
    const start = Math.min(range.startRow, range.endRow);
    const end = Math.max(range.startRow, range.endRow);
    const ids: Array<string | number> = [];
    for (let index = start; index <= end; index += ONE) {
      const row = rows[index];
      if (!row) continue;
      ids.push(getRowId(row));
    }
    if (ids.length > ZERO) return ids;
  }

  if (selectedIds.size > ONE && selectedIds.has(rowId)) {
    const ids = rows.map((row) => getRowId(row)).filter((id) => selectedIds.has(id));
    if (ids.length > ZERO) return ids;
  }

  return [rowId];
}
