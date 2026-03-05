import type { ColumnDefinition } from '../types/column.types';
import type { RowData } from '../types/row.types';
import type { AggregationType } from '../types/features.types';

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

function escapeXml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function getColHeaders<T extends RowData>(columns: ColumnDefinition<T>[]): Array<{ col: ColumnDefinition<T>; label: string }> {
  return columns.filter(c => !c.hidden).map(c => {
    const h = typeof c.header === 'function' ? c.header() : c.header;
    return { col: c, label: typeof h === 'string' ? h : c.id };
  });
}

function downloadBlob(blob: Blob, fileName: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}

// ---- CSV ----
export function exportToCSV<T extends RowData>(
  data: T[],
  columns: ColumnDefinition<T>[],
  fileName = 'grid-table-export',
): void {
  const cols = getColHeaders(columns);
  const headerRow = cols.map(c => escapeCSV(c.label));
  const rows = data.map(row => cols.map(c => escapeCSV(getCellValue(row, c.col.accessor))));
  const csv = [headerRow.join(','), ...rows.map(r => r.join(','))].join('\n');
  downloadBlob(new Blob([csv], { type: 'text/csv;charset=utf-8;' }), `${fileName}.csv`);
}

// ---- JSON ----
export function exportToJSON<T extends RowData>(
  data: T[],
  columns: ColumnDefinition<T>[],
  fileName = 'grid-table-export',
): void {
  const cols = getColHeaders(columns);
  const rows = data.map(row => {
    const obj: Record<string, unknown> = {};
    for (const c of cols) {
      const key = typeof c.col.accessor === 'string' ? c.col.accessor : c.col.id;
      obj[key] = getCellValue(row, c.col.accessor);
    }
    return obj;
  });
  downloadBlob(new Blob([JSON.stringify(rows, null, 2)], { type: 'application/json;charset=utf-8;' }), `${fileName}.json`);
}

// ---- Excel (SpreadsheetML XML — no dependencies) ----
export function exportToExcel<T extends RowData>(
  data: T[],
  columns: ColumnDefinition<T>[],
  fileName = 'grid-table-export',
): void {
  const cols = getColHeaders(columns);

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<?mso-application progid="Excel.Sheet"?>\n';
  xml += '<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">\n';
  xml += '<Worksheet ss:Name="Sheet1"><Table>\n';

  xml += '<Row>';
  cols.forEach(c => { xml += `<Cell><Data ss:Type="String">${escapeXml(c.label)}</Data></Cell>`; });
  xml += '</Row>\n';

  data.forEach(row => {
    xml += '<Row>';
    cols.forEach(c => {
      const val = getCellValue(row, c.col.accessor);
      const isNum = typeof val === 'number';
      const type = isNum ? 'Number' : 'String';
      const display = val == null ? '' : String(val);
      xml += `<Cell><Data ss:Type="${type}">${escapeXml(display)}</Data></Cell>`;
    });
    xml += '</Row>\n';
  });

  xml += '</Table></Worksheet></Workbook>';
  downloadBlob(new Blob([xml], { type: 'application/vnd.ms-excel' }), `${fileName}.xls`);
}

// ---- PDF (generates printable HTML and triggers print) ----
export function exportToPDF<T extends RowData>(
  data: T[],
  columns: ColumnDefinition<T>[],
  fileName = 'grid-table-export',
  title?: string,
): void {
  const cols = getColHeaders(columns);
  const w = window.open('', '_blank');
  if (!w) return;

  let html = `<!DOCTYPE html><html><head><title>${title || fileName}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 20px; font-size: 11px; }
    h1 { font-size: 16px; margin-bottom: 8px; }
    table { border-collapse: collapse; width: 100%; }
    th, td { border: 1px solid #ccc; padding: 4px 8px; text-align: left; }
    th { background: #f5f5f5; font-weight: 600; }
    tr:nth-child(even) td { background: #fafafa; }
    .date { color: #888; font-size: 10px; margin-bottom: 12px; }
    @media print { body { margin: 0; } }
  </style></head><body>`;

  if (title) html += `<h1>${escapeXml(title)}</h1>`;
  html += `<div class="date">${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}</div>`;
  html += '<table><thead><tr>';
  cols.forEach(c => { html += `<th>${escapeXml(c.label)}</th>`; });
  html += '</tr></thead><tbody>';

  data.forEach(row => {
    html += '<tr>';
    cols.forEach(c => {
      const val = getCellValue(row, c.col.accessor);
      html += `<td>${escapeXml(val == null ? '' : String(val))}</td>`;
    });
    html += '</tr>';
  });

  html += '</tbody></table></body></html>';
  w.document.write(html);
  w.document.close();
  w.focus();
  setTimeout(() => w.print(), 250);
}

// ---- Copy to clipboard ----
export function copyToClipboard<T extends RowData>(
  data: T[],
  columns: ColumnDefinition<T>[],
): void {
  const cols = getColHeaders(columns);
  const header = cols.map(c => c.label).join('\t');
  const rows = data.map(row => cols.map(c => {
    const val = getCellValue(row, c.col.accessor);
    return val == null ? '' : String(val);
  }).join('\t'));
  const text = [header, ...rows].join('\n');
  navigator.clipboard?.writeText(text);
}

// ---- Aggregation helpers ----
export function computeAggregation<T extends RowData>(
  data: T[],
  column: ColumnDefinition<T>,
  type: AggregationType,
): number {
  const values = data
    .map(row => Number(getCellValue(row, column.accessor)))
    .filter(v => !isNaN(v));

  if (values.length === 0) return 0;

  switch (type) {
    case 'sum': return values.reduce((a, b) => a + b, 0);
    case 'avg': return values.reduce((a, b) => a + b, 0) / values.length;
    case 'min': return Math.min(...values);
    case 'max': return Math.max(...values);
    case 'count': return values.length;
  }
}

// ---- Print helper ----
export function printTable<T extends RowData>(
  data: T[],
  columns: ColumnDefinition<T>[],
  title?: string,
): void {
  exportToPDF(data, columns, 'print', title);
}
