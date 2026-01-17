import type { ReactNode } from 'react';
import type { SkeletonProps, SkeletonRowProps, SkeletonCellProps } from './types';
import { SKELETON_ROWS, DEFAULT_COLUMN_WIDTH } from '../../constants';

function SkeletonCell({ width = DEFAULT_COLUMN_WIDTH, height = 16, animate = true }: SkeletonCellProps): ReactNode {
  const widthStyle = typeof width === 'number' ? `${width}px` : width;

  return (
    <div
      className="grid-skeleton-cell px-4 py-3 flex-shrink-0"
      style={{ width: widthStyle }}
    >
      <div
        className={`rounded ${animate ? 'animate-pulse' : ''}`}
        style={{ height: `${height}px`, width: '80%' }}
      />
    </div>
  );
}

function SkeletonRow({ columns, columnWidths, height = 16, animate = true }: SkeletonRowProps): ReactNode {
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

