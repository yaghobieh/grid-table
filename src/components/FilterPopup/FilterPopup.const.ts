import type { FilterOperator } from '@/types';
import {
  FILTER_OP_BETWEEN,
  FILTER_OP_CONTAINS,
  FILTER_OP_ENDS_WITH,
  FILTER_OP_EQUALS,
  FILTER_OP_GREATER_THAN,
  FILTER_OP_GREATER_THAN_OR_EQUAL,
  FILTER_OP_LESS_THAN,
  FILTER_OP_LESS_THAN_OR_EQUAL,
  FILTER_OP_NOT_CONTAINS,
  FILTER_OP_NOT_EQUALS,
  FILTER_OP_STARTS_WITH,
} from '@constants/filterOperators.const';
import { FOUR } from '@constants/numbers.const';
import type { FilterPopupFilterType } from './FilterPopup.types';

export const FILTER_TYPE_TEXT: FilterPopupFilterType = 'text';
export const FILTER_TYPE_NUMBER: FilterPopupFilterType = 'number';
export const FILTER_TYPE_DATE: FilterPopupFilterType = 'date';
export const FILTER_TYPE_SELECT: FilterPopupFilterType = 'select';
export const FILTER_TYPE_SET: FilterPopupFilterType = 'set';

export const FILTER_POPUP_INPUT_TYPE_TEXT = 'text';
export const FILTER_POPUP_INPUT_TYPE_NUMBER = 'number';
export const FILTER_POPUP_INPUT_TYPE_DATE = 'date';

export const FILTER_POPUP_VALUE_INPUT_TYPE: Record<string, 'text' | 'number'> = {
  [FILTER_TYPE_NUMBER]: FILTER_POPUP_INPUT_TYPE_NUMBER,
  [FILTER_TYPE_TEXT]: FILTER_POPUP_INPUT_TYPE_TEXT,
};

export const FILTER_POPUP_TEXT_OPERATORS: FilterOperator[] = [
  FILTER_OP_CONTAINS,
  FILTER_OP_EQUALS,
  FILTER_OP_STARTS_WITH,
  FILTER_OP_ENDS_WITH,
  FILTER_OP_NOT_CONTAINS,
  FILTER_OP_NOT_EQUALS,
];
export const FILTER_POPUP_NUMBER_OPERATORS: FilterOperator[] = [
  FILTER_OP_EQUALS,
  FILTER_OP_NOT_EQUALS,
  FILTER_OP_GREATER_THAN,
  FILTER_OP_LESS_THAN,
  FILTER_OP_GREATER_THAN_OR_EQUAL,
  FILTER_OP_LESS_THAN_OR_EQUAL,
  FILTER_OP_BETWEEN,
];
export const FILTER_POPUP_DATE_OPERATORS: FilterOperator[] = [
  FILTER_OP_EQUALS,
  FILTER_OP_GREATER_THAN,
  FILTER_OP_LESS_THAN,
  FILTER_OP_BETWEEN,
];

export const FILTER_POPUP_SET_LABEL = 'Select values';
export const FILTER_POPUP_SET_SEARCH_PLACEHOLDER = 'Search values…';
export const FILTER_POPUP_DATE_FROM_LABEL = 'From';
export const FILTER_POPUP_DATE_TO_LABEL = 'To';

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
export const FILTER_POPUP_CLASS = 'filter-popup';
export const FILTER_POPUP_HEADER_CLASS = 'filter-popup-header';
export const FILTER_POPUP_HEADER_CONTENT_CLASS = 'header-content';
export const FILTER_POPUP_HEADER_TITLE_CLASS = 'header-title';
export const FILTER_POPUP_HEADER_CLOSE_CLASS = 'header-close';
export const FILTER_POPUP_BODY_CLASS = 'filter-popup-body';
export const FILTER_POPUP_FOOTER_CLASS = 'filter-popup-footer';
export const FILTER_POPUP_FIELD_CLASS = 'filter-field';
export const FILTER_POPUP_SET_CLASS = 'filter-popup-set';
export const FILTER_POPUP_SET_OPTIONS_CLASS = 'filter-popup-set-options';
export const FILTER_POPUP_SET_OPTION_CLASS = 'filter-popup-set-option';
export const FILTER_POPUP_SET_SEARCH_CLASS = 'w-full px-3 py-2 text-sm rounded filter-popup-set-search';
export const FILTER_POPUP_CONTROL_CLASS = 'w-full px-3 py-2 text-sm rounded';
export const FILTER_POPUP_CLEAR_CLASS = 'filter-clear';
export const FILTER_POPUP_APPLY_CLASS = 'filter-apply';
export const FILTER_POPUP_TEXT_BODY_CLASS = 'filter-popup-text';
export const FILTER_POPUP_DATE_BODY_CLASS = 'filter-popup-date';
