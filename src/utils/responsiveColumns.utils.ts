import type { ColumnDefinition, RowData } from '@/types';
import { TWO, ZERO } from '@constants/numbers.const';

export function resolveCollapsedColumnIds<T>(
  columns: Array<Pick<ColumnDefinition<T>, 'id' | 'responsivePriority'>>,
  width: number,
  enabled: boolean,
  breakpoint: number,
): string[] {
  if (!enabled || width <= ZERO || width >= breakpoint) return [];
  const ranked = columns
    .map((column, index) => ({ id: column.id, priority: column.responsivePriority ?? index }))
    .sort((left, right) => right.priority - left.priority);
  const hideCount = Math.max(ZERO, ranked.length - TWO);
  return ranked.slice(0, hideCount).map((column) => column.id);
}

export function readColumnValue<T extends RowData>(row: T, column: ColumnDefinition<T>): unknown {
  if (typeof column.accessor === 'function') return column.accessor(row);
  return row[column.accessor];
}
