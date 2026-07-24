import type { ReactNode } from 'react';
import { useMemo, useCallback, useRef, useEffect, useState } from 'react';
import clsx from 'clsx';
import type { GridCellProps } from './GridCell.types';
import type { RowData } from '@/types';
import { Tooltip, Typography } from '@forgedevstack/bear';
import { useTableContext } from '@/context';
import { highlightMatch } from '@/utils';
import { EditableCell } from '../EditableCell';
import {
  GRID_CELL_ALIGN_CLASSES,
  GRID_CELL_COLLAPSE_ARIA,
  GRID_CELL_EMPTY_STRING,
  GRID_CELL_EXPAND_ARIA,
  GRID_CELL_STICKY_BACKGROUND,
  GRID_CELL_SUBCELL_TRIGGER_BOTH,
  GRID_CELL_SUBCELL_TRIGGER_DOUBLE_CLICK,
  GRID_CELL_TOOLTIP_DELAY,
  GRID_CELL_TRUNCATE_CLASS,
} from './GridCell.const';
import { deriveGridCellState, formatGridCellValue, getGridCellStyle } from './GridCell.utils';

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
  enableCellEdit,
  onCellSave,
  colIndex,
  showFillHandle = false,
  onRangeMouseDown,
  onRangeMouseEnter,
  onFillHandleMouseDown,
}: GridCellProps<T>): ReactNode {
  const valueRef = useRef<HTMLSpanElement>(null);
  const [overflowTitle, setOverflowTitle] = useState<string | undefined>(undefined);
  const { state, actions, tableOptions } = useTableContext<T>();

  const {
    showOverflowTooltip,
    hasSubCell,
    trigger,
    showArrow,
    enableCellAutoSize,
    isSubCellExpanded,
    isAutoSized,
  } = useMemo(
    () =>
      deriveGridCellState(
        { column, rowId },
        tableOptions,
        { expandedCellIds: state.expandedCellIds, autoSizedColumnIds: state.autoSizedColumnIds },
      ),
    [column, rowId, tableOptions, state.expandedCellIds, state.autoSizedColumnIds],
  );

  const formattedValue = useMemo(() => formatGridCellValue(column, value, row, rowIndex), [column, value, row, rowIndex]);

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
      if (hasSubCell && (trigger === GRID_CELL_SUBCELL_TRIGGER_DOUBLE_CLICK || trigger === GRID_CELL_SUBCELL_TRIGGER_BOTH)) {
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

  const cellStyle = useMemo(
    () => getGridCellStyle({ style, width, sticky, stickyOffset, isAutoSized, stickyBackground: GRID_CELL_STICKY_BACKGROUND }),
    [style, width, sticky, stickyOffset, isAutoSized],
  );

  const alignClass = GRID_CELL_ALIGN_CLASSES[align];
  const stickyClass = sticky ? `sticky-${sticky}` : GRID_CELL_EMPTY_STRING;
  const valueClassName = clsx('grid-cell-value', !isAutoSized && GRID_CELL_TRUNCATE_CLASS);
  const mergedCellStyle = useMemo(() => ({ ...cellStyle, ...column.cellStyle }), [cellStyle, column.cellStyle]);

  const shouldHighlight =
    state.globalFilter &&
    typeof formattedValue === 'string' &&
    (!tableOptions.globalFilterColumns ||
      tableOptions.globalFilterColumns.length === 0 ||
      tableOptions.globalFilterColumns.includes(column.id));
  const cellContent = shouldHighlight
    ? highlightMatch(String(formattedValue), state.globalFilter)
    : formattedValue;

  const isEditable = enableCellEdit && column.editable;
  const editConfig = typeof column.editable === 'object' ? column.editable : { type: 'text' as const };

  const handleCellSave = useCallback(
    (_row: T, colId: string, oldVal: unknown, newVal: unknown) => {
      onCellSave?.(rowId, colId, oldVal, newVal);
    },
    [onCellSave, rowId],
  );

  const renderValueNode = (): ReactNode => {
    const valueNode = (
      <span ref={valueRef} className={valueClassName}>
        <Typography component="span" variant="body2" className="grid-cell-value-text">
          {cellContent}
        </Typography>
      </span>
    );

    if (!overflowTitle) return valueNode;

    return (
      <Tooltip content={overflowTitle} placement="top" delay={GRID_CELL_TOOLTIP_DELAY}>
        {valueNode}
      </Tooltip>
    );
  };

  const innerContent = (
    <div className="grid-cell-inner">
      {showLabel && labelText && (
        <Typography component="span" variant="body2" color="secondary" className="grid-cell-label">
          {labelText}:
        </Typography>
      )}
      <div className="grid-cell-value-wrapper min-w-0 overflow-hidden">
        {renderValueNode()}
      </div>
      {showArrow && (
        <button
          type="button"
          className={`grid-cell-expand-trigger ${isSubCellExpanded ? 'grid-cell-expand-trigger--expanded' : ''}`}
          onClick={handleExpandClick}
          aria-label={isSubCellExpanded ? GRID_CELL_COLLAPSE_ARIA : GRID_CELL_EXPAND_ARIA}
          aria-expanded={isSubCellExpanded}
        />
      )}
    </div>
  );

  const handleRangeMouseDown = useCallback(
    (event: React.MouseEvent) => {
      if (colIndex == null || !onRangeMouseDown) return;
      onRangeMouseDown(rowIndex, colIndex, event);
    },
    [colIndex, onRangeMouseDown, rowIndex],
  );

  const handleRangeMouseEnter = useCallback(() => {
    if (colIndex == null || !onRangeMouseEnter) return;
    onRangeMouseEnter(rowIndex, colIndex);
  }, [colIndex, onRangeMouseEnter, rowIndex]);

  const handleFillHandleMouseDown = useCallback(
    (event: React.MouseEvent) => {
      if (colIndex == null || !onFillHandleMouseDown) return;
      event.preventDefault();
      event.stopPropagation();
      onFillHandleMouseDown(rowIndex, colIndex, event);
    },
    [colIndex, onFillHandleMouseDown, rowIndex],
  );

  return (
    <div
      className={clsx(
        'grid-cell',
        alignClass,
        stickyClass,
        onClick && 'cursor-pointer',
        hasSubCell && 'grid-cell--has-sub',
        isAutoSized && 'grid-cell--auto-sized',
        column.cellClassName,
        className,
      )}
      style={mergedCellStyle}
      role="cell"
      data-column-id={column.id}
      data-row-index={rowIndex}
      data-col-index={colIndex}
      onClick={onClick ? handleClick : undefined}
      onDoubleClick={!isEditable ? handleDoubleClick : undefined}
      onMouseDown={onRangeMouseDown ? handleRangeMouseDown : undefined}
      onMouseEnter={onRangeMouseEnter ? handleRangeMouseEnter : undefined}
    >
      {isEditable ? (
        <EditableCell
          value={value}
          row={row}
          columnId={column.id}
          config={editConfig}
          onSave={handleCellSave}
        >
          {innerContent}
        </EditableCell>
      ) : (
        innerContent
      )}
      {hasSubCell && isSubCellExpanded && column.renderSubCell && (
        <div className="grid-cell-subcell">
          {column.renderSubCell(row as T)}
        </div>
      )}
      {showFillHandle && (
        <button
          type="button"
          className="gt-fill-handle"
          aria-label="Fill handle"
          onMouseDown={handleFillHandleMouseDown}
        />
      )}
    </div>
  );
}

