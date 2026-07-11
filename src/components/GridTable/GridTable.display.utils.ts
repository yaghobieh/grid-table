import type { RowData, ColumnDefinition } from '@/types';
import type { RowGroupConfig, VirtualizeConfig } from '@/types/features.types';
import { applyFormulaColumnsToData } from '@/utils/formula.utils';
import { applyRowGroups } from '@/utils/rowGroups.utils';
import { DEFAULT_VIRTUALIZE_THRESHOLD, ZERO } from '@constants/numbers.const';

export function resolveVirtualizeConfig(
  virtualize: boolean | VirtualizeConfig | undefined,
): VirtualizeConfig {
  if (typeof virtualize === 'boolean') {
    return { enabled: virtualize, threshold: DEFAULT_VIRTUALIZE_THRESHOLD };
  }
  return {
    enabled: virtualize?.enabled ?? false,
    threshold: virtualize?.threshold ?? DEFAULT_VIRTUALIZE_THRESHOLD,
    rowHeight: virtualize?.rowHeight,
    overscan: virtualize?.overscan,
  };
}

export function buildDisplayRows<T extends RowData>(params: {
  rows: T[];
  columns: ColumnDefinition<T>[];
  rowGroups?: RowGroupConfig[];
  collapsedGroupKeys?: Set<string>;
  defaultGroupExpanded?: boolean;
}): { bodyRows: T[]; pinnedBottomRows: T[] } {
  const withFormulas = applyFormulaColumnsToData(params.rows, params.columns);
  const grouped = applyRowGroups(withFormulas, params.rowGroups, params.columns, {
    collapsedKeys: params.collapsedGroupKeys,
    defaultExpanded: params.defaultGroupExpanded,
  });
  return {
    bodyRows: grouped.rows,
    pinnedBottomRows: grouped.pinnedBottom,
  };
}

export function shouldEnableVirtualization(itemCount: number, config: VirtualizeConfig): boolean {
  if (!config.enabled) return false;
  const threshold = config.threshold ?? DEFAULT_VIRTUALIZE_THRESHOLD;
  return itemCount >= threshold;
}

export function sliceVirtualRows<T extends RowData>(
  rows: T[],
  startIndex: number,
  endIndex: number,
): T[] {
  if (rows.length === ZERO) return rows;
  return rows.slice(startIndex, endIndex + 1);
}
