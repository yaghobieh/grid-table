import type { RowData } from '@/types';
import type { ColumnDefinition } from '@/types/column.types';
import type { GroupFooterSpec, RowGroupConfig, RowGroupMeta } from '@/types/features.types';
import {
  ROW_GROUP_FOOTER_LABEL_SUFFIX,
  ROW_GROUP_FOOTER_PREFIX,
  ROW_GROUP_FOOTER_SPEC_SEPARATOR,
  ROW_GROUP_META_KEY,
} from '@constants/rowGroups.const';
import { computeAggregation } from './export.utils';
import { ZERO, ONE } from '@constants/numbers.const';
import { EMPTY_STRING } from '@constants/strings.const';

function parseFooterSpec(spec: string | GroupFooterSpec): GroupFooterSpec {
  if (typeof spec !== 'string') return spec;
  const [type, field] = spec.split(ROW_GROUP_FOOTER_SPEC_SEPARATOR);
  return {
    type: type as GroupFooterSpec['type'],
    field,
  };
}

function buildFooterRow<T extends RowData>(
  groupKey: string,
  groupLabel: string,
  rows: T[],
  footerSpecs: Array<string | GroupFooterSpec>,
  columns: ColumnDefinition<T>[],
  labelField: string,
): T {
  const footerRow = {} as T;
  const meta: RowGroupMeta = {
    isGroupFooter: true,
    groupKey,
    groupLabel,
  };
  (footerRow as Record<string, unknown>)[ROW_GROUP_META_KEY] = meta;
  (footerRow as Record<string, unknown>).id = `${ROW_GROUP_FOOTER_PREFIX}${groupKey}`;

  for (const column of columns) {
    const accessor = column.accessor;
    const key = typeof accessor === 'string' ? accessor : column.id;
    if (key === labelField) {
      (footerRow as Record<string, unknown>)[key] = `${groupLabel}${ROW_GROUP_FOOTER_LABEL_SUFFIX}`;
      continue;
    }
    const spec = footerSpecs.find((item) => {
      const parsed = parseFooterSpec(item);
      return parsed.field === column.id || parsed.field === key;
    });
    if (!spec) continue;
    const parsed = parseFooterSpec(spec);
    const aggregated = computeAggregation(rows, column, parsed.type);
    if (typeof accessor === 'string') {
      (footerRow as Record<string, unknown>)[accessor] = aggregated;
    }
  }

  return footerRow;
}

export function getRowGroupMeta<T extends RowData>(row: T): RowGroupMeta | undefined {
  return (row as Record<string, unknown>)[ROW_GROUP_META_KEY] as RowGroupMeta | undefined;
}

export interface RowGroupResult<T extends RowData> {
  rows: T[];
  pinnedBottom: T[];
}

export function applyRowGroups<T extends RowData>(
  data: T[],
  groups: RowGroupConfig[] | undefined,
  columns: ColumnDefinition<T>[],
): RowGroupResult<T> {
  if (!groups || groups.length === ZERO) {
    return { rows: data, pinnedBottom: [] };
  }

  const config = groups[ZERO];
  const labelField = config.footerLabelField ?? config.by;
  const grouped = new Map<string, T[]>();

  for (const row of data) {
    const key = String((row as Record<string, unknown>)[config.by] ?? EMPTY_STRING);
    const bucket = grouped.get(key) ?? [];
    bucket.push(row);
    grouped.set(key, bucket);
  }

  const displayRows: T[] = [];
  const pinnedBottom: T[] = [];

  for (const [groupKey, rows] of grouped.entries()) {
    displayRows.push(...rows);
    if (!config.footer || config.footer.length === ZERO) continue;
    const footerRow = buildFooterRow(
      groupKey,
      groupKey,
      rows,
      config.footer,
      columns,
      labelField,
    );
    if (config.pinned) {
      pinnedBottom.push(footerRow);
    } else {
      displayRows.push(footerRow);
    }
  }

  return { rows: displayRows, pinnedBottom };
}
