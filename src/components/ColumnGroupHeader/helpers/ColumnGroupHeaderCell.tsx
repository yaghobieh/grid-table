import type { ReactNode } from 'react';
import { MIN_COLUMN_WIDTH, TWO, ZERO } from '@constants/numbers.const';
import type { ColumnGroupHeaderCellProps } from '../ColumnGroupHeader.types';
import { COLUMN_GROUP_HEADER_CELL_CLASS } from '../ColumnGroupHeader.const';
import { resolveGroupCellMaxWidth } from '../ColumnGroupHeader.utils';

export function ColumnGroupHeaderCellView(props: ColumnGroupHeaderCellProps): ReactNode {
  const { cell, totalWidth } = props;

  return (
    <div
      className={COLUMN_GROUP_HEADER_CELL_CLASS}
      role="columnheader"
      style={{
        width: totalWidth,
        minWidth: MIN_COLUMN_WIDTH,
        maxWidth: resolveGroupCellMaxWidth(cell.colspan),
        flexShrink: ZERO,
        zIndex: TWO,
      }}
    >
      {cell.label}
    </div>
  );
}
