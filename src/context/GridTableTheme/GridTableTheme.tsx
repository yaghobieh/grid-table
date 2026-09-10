import { createContext } from 'react';
import type { ReactNode } from 'react';
import type { GridTableThemeTokens } from '@/types/theme.types';
import type { GridTableThemeProps } from './GridTableTheme.types';

export const GridTableThemeContext = createContext<GridTableThemeTokens | undefined>(undefined);

export function GridTableTheme(props: GridTableThemeProps): ReactNode {
  return (
    <GridTableThemeContext.Provider value={props.theme}>
      {props.children}
    </GridTableThemeContext.Provider>
  );
}
