import type { ReactNode, MouseEvent } from 'react';
import { useCallback, useMemo, useState } from 'react';
import type { GridRowProps } from './types';
import type { RowData } from '../../types';
import { Checkbox } from '@forgedevstack/bear';
import { GridCell } from '../GridCell';

export function GridRow<T extends RowData = RowData>({
  row,
  rowIndex,
  columns,
  columnStates,
  isSelected = false,
  isExpanded = false,
  isDisabled = false,
  isMobile = false,
  showMobileLabels = true,
  className = '',
  style,
  onClick,
  onDoubleClick,
  onContextMenu,
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
  treeIndent = 0,
  enableCellEdit,
  onCellSave,
}: GridRowProps<T>): ReactNode {
  const [isHovered, setIsHovered] = useState(false);

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

  const visibleColumns = useMemo(() => {
    return columns
      .filter((col) => {
        const state = columnStates.find((cs) => cs.id === col.id);
        if (state?.visible === false) return false;
        if (isMobile && col.hiddenOnMobile) return false;
        return true;
      })
      .sort((a, b) => {
        const aState = columnStates.find((cs) => cs.id === a.id);
        const bState = columnStates.find((cs) => cs.id === b.id);
        return (aState?.order ?? 0) - (bState?.order ?? 0);
      });
  }, [columns, columnStates, isMobile]);

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
    const classes = [
      'grid-row',
      'border-b',
      'border-theme-border',
      'transition-colors',
      'duration-150',
    ];

    if (isHovered && !isDisabled) {
      classes.push('bg-theme-hover');
    }

    if (isSelected) {
      classes.push('bg-accent-primary/10');
    }

    if (isDisabled) {
      classes.push('opacity-50', 'cursor-not-allowed');
    } else if (onClick) {
      classes.push('cursor-pointer');
    }

    if (isMobile) {
      classes.push('flex', 'flex-wrap', 'gap-2', 'p-4');
    } else {
      classes.push('flex', 'items-stretch');
    }

    return classes.join(' ');
  }, [isHovered, isSelected, isDisabled, onClick, isMobile]);

  return (
    <>
      <div
        className={`${rowClasses} ${className}`}
        style={style}
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
      >
        {draggable && (
          <div className="gt-drag-handle" style={{ display: 'flex', alignItems: 'center', padding: '0 4px', cursor: 'grab' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" opacity={0.4}>
              <circle cx="8" cy="4" r="2" /><circle cx="16" cy="4" r="2" />
              <circle cx="8" cy="12" r="2" /><circle cx="16" cy="12" r="2" />
              <circle cx="8" cy="20" r="2" /><circle cx="16" cy="20" r="2" />
            </svg>
          </div>
        )}

        {treeHasChildren && treeToggle && (
          <button
            className="gt-tree-toggle"
            onClick={(e) => { e.stopPropagation(); treeToggle(); }}
            style={{ display: 'flex', alignItems: 'center', padding: '0 4px', marginLeft: treeIndent, border: 'none', background: 'none', cursor: 'pointer' }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ transform: treeIsExpanded ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.15s' }}>
              <path d="M8 5l8 7-8 7z" />
            </svg>
          </button>
        )}
        {!treeHasChildren && treeIndent > 0 && (
          <div style={{ width: treeIndent + 20, flexShrink: 0 }} />
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
              <span
                className={`transform transition-transform duration-200 ${
                  isExpanded ? 'rotate-90' : ''
                }`}
              >
                &gt;
              </span>
            </button>
          </div>
        )}

        {visibleColumns.map((col, colIndex) => {
          const colState = columnStates.find((cs) => cs.id === col.id);
          const width = isMobile ? '100%' : colState?.width;
          
          // Calculate sticky offset (sum of widths of previous sticky columns)
          let stickyOffset = 0;
          if (col.sticky === 'left') {
            for (let i = 0; i < colIndex; i++) {
              const prevCol = visibleColumns[i];
              if (prevCol.sticky === 'left') {
                const prevState = columnStates.find((cs) => cs.id === prevCol.id);
                stickyOffset += prevState?.width ?? 150;
              }
            }
          }
          // For right-sticky, calculate from the right
          if (col.sticky === 'right') {
            for (let i = visibleColumns.length - 1; i > colIndex; i--) {
              const nextCol = visibleColumns[i];
              if (nextCol.sticky === 'right') {
                const nextState = columnStates.find((cs) => cs.id === nextCol.id);
                stickyOffset += nextState?.width ?? 150;
              }
            }
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
              showLabel={isMobile && showMobileLabels && col.showLabelOnMobile !== false}
              labelText={typeof col.header === 'string' ? col.header : col.id}
              className={isMobile ? 'w-full-sm flex-shrink-0' : 'flex-shrink-0'}
              sticky={col.sticky}
              stickyOffset={stickyOffset}
              onClick={onCellClick}
              enableCellEdit={enableCellEdit}
              onCellSave={onCellSave}
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

