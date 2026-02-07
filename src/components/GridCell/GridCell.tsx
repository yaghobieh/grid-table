import type { ReactNode } from 'react';
import { useMemo, useCallback, useRef, useEffect, useState } from 'react';
import type { GridCellProps } from './types';
import type { RowData } from '../../types';
import { Tooltip, Typography } from '@forgedevstack/bear';
import { useTableContext } from '../../context';
import { highlightMatch } from '../../utils';

const ALIGN_CLASSES = {
  left: 'text-left justify-start',
  center: 'text-center justify-center',
  right: 'text-right justify-end',
} as const;

export function GridCell<T extends RowData = RowData>({
  column,
  row,
  rowIndex,
  rowId,
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
  const valueRef = useRef<HTMLSpanElement>(null);
  const [overflowTitle, setOverflowTitle] = useState<string | undefined>(undefined);
  const { state, actions, tableOptions } = useTableContext<T>();

  const showOverflowTooltip = (column.showOverflowTooltip ?? tableOptions.showOverflowTooltip) !== false;
  const hasSubCell = Boolean(column.renderSubCell);
  const trigger = column.subCellExpandTrigger ?? tableOptions.subCellExpandTrigger ?? 'both';
  const showArrow = hasSubCell && (trigger === 'arrow' || trigger === 'both');
  const enableCellAutoSize = tableOptions.enableCellAutoSizeOnDoubleClick === true;
  const cellKey = `${String(rowId)}-${column.id}`;
  const isSubCellExpanded = state.expandedCellIds.has(cellKey);
  const isAutoSized = state.autoSizedColumnIds.has(column.id);

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

  useEffect(() => {
    if (!showOverflowTooltip || !valueRef.current) return;
    const el = valueRef.current;
    const truncated = el.scrollWidth > el.clientWidth;
    const raw = el.textContent ?? '';
    setOverflowTitle(truncated && raw ? raw : undefined);
  }, [showOverflowTooltip, formattedValue]);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (onClick) {
        e.stopPropagation();
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

  const handleDoubleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (hasSubCell && (trigger === 'doubleClick' || trigger === 'both')) {
        actions.toggleCellExpansion(rowId, column.id);
      } else if (enableCellAutoSize) {
        actions.toggleColumnAutoSize(column.id);
      }
    },
    [hasSubCell, trigger, enableCellAutoSize, actions, rowId, column.id]
  );

  const handleExpandClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      actions.toggleCellExpansion(rowId, column.id);
    },
    [actions, rowId, column.id]
  );

  const cellStyle = useMemo(() => {
    const baseStyle: React.CSSProperties = { ...style };

    if (isAutoSized) {
      baseStyle.width = 'auto';
      baseStyle.minWidth = 'max-content';
      baseStyle.maxWidth = 'none';
    } else if (width !== undefined) {
      baseStyle.width = typeof width === 'number' ? `${width}px` : width;
      baseStyle.minWidth = baseStyle.width;
      baseStyle.maxWidth = baseStyle.width;
    }

    if (sticky) {
      baseStyle.position = 'sticky';
      baseStyle.zIndex = 1;
      baseStyle.backgroundColor = 'var(--gt-bg-primary, #1e1e1e)';

      if (sticky === 'left') {
        baseStyle.left = stickyOffset;
      } else if (sticky === 'right') {
        baseStyle.right = stickyOffset;
      }
    }

    return baseStyle;
  }, [style, width, sticky, stickyOffset, isAutoSized]);

  const alignClass = ALIGN_CLASSES[align];
  const stickyClass = sticky ? `sticky-${sticky}` : '';

  const shouldHighlight =
    state.globalFilter &&
    typeof formattedValue === 'string' &&
    (!tableOptions.globalFilterColumns ||
      tableOptions.globalFilterColumns.length === 0 ||
      tableOptions.globalFilterColumns.includes(column.id));
  const cellContent = shouldHighlight
    ? highlightMatch(String(formattedValue), state.globalFilter)
    : formattedValue;

  return (
    <div
      className={`
        grid-cell
        ${alignClass}
        ${stickyClass}
        ${onClick ? 'cursor-pointer' : ''}
        ${hasSubCell ? 'grid-cell--has-sub' : ''}
        ${isAutoSized ? 'grid-cell--auto-sized' : ''}
        ${column.cellClassName || ''}
        ${className}
      `.trim()}
      style={{ ...cellStyle, ...column.cellStyle }}
      role="cell"
      onClick={onClick ? handleClick : undefined}
      onDoubleClick={handleDoubleClick}
    >
      <div className="grid-cell-inner">
        {showLabel && labelText && (
          <Typography component="span" variant="body2" color="secondary" className="grid-cell-label">
            {labelText}:
          </Typography>
        )}
        <div className="grid-cell-value-wrapper" style={{ minWidth: 0, overflow: 'hidden' }}>
          {overflowTitle ? (
            <Tooltip content={overflowTitle} placement="top" delay={200}>
              <span
                ref={valueRef}
                className={`grid-cell-value ${isAutoSized ? '' : 'grid-cell-value--truncate'}`}
              >
                <Typography component="span" variant="body2" className="grid-cell-value-text">
                  {cellContent}
                </Typography>
              </span>
            </Tooltip>
          ) : (
            <span
              ref={valueRef}
              className={`grid-cell-value ${isAutoSized ? '' : 'grid-cell-value--truncate'}`}
            >
              <Typography component="span" variant="body2">
                {cellContent}
              </Typography>
            </span>
          )}
        </div>
        {showArrow && (
          <button
            type="button"
            className={`grid-cell-expand-trigger ${isSubCellExpanded ? 'grid-cell-expand-trigger--expanded' : ''}`}
            onClick={handleExpandClick}
            aria-label={isSubCellExpanded ? 'Collapse' : 'Expand'}
            aria-expanded={isSubCellExpanded}
          />
        )}
      </div>
      {hasSubCell && isSubCellExpanded && column.renderSubCell && (
        <div className="grid-cell-subcell">
          {column.renderSubCell(row as T)}
        </div>
      )}
    </div>
  );
}

