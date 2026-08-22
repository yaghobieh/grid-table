import type { ReactNode } from 'react';
import { Skeleton as BearSkeleton } from '@forgedevstack/bear';
import type { SkeletonProps } from './Skeleton.types';
import { DEFAULT_COLUMN_WIDTH, FOUR, SIXTEEN, SKELETON_ROWS, TWELVE } from '@/constants';
import { EMPTY_STRING } from '@constants/strings.const';
import {
  SKELETON_ANIMATION_NONE,
  SKELETON_ANIMATION_PULSE,
  SKELETON_ARIA_LABEL,
  SKELETON_BODY_CLASS,
  SKELETON_CLASS,
  SKELETON_HEADER_CELL_CLASS,
  SKELETON_HEADER_CLASS,
  SKELETON_HEADER_WIDTH,
  SKELETON_ROW_CLASS,
} from './Skeleton.const';

export function Skeleton(props: SkeletonProps): ReactNode {
  const {
    rows = SKELETON_ROWS,
    columns = FOUR,
    columnWidths,
    rowHeight = SIXTEEN,
    className = EMPTY_STRING,
    style,
    showHeader = true,
    animate = true,
  } = props;
  const animation = animate ? SKELETON_ANIMATION_PULSE : SKELETON_ANIMATION_NONE;
  const columnIndexes = Array.from({ length: columns }, (_, index) => index);

  return (
    <div className={`${SKELETON_CLASS} ${className}`} style={style} role="status" aria-label={SKELETON_ARIA_LABEL}>
      {showHeader && (
        <div className={SKELETON_HEADER_CLASS}>
          {columnIndexes.map((index) => (
            <div
              key={index}
              className={SKELETON_HEADER_CELL_CLASS}
              style={{ width: columnWidths?.[index] ?? DEFAULT_COLUMN_WIDTH }}
            >
              <BearSkeleton
                variant="text"
                animation={animation}
                width={SKELETON_HEADER_WIDTH}
                height={TWELVE}
              />
            </div>
          ))}
        </div>
      )}
      <div className={SKELETON_BODY_CLASS}>
        {Array.from({ length: rows }, (_, rowIndex) => rowIndex).map((rowIndex) => (
          <div key={rowIndex} className={SKELETON_ROW_CLASS}>
            {columnIndexes.map((columnIndex) => (
              <BearSkeleton
                key={columnIndex}
                variant="rounded"
                animation={animation}
                width={columnWidths?.[columnIndex] ?? DEFAULT_COLUMN_WIDTH}
                height={rowHeight}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
