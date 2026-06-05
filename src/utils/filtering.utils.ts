import type { FilterOperator, FilterValue } from '../types';
import { EMPTY_STRING } from '@constants/strings.const';
import {
  FILTER_OP_BETWEEN,
  FILTER_OP_CONTAINS,
  FILTER_OP_ENDS_WITH,
  FILTER_OP_EQUALS,
  FILTER_OP_GREATER_THAN,
  FILTER_OP_GREATER_THAN_OR_EQUAL,
  FILTER_OP_IN,
  FILTER_OP_IS_EMPTY,
  FILTER_OP_IS_NOT_EMPTY,
  FILTER_OP_LESS_THAN,
  FILTER_OP_LESS_THAN_OR_EQUAL,
  FILTER_OP_NOT_CONTAINS,
  FILTER_OP_NOT_EQUALS,
  FILTER_OP_NOT_IN,
  FILTER_OP_STARTS_WITH,
} from '@constants/filterOperators.const';
import { TWO } from '@constants/numbers.const';

export function defaultFilter(
  value: unknown,
  filterValue: unknown,
  operator: FilterOperator
): boolean {
  if (filterValue === null || filterValue === undefined || filterValue === EMPTY_STRING) {
    return true;
  }

  const strValue = String(value ?? EMPTY_STRING).toLowerCase();
  const strFilter = String(filterValue).toLowerCase();

  switch (operator) {
    case FILTER_OP_EQUALS:
      return strValue === strFilter;

    case FILTER_OP_NOT_EQUALS:
      return strValue !== strFilter;

    case FILTER_OP_CONTAINS:
      return strValue.includes(strFilter);

    case FILTER_OP_NOT_CONTAINS:
      return !strValue.includes(strFilter);

    case FILTER_OP_STARTS_WITH:
      return strValue.startsWith(strFilter);

    case FILTER_OP_ENDS_WITH:
      return strValue.endsWith(strFilter);

    case FILTER_OP_GREATER_THAN:
      return Number(value) > Number(filterValue);

    case FILTER_OP_LESS_THAN:
      return Number(value) < Number(filterValue);

    case FILTER_OP_GREATER_THAN_OR_EQUAL:
      return Number(value) >= Number(filterValue);

    case FILTER_OP_LESS_THAN_OR_EQUAL:
      return Number(value) <= Number(filterValue);

    case FILTER_OP_BETWEEN:
      if (Array.isArray(filterValue) && filterValue.length === TWO) {
        const numValue = Number(value);
        return numValue >= Number(filterValue[0]) && numValue <= Number(filterValue[1]);
      }
      return true;

    case FILTER_OP_IS_EMPTY:
      return value === null || value === undefined || strValue === EMPTY_STRING;

    case FILTER_OP_IS_NOT_EMPTY:
      return value !== null && value !== undefined && strValue !== EMPTY_STRING;

    case FILTER_OP_IN: {
      const list = Array.isArray(filterValue) ? filterValue : [filterValue];
      return list.some((item) => String(item) === String(value ?? EMPTY_STRING));
    }

    case FILTER_OP_NOT_IN: {
      const list = Array.isArray(filterValue) ? filterValue : [filterValue];
      return !list.some((item) => String(item) === String(value ?? EMPTY_STRING));
    }

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
        return String(value ?? EMPTY_STRING).toLowerCase().includes(searchLower);
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
