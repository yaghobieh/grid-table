import type { DrawerContent } from './MobileDrawer.types';
import { EMPTY_STRING } from '@/constants';
import { ZERO } from '@constants/numbers.const';
import { KEY_ESCAPE } from '@constants/keyboard.const';

export const DRAWER_TITLES: Record<DrawerContent, string> = {
  filter: 'Filters',
  sort: 'Sort',
  columns: 'Columns',
};

export const DRAWER_BODY_OVERFLOW_LOCK = 'hidden';
export const DRAWER_BODY_OVERFLOW_DEFAULT = EMPTY_STRING;
export const DRAWER_CLOSE_ARIA = 'Close';
export const DRAWER_FILTERS_ACTIVE_SUFFIX = '(s) active';
export const DRAWER_ZERO = ZERO;
export const DRAWER_ESCAPE_KEY = KEY_ESCAPE;
