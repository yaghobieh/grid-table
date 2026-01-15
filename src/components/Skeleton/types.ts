import type { CSSProperties } from 'react';

export interface SkeletonProps {
  rows?: number;
  columns?: number;
  columnWidths?: (number | string)[];
  rowHeight?: number;
  className?: string;
  style?: CSSProperties;
  showHeader?: boolean;
  animate?: boolean;
}

export interface SkeletonRowProps {
  columns: number;
  columnWidths?: (number | string)[];
  height?: number;
  animate?: boolean;
}

export interface SkeletonCellProps {
  width?: number | string;
  height?: number;
  animate?: boolean;
}

