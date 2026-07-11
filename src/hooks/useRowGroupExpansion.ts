import { useCallback, useMemo, useState } from 'react';
import type { RowGroupConfig } from '@/types/features.types';

export interface UseRowGroupExpansionReturn {
  collapsedKeys: Set<string>;
  isExpanded: (groupKey: string) => boolean;
  toggleGroup: (groupKey: string) => void;
  expandAll: (groupKeys: string[]) => void;
  collapseAll: (groupKeys: string[]) => void;
}

export function useRowGroupExpansion(
  rowGroups: RowGroupConfig[] | undefined,
): UseRowGroupExpansionReturn {
  const defaultExpanded = rowGroups?.[0]?.defaultExpanded ?? true;
  const [collapsedKeys, setCollapsedKeys] = useState<Set<string>>(new Set());

  const isExpanded = useCallback(
    (groupKey: string) => {
      if (defaultExpanded) return !collapsedKeys.has(groupKey);
      return collapsedKeys.has(groupKey);
    },
    [collapsedKeys, defaultExpanded],
  );

  const toggleGroup = useCallback((groupKey: string) => {
    setCollapsedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(groupKey)) {
        next.delete(groupKey);
      } else {
        next.add(groupKey);
      }
      return next;
    });
  }, []);

  const expandAll = useCallback((groupKeys: string[]) => {
    setCollapsedKeys((prev) => {
      const next = new Set(prev);
      for (const key of groupKeys) {
        if (defaultExpanded) {
          next.delete(key);
        } else {
          next.add(key);
        }
      }
      return next;
    });
  }, [defaultExpanded]);

  const collapseAll = useCallback((groupKeys: string[]) => {
    setCollapsedKeys((prev) => {
      const next = new Set(prev);
      for (const key of groupKeys) {
        if (defaultExpanded) {
          next.add(key);
        } else {
          next.delete(key);
        }
      }
      return next;
    });
  }, [defaultExpanded]);

  return useMemo(
    () => ({ collapsedKeys, isExpanded, toggleGroup, expandAll, collapseAll }),
    [collapsedKeys, isExpanded, toggleGroup, expandAll, collapseAll],
  );
}
