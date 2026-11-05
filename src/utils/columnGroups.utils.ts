import type { RowData } from '@/types';
import type { ColumnDefinition } from '@/types/column.types';
import type { ColumnGroupConfig } from '@/types/features.types';
import { EMPTY_STRING } from '@constants/strings.const';
import { ONE, ZERO } from '@constants/numbers.const';

export interface ColumnGroupHeaderCell {
  id: string;
  label: string;
  colspan: number;
  columnId?: string;
}

export function buildColumnGroupHeaderCells<T extends RowData>(
  visibleColumns: ColumnDefinition<T>[],
  columnGroups?: ColumnGroupConfig[],
): ColumnGroupHeaderCell[] {
  if (!columnGroups || columnGroups.length === ZERO) return [];

  const groupByColumnId = new Map<string, ColumnGroupConfig>();
  for (const group of columnGroups) {
    for (const columnId of group.columnIds) {
      groupByColumnId.set(columnId, group);
    }
  }

  const cells: ColumnGroupHeaderCell[] = [];
  let index = ZERO;

  while (index < visibleColumns.length) {
    const column = visibleColumns[index];
    const group = groupByColumnId.get(column.id) ?? (typeof column.groupId === 'string' ? columnGroups.find((g) => g.id === column.groupId) : undefined);

    if (!group) {
      cells.push({ id: `ungrouped-${column.id}`, label: EMPTY_STRING, colspan: ONE, columnId: column.id });
      index += ONE;
      continue;
    }

    let colspan = ONE;
    let next = index + ONE;
    while (next < visibleColumns.length) {
      const nextColumn = visibleColumns[next];
      const nextGroup = groupByColumnId.get(nextColumn.id) ?? (typeof nextColumn.groupId === 'string' ? columnGroups.find((g) => g.id === nextColumn.groupId) : undefined);
      if (nextGroup?.id !== group.id) break;
      colspan += ONE;
      next += ONE;
    }

    cells.push({ id: group.id, label: group.label, colspan, columnId: column.id });
    index = next;
  }

  return cells;
}

export function buildColumnGroupHeaderRows<T extends RowData>(
  visibleColumns: ColumnDefinition<T>[],
  columnGroups?: ColumnGroupConfig[],
): ColumnGroupHeaderCell[][] {
  const leaves = buildColumnGroupHeaderCells(visibleColumns, columnGroups);
  if (leaves.length === ZERO) return [];
  const hasParent = columnGroups?.some((group) => Boolean(group.parentId));
  if (!hasParent || !columnGroups) return [leaves];

  const parents: ColumnGroupHeaderCell[] = [];
  let index = ZERO;
  while (index < leaves.length) {
    const leaf = leaves[index];
    const group = columnGroups.find((item) => item.id === leaf.id);
    const parent = group?.parentId
      ? columnGroups.find((item) => item.id === group.parentId)
      : undefined;
    let colspan = leaf.colspan;
    let next = index + ONE;
    while (next < leaves.length) {
      const nextLeaf = leaves[next];
      const nextGroup = columnGroups.find((item) => item.id === nextLeaf.id);
      const nextParent = nextGroup?.parentId
        ? columnGroups.find((item) => item.id === nextGroup.parentId)
        : undefined;
      if ((parent?.id ?? EMPTY_STRING) !== (nextParent?.id ?? EMPTY_STRING)) break;
      colspan += nextLeaf.colspan;
      next += ONE;
    }
    parents.push({
      id: parent?.id ?? `parent-${leaf.id}`,
      label: parent?.label ?? EMPTY_STRING,
      colspan,
      columnId: leaf.columnId,
    });
    index = next;
  }

  return [parents, leaves];
}
