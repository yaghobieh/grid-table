import type { ReactNode } from 'react';
import type { ColumnDefinition } from '../../types/column.types';
import type { RowData } from '../../types/row.types';
import type { StatusBarConfig } from '../../types/features.types';
import { computeAggregation } from '../../utils/export.utils';

export interface StatusBarProps<T extends RowData = RowData> {
  config: StatusBarConfig;
  data: T[];
  totalCount: number;
  filteredCount: number;
  selectedCount: number;
  columns: ColumnDefinition<T>[];
  className?: string;
}

export function StatusBar<T extends RowData>({
  config,
  data,
  totalCount,
  filteredCount,
  selectedCount,
  columns,
  className = '',
}: StatusBarProps<T>): ReactNode {
  if (!config.enabled) return null;

  const aggregations = config.aggregations?.map(agg => {
    const col = columns.find(c => c.id === agg.columnId);
    if (!col) return null;
    const value = computeAggregation(data, col, agg.type);
    const formatted = agg.format ? agg.format(value) : value.toLocaleString();
    const label = agg.label || `${agg.type.toUpperCase()} ${typeof col.header === 'string' ? col.header : col.id}`;
    return { label, formatted };
  }).filter(Boolean);

  return (
    <div
      className={`gt-status-bar ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '6px 12px',
        borderTop: '1px solid var(--gt-border-color, #e0e0e0)',
        background: 'var(--gt-bg-secondary, #fafafa)',
        fontSize: '0.75rem',
        color: 'var(--gt-text-secondary, #666)',
        flexWrap: 'wrap',
      }}
    >
      {config.showRowCount !== false && (
        <span className="gt-sb-item">
          <strong>Rows:</strong> {totalCount}
        </span>
      )}

      {config.showFilteredCount !== false && filteredCount !== totalCount && (
        <span className="gt-sb-item">
          <strong>Filtered:</strong> {filteredCount}
        </span>
      )}

      {config.showSelectedCount !== false && selectedCount > 0 && (
        <span className="gt-sb-item">
          <strong>Selected:</strong> {selectedCount}
        </span>
      )}

      {aggregations?.map((agg, i) => (
        <span key={i} className="gt-sb-item gt-sb-agg">
          <strong>{agg!.label}:</strong> {agg!.formatted}
        </span>
      ))}

      {config.customContent}
    </div>
  );
}

export default StatusBar;
