import type { ReactNode } from 'react';
import { useCallback } from 'react';
import clsx from 'clsx';
import type { GridBodyProps } from './gridBody.types';
import type { RowData } from '@/types';
import { GridRow } from '../GridRow';
import { getRowGroupMeta } from '@/utils/rowGroups.utils';
import { getGridBodyRowDerivedState } from './gridBody.utils';
import { ZERO } from '@constants/numbers.const';

export function GridBody<T extends RowData = RowData>(props: GridBodyProps<T>): ReactNode {
  const {
    data,
    columns,
    columnStates,
    className = '',
    style,
    applyHiddenOnMobile = false,
    stackedMobileLayout = false,
    showMobileLabels = true,
    enableSelection = false,
    enableExpansion = false,
    selectedIds = new Set(),
    expandedIds = new Set(),
    onRowClick,
    onRowDoubleClick,
    onCellClick,
    onRowSelect,
    onRowExpand,
    getRowId,
    getRowClassName,
    getRowStyle,
    isRowDisabled,
    renderRowExpansion,
    onRowContextMenu,
    onLongPressContextMenu,
    rowDragProps,
    draggingRowId,
    dragOverRowId,
    treeIndents,
    treeToggle,
    treeHasChildren,
    treeIsExpanded,
    enableCellEdit,
    onCellSave,
    onGroupToggle,
    isGroupExpanded,
    getCellClassName,
    touchGestures,
    onRangeMouseDown,
    onRangeMouseEnter,
    onFillHandleMouseDown,
    showFillHandleForCell,
  } = props;

  const handleRowSelect = useCallback(
    (row: T) => (selected: boolean) => {
      const id = getRowId(row);
      onRowSelect?.(id, selected);
    },
    [getRowId, onRowSelect]
  );

  const handleRowExpand = useCallback(
    (row: T) => (expanded: boolean) => {
      const id = getRowId(row);
      onRowExpand?.(id, expanded);
    },
    [getRowId, onRowExpand]
  );

  if (data.length === ZERO) {
    return null;
  }

  return (
    <div className={clsx('grid-body', className)} style={style} role="rowgroup">
      {data.map((row, index) => {
        const d = getGridBodyRowDerivedState({
          row,
          index,
          getRowId,
          selectedIds,
          expandedIds,
          isRowDisabled,
          getRowClassName,
          getRowStyle,
          rowDragProps,
          draggingRowId,
          dragOverRowId,
          treeIndents,
          treeHasChildren,
          treeIsExpanded,
        });

        return (
          <GridRow
            key={d.rowId}
            row={row}
            rowIndex={index}
            columns={columns}
            columnStates={columnStates}
            isSelected={d.isSelected}
            isExpanded={d.isExpanded}
            isDisabled={d.isDisabled}
            applyHiddenOnMobile={applyHiddenOnMobile}
            stackedMobileLayout={stackedMobileLayout}
            showMobileLabels={showMobileLabels}
            className={clsx(d.rowClassName, d.isDragging && 'gt-row-dragging', d.isDragOver && 'gt-row-drag-over')}
            style={{ ...d.rowStyle, ...(d.indent > ZERO ? { paddingLeft: d.indent } : {}) }}
            onClick={onRowClick}
            onDoubleClick={onRowDoubleClick}
            onCellClick={onCellClick}
            onSelect={handleRowSelect(row)}
            onExpand={handleRowExpand(row)}
            enableSelection={enableSelection}
            enableExpansion={enableExpansion && !!renderRowExpansion}
            renderExpansion={renderRowExpansion}
            getRowId={getRowId}
            onContextMenu={onRowContextMenu ? (r: T, idx: number, e: React.MouseEvent) => onRowContextMenu(r, idx, e) : undefined}
            onLongPressContextMenu={onLongPressContextMenu}
            {...(d.dragProps ?? {})}
            treeToggle={d.hasChildren ? () => treeToggle?.(d.rowId) : undefined}
            treeHasChildren={d.hasChildren}
            treeIsExpanded={d.isTreeExpanded}
            treeIndent={d.indent}
            enableCellEdit={enableCellEdit}
            onCellSave={onCellSave}
            onGroupToggle={onGroupToggle}
            groupExpanded={(() => {
              const meta = getRowGroupMeta(row);
              return meta?.groupKey ? (isGroupExpanded?.(meta.groupKey) ?? true) : true;
            })()}
            getCellClassName={getCellClassName}
            touchGestures={touchGestures}
            onRangeMouseDown={onRangeMouseDown}
            onRangeMouseEnter={onRangeMouseEnter}
            onFillHandleMouseDown={onFillHandleMouseDown}
            showFillHandleForCell={showFillHandleForCell}
          />
        );
      })}
    </div>
  );
}
