export const GRID_ROW_BASE_CLASSES = [
  'grid-row',
  'border-b',
  'border-theme-border',
  'transition-colors',
  'duration-150',
] as const;

export const GRID_ROW_MOBILE_CLASSES = ['flex', 'flex-wrap', 'gap-2', 'p-4'] as const;
export const GRID_ROW_DESKTOP_CLASSES = ['flex', 'items-stretch'] as const;
export const GRID_ROW_HOVER_CLASS = 'bg-theme-hover';
export const GRID_ROW_SELECTED_CLASS = 'bg-accent-primary/10';
export const GRID_ROW_DISABLED_CLASSES = ['opacity-50', 'cursor-not-allowed'] as const;
export const GRID_ROW_CLICKABLE_CLASS = 'cursor-pointer';
export const GRID_ROW_DEFAULT_STICKY_WIDTH = 150;
export const GRID_ROW_TREE_TOGGLE_PADDING_X = 4;
export const GRID_ROW_TREE_PLACEHOLDER_OFFSET = 20;
