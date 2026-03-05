import type { ReactNode } from 'react';
import { useCallback } from 'react';
import type { GridBodyProps } from './types';
import type { RowData } from '../../types';
import { GridRow } from '../GridRow';

export function GridBody<T extends RowData = RowData>({
  data,
  columns,
  columnStates,
  className = '',
  style,
  isMobile = false,
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
  rowDragProps,
  draggingRowId,
  dragOverRowId,
  treeIndents,
  treeToggle,
  treeHasChildren,
  treeIsExpanded,
  enableCellEdit,
  onCellSave,
}: GridBodyProps<T>): ReactNode {
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

  if (data.length === 0) {
    return null;
  }

  return (
    <div className={`grid-body ${className}`} style={style} role="rowgroup">
      {data.map((row, index) => {
        const rowId = getRowId(row);
        const isSelected = selectedIds.has(rowId);
        const isExpanded = expandedIds.has(rowId);
        const isDisabled = isRowDisabled?.(row) ?? false;
        const rowClassName = getRowClassName?.(row, index) ?? '';
        const rowStyle = getRowStyle?.(row, index);

        const dragProps = rowDragProps?.(rowId);
        const isDragging = draggingRowId === rowId;
        const isDragOver = dragOverRowId === rowId;
        const indent = treeIndents?.get(rowId) ?? 0;
        const hasChildren = treeHasChildren?.(rowId) ?? false;
        const isTreeExpanded = treeIsExpanded?.(rowId) ?? false;

        return (
          <GridRow
            key={rowId}
            row={row}
            rowIndex={index}
            columns={columns}
            columnStates={columnStates}
            isSelected={isSelected}
            isExpanded={isExpanded}
            isDisabled={isDisabled}
            isMobile={isMobile}
            showMobileLabels={showMobileLabels}
            className={`${rowClassName} ${isDragging ? 'gt-row-dragging' : ''} ${isDragOver ? 'gt-row-drag-over' : ''}`}
            style={{ ...rowStyle, ...(indent > 0 ? { paddingLeft: indent } : {}) }}
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
            {...(dragProps ?? {})}
            treeToggle={hasChildren ? () => treeToggle?.(rowId) : undefined}
            treeHasChildren={hasChildren}
            treeIsExpanded={isTreeExpanded}
            treeIndent={indent}
            enableCellEdit={enableCellEdit}
            onCellSave={onCellSave}
          />
        );
      })}
    </div>
  );
}

