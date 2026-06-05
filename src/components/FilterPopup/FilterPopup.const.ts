import type { FilterOperator } from '@/types';
import { KEY_ENTER, KEY_ESCAPE } from '@constants/keyboard.const';
import { FOUR } from '@constants/numbers.const';

export const FILTER_POPUP_TEXT_OPERATORS: FilterOperator[] = ['contains', 'equals', 'startsWith', 'endsWith', 'notContains', 'notEquals'];
export const FILTER_POPUP_NUMBER_OPERATORS: FilterOperator[] = ['equals', 'notEquals', 'greaterThan', 'lessThan', 'greaterThanOrEqual', 'lessThanOrEqual'];

export const FILTER_POPUP_OPERATOR_LABELS: Record<FilterOperator, string> = {
  equals: 'Equals',
  notEquals: 'Not equals',
  contains: 'Contains',
  notContains: 'Not contains',
  startsWith: 'Starts with',
  endsWith: 'Ends with',
  greaterThan: 'Greater than',
  lessThan: 'Less than',
  greaterThanOrEqual: 'Greater or equal',
  lessThanOrEqual: 'Less or equal',
  between: 'Between',
  isEmpty: 'Is empty',
  isNotEmpty: 'Is not empty',
  in: 'In list',
  notIn: 'Not in list',
};

export const FILTER_POPUP_SELECT_PLACEHOLDER = 'Select...';
export const FILTER_POPUP_OPERATOR_LABEL = 'Operator';
export const FILTER_POPUP_VALUE_LABEL = 'Value';
export const FILTER_POPUP_CLOSE_ARIA = 'Close';
export const FILTER_POPUP_TOP_OFFSET = FOUR;
export const FILTER_POPUP_FILTER_PREFIX = 'Filter';

export const FILTER_POPUP_KEY_ENTER = KEY_ENTER;
export const FILTER_POPUP_KEY_ESCAPE = KEY_ESCAPE;
