import type { FilterOperator } from '@/types/common.types';

export const FILTER_OP_EQUALS: FilterOperator = 'equals';
export const FILTER_OP_NOT_EQUALS: FilterOperator = 'notEquals';
export const FILTER_OP_CONTAINS: FilterOperator = 'contains';
export const FILTER_OP_NOT_CONTAINS: FilterOperator = 'notContains';
export const FILTER_OP_STARTS_WITH: FilterOperator = 'startsWith';
export const FILTER_OP_ENDS_WITH: FilterOperator = 'endsWith';
export const FILTER_OP_GREATER_THAN: FilterOperator = 'greaterThan';
export const FILTER_OP_LESS_THAN: FilterOperator = 'lessThan';
export const FILTER_OP_GREATER_THAN_OR_EQUAL: FilterOperator = 'greaterThanOrEqual';
export const FILTER_OP_LESS_THAN_OR_EQUAL: FilterOperator = 'lessThanOrEqual';
export const FILTER_OP_BETWEEN: FilterOperator = 'between';
export const FILTER_OP_IS_EMPTY: FilterOperator = 'isEmpty';
export const FILTER_OP_IS_NOT_EMPTY: FilterOperator = 'isNotEmpty';
export const FILTER_OP_IN: FilterOperator = 'in';
export const FILTER_OP_NOT_IN: FilterOperator = 'notIn';
