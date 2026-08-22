import type { ReactNode } from 'react';
import { useMemo } from 'react';
import clsx from 'clsx';
import type { RowData } from '@/types';
import { buildColumnGroupHeaderCells } from '@/utils/columnGroups.utils';
import { ZERO } from '@constants/numbers.const';
import { EMPTY_STRING } from '@constants/strings.const';
import type { ColumnGroupHeaderProps } from './ColumnGroupHeader.types';
import {
  COLUMN_GROUP_EXPANSION_SPACER_CLASS,
  COLUMN_GROUP_HEADER_CLASS,
  COLUMN_GROUP_SELECTION_SPACER_CLASS,
} from './ColumnGroupHeader.const';
import { buildColumnGroupHeaderViews } from './ColumnGroupHeader.utils';
import { ColumnGroupHeaderCellView } from './helpers';

export function ColumnGroupHeader<T extends RowData = RowData>(props: ColumnGroupHeaderProps<T>): ReactNode {
  const {
    columnGroups,
    visibleColumns,
    columnStates,
    enableSelection = false,
    enableExpansion = false,
    className = EMPTY_STRING,
  } = props;

  const cells = useMemo(
    () => buildColumnGroupHeaderCells(visibleColumns, columnGroups),
    [visibleColumns, columnGroups],
  );
  const views = useMemo(
    () => buildColumnGroupHeaderViews(cells, visibleColumns, columnStates),
    [cells, visibleColumns, columnStates],
  );

  if (cells.length === ZERO) return null;

  return (
    <div className={clsx(COLUMN_GROUP_HEADER_CLASS, className)} role="row">
      {enableSelection && <div className={COLUMN_GROUP_SELECTION_SPACER_CLASS} />}
      {enableExpansion && <div className={COLUMN_GROUP_EXPANSION_SPACER_CLASS} />}
      {views.map((view) => (
        <ColumnGroupHeaderCellView key={view.cell.id} cell={view.cell} totalWidth={view.totalWidth} />
      ))}
    </div>
  );
}
