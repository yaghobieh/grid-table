import type { FilterOperator, FilterValue } from '../types';

export function defaultFilter(
  value: unknown,
  filterValue: unknown,
  operator: FilterOperator
): boolean {
  if (filterValue === null || filterValue === undefined || filterValue === '') {
    return true;
  }

  const strValue = String(value ?? '').toLowerCase();
  const strFilter = String(filterValue).toLowerCase();

  switch (operator) {
    case 'equals':
      return strValue === strFilter;

    case 'notEquals':
      return strValue !== strFilter;

    case 'contains':
      return strValue.includes(strFilter);

    case 'notContains':
      return !strValue.includes(strFilter);

    case 'startsWith':
      return strValue.startsWith(strFilter);

    case 'endsWith':
      return strValue.endsWith(strFilter);

    case 'greaterThan':
      return Number(value) > Number(filterValue);

    case 'lessThan':
      return Number(value) < Number(filterValue);

    case 'greaterThanOrEqual':
      return Number(value) >= Number(filterValue);

    case 'lessThanOrEqual':
      return Number(value) <= Number(filterValue);

    case 'between':
      if (Array.isArray(filterValue) && filterValue.length === 2) {
        const numValue = Number(value);
        return numValue >= Number(filterValue[0]) && numValue <= Number(filterValue[1]);
      }
      return true;

    case 'isEmpty':
      return value === null || value === undefined || strValue === '';

    case 'isNotEmpty':
      return value !== null && value !== undefined && strValue !== '';

    default:
      return strValue.includes(strFilter);
  }
}

export function applyFilters<T>(
  data: T[],
  filters: FilterValue[],
  globalFilter: string,
  columnAccessors: Map<string, string | ((row: T) => unknown)>,
  globalFilterColumns?: string[]
): T[] {
  let result = [...data];

  if (globalFilter) {
    const searchLower = globalFilter.toLowerCase();
    const columnsToSearch = globalFilterColumns || Array.from(columnAccessors.keys());

    result = result.filter((row) => {
      return columnsToSearch.some((colId) => {
        const accessor = columnAccessors.get(colId);
        if (!accessor) return false;

        const value = typeof accessor === 'function' ? accessor(row) : (row as Record<string, unknown>)[accessor as string];
        return String(value ?? '').toLowerCase().includes(searchLower);
      });
    });
  }

  for (const filter of filters) {
    const accessor = columnAccessors.get(filter.columnId);
    if (!accessor) continue;

    result = result.filter((row) => {
      const value = typeof accessor === 'function' ? accessor(row) : (row as Record<string, unknown>)[accessor as string];
      return defaultFilter(value, filter.value, filter.operator);
    });
  }

  return result;
}

