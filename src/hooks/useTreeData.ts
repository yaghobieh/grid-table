import { useMemo, useCallback, useState } from 'react';
import type { RowData } from '../types';
import type { TreeConfig, FlatTreeRow } from '../types/features.types';
import type { UseTreeDataReturn } from '../types/hooks.types';
import { TREE_DEFAULT_CHILDREN_FIELD, TREE_DEFAULT_ID_FIELD, TREE_DEFAULT_INDENT_PX } from '../constants';

/**
 * Flattens hierarchical rows with expand/collapse and indent for tree columns.
 */
export function useTreeData<T extends RowData>(
  data: T[],
  config?: TreeConfig,
): UseTreeDataReturn<T> {
  const enabled = config?.enabled ?? false;
  const childrenField = config?.childrenField ?? TREE_DEFAULT_CHILDREN_FIELD;
  const idField = config?.idField ?? TREE_DEFAULT_ID_FIELD;
  const indentSize = config?.indentSize ?? TREE_DEFAULT_INDENT_PX;

  const [expandedIds, setExpandedIds] = useState<Set<string | number>>(() => {
    if (!config?.expandAll) return new Set();
    const ids = new Set<string | number>();
    const collectIds = (items: T[]) => {
      items.forEach(item => {
        const children = (item as Record<string, unknown>)[childrenField] as T[] | undefined;
        if (children?.length) {
          ids.add((item as Record<string, unknown>)[idField] as string | number);
          collectIds(children);
        }
      });
    };
    collectIds(data);
    return ids;
  });

  const flatRows = useMemo<FlatTreeRow<T>[]>(() => {
    if (!enabled) return data.map(d => ({ data: d, depth: 0, hasChildren: false, isExpanded: false, parentId: null }));

    const result: FlatTreeRow<T>[] = [];

    const flatten = (items: T[], depth: number, parentId: string | number | null) => {
      items.forEach(item => {
        const id = (item as Record<string, unknown>)[idField] as string | number;
        const children = (item as Record<string, unknown>)[childrenField] as T[] | undefined;
        const hasChildren = !!children?.length;
        const isExpanded = expandedIds.has(id);

        result.push({ data: item, depth, hasChildren, isExpanded, parentId });

        if (hasChildren && isExpanded) {
          flatten(children!, depth + 1, id);
        }
      });
    };

    flatten(data, 0, null);
    return result;
  }, [enabled, data, childrenField, idField, expandedIds]);

  const toggleExpand = useCallback((id: string | number) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const expandAll = useCallback(() => {
    const ids = new Set<string | number>();
    const collect = (items: T[]) => {
      items.forEach(item => {
        const children = (item as Record<string, unknown>)[childrenField] as T[] | undefined;
        if (children?.length) {
          ids.add((item as Record<string, unknown>)[idField] as string | number);
          collect(children);
        }
      });
    };
    collect(data);
    setExpandedIds(ids);
  }, [data, childrenField, idField]);

  const collapseAll = useCallback(() => setExpandedIds(new Set()), []);

  const isExpanded = useCallback((id: string | number) => expandedIds.has(id), [expandedIds]);

  const getIndent = useCallback((depth: number) => depth * indentSize, [indentSize]);

  return { flatRows, toggleExpand, expandAll, collapseAll, isExpanded, getIndent };
}
