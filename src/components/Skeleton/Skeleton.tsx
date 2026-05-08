import type { ReactNode } from 'react';
import type { SkeletonProps } from './Skeleton.types';
import { SKELETON_ROWS, DEFAULT_COLUMN_WIDTH } from '@/constants';
import { SkeletonRow } from './SkeletonRow';

export function Skeleton({
  rows = SKELETON_ROWS,
  columns = 4,
  columnWidths,
  rowHeight = 16,
  className = '',
  style,
  showHeader = true,
  animate = true,
}: SkeletonProps): ReactNode {
  return (
    <div className={`grid-skeleton ${className}`} style={style} role="status" aria-label="Loading">
      {showHeader && (
        <div className="grid-skeleton-header">
          {Array.from({ length: columns }).map((_, index) => (
            <div
              key={index}
              className="px-4 py-3 flex-shrink-0"
              style={{ width: columnWidths?.[index] ?? DEFAULT_COLUMN_WIDTH }}
            >
              <div
                className={`rounded ${animate ? 'animate-pulse' : ''}`}
                style={{ height: '12px', width: '60%' }}
              />
            </div>
          ))}
        </div>
      )}
      <div className="grid-skeleton-body">
        {Array.from({ length: rows }).map((_, index) => (
          <SkeletonRow
            key={index}
            columns={columns}
            columnWidths={columnWidths}
            height={rowHeight}
            animate={animate}
          />
        ))}
      </div>
    </div>
  );
}

