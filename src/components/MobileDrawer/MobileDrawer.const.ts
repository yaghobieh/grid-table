import type { DrawerContent } from './MobileDrawer.types';
export const DRAWER_TITLES: Record<DrawerContent, string> = {
  filter: 'Filters',
  sort: 'Sort',
  columns: 'Columns',
};

export const DRAWER_BODY_OVERFLOW_LOCK = 'hidden';
export const DRAWER_CLOSE_ARIA = 'Close';
export const DRAWER_FILTERS_ACTIVE_SUFFIX = '(s) active';
