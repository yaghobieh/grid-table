import type { ReactNode } from 'react';
import type { ColumnDefinition, RowData } from '@/types';
import { Sparkline } from '@/components/Sparkline';
import { ZERO } from '@constants/numbers.const';

export function renderDetailValue<T extends RowData>(column: ColumnDefinition<T>, row: T, value: unknown): ReactNode {
  if (column.sparkline && Array.isArray(value)) {
    const options = typeof column.sparkline === 'object' ? column.sparkline : {};
    return <Sparkline data={value as number[]} width={options.width} height={options.height} color={options.color} negativeColor={options.negativeColor} />;
  }
  if (column.render) return column.render(value, row as Record<string, unknown>, ZERO);
  if (value == null) return '';
  return String(value);
}
