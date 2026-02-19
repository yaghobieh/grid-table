import type { BearThemeOverride, CustomVariantsMap } from '@forgedevstack/bear';

/**
 * Grid Table portal — green primary color palette (no pink/indigo)
 */
export const GRID_COLORS = {
  primary: {
    50:  '#e8faf0',
    100: '#c6f3d7',
    200: '#8ae6af',
    300: '#4dd988',
    400: '#22c55e',
    500: '#16a34a',
    600: '#15803d',
    700: '#166534',
    800: '#14532d',
    900: '#0a3620',
    950: '#052e16',
  },
  secondary: {
    50:  '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
    950: '#022c22',
  },
} as const;

export const gridTheme: BearThemeOverride = {
  colors: {
    primary: GRID_COLORS.primary,
    secondary: GRID_COLORS.secondary,
    background: {
      primary: '#0a0a14',
      secondary: '#111122',
      tertiary: '#1a1a2e',
    },
    text: {
      primary: '#f8fafc',
      secondary: '#94a3b8',
      muted: '#64748b',
      inverted: '#0f172a',
    },
    border: {
      default: 'rgba(255, 255, 255, 0.06)',
      subtle: 'rgba(255, 255, 255, 0.03)',
      strong: 'rgba(255, 255, 255, 0.12)',
    },
  },
  typography: {
    fontFamily: {
      sans: "'Plus Jakarta Sans', system-ui, sans-serif",
      mono: "'JetBrains Mono', monospace",
    },
  },
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.25rem',
  },
};

export const gridVariants: CustomVariantsMap = {
  grid: {
    bg: '#16a34a',
    bgHover: '#15803d',
    text: '#ffffff',
    ring: '#22c55e',
  },
  gridGhost: {
    bg: 'rgba(22, 163, 74, 0.1)',
    bgHover: 'rgba(22, 163, 74, 0.2)',
    text: '#22c55e',
    border: 'rgba(22, 163, 74, 0.3)',
  },
  gridSubtle: {
    bg: 'rgba(34, 197, 94, 0.08)',
    bgHover: 'rgba(34, 197, 94, 0.15)',
    text: '#4ade80',
    border: 'rgba(34, 197, 94, 0.2)',
  },
};
