import { useContext } from 'react';
import type { GridTableThemeTokens } from '@/types/theme.types';
import { GridTableThemeContext } from '../GridTableTheme';

export function useGridTableTheme(): GridTableThemeTokens | undefined {
  return useContext(GridTableThemeContext);
}
