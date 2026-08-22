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
