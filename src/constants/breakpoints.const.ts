import { MOBILE_BREAKPOINT, TABLET_BREAKPOINT, DESKTOP_BREAKPOINT } from './numbers.const';

export const BREAKPOINTS = {
  mobile: MOBILE_BREAKPOINT,
  tablet: TABLET_BREAKPOINT,
  desktop: DESKTOP_BREAKPOINT,
} as const;

export const BREAKPOINT_KEYS = ['mobile', 'tablet', 'desktop'] as const;

export const RESPONSIVE_MODES = {
  stack: 'stack',
  scroll: 'scroll',
  hide: 'hide',
} as const;

export const DEFAULT_MOBILE_BREAKPOINT = 'tablet' as const;

