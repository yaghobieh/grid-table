import type { ColumnDefinition, ColumnState, RowData } from '@/types';
import { ZERO } from '@constants/numbers.const';

export interface ResolveExportColumnsParams<T extends RowData> {
  columns: ColumnDefinition<T>[];
  columnStates?: ColumnState[];
  includeHidden?: boolean;
}

export function resolveExportColumns<T extends RowData>(
  params: ResolveExportColumnsParams<T>,
): ColumnDefinition<T>[] {
  const { columns, columnStates, includeHidden = false } = params;
  const stateIndex = new Map((columnStates ?? []).map((state) => [state.id, state]));

  return columns
    .filter((column) => {
      if (!includeHidden && column.hidden) return false;
      const state = stateIndex.get(column.id);
      if (!includeHidden && state?.visible === false) return false;
      return true;
    })
    .sort((a, b) => {
      const aOrder = stateIndex.get(a.id)?.order ?? ZERO;
      const bOrder = stateIndex.get(b.id)?.order ?? ZERO;
      return aOrder - bOrder;
    });
}

export function shouldSkipEmptyExport(rowCount: number): boolean {
  return rowCount <= ZERO;
}
