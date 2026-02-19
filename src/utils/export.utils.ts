import type { ColumnDefinition } from '../types/column.types';
import type { RowData } from '../types/row.types';

function getCellValue<T extends RowData>(row: T, accessor: ColumnDefinition<T>['accessor']): unknown {
  if (typeof accessor === 'function') return accessor(row);
  return (row as Record<string, unknown>)[accessor as string];
}

function escapeCSV(value: unknown): string {
  const str = value == null ? '' : String(value);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function exportToCSV<T extends RowData>(
  data: T[],
  columns: ColumnDefinition<T>[],
  fileName = 'grid-table-export',
): void {
  const visibleCols = columns.filter((c) => !c.hidden);

  const headerRow = visibleCols.map((c) => {
    const h = typeof c.header === 'function' ? c.header() : c.header;
    return escapeCSV(typeof h === 'string' ? h : c.id);
  });

  const rows = data.map((row) =>
    visibleCols.map((col) => escapeCSV(getCellValue(row, col.accessor))),
  );

  const csv = [headerRow.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${fileName}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export function exportToJSON<T extends RowData>(
  data: T[],
  columns: ColumnDefinition<T>[],
  fileName = 'grid-table-export',
): void {
  const visibleCols = columns.filter((c) => !c.hidden);

  const rows = data.map((row) => {
    const obj: Record<string, unknown> = {};
    for (const col of visibleCols) {
      const key = typeof col.accessor === 'string' ? col.accessor : col.id;
      obj[key] = getCellValue(row, col.accessor);
    }
    return obj;
  });

  const json = JSON.stringify(rows, null, 2);
  const blob = new Blob([json], { type: 'application/json;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${fileName}.json`;
  link.click();
  URL.revokeObjectURL(url);
}
