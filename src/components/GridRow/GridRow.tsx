import type { ReactNode, MouseEvent } from 'react';
import { useCallback, useMemo, useState } from 'react';
import type { GridRowProps } from './types';
import type { RowData } from '../../types';
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

  const handleSelectChange = useCallback(() => {
    if (isDisabled) return;
    onSelect?.(!isSelected);
  }, [onSelect, isSelected, isDisabled]);

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
      >
        {enableSelection && (
          <div className="grid-row-select flex items-center px-2">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={handleSelectChange}
              disabled={isDisabled}
              className="w-4 h-4 rounded border-theme-border"
              aria-label="Select row"
            />
          </div>
        )}

        {enableExpansion && renderExpansion && (
          <div className="grid-row-expand flex items-center px-2">
            <button
              onClick={handleExpandToggle}
              disabled={isDisabled}
              className="w-6 h-6 flex items-center justify-center rounded hover:bg-theme-tertiary"
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
              value={getCellValue(col)}
              width={width}
              align={col.align}
              showLabel={isMobile && showMobileLabels && col.showLabelOnMobile !== false}
              labelText={typeof col.header === 'string' ? col.header : col.id}
              className={isMobile ? 'w-full sm:w-auto flex-shrink-0' : 'flex-shrink-0'}
              sticky={col.sticky}
              stickyOffset={stickyOffset}
              onClick={onCellClick}
            />
          );
        })}
      </div>

      {isExpanded && renderExpansion && (
        <div className="grid-row-expansion border-b border-theme-border bg-theme-secondary p-4">
          {renderExpansion(row)}
        </div>
      )}
    </>
  );
}

