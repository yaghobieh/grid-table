import type { ReactNode, CSSProperties } from 'react';

export type ThemeMode = 'light' | 'dark';

export type Breakpoint = 'mobile' | 'tablet' | 'desktop';

export type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>>;

export type SortDirection = 'asc' | 'desc' | null;

export type FilterOperator =
  | 'equals'
  | 'notEquals'
  | 'contains'
  | 'notContains'
  | 'startsWith'
  | 'endsWith'
  | 'greaterThan'
  | 'lessThan'
  | 'greaterThanOrEqual'
  | 'lessThanOrEqual'
  | 'between'
  | 'isEmpty'
  | 'isNotEmpty';

export type Alignment = 'left' | 'center' | 'right';

export interface Dimensions {
  width?: ResponsiveValue<number | string>;
  height?: ResponsiveValue<number | string>;
  minWidth?: ResponsiveValue<number | string>;
  maxWidth?: ResponsiveValue<number | string>;
  minHeight?: ResponsiveValue<number | string>;
  maxHeight?: ResponsiveValue<number | string>;
}

export interface ThemeColors {
  background: {
    primary: string;
    secondary: string;
    tertiary: string;
    hover: string;
  };
  text: {
    primary: string;
    secondary: string;
    muted: string;
  };
  border: {
    default: string;
    hover: string;
  };
  accent: {
    primary: string;
    success: string;
    warning: string;
    error: string;
  };
}

export interface Theme {
  mode: ThemeMode;
  colors: ThemeColors;
}

export interface Translations {
  empty: string;
  loading: string;
  search: string;
  filter: string;
  sort: string;
  sortAsc: string;
  sortDesc: string;
  clearSort: string;
  clearFilter: string;
  clearAll: string;
  apply: string;
  cancel: string;
  columns: string;
  showColumns: string;
  hideColumn: string;
  resetColumns: string;
  rowsPerPage: string;
  of: string;
  page: string;
  first: string;
  previous: string;
  next: string;
  last: string;
  selected: string;
  dragToReorder: string;
  noResults: string;
  errorLoading: string;
  retry: string;
}

export interface ClassNames {
  root?: string;
  header?: string;
  headerCell?: string;
  body?: string;
  row?: string;
  cell?: string;
  footer?: string;
  pagination?: string;
  filter?: string;
  empty?: string;
  skeleton?: string;
  drawer?: string;
}

export interface Styles {
  root?: CSSProperties;
  header?: CSSProperties;
  headerCell?: CSSProperties;
  body?: CSSProperties;
  row?: CSSProperties;
  cell?: CSSProperties;
  footer?: CSSProperties;
  pagination?: CSSProperties;
  filter?: CSSProperties;
  empty?: CSSProperties;
  skeleton?: CSSProperties;
  drawer?: CSSProperties;
}

export type RenderFunction<T = unknown> = (value: T, row: Record<string, unknown>, rowIndex: number) => ReactNode;

