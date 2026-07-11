import type { ExportScope } from '@/types';
import type { RowData } from '@/types/row.types';

export interface ResolveExportDataParams<T extends RowData> {
  scope: ExportScope;
  allData: T[];
  filteredData: T[];
  sortedData: T[];
  selectedIds: Set<string | number>;
  getRowId: (row: T) => string | number;
}

export function resolveExportData<T extends RowData>(params: ResolveExportDataParams<T>): T[] {
  const { scope, allData, filteredData, sortedData, selectedIds, getRowId } = params;

  if (scope === 'all') return allData;
  if (scope === 'filtered') return filteredData;
  if (scope === 'selected') {
    if (selectedIds.size === 0) return [];
    return sortedData.filter((row) => selectedIds.has(getRowId(row)));
  }
  return sortedData;
}
