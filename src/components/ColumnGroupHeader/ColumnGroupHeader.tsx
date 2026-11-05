import type { ReactNode } from 'react';
import { useMemo } from 'react';
import clsx from 'clsx';
import type { RowData } from '@/types';
import { buildColumnGroupHeaderRows } from '@/utils/columnGroups.utils';
import { COLUMN_PAD_CLASS } from '@/utils/columnWindow.utils';
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
    padLeft = ZERO,
    padRight = ZERO,
  } = props;

  const rows = useMemo(
    () => buildColumnGroupHeaderRows(visibleColumns, columnGroups),
    [visibleColumns, columnGroups],
  );

  if (rows.length === ZERO) return null;

  return (
    <div className={className}>
      {rows.map((cells) => {
        const views = buildColumnGroupHeaderViews(cells, visibleColumns, columnStates);
        return (
          <div key={cells[ZERO]?.id ?? COLUMN_GROUP_HEADER_CLASS} className={clsx(COLUMN_GROUP_HEADER_CLASS)} role="row">
            {enableSelection && <div className={COLUMN_GROUP_SELECTION_SPACER_CLASS} />}
            {enableExpansion && <div className={COLUMN_GROUP_EXPANSION_SPACER_CLASS} />}
            {padLeft > ZERO && <div className={COLUMN_PAD_CLASS} style={{ width: padLeft }} aria-hidden />}
            {views.map((view) => (
              <ColumnGroupHeaderCellView key={view.cell.id} cell={view.cell} totalWidth={view.totalWidth} />
            ))}
            {padRight > ZERO && <div className={COLUMN_PAD_CLASS} style={{ width: padRight }} aria-hidden />}
          </div>
        );
      })}
    </div>
  );
}
