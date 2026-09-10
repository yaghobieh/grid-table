import type { CSSProperties } from 'react';
import type { Theme } from '@/types/common.types';
import type { GridTableColumnThemeMap, GridTablePartTheme, GridTableThemeColors, GridTableThemeTokens } from '@/types/theme.types';
import {
  THEME_MODE_DARK,
  THEME_MODE_LIGHT,
  THEME_PART_COL,
  THEME_PART_COLUMN,
  THEME_PART_HEADER,
  THEME_TOKEN_BG,
  THEME_TOKEN_BORDER,
  THEME_TOKEN_HOVER,
  THEME_TOKEN_TEXT,
  THEME_VAR_ACCENT_PRIMARY,
  THEME_VAR_BG_HOVER,
  THEME_VAR_BG_PRIMARY,
  THEME_VAR_BG_SECONDARY,
  THEME_VAR_BG_TERTIARY,
  THEME_VAR_BORDER,
  THEME_VAR_TEXT_MUTED,
  THEME_VAR_TEXT_PRIMARY,
  THEME_VAR_TEXT_SECONDARY,
  THEME_VAR_THIS_COL_BG,
  THEME_VAR_THIS_COL_BORDER,
  THEME_VAR_THIS_COL_HOVER,
  THEME_VAR_THIS_COL_TEXT,
} from '@constants/theme.const';
import { ONE, ZERO } from '@constants/numbers.const';

type ThemePartName = typeof THEME_PART_HEADER | typeof THEME_PART_COLUMN;

function cssVar(name: string, fallback?: string): string {
  if (!fallback) return `var(${name})`;
  return `var(${name}, ${fallback})`;
}

function partVar(prefix: string, token: string): string {
  return `--gt-${prefix}-${token}`;
}

function applyPartVars(vars: Record<string, string>, prefix: string, part: GridTablePartTheme | undefined): void {
  if (!part) return;
  if (part.background) vars[partVar(prefix, THEME_TOKEN_BG)] = part.background;
  if (part.text) vars[partVar(prefix, THEME_TOKEN_TEXT)] = part.text;
  if (part.border) vars[partVar(prefix, THEME_TOKEN_BORDER)] = part.border;
  if (part.hover) vars[partVar(prefix, THEME_TOKEN_HOVER)] = part.hover;
}

function applyColorVars(vars: Record<string, string>, colors: GridTableThemeColors | undefined): void {
  if (!colors) return;
  if (colors.text?.primary) vars[THEME_VAR_TEXT_PRIMARY] = colors.text.primary;
  if (colors.text?.secondary) vars[THEME_VAR_TEXT_SECONDARY] = colors.text.secondary;
  if (colors.text?.muted) vars[THEME_VAR_TEXT_MUTED] = colors.text.muted;
  if (colors.background?.primary) vars[THEME_VAR_BG_PRIMARY] = colors.background.primary;
  if (colors.background?.secondary) vars[THEME_VAR_BG_SECONDARY] = colors.background.secondary;
  if (colors.background?.tertiary) vars[THEME_VAR_BG_TERTIARY] = colors.background.tertiary;
  if (colors.background?.hover) vars[THEME_VAR_BG_HOVER] = colors.background.hover;
  if (colors.border?.default) vars[THEME_VAR_BORDER] = colors.border.default;
  if (colors.accent?.primary) vars[THEME_VAR_ACCENT_PRIMARY] = colors.accent.primary;
}

function mergeColors(
  base: GridTableThemeColors | undefined,
  next: GridTableThemeColors | undefined,
): GridTableThemeColors | undefined {
  if (!base) return next;
  if (!next) return base;
  return {
    background: { ...base.background, ...next.background },
    text: { ...base.text, ...next.text },
    border: { ...base.border, ...next.border },
    accent: { ...base.accent, ...next.accent },
  };
}

function mergeColMap(
  base: GridTableColumnThemeMap | undefined,
  next: GridTableColumnThemeMap | undefined,
): GridTableColumnThemeMap | undefined {
  if (!base) return next;
  if (!next) return base;
  const merged: GridTableColumnThemeMap = { ...base };
  for (const [key, part] of Object.entries(next)) {
    const index = Number(key);
    merged[index] = { ...merged[index], ...part };
  }
  return merged;
}

export function mergeThemeTokens(...parts: Array<GridTableThemeTokens | undefined>): GridTableThemeTokens {
  return parts.reduce<GridTableThemeTokens>((acc, next) => {
    if (!next) return acc;
    return {
      ...acc,
      ...next,
      colors: mergeColors(acc.colors, next.colors),
      header: { ...acc.header, ...next.header },
      columns: { ...acc.columns, ...next.columns },
      col: mergeColMap(acc.col, next.col),
    };
  }, {});
}

export function themeOverrideToTokens(themeOverride: Record<string, unknown> | undefined): GridTableThemeTokens | undefined {
  if (!themeOverride) return undefined;
  const colors = themeOverride.colors as GridTableThemeColors | undefined;
  if (!colors) return undefined;
  return { colors };
}

export function themeToCssVars(theme: GridTableThemeTokens | undefined): CSSProperties {
  if (!theme) return {};
  const vars: Record<string, string> = {};
  applyColorVars(vars, theme.colors);
  applyPartVars(vars, THEME_PART_HEADER, theme.header);
  applyPartVars(vars, THEME_PART_COLUMN, theme.columns);
  if (theme.col) {
    for (const [key, part] of Object.entries(theme.col)) {
      applyPartVars(vars, `${THEME_PART_COL}-${key}`, part);
    }
  }
  return vars as CSSProperties;
}

export function resolveColumnNumber(colIndex: number | undefined): number | undefined {
  if (colIndex == null || colIndex < ZERO) return undefined;
  return colIndex + ONE;
}

export function buildColumnThemeVars(colNumber: number | undefined, part: ThemePartName): CSSProperties {
  if (colNumber == null) return {};
  const colPrefix = `${THEME_PART_COL}-${colNumber}`;
  return {
    [THEME_VAR_THIS_COL_BG]: cssVar(partVar(colPrefix, THEME_TOKEN_BG), cssVar(partVar(part, THEME_TOKEN_BG))),
    [THEME_VAR_THIS_COL_TEXT]: cssVar(partVar(colPrefix, THEME_TOKEN_TEXT), cssVar(partVar(part, THEME_TOKEN_TEXT))),
    [THEME_VAR_THIS_COL_BORDER]: cssVar(partVar(colPrefix, THEME_TOKEN_BORDER), cssVar(partVar(part, THEME_TOKEN_BORDER))),
    [THEME_VAR_THIS_COL_HOVER]: cssVar(partVar(colPrefix, THEME_TOKEN_HOVER), cssVar(partVar(part, THEME_TOKEN_HOVER))),
  } as CSSProperties;
}

export function hasThemeCssVars(vars: CSSProperties | undefined): boolean {
  return Boolean(vars && Object.keys(vars).length > ZERO);
}

export function toTableTheme(theme: GridTableThemeTokens | Partial<Theme> | undefined): Partial<Theme> | undefined {
  if (!theme) return undefined;
  const mode = theme.mode === THEME_MODE_LIGHT || theme.mode === THEME_MODE_DARK ? theme.mode : undefined;
  const colors = theme.colors as Theme['colors'] | undefined;
  if (!mode && !colors) return undefined;
  return {
    ...(mode ? { mode } : {}),
    ...(colors ? { colors } : {}),
  };
}
