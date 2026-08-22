import type { FilterOperator } from '@/types';
import { EMPTY_STRING } from '@constants/strings.const';
import { ONE, ZERO } from '@constants/numbers.const';
import {
  FILTER_POPUP_DATE_OPERATORS,
  FILTER_POPUP_NUMBER_OPERATORS,
  FILTER_POPUP_TEXT_OPERATORS,
  FILTER_TYPE_DATE,
  FILTER_TYPE_NUMBER,
} from './FilterPopup.const';
import type { FilterPopupFilterType } from './FilterPopup.types';

export function resolveFilterOperators(filterType: FilterPopupFilterType): FilterOperator[] {
  if (filterType === FILTER_TYPE_NUMBER) return FILTER_POPUP_NUMBER_OPERATORS;
  if (filterType === FILTER_TYPE_DATE) return FILTER_POPUP_DATE_OPERATORS;
  return FILTER_POPUP_TEXT_OPERATORS;
}

export function createSetValues(currentValue: unknown): Set<string> {
  if (Array.isArray(currentValue)) {
    return new Set(currentValue.map(String));
  }
  return new Set<string>();
}

export function resolveDateBound(currentValue: unknown, index: number): string {
  if (Array.isArray(currentValue)) {
    return String(currentValue[index] ?? EMPTY_STRING);
  }
  if (index === ZERO && currentValue) {
    return String(currentValue);
  }
  return EMPTY_STRING;
}

export function resolveInitialTextValue(currentValue: unknown): string {
  return currentValue ? String(currentValue) : EMPTY_STRING;
}

export function matchesSetSearch(
  label: string,
  optionValue: string,
  query: string,
): boolean {
  if (!query) return true;
  const normalized = query.trim().toLowerCase();
  if (!normalized) return true;
  return label.toLowerCase().includes(normalized) || optionValue.toLowerCase().includes(normalized);
}

export function nextSetValues(prev: Set<string>, optionValue: string): Set<string> {
  const next = new Set(prev);
  if (next.has(optionValue)) {
    next.delete(optionValue);
    return next;
  }
  next.add(optionValue);
  return next;
}
