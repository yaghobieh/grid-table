import type { FilterTreeGroup, FilterTreeRule } from '@/types/filter.types';
import { FILTER_OP_CONTAINS, FILTER_OP_EQUALS, FILTER_OP_GREATER_THAN, FILTER_OP_IN, FILTER_OP_LESS_THAN } from '@constants/filterOperators.const';
import { FILTER_TREE_OP_AND } from '@constants/filterTree.const';
import { EMPTY_STRING } from '@constants/strings.const';

export const FILTER_BUILDER_DEFAULT_OP = FILTER_TREE_OP_AND;
export const FILTER_BUILDER_DEFAULT_RULE_OP = FILTER_OP_CONTAINS;

export const FILTER_BUILDER_EMPTY_RULE: FilterTreeRule = {
  field: EMPTY_STRING,
  op: FILTER_BUILDER_DEFAULT_RULE_OP,
  value: EMPTY_STRING,
};

export const FILTER_BUILDER_EMPTY_GROUP: FilterTreeGroup = {
  op: FILTER_BUILDER_DEFAULT_OP,
  rules: [FILTER_BUILDER_EMPTY_RULE],
};

export const FILTER_BUILDER_GROUP_OP_OPTIONS = [
  { value: FILTER_TREE_OP_AND, labelKey: 'and' as const },
  { value: 'or', labelKey: 'or' as const },
];

export const FILTER_BUILDER_RULE_OP_OPTIONS = [
  { value: FILTER_OP_CONTAINS, labelKey: 'contains' as const },
  { value: FILTER_OP_EQUALS, labelKey: 'equals' as const },
  { value: FILTER_OP_IN, labelKey: 'in' as const },
  { value: FILTER_OP_GREATER_THAN, labelKey: 'greaterThan' as const },
  { value: FILTER_OP_LESS_THAN, labelKey: 'lessThan' as const },
];

export const FILTER_BUILDER_DEFAULT_TRANSLATIONS = {
  title: 'Advanced filters',
  valuePlaceholder: 'Value',
  addRule: 'Add rule',
  clear: 'Clear',
  apply: 'Apply',
  and: 'AND',
  or: 'OR',
  contains: 'contains',
  equals: 'equals',
  in: 'in',
  greaterThan: '>',
  lessThan: '<',
};
