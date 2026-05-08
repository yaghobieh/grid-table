import type { ReactNode } from 'react';
import type { SkeletonRowProps } from './Skeleton.types';
import { DEFAULT_COLUMN_WIDTH } from '@/constants';
import { SkeletonCell } from './SkeletonCell';

export function SkeletonRow({ columns, columnWidths, height = 16, animate = true }: SkeletonRowProps): ReactNode {
  return (
    <div className="grid-skeleton-row">
      {Array.from({ length: columns }).map((_, index) => (
        <SkeletonCell
          key={index}
          width={columnWidths?.[index] ?? DEFAULT_COLUMN_WIDTH}
          height={height}
          animate={animate}
        />
      ))}
    </div>
  );
}
