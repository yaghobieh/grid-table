import type { SortDirection } from '../types';

export function defaultSort<T>(
  a: T,
  b: T,
  direction: SortDirection,
  accessor: string | ((row: T) => unknown)
): number {
  if (!direction) return 0;

  const aValue = typeof accessor === 'function' ? accessor(a) : (a as Record<string, unknown>)[accessor];
  const bValue = typeof accessor === 'function' ? accessor(b) : (b as Record<string, unknown>)[accessor];

  if (aValue === bValue) return 0;
  if (aValue === null || aValue === undefined) return 1;
  if (bValue === null || bValue === undefined) return -1;

  let comparison = 0;

  if (typeof aValue === 'string' && typeof bValue === 'string') {
    comparison = aValue.localeCompare(bValue);
  } else if (typeof aValue === 'number' && typeof bValue === 'number') {
    comparison = aValue - bValue;
  } else if (aValue instanceof Date && bValue instanceof Date) {
    comparison = aValue.getTime() - bValue.getTime();
  } else {
    comparison = String(aValue).localeCompare(String(bValue));
  }

  return direction === 'desc' ? -comparison : comparison;
}

export function multiSort<T>(
  data: T[],
  sorting: Array<{ columnId: string; direction: SortDirection }>,
  columnAccessors: Map<string, string | ((row: T) => unknown)>
): T[] {
  if (sorting.length === 0) return data;

  return [...data].sort((a, b) => {
    for (const sort of sorting) {
      const accessor = columnAccessors.get(sort.columnId);
      if (!accessor) continue;

      const result = defaultSort(a, b, sort.direction, accessor);
      if (result !== 0) return result;
    }
    return 0;
  });
}

