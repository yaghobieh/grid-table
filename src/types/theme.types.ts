import type { TableDensity } from './features.types';
import type { ThemeColors, ThemeMode } from './common.types';

export interface GridTablePartTheme {
  background?: string;
  text?: string;
  border?: string;
  hover?: string;
}

export type GridTableColumnThemeMap = Record<number, GridTablePartTheme>;

export type GridTableThemeColors = {
  background?: Partial<ThemeColors['background']>;
  text?: Partial<ThemeColors['text']>;
  border?: Partial<ThemeColors['border']>;
  accent?: Partial<ThemeColors['accent']>;
};

export type GridTableThemeMode = ThemeMode | 'system';

export interface GridTableThemeTokens {
  mode?: GridTableThemeMode;
  colors?: GridTableThemeColors;
  header?: GridTablePartTheme;
  columns?: GridTablePartTheme;
  col?: GridTableColumnThemeMap;
  density?: TableDensity;
}
