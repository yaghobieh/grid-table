import { EMPTY_STRING } from '@/constants';

export const GRID_CELL_ALIGN_CLASSES = {
  left: 'text-left justify-start',
  center: 'text-center justify-center',
  right: 'text-right justify-end',
} as const;

export const GRID_CELL_EMPTY_VALUE = '-';
export const GRID_CELL_BOOLEAN_YES = 'Yes';
export const GRID_CELL_BOOLEAN_NO = 'No';
export const GRID_CELL_STICKY_BACKGROUND = 'var(--gt-bg-primary, #1e1e1e)';
export const GRID_CELL_COLLAPSE_ARIA = 'Collapse';
export const GRID_CELL_EXPAND_ARIA = 'Expand';
export const GRID_CELL_SUBCELL_TRIGGER_DOUBLE_CLICK = 'doubleClick';
export const GRID_CELL_SUBCELL_TRIGGER_BOTH = 'both';
export const GRID_CELL_TRUNCATE_CLASS = 'grid-cell-value--truncate';
export const GRID_CELL_TOOLTIP_DELAY = 200;
export const GRID_CELL_EMPTY_STRING = EMPTY_STRING;
