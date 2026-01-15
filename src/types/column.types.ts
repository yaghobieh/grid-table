import type { ReactNode, CSSProperties } from 'react';
import type { Alignment, FilterOperator, ResponsiveValue, RenderFunction, SortDirection } from './common.types';

export interface ColumnDefinition<T = unknown> {
  id: string;
  accessor: string | ((row: T) => unknown);
  header: ReactNode | (() => ReactNode);
  width?: ResponsiveValue<number | string>;
  minWidth?: number;
  maxWidth?: number;
  align?: Alignment;
  sortable?: boolean;
  filterable?: boolean;
  resizable?: boolean;
  draggable?: boolean;
  hidden?: boolean;
  hiddenOnMobile?: boolean;
  showLabelOnMobile?: boolean;
  sticky?: 'left' | 'right';
  className?: string;
  headerClassName?: string;
  cellClassName?: string;
  style?: CSSProperties;
  headerStyle?: CSSProperties;
  cellStyle?: CSSProperties;
  render?: RenderFunction<unknown>;
  filterType?: 'text' | 'number' | 'date' | 'select' | 'boolean' | 'custom';
  filterOptions?: FilterOption[];
  filterOperators?: FilterOperator[];
  defaultFilterOperator?: FilterOperator;
  sortFn?: (a: unknown, b: unknown, direction: SortDirection) => number;
  filterFn?: (value: unknown, filterValue: unknown, operator: FilterOperator) => boolean;
  meta?: Record<string, unknown>;
}

export interface FilterOption {
  value: string | number | boolean;
  label: string;
}

export interface ColumnState {
  id: string;
  visible: boolean;
  width: number;
  order: number;
  pinned: 'left' | 'right' | null;
}

export interface ColumnReorderEvent {
  sourceId: string;
  targetId: string;
  sourceIndex: number;
  targetIndex: number;
}

export interface ColumnResizeEvent {
  columnId: string;
  width: number;
  previousWidth: number;
}

export interface ColumnVisibilityEvent {
  columnId: string;
  visible: boolean;
}

