import type { RowData } from '@/types';
import type { ColumnDefinition } from '@/types/column.types';
import type { ConditionalCellFormat, ConditionalFormatConfig } from '@/types/features.types';
import { EMPTY_STRING } from '@constants/strings.const';

export function resolveConditionalCellFormat<T extends RowData>(
  row: T,
  column: ColumnDefinition<T>,
  config: ConditionalFormatConfig<T> | undefined,
): ConditionalCellFormat {
  if (!config) {
    return { className: EMPTY_STRING, style: {} };
  }

  const accessor = column.accessor;
  const value = typeof accessor === 'function' ? accessor(row) : row[accessor as keyof T];
  let className = EMPTY_STRING;
  let style: ConditionalCellFormat['style'] = {};

  for (const rule of config.rules) {
    if (rule.columnId && rule.columnId !== column.id) continue;
    if (!rule.when(row, value)) continue;
    if (rule.className) className = `${className} ${rule.className}`.trim();
    if (rule.cellStyle) style = { ...style, ...rule.cellStyle };
  }

  return { className, style };
}
