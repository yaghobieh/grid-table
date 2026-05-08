import type { ReactNode } from 'react';
import type { SkeletonCellProps } from './Skeleton.types';
import { DEFAULT_COLUMN_WIDTH } from '@/constants';

export function SkeletonCell({ width = DEFAULT_COLUMN_WIDTH, height = 16, animate = true }: SkeletonCellProps): ReactNode {
  const widthStyle = typeof width === 'number' ? `${width}px` : width;

  return (
    <div className="grid-skeleton-cell px-4 py-3 flex-shrink-0" style={{ width: widthStyle }}>
      <div className={`rounded ${animate ? 'animate-pulse' : ''}`} style={{ height: `${height}px`, width: '80%' }} />
    </div>
  );
}
