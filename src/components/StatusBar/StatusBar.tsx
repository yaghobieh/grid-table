import type { ReactNode } from 'react';
import { Flex } from '@forgedevstack/bear';
import type { RowData } from '@/types';
import { EMPTY_STRING, ONE, SIX, TWELVE, ZERO } from '@/constants';
import { computeAggregation } from '@/utils/export.utils';
import type { StatusBarProps } from './StatusBar.types';

export function StatusBar<T extends RowData>(props: StatusBarProps<T>): ReactNode {
  const {
    config,
    data,
    totalCount,
    filteredCount,
    selectedCount,
    columns,
    className = EMPTY_STRING,
    labels,
  } = props;
  if (!config.enabled) return null;

  const aggregations = config.aggregations?.map(agg => {
    const col = columns.find(c => c.id === agg.columnId);
    if (!col) return null;
    const value = computeAggregation(data, col, agg.type);
    const formatted = agg.format ? agg.format(value) : value.toLocaleString();
    const label = agg.label || `${agg.type.toUpperCase()} ${typeof col.header === 'string' ? col.header : col.id}`;
    return { label, formatted };
  }).filter(Boolean);

  const rowsLabel = labels?.rows ?? 'Rows';
  const filteredLabel = labels?.filtered ?? 'Filtered';
  const selectedLabel = labels?.selected ?? 'Selected';

  return (
    <Flex
      className={`gt-status-bar ${className}`}
      align="center"
      gap={ONE}
      style={{ padding: `${SIX}px ${TWELVE}px` }}
    >
      {config.showRowCount !== false && (
        <span className="gt-sb-item">
          <strong>{rowsLabel}:</strong> {totalCount}
        </span>
      )}

      {config.showFilteredCount !== false && filteredCount !== totalCount && (
        <span className="gt-sb-item">
          <strong>{filteredLabel}:</strong> {filteredCount}
        </span>
      )}

      {config.showSelectedCount !== false && selectedCount > ZERO && (
        <span className="gt-sb-item">
          <strong>{selectedLabel}:</strong> {selectedCount}
        </span>
      )}

      {aggregations?.map((agg, i) => (
        <span key={i} className="gt-sb-item gt-sb-agg">
          <strong>{agg!.label}:</strong> {agg!.formatted}
        </span>
      ))}

      {config.customContent}
    </Flex>
  );
}
