import { useCallback, useMemo, useState } from 'react';
import { useTableContext } from '@/context';
import type { SavedViewDefinition } from '@/types';
import { SAVED_VIEW_DEFAULT_ID, SAVED_VIEW_DEFAULT_LABEL } from '@constants/savedViews.const';
import { captureTableViewSnapshot, createDefaultViewSnapshot } from '@/utils/savedViews.utils';
import type { UseSavedViewsConfig, UseSavedViewsReturn } from './useSavedViews.types';

export function useSavedViews(config?: UseSavedViewsConfig): UseSavedViewsReturn {
  const { state, actions } = useTableContext();
  const [views, setViews] = useState<SavedViewDefinition[]>(config?.views ?? []);
  const [activeViewId, setActiveViewIdState] = useState<string | null>(config?.activeViewId ?? null);

  const applySnapshot = useCallback(
    (snapshot: Parameters<UseSavedViewsReturn['applySnapshot']>[0]) => {
      actions.clearSorting();
      snapshot.sorting.forEach((sort) => {
        if (sort.direction) actions.setSorting(sort.columnId, sort.direction);
      });

      actions.clearFilters();
      snapshot.filters.forEach((filter) => {
        actions.setFilter(filter.columnId, filter.value, filter.operator);
      });
      actions.setGlobalFilter(snapshot.globalFilter);

      const nextStates = state.columnStates.map((col) => ({
        ...col,
        visible: !snapshot.hiddenColumnIds.includes(col.id),
        width: snapshot.columnWidths[col.id] ?? col.width,
      }));
      actions.setColumnStates(nextStates);

      actions.setPage(snapshot.page);
      actions.setPageSize(snapshot.pageSize);
    },
    [actions, state.columnStates],
  );

  const captureCurrentSnapshot = useCallback(() => {
    return captureTableViewSnapshot({
      sorting: state.sorting,
      filters: state.filters,
      globalFilter: state.globalFilter,
      columnStates: state.columnStates,
      page: state.page,
      pageSize: state.pageSize,
      advancedFilter: config?.views.find((view) => view.id === activeViewId)?.snapshot.advancedFilter ?? null,
    });
  }, [state, config?.views, activeViewId]);

  const setActiveViewId = useCallback(
    (viewId: string) => {
      setActiveViewIdState(viewId);
      const view = views.find((item) => item.id === viewId);
      if (!view) return;
      applySnapshot(view.snapshot);
      config?.onViewChange?.(viewId, view.snapshot);
    },
    [views, applySnapshot, config],
  );

  const saveCurrentAsView = useCallback(
    (id: string, label: string) => {
      const snapshot = captureCurrentSnapshot();
      setViews((prev) => {
        const existing = prev.find((view) => view.id === id);
        if (existing) {
          return prev.map((view) => (view.id === id ? { ...view, label, snapshot } : view));
        }
        return [...prev, { id, label, snapshot }];
      });
      setActiveViewIdState(id);
    },
    [captureCurrentSnapshot],
  );

  return useMemo(
    () => ({
      views,
      activeViewId,
      setActiveViewId,
      applySnapshot,
      captureCurrentSnapshot,
      saveCurrentAsView,
    }),
    [views, activeViewId, setActiveViewId, applySnapshot, captureCurrentSnapshot, saveCurrentAsView],
  );
}

export function createInitialViews(pageSize: number): SavedViewDefinition[] {
  return [
    {
      id: SAVED_VIEW_DEFAULT_ID,
      label: SAVED_VIEW_DEFAULT_LABEL,
      snapshot: createDefaultViewSnapshot(pageSize),
    },
  ];
}
