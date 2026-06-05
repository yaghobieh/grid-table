import type { RowData } from '@/types';
import type { ColumnDefinition } from '@/types/column.types';
import type { FilterTreeGroup, FilterTreeRule } from '@/types/filter.types';
import { FILTER_OP_IN, FILTER_OP_NOT_IN } from '@constants/filterOperators.const';
import { FILTER_TREE_OP_AND, FILTER_TREE_OP_KEY, FILTER_TREE_RULES_KEY } from '@constants/filterTree.const';
import { EMPTY_STRING } from '@constants/strings.const';
import { defaultFilter } from './filtering.utils';

export function isFilterTreeGroup(node: FilterTreeRule | FilterTreeGroup): node is FilterTreeGroup {
  return FILTER_TREE_RULES_KEY in node && FILTER_TREE_OP_KEY in node;
}

function getFieldValue<T extends RowData>(row: T, field: string, columns: ColumnDefinition<T>[]): unknown {
  const column = columns.find((col) => col.id === field || col.accessor === field);
  if (!column) return (row as Record<string, unknown>)[field];
  const accessor = column.accessor;
  return typeof accessor === 'function' ? accessor(row) : row[accessor as keyof T];
}

function evaluateRule<T extends RowData>(
  row: T,
  rule: FilterTreeRule,
  columns: ColumnDefinition<T>[],
): boolean {
  const value = getFieldValue(row, rule.field, columns);
  if (rule.op === FILTER_OP_IN || rule.op === FILTER_OP_NOT_IN) {
    const list = Array.isArray(rule.value) ? rule.value : [];
    const match = list.some((item) => String(item) === String(value ?? EMPTY_STRING));
    return rule.op === FILTER_OP_IN ? match : !match;
  }
  return defaultFilter(value, rule.value, rule.op);
}

function evaluateNode<T extends RowData>(
  row: T,
  node: FilterTreeRule | FilterTreeGroup,
  columns: ColumnDefinition<T>[],
): boolean {
  if (isFilterTreeGroup(node)) {
    if (node.op === FILTER_TREE_OP_AND) {
      return node.rules.every((child) => evaluateNode(row, child, columns));
    }
    return node.rules.some((child) => evaluateNode(row, child, columns));
  }
  return evaluateRule(row, node, columns);
}

export function evaluateFilterTree<T extends RowData>(
  data: T[],
  where: FilterTreeGroup | null | undefined,
  columns: ColumnDefinition<T>[],
): T[] {
  if (!where || where.rules.length === 0) return data;
  return data.filter((row) => evaluateNode(row, where, columns));
}
