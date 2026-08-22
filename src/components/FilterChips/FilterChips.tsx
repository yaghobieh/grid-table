import type { ReactNode } from 'react';
import { Chip } from '@forgedevstack/bear';
import type { RowData } from '@/types';
import { EMPTY_STRING, VALUE_SEPARATOR } from '@constants/strings.const';
import { ZERO } from '@constants/numbers.const';
import type { FilterChipsProps } from './FilterChips.types';
import { FILTER_CHIPS_CLASS } from './FilterChips.const';
import { formatFilterValue } from './FilterChips.utils';

export function FilterChips<T extends RowData>(props: FilterChipsProps<T>): ReactNode {
  const { filters, columns, onRemove, onClearAll, clearAllLabel, className = EMPTY_STRING } = props;
  if (filters.length === ZERO) return null;

  return (
    <div className={`${FILTER_CHIPS_CLASS} ${className}`}>
      {filters.map((filter) => {
        const column = columns.find((col) => col.id === filter.columnId);
        const header = column && typeof column.header === 'string' ? column.header : filter.columnId;
        return (
          <Chip
            key={filter.columnId}
            size="sm"
            onClick={() => onRemove(filter.columnId)}
            onDelete={() => onRemove(filter.columnId)}
          >
            {header}
            {VALUE_SEPARATOR}
            {formatFilterValue(filter.value)}
          </Chip>
        );
      })}
      <Chip size="sm" variant="outlined" onClick={onClearAll}>
        {clearAllLabel}
      </Chip>
    </div>
  );
}
