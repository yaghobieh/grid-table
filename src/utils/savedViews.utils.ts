import type { TableViewSnapshot } from '@/types';
import { SAVED_VIEW_DEFAULT_DENSITY } from '@constants/savedViews.const';
import { ONE } from '@constants/numbers.const';
import { EMPTY_STRING } from '@constants/strings.const';
import type { CaptureTableViewSnapshotParams } from './savedViews.utils.types';

export function captureTableViewSnapshot(params: CaptureTableViewSnapshotParams): TableViewSnapshot {
  const hiddenColumnIds = params.columnStates
    .filter((col) => !col.visible)
    .map((col) => col.id);
  const columnWidths = Object.fromEntries(
    params.columnStates.map((col) => [col.id, col.width]),
  );
  return {
    sorting: params.sorting,
    filters: params.filters,
    globalFilter: params.globalFilter,
    hiddenColumnIds,
    columnWidths,
    page: params.page,
    pageSize: params.pageSize,
    density: params.density,
    advancedFilter: params.advancedFilter ?? null,
  };
}

export function loadPersistedViews(persistKey: string): TableViewSnapshot[] | null {
  if (typeof window === 'undefined') return null;
  const raw = window.localStorage.getItem(persistKey);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as TableViewSnapshot[];
  } catch {
    return null;
  }
}

export function persistViews(persistKey: string, snapshots: TableViewSnapshot[]): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(persistKey, JSON.stringify(snapshots));
}

export function createDefaultViewSnapshot(pageSize: number): TableViewSnapshot {
  return {
    sorting: [],
    filters: [],
    globalFilter: EMPTY_STRING,
    hiddenColumnIds: [],
    columnWidths: {},
    page: ONE,
    pageSize,
    density: SAVED_VIEW_DEFAULT_DENSITY,
    advancedFilter: null,
  };
}
