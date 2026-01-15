import { useMemo } from 'react';
import { useTableContext } from '../context';
import type { Breakpoint, ResponsiveValue } from '../types';
import { BREAKPOINTS } from '../constants';

export interface UseBreakpointReturn {
  currentBreakpoint: Breakpoint;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isMobileOrTablet: boolean;
  isTabletOrDesktop: boolean;
  breakpointValue: <T>(value: ResponsiveValue<T>, fallback: T) => T;
  shouldShowMobileView: boolean;
}

export function useBreakpoint(): UseBreakpointReturn {
  const { state, computed } = useTableContext();

  const breakpointValue = useMemo(
    () =>
      <T>(value: ResponsiveValue<T>, fallback: T): T => {
        if (value === null || value === undefined) return fallback;

        if (typeof value !== 'object' || !('mobile' in value || 'tablet' in value || 'desktop' in value)) {
          return value as T;
        }

        const responsiveValue = value as Partial<Record<Breakpoint, T>>;
        const breakpointOrder: Breakpoint[] = ['mobile', 'tablet', 'desktop'];
        const currentIndex = breakpointOrder.indexOf(state.currentBreakpoint);

        for (let i = currentIndex; i >= 0; i--) {
          const bp = breakpointOrder[i];
          if (responsiveValue[bp] !== undefined) {
            return responsiveValue[bp] as T;
          }
        }

        for (let i = currentIndex + 1; i < breakpointOrder.length; i++) {
          const bp = breakpointOrder[i];
          if (responsiveValue[bp] !== undefined) {
            return responsiveValue[bp] as T;
          }
        }

        return fallback;
      },
    [state.currentBreakpoint]
  );

  const shouldShowMobileView = useMemo(() => {
    const mobileBreakpoints: Breakpoint[] = ['mobile'];
    if (state.mobileBreakpoint === 'tablet') {
      mobileBreakpoints.push('tablet');
    }
    return mobileBreakpoints.includes(state.currentBreakpoint);
  }, [state.currentBreakpoint, state.mobileBreakpoint]);

  return useMemo(
    () => ({
      currentBreakpoint: state.currentBreakpoint,
      isMobile: computed.isMobile,
      isTablet: computed.isTablet,
      isDesktop: computed.isDesktop,
      isMobileOrTablet: computed.isMobile || computed.isTablet,
      isTabletOrDesktop: computed.isTablet || computed.isDesktop,
      breakpointValue,
      shouldShowMobileView,
    }),
    [state.currentBreakpoint, computed, breakpointValue, shouldShowMobileView]
  );
}

export { BREAKPOINTS };

