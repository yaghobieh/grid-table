import type { FilterTreeGroup, FilterTreeRule } from '@/types/filter.types';
import {
  FILTER_OP_CONTAINS,
  FILTER_OP_EQUALS,
  FILTER_OP_GREATER_THAN,
  FILTER_OP_IN,
  FILTER_OP_LESS_THAN,
} from '@constants/filterOperators.const';
import { FILTER_TREE_OP_AND, FILTER_TREE_OP_OR } from '@constants/filterTree.const';
import { EMPTY_STRING } from '@constants/strings.const';

export const FILTER_BUILDER_EMPTY_RULE: FilterTreeRule = {
  field: EMPTY_STRING,
  op: FILTER_OP_CONTAINS,
  value: EMPTY_STRING,
};

export const FILTER_BUILDER_EMPTY_GROUP: FilterTreeGroup = {
  op: FILTER_TREE_OP_AND,
  rules: [FILTER_BUILDER_EMPTY_RULE],
};

export const FILTER_BUILDER_GROUP_OP_OPTIONS = [
  { value: FILTER_TREE_OP_AND, labelKey: 'and' as const },
  { value: FILTER_TREE_OP_OR, labelKey: 'or' as const },
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
  greaterThan: 'Greater than',
  lessThan: 'Less than',
};

export const FILTER_BUILDER_CLASS = 'gt-filter-builder';
export const FILTER_BUILDER_HEADER_CLASS = 'gt-filter-builder__header';
export const FILTER_BUILDER_RULES_CLASS = 'gt-filter-builder__rules';
export const FILTER_BUILDER_RULE_CLASS = 'gt-filter-builder__rule';
export const FILTER_BUILDER_ACTIONS_CLASS = 'gt-filter-builder__actions';
