import type { ReactNode } from 'react';
import type { GridTableThemeTokens } from '@/types/theme.types';

export interface GridTableThemeProps {
  theme?: GridTableThemeTokens;
  children: ReactNode;
}
