import type { ReactNode } from 'react';
import { EMPTY_STRING } from '@constants/strings.const';
import { DEFAULT_COLUMN_WIDTH, MAX_COLUMN_WIDTH, MIN_COLUMN_WIDTH } from '@constants/numbers.const';
import type { RowData } from '@/types';
import type { FloatingFilterRowProps } from './FloatingFilterRow.types';
import {
  FLOATING_FILTER_CELL_CLASS,
  FLOATING_FILTER_INPUT_CLASS,
  FLOATING_FILTER_PLACEHOLDER,
  FLOATING_FILTER_ROW_CLASS,
  FLOATING_FILTER_SPACER_CLASS,
} from './FloatingFilterRow.const';

export function FloatingFilterRow<T extends RowData>(props: FloatingFilterRowProps<T>): ReactNode {
  const {
    columns,
    columnStates,
    filters,
    enableSelection = false,
    enableExpansion = false,
    onFilterChange,
    onFilterClear,
  } = props;

  const visibleColumns = columns.filter((column) => {
    const state = columnStates.find((item) => item.id === column.id);
    return state?.visible !== false;
  });

  return (
    <div className={FLOATING_FILTER_ROW_CLASS} role="row">
      {enableSelection && <div className={FLOATING_FILTER_SPACER_CLASS} aria-hidden />}
      {enableExpansion && <div className={FLOATING_FILTER_SPACER_CLASS} aria-hidden />}
      {visibleColumns.map((column) => {
        const state = columnStates.find((item) => item.id === column.id);
        const current = filters.find((filter) => filter.columnId === column.id);
        const value = current?.value == null ? EMPTY_STRING : String(current.value);
        const width = typeof state?.width === 'number' ? state.width : DEFAULT_COLUMN_WIDTH;
        const filterable = column.filterable !== false;
        return (
          <div
            key={column.id}
            className={FLOATING_FILTER_CELL_CLASS}
            style={{
              width,
              minWidth: column.minWidth ?? MIN_COLUMN_WIDTH,
              maxWidth: column.maxWidth ?? MAX_COLUMN_WIDTH,
            }}
          >
            {filterable ? (
              <input
                className={FLOATING_FILTER_INPUT_CLASS}
                value={value}
                placeholder={FLOATING_FILTER_PLACEHOLDER}
                aria-label={typeof column.header === 'string' ? column.header : column.id}
                onChange={(event) => {
                  const next = event.target.value;
                  if (next === EMPTY_STRING) {
                    onFilterClear(column.id);
                    return;
                  }
                  onFilterChange(column.id, next);
                }}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
