import type { ReactNode, MouseEvent } from 'react';
import { useCallback, useMemo, useState } from 'react';
import clsx from 'clsx';
import type { GridRowProps } from './GridRow.types';
import type { RowData } from '@/types';
import { Button, Checkbox, BearIcons } from '@forgedevstack/bear';
import { GridCell } from '../GridCell';
import {
  GRID_ROW_BASE_CLASSES,
  GRID_ROW_CLICKABLE_CLASS,
  GRID_ROW_DEFAULT_STICKY_WIDTH,
  GRID_ROW_DESKTOP_CLASSES,
  GRID_ROW_DISABLED_CLASSES,
  GRID_ROW_HOVER_CLASS,
  GRID_ROW_MOBILE_CLASSES,
  GRID_ROW_SELECTED_CLASS,
  GRID_ROW_TREE_PLACEHOLDER_OFFSET,
} from './GridRow.const';
import { buildColumnStateIndex, getVisibleColumns } from './GridRow.utils';
import { getRowGroupMeta } from '@/utils/rowGroups.utils';
import {
  getPinEdgeColumnIds,
  getStickyOffsetsFromStates,
  resolveColumnSticky,
} from '@/utils/columnSticky.utils';
import { DRAG_HANDLE_ICON_PATHS, DRAG_HANDLE_ICON_VIEWBOX, TREE_TOGGLE_ICON_PATH, TREE_TOGGLE_ICON_VIEWBOX } from '@constants/images.const';
import { ZERO } from '@constants/numbers.const';
import { PIN_EDGE_LEFT_CLASS, PIN_EDGE_RIGHT_CLASS } from '@constants/strings.const';
import {
  TOUCH_GESTURES_ACTION_CLASS,
  TOUCH_GESTURES_ACTIONS_CLASS,
  TOUCH_GESTURES_OPEN_CLASS,
  TOUCH_GESTURES_ROW_CLASS,
  TOUCH_GESTURES_SWIPING_CLASS,
  TOUCH_SWIPE_ACTION_WIDTH_PX,
} from '@constants/touchGestures.const';
import { invokeSwipeAction, useTouchGestures } from '@/hooks/useTouchGestures';

