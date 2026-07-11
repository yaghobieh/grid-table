import type { ReactNode } from 'react';
import { useMemo } from 'react';
import clsx from 'clsx';
import type { RowData, ColumnDefinition, ColumnState } from '@/types';
import type { ColumnGroupConfig } from '@/types/features.types';
import { buildColumnGroupHeaderCells } from '@/utils/columnGroups.utils';
import { MIN_COLUMN_WIDTH, MAX_COLUMN_WIDTH, TWO, ZERO } from '@constants/numbers.const';
import { EMPTY_STRING } from '@constants/strings.const';

export interface ColumnGroupHeaderProps<T extends RowData = RowData> {
  columnGroups: ColumnGroupConfig[];
  visibleColumns: ColumnDefinition<T>[];
  columnStates: ColumnState[];
  enableSelection?: boolean;
  enableExpansion?: boolean;
  className?: string;
}

export function ColumnGroupHeader<T extends RowData = RowData>({
  columnGroups,
  visibleColumns,
  columnStates,
  enableSelection = false,
  enableExpansion = false,
  className = EMPTY_STRING,
}: ColumnGroupHeaderProps<T>): ReactNode {
  const cells = useMemo(
    () => buildColumnGroupHeaderCells(visibleColumns, columnGroups),
    [visibleColumns, columnGroups],
  );

  const stateById = useMemo(() => {
    const map = new Map<string, ColumnState>();
    for (const state of columnStates) {
      map.set(state.id, state);
    }
    return map;
  }, [columnStates]);

  if (cells.length === ZERO) return null;

  let columnCursor = ZERO;

  return (
    <div className={clsx('grid-table-column-group-header', className)} role="row">
      {enableSelection && <div className="grid-header-selection-spacer" />}
      {enableExpansion && <div className="grid-header-expansion-spacer" />}
      {cells.map((cell) => {
        const startColumn = visibleColumns[columnCursor];
        const columnState = startColumn ? stateById.get(startColumn.id) : undefined;
        const width = columnState?.width ?? startColumn?.width ?? MIN_COLUMN_WIDTH;
        let totalWidth = ZERO;
        for (let i = ZERO; i < cell.colspan; i += 1) {
          const col = visibleColumns[columnCursor + i];
          const state = col ? stateById.get(col.id) : undefined;
          const colWidth = state?.width ?? col?.width ?? MIN_COLUMN_WIDTH;
          totalWidth += typeof colWidth === 'number' ? colWidth : MIN_COLUMN_WIDTH;
        }
        columnCursor += cell.colspan;

        return (
          <div
            key={cell.id}
            className="grid-table-column-group-header-cell"
            role="columnheader"
            style={{
              width: typeof width === 'number' ? totalWidth : totalWidth,
              minWidth: MIN_COLUMN_WIDTH,
              maxWidth: MAX_COLUMN_WIDTH * cell.colspan,
              flexShrink: ZERO,
              zIndex: TWO,
            }}
          >
            {cell.label}
          </div>
        );
      })}
    </div>
  );
}
