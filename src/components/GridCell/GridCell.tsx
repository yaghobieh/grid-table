import type { ReactNode } from 'react';
import { useMemo, useCallback } from 'react';
import type { GridCellProps } from './types';
import type { RowData } from '../../types';

const ALIGN_CLASSES = {
  left: 'text-left justify-start',
  center: 'text-center justify-center',
  right: 'text-right justify-end',
} as const;

export function GridCell<T extends RowData = RowData>({
  column,
  row,
  rowIndex,
  value,
  width,
  align = 'left',
  className = '',
  style,
  showLabel = false,
  labelText,
  sticky,
  stickyOffset = 0,
  onClick,
}: GridCellProps<T>): ReactNode {
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (onClick) {
        e.stopPropagation(); // Prevent row click
        onClick({
          row,
          rowIndex,
          columnId: column.id,
          value,
        });
      }
    },
    [onClick, row, rowIndex, column.id, value]
  );
  const formattedValue = useMemo(() => {
    if (column.render) {
      return column.render(value, row as Record<string, unknown>, rowIndex);
    }

    if (value === null || value === undefined) {
      return '-';
    }

    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }

    if (value instanceof Date) {
      return value.toLocaleDateString();
    }

    return String(value);
  }, [column, row, rowIndex, value]);

  const cellStyle = useMemo(() => {
    const baseStyle: React.CSSProperties = { ...style };

    if (width !== undefined) {
      baseStyle.width = typeof width === 'number' ? `${width}px` : width;
      baseStyle.minWidth = baseStyle.width;
      baseStyle.maxWidth = baseStyle.width;
    }

    // Sticky column positioning
    if (sticky) {
      baseStyle.position = 'sticky';
      baseStyle.zIndex = 1;
      baseStyle.backgroundColor = 'var(--bg-primary, #1e1e1e)';
      
      if (sticky === 'left') {
        baseStyle.left = stickyOffset;
      } else if (sticky === 'right') {
        baseStyle.right = stickyOffset;
      }
    }

    return baseStyle;
  }, [style, width, sticky, stickyOffset]);

  const alignClass = ALIGN_CLASSES[align];

  const stickyClass = sticky ? `sticky-${sticky}` : '';

  return (
    <div
      className={`
        grid-cell
        ${alignClass}
        ${stickyClass}
        ${onClick ? 'cursor-pointer' : ''}
        ${column.cellClassName || ''}
        ${className}
      `.trim()}
      style={{ ...cellStyle, ...column.cellStyle }}
      role="cell"
      onClick={onClick ? handleClick : undefined}
    >
      {showLabel && labelText && (
        <span className="grid-cell-label">
          {labelText}:
        </span>
      )}
      <span className="grid-cell-value truncate">{formattedValue}</span>
    </div>
  );
}