export function GridRow<T extends RowData = RowData>({
  row,
  rowIndex,
  columns,
  columnStates,
  isSelected = false,
  isExpanded = false,
  isDisabled = false,
  applyHiddenOnMobile = false,
  stackedMobileLayout = false,
  showMobileLabels = true,
  className = '',
  style,
  onClick,
  onDoubleClick,
  onContextMenu,
  onLongPressContextMenu,
  onCellClick,
  onSelect,
  onExpand,
  enableSelection = false,
  enableExpansion = false,
  renderExpansion,
  getRowId,
  draggable,
  onDragStart,
  onDragOver,
  onDragEnd,
  onDrop,
  treeToggle,
  treeHasChildren,
  treeIsExpanded,
  treeIndent = ZERO,
  dragHandleIcon,
  treeToggleIcon,
  expandRowIcon,
  enableCellEdit,
  onCellSave,
  onEditNavigate,
  selectOnEditFocus,
  onGroupToggle,
  groupExpanded = true,
  getCellClassName,
  touchGestures,
  onRangeMouseDown,
  onRangeMouseEnter,
  onFillHandleMouseDown,
  showFillHandleForCell,
}: GridRowProps<T>): ReactNode {
  const [isHovered, setIsHovered] = useState(false);
  const groupMeta = getRowGroupMeta(row);
  const isGroupHeader = groupMeta?.isGroupHeader === true;

  const handleLongPress = useCallback(
    (clientX: number, clientY: number) => {
      onLongPressContextMenu?.(row, rowIndex, clientX, clientY);
    },
    [onLongPressContextMenu, row, rowIndex],
  );

  const touch = useTouchGestures(touchGestures, row, rowIndex, handleLongPress);
  const touchEnabled = touchGestures?.enabled === true;

  const handleClick = useCallback(() => {
    if (isDisabled) return;
    onClick?.(row, rowIndex);
  }, [onClick, row, rowIndex, isDisabled]);

  const handleDoubleClick = useCallback(() => {
    if (isDisabled) return;
    onDoubleClick?.(row, rowIndex);
  }, [onDoubleClick, row, rowIndex, isDisabled]);

  const handleContextMenu = useCallback(
    (event: MouseEvent) => {
      if (isDisabled) return;
      onContextMenu?.(row, rowIndex, event);
    },
    [onContextMenu, row, rowIndex, isDisabled]
  );

  const handleSelectChange = useCallback(
    (selected: boolean) => {
      if (isDisabled) return;
      onSelect?.(selected);
    },
    [onSelect, isDisabled]
  );

  const handleExpandToggle = useCallback(() => {
    if (isDisabled) return;
    onExpand?.(!isExpanded);
  }, [onExpand, isExpanded, isDisabled]);

  const columnStateIndex = useMemo(() => buildColumnStateIndex(columnStates), [columnStates]);
  const visibleColumns = useMemo(
    () => getVisibleColumns(columns, columnStateIndex, applyHiddenOnMobile),
    [columns, columnStateIndex, applyHiddenOnMobile],
  );
  const stickyOffsets = useMemo(
    () => getStickyOffsetsFromStates(visibleColumns, columnStateIndex),
    [visibleColumns, columnStateIndex],
  );
  const pinEdges = useMemo(
    () => getPinEdgeColumnIds(visibleColumns, columnStateIndex),
    [visibleColumns, columnStateIndex],
  );

  const getCellValue = useCallback(
    (col: typeof columns[number]) => {
      const accessor = col.accessor;
      if (typeof accessor === 'function') {
        return accessor(row);
      }
      return row[accessor as keyof T];
    },
    [row]
  );

  const rowClasses = useMemo(() => {
    return clsx(
      GRID_ROW_BASE_CLASSES,
      isHovered && !isDisabled && GRID_ROW_HOVER_CLASS,
      isSelected && GRID_ROW_SELECTED_CLASS,
      isGroupHeader && 'gt-row-group-header',
      isDisabled ? GRID_ROW_DISABLED_CLASSES : onClick && GRID_ROW_CLICKABLE_CLASS,
      stackedMobileLayout ? GRID_ROW_MOBILE_CLASSES : GRID_ROW_DESKTOP_CLASSES,
    );
  }, [isHovered, isSelected, isDisabled, onClick, stackedMobileLayout, isGroupHeader]);

  return (
    <>
      <div
        className={clsx(
          rowClasses,
          className,
          touchEnabled && TOUCH_GESTURES_ROW_CLASS,
          touch.isTracking && TOUCH_GESTURES_SWIPING_CLASS,
          touch.isOpen && TOUCH_GESTURES_OPEN_CLASS,
        )}
        style={{
          ...style,
          ...(touchEnabled && touch.offsetX !== ZERO
            ? { transform: `translateX(${touch.offsetX}px)` }
            : {}),
        }}
        role="row"
        aria-selected={isSelected}
        aria-disabled={isDisabled}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        onContextMenu={handleContextMenu}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        draggable={draggable}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
        onDrop={onDrop}
        onPointerDown={touchEnabled ? touch.handlers.onPointerDown : undefined}
        onPointerMove={touchEnabled ? touch.handlers.onPointerMove : undefined}
        onPointerUp={touchEnabled ? touch.handlers.onPointerUp : undefined}
        onPointerCancel={touchEnabled ? touch.handlers.onPointerCancel : undefined}
      >
        {touch.actions.length > ZERO && (
          <div
            className={TOUCH_GESTURES_ACTIONS_CLASS}
            style={{ width: touch.actions.length * TOUCH_SWIPE_ACTION_WIDTH_PX }}
          >
            {touch.actions.map((action) => (
              <button
                key={action.id}
                type="button"
                className={clsx(TOUCH_GESTURES_ACTION_CLASS, action.danger && 'gt-touch-swipe-action--danger')}
                onClick={(event) => {
                  event.stopPropagation();
                  invokeSwipeAction(action, row, rowIndex);
                  touch.close();
                }}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
        {draggable && (
          <div className="gt-drag-handle gt-drag-handle-bear">
            {dragHandleIcon ?? (
              <svg width="12" height="12" viewBox={DRAG_HANDLE_ICON_VIEWBOX} fill="currentColor" opacity={0.4}>
                {DRAG_HANDLE_ICON_PATHS.map((dot) => (
                  <circle key={`${dot.cx}-${dot.cy}`} cx={dot.cx} cy={dot.cy} r={dot.r} />
                ))}
              </svg>
            )}
          </div>
        )}

        {treeHasChildren && treeToggle && (
          <Button
            className="gt-tree-toggle"
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              treeToggle();
            }}
            style={{ marginLeft: treeIndent }}
            icon={
              treeToggleIcon ?? (
                <svg width="12" height="12" viewBox={TREE_TOGGLE_ICON_VIEWBOX} fill="currentColor" className={treeIsExpanded ? 'rotate-90 transition-transform duration-150' : 'transition-transform duration-150'}>
                  <path d={TREE_TOGGLE_ICON_PATH} />
                </svg>
              )
            }
          >
            <span className="bear-sr-only">{treeIsExpanded ? 'Collapse tree row' : 'Expand tree row'}</span>
          </Button>
        )}
        {!treeHasChildren && treeIndent > ZERO && (
          <div style={{ width: treeIndent + GRID_ROW_TREE_PLACEHOLDER_OFFSET, flexShrink: 0 }} />
        )}

        {enableSelection && (
          <div className="grid-row-select">
            <Checkbox
              checked={isSelected ?? false}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSelectChange(e.target.checked)}
              disabled={isDisabled}
              size="sm"
              aria-label="Select row"
            />
          </div>
        )}

        {enableExpansion && renderExpansion && (
          <div className="grid-row-expand">
            <button
              onClick={handleExpandToggle}
              disabled={isDisabled}
              className="grid-row-expand-button"
              aria-label={isExpanded ? 'Collapse row' : 'Expand row'}
              aria-expanded={isExpanded}
            >
              {expandRowIcon ?? (
                <BearIcons.Navigation.ChevronRightIcon
                  size="xs"
                  className={isExpanded ? 'transform transition-transform duration-200 rotate-90' : 'transform transition-transform duration-200'}
                />
              )}
            </button>
          </div>
        )}

        {visibleColumns.map((col, colIndex) => {
          const colState = columnStateIndex.get(col.id);
          const width = stackedMobileLayout ? '100%' : colState?.width;
          const sticky = resolveColumnSticky(col, colState);
          const stickyOffset = stickyOffsets.get(col.id) ?? (sticky ? GRID_ROW_DEFAULT_STICKY_WIDTH : ZERO);
          const rangeClass = getCellClassName?.(rowIndex, col.id) ?? '';
          const pinEdgeClass =
            col.id === pinEdges.lastLeftId
              ? PIN_EDGE_LEFT_CLASS
              : col.id === pinEdges.firstRightId
                ? PIN_EDGE_RIGHT_CLASS
                : '';

          if (isGroupHeader && colIndex === ZERO) {
            return (
              <div
                key={col.id}
                className={clsx('grid-cell gt-group-header-cell flex-shrink-0', col.className, rangeClass)}
                style={{ width: typeof width === 'number' ? `${width}px` : width }}
              >
                <button
                  type="button"
                  className="gt-group-header-toggle"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (groupMeta?.groupKey) onGroupToggle?.(groupMeta.groupKey);
                  }}
                >
                  <BearIcons.Navigation.ChevronRightIcon
                    size="xs"
                    className={groupExpanded ? 'rotate-90 transition-transform duration-150' : 'transition-transform duration-150'}
                  />
                </button>
                <span className="gt-group-header-label">
                  {groupMeta?.groupLabel} ({groupMeta?.childCount ?? 0})
                </span>
              </div>
            );
          }

          if (isGroupHeader) {
            return (
              <div
                key={col.id}
                className={clsx('grid-cell flex-shrink-0 gt-group-header-spacer', rangeClass)}
                style={{ width: typeof width === 'number' ? `${width}px` : width }}
              />
            );
          }

          return (
            <GridCell
              key={col.id}
              column={col}
              row={row}
              rowIndex={rowIndex}
              rowId={getRowId(row)}
              value={getCellValue(col)}
              width={width}
              align={col.align}
              showLabel={stackedMobileLayout && showMobileLabels && col.showLabelOnMobile !== false}
              labelText={typeof col.header === 'string' ? col.header : col.id}
              className={clsx(
                stackedMobileLayout ? 'w-full-sm flex-shrink-0' : 'flex-shrink-0',
                rangeClass,
                pinEdgeClass,
              )}
              sticky={sticky}
              stickyOffset={stickyOffset}
              onClick={onCellClick}
              enableCellEdit={enableCellEdit}
              onCellSave={onCellSave}
              onEditNavigate={onEditNavigate}
              selectOnEditFocus={selectOnEditFocus}
              colIndex={colIndex}
              showFillHandle={showFillHandleForCell?.(rowIndex, colIndex) === true}
              onRangeMouseDown={onRangeMouseDown}
              onRangeMouseEnter={onRangeMouseEnter}
              onFillHandleMouseDown={onFillHandleMouseDown}
            />
          );
        })}
      </div>

      {isExpanded && renderExpansion && (
        <div className="grid-row-expansion">
          {renderExpansion(row, getRowId(row))}
        </div>
      )}
    </>
  );
}

