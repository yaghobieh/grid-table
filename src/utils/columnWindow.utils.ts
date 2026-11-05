import type { ColumnDefinition, ColumnState, RowData } from '@/types';
import { DEFAULT_COLUMN_WIDTH, ONE, TWO, ZERO } from '@constants/numbers.const';

export const COLUMN_STICKY_LEFT = 'left';
export const COLUMN_STICKY_RIGHT = 'right';
export const COLUMN_PAD_CLASS = 'gt-column-pad';

export interface ColumnWindowResult<T extends RowData> {
  columns: ColumnDefinition<T>[];
  padLeft: number;
  padRight: number;
  indexById: Map<string, number>;
}

function columnWidth<T extends RowData>(column: ColumnDefinition<T>, states: ColumnState[]): number {
  const state = states.find((item) => item.id === column.id);
  return typeof state?.width === 'number' ? state.width : DEFAULT_COLUMN_WIDTH;
}

function stickySide<T extends RowData>(column: ColumnDefinition<T>, states: ColumnState[]): 'left' | 'right' | null {
  const state = states.find((item) => item.id === column.id);
  if (state?.pinned === COLUMN_STICKY_LEFT || state?.pinned === COLUMN_STICKY_RIGHT) return state.pinned;
  if (column.sticky === COLUMN_STICKY_LEFT || column.sticky === COLUMN_STICKY_RIGHT) return column.sticky;
  return null;
}

export function resolveColumnWindow<T extends RowData>(props: {
  columns: ColumnDefinition<T>[];
  states: ColumnState[];
  scrollLeft: number;
  viewportWidth: number;
  threshold: number | undefined;
  overscan: number;
  includeIndex?: number;
}): ColumnWindowResult<T> {
  const { columns, states, scrollLeft, viewportWidth, threshold, overscan, includeIndex } = props;
  const indexById = new Map(columns.map((column, index) => [column.id, index]));
  const full: ColumnWindowResult<T> = { columns, padLeft: ZERO, padRight: ZERO, indexById };
  if (threshold == null || columns.length < threshold || viewportWidth <= ZERO) return full;

  const left = columns.filter((column) => stickySide(column, states) === COLUMN_STICKY_LEFT);
  const right = columns.filter((column) => stickySide(column, states) === COLUMN_STICKY_RIGHT);
  const center = columns.filter((column) => stickySide(column, states) == null);
  const widths = center.map((column) => columnWidth(column, states));
  const overscanPx = overscan * (widths[ZERO] ?? DEFAULT_COLUMN_WIDTH);

  let consumed = ZERO;
  let start = ZERO;
  while (start < center.length && consumed + widths[start] < scrollLeft - overscanPx) {
    consumed += widths[start];
    start += ONE;
  }

  let end = start;
  let visible = ZERO;
  const target = viewportWidth + overscanPx * TWO;
  while (end < center.length && visible < target) {
    visible += widths[end];
    end += ONE;
  }

  if (includeIndex != null) {
    const included = center.findIndex((column) => indexById.get(column.id) === includeIndex);
    if (included >= ZERO) {
      if (included < start) start = included;
      if (included >= end) end = included + ONE;
    }
  }

  let padLeft = ZERO;
  for (let index = ZERO; index < start; index += ONE) padLeft += widths[index];
  let padRight = ZERO;
  for (let index = end; index < center.length; index += ONE) padRight += widths[index];

  return {
    columns: [...left, ...center.slice(start, end), ...right],
    padLeft,
    padRight,
    indexById,
  };
}
