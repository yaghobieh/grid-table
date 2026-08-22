import type { SortDirection } from '@/types';

export const SORT_DIRECTION_ASC = 'asc';
export const SORT_DIRECTION_DESC = 'desc';
export const ARIA_SORT_ASCENDING = 'ascending';
export const ARIA_SORT_DESCENDING = 'descending';
export const ARIA_SORT_NONE = 'none';
export const HEADER_CELL_ALIGN_LEFT = 'left';
export const HEADER_CELL_WIDTH_AUTO = 'auto';
export const HEADER_CELL_MIN_WIDTH_MAX_CONTENT = 'max-content';
export const HEADER_CELL_MAX_WIDTH_NONE = 'none';
export const HEADER_CELL_POSITION_STICKY = 'sticky';
export const HEADER_CELL_ORIENTATION_VERTICAL = 'vertical';

export const HEADER_CELL_CLASS = 'grid-header-cell';
export const HEADER_CELL_CONTENT_CLASS = 'grid-header-content';
export const HEADER_CELL_SORT_CLASS = 'grid-header-sort';
export const HEADER_CELL_FILTER_CLASS = 'grid-header-filter';
export const HEADER_CELL_PIN_CLASS = 'grid-header-pin';
export const HEADER_CELL_RESIZE_CLASS = 'grid-header-resize';
export const HEADER_CELL_SORTED_CLASS = 'gt-sorted';
export const HEADER_CELL_CURSOR_POINTER_CLASS = 'cursor-pointer';
export const HEADER_CELL_DRAGGING_CLASS = 'opacity-50';
export const HEADER_CELL_DRAG_OVER_CLASS = 'bg-accent-primary/10';
export const HEADER_CELL_SORT_INDEX_CLASS = 'text-xs text-theme-muted';
export const HEADER_CELL_ICON_ACTIVE_CLASS = 'text-accent-primary';
export const HEADER_CELL_ICON_MUTED_CLASS = 'text-theme-muted';
export const HEADER_CELL_STICKY_BACKGROUND = 'var(--gt-bg-secondary, #2b2b2b)';

export const ARIA_SORT_BY_DIRECTION: Record<Exclude<SortDirection, null>, 'ascending' | 'descending'> = {
  [SORT_DIRECTION_ASC]: ARIA_SORT_ASCENDING,
  [SORT_DIRECTION_DESC]: ARIA_SORT_DESCENDING,
};
