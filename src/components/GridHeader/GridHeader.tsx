import type { ReactNode } from 'react';
import { useMemo, useCallback, useState, useRef } from 'react';
import clsx from 'clsx';
import type { GridHeaderProps, GridHeaderCellProps } from './GridHeader.types';
import type { RowData, ColumnDefinition, ColumnState, SortDirection, FilterOperator } from '@/types';
import { useTableContext } from '@/context';
import { useDragDrop } from '@/hooks';
import {
  EMPTY_STRING,
  GRID_HEADER_PIN_ARIA,
  GRID_HEADER_UNPIN_ARIA,
  MAX_COLUMN_WIDTH,
  MIN_COLUMN_WIDTH,
  ONE,
  PIN_EDGE_LEFT_CLASS,
  PIN_EDGE_RIGHT_CLASS,
  TWO,
  ZERO,
} from '@/constants';
import { resolveColumnSticky } from '@/utils/columnSticky.utils';
import { Checkbox, BearIcons } from '@forgedevstack/bear';
import { FilterPopup } from '../FilterPopup';
import {
  GRID_HEADER_ALIGN_CLASSES,
  GRID_HEADER_FILTER_ARIA,
  GRID_HEADER_PIN_ACTIVE_CLASS,
  GRID_HEADER_SELECT_ALL_ARIA,
} from './GridHeader.const';

function HeaderCell<T extends RowData>({
  column,
  columnState,
  sortDirection,
  sortIndex,
  isMultiSort = false,
  enableSort = true,
  enableFilter = true,
  enableDragDrop = true,
  enableResize = true,
  enablePinControls = false,
  hasFilter = false,
  isDragging = false,
  isDragOver = false,
  isPinEdgeLeft = false,
  isPinEdgeRight = false,
  isColumnAutoSized = false,
  onSort,
  onFilterOpen,
  onPinToggle,
  onResizeStart,
  dragHandleProps,
  dropTargetProps,
}: GridHeaderCellProps<T>): ReactNode {
  const renderSortIcon = (): ReactNode => {
    switch (sortDirection) {
      case 'asc':
        return <BearIcons.Navigation.ChevronUpIcon size="xs" className="text-accent-primary" />;
      case 'desc':
        return <BearIcons.Navigation.ChevronDownIcon size="xs" className="text-accent-primary" />;
      default:
        return <BearIcons.ArrowDownIcon size="xs" className="text-theme-muted" />;
    }
  };

  const stickySide = resolveColumnSticky(column, columnState);
  const isSortable = enableSort && column.sortable !== false;
  const isFilterable = enableFilter && column.filterable !== false;
  const isDraggable = enableDragDrop && column.draggable !== false;
  const isResizable = enableResize && column.resizable !== false;
  const isPinned = stickySide != null;

  const headerContent = useMemo(() => {
    if (typeof column.header === 'function') {
      return column.header();
    }
    return column.header;
  }, [column.header]);

  const handleClick = useCallback(() => {
    if (isSortable) {
      onSort?.();
    }
  }, [isSortable, onSort]);

  const handleFilterClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onFilterOpen?.();
    },
    [onFilterOpen]
  );

  const handlePinClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onPinToggle?.();
    },
    [onPinToggle],
  );

  const cellClasses = useMemo(() => {
    return clsx(
      'grid-header-cell',
      GRID_HEADER_ALIGN_CLASSES[column.align || 'left'],
      isSortable && 'cursor-pointer',
      isDragging && 'opacity-50',
      isDragOver && 'bg-accent-primary/10',
      sortDirection && 'gt-sorted',
      stickySide && `sticky-${stickySide}`,
      isPinEdgeLeft && PIN_EDGE_LEFT_CLASS,
      isPinEdgeRight && PIN_EDGE_RIGHT_CLASS,
    );
  }, [column.align, isSortable, isDragging, isDragOver, sortDirection, stickySide, isPinEdgeLeft, isPinEdgeRight]);

  const cellStyle = useMemo(() => {
    const base: React.CSSProperties = {
      flexShrink: 0,
      ...(stickySide && {
        position: 'sticky',
        [stickySide]: 0,
        zIndex: TWO,
        backgroundColor: 'var(--gt-bg-secondary, #2b2b2b)',
      }),
      ...column.headerStyle,
    };
    if (isColumnAutoSized) {
      base.width = 'auto';
      base.minWidth = 'max-content';
      base.maxWidth = 'none';
    } else {
      base.width = typeof columnState.width === 'number' ? `${columnState.width}px` : columnState.width;
      base.minWidth = column.minWidth || MIN_COLUMN_WIDTH;
      base.maxWidth = column.maxWidth || MAX_COLUMN_WIDTH;
    }
    return base;
  }, [column, columnState.width, isColumnAutoSized, stickySide]);

  return (
    <div
      className={clsx(cellClasses, column.headerClassName ?? EMPTY_STRING)}
      style={cellStyle}
      role="columnheader"
      aria-sort={sortDirection === 'asc' ? 'ascending' : sortDirection === 'desc' ? 'descending' : 'none'}
      onClick={handleClick}
      {...(isDraggable ? { ...dragHandleProps, ...dropTargetProps } : {})}
    >
      <span className="grid-header-content">{headerContent}</span>

      {isSortable && (
        <span className="grid-header-sort">
          {renderSortIcon()}
          {isMultiSort && sortIndex !== undefined && sortIndex >= ZERO && sortDirection && (
            <span className="text-xs text-theme-muted">{sortIndex + ONE}</span>
          )}
        </span>
      )}

      {isFilterable && (
        <button
          onClick={handleFilterClick}
          className="grid-header-filter"
          aria-label={GRID_HEADER_FILTER_ARIA}
        >
          <BearIcons.FilterIcon size="xs" className={hasFilter ? 'text-accent-primary' : 'text-theme-muted'} />
        </button>
      )}

      {enablePinControls && (
        <button
          type="button"
          onClick={handlePinClick}
          className={clsx('grid-header-pin', isPinned && GRID_HEADER_PIN_ACTIVE_CLASS)}
          aria-label={isPinned ? GRID_HEADER_UNPIN_ARIA : GRID_HEADER_PIN_ARIA}
          title={isPinned ? GRID_HEADER_UNPIN_ARIA : GRID_HEADER_PIN_ARIA}
        >
          <BearIcons.MapPinIcon size="xs" className={isPinned ? 'text-accent-primary' : 'text-theme-muted'} />
        </button>
      )}

      {isResizable && (
        <div
          className="grid-header-resize"
          onMouseDown={onResizeStart}
          onClick={(e) => e.stopPropagation()}
        />
      )}
    </div>
  );
}

export function GridHeader<T extends RowData = RowData>({
  columns,
  columnStates,
  className = '',
  style,
  sticky = true,
  enableSort = true,
  enableFilter = true,
  enableDragDrop = true,
  enableResize = true,
  enablePinControls = true,
  enableSelection = false,
  enableExpansion = false,
  allSelected = false,
  someSelected = false,
  onSelectAll,
  onSort,
  onFilterOpen,
  getSortDirection,
}: GridHeaderProps<T>): ReactNode {
  const { state, actions } = useTableContext();
  const dragDrop = useDragDrop();
  const [resizingColumn, setResizingColumn] = useState<string | null>(null);
  const [activeFilterColumn, setActiveFilterColumn] = useState<string | null>(null);
  const filterButtonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const resizeStartX = useRef<number>(0);
  const resizeStartWidth = useRef<number>(0);

  const handleFilterClick = useCallback((columnId: string) => {
    setActiveFilterColumn(activeFilterColumn === columnId ? null : columnId);
  }, [activeFilterColumn]);

  const handleFilterApply = useCallback((columnId: string, value: unknown, operator: FilterOperator) => {
    actions.setFilter(columnId, value, operator);
    setActiveFilterColumn(null);
  }, [actions]);

  const handleFilterClear = useCallback((columnId: string) => {
    actions.removeFilter(columnId);
    setActiveFilterColumn(null);
  }, [actions]);

  const handleFilterClose = useCallback(() => {
    setActiveFilterColumn(null);
  }, []);

  const visibleColumns = useMemo(() => {
    return columns
      .filter((col) => {
        const colState = columnStates.find((cs) => cs.id === col.id);
        return colState?.visible !== false;
      })
      .sort((a, b) => {
        const aState = columnStates.find((cs) => cs.id === a.id);
        const bState = columnStates.find((cs) => cs.id === b.id);
        return (aState?.order ?? ZERO) - (bState?.order ?? ZERO);
      });
  }, [columns, columnStates]);

  const pinEdgeIds = useMemo(() => {
    let lastLeftId: string | null = null;
    let firstRightId: string | null = null;
    for (const col of visibleColumns) {
      const colState = columnStates.find((cs) => cs.id === col.id);
      const side = resolveColumnSticky(col, colState);
      if (side === 'left') lastLeftId = col.id;
    }
    for (const col of visibleColumns) {
      const colState = columnStates.find((cs) => cs.id === col.id);
      const side = resolveColumnSticky(col, colState);
      if (side === 'right') {
        firstRightId = col.id;
        break;
      }
    }
    return { lastLeftId, firstRightId };
  }, [visibleColumns, columnStates]);

  const handlePinToggle = useCallback(
    (columnId: string) => {
      const colState = columnStates.find((cs) => cs.id === columnId);
      const current = colState?.pinned ?? null;
      if (current === 'left') {
        actions.pinColumn(columnId, 'right');
        return;
      }
      if (current === 'right') {
        actions.pinColumn(columnId, null);
        return;
      }
      actions.pinColumn(columnId, 'left');
    },
    [actions, columnStates],
  );

  const handleResizeStart = useCallback(
    (columnId: string, currentWidth: number) => (event: React.MouseEvent) => {
      event.preventDefault();
      setResizingColumn(columnId);
      resizeStartX.current = event.clientX;
      resizeStartWidth.current = currentWidth;

      const handleMouseMove = (e: MouseEvent) => {
        const delta = e.clientX - resizeStartX.current;
        const newWidth = Math.max(
          MIN_COLUMN_WIDTH,
          Math.min(MAX_COLUMN_WIDTH, resizeStartWidth.current + delta)
        );
        actions.resizeColumn(columnId, newWidth);
      };

      const handleMouseUp = () => {
        setResizingColumn(null);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [actions]
  );

  const headerClasses = useMemo(
    () => clsx('grid-header', 'flex', 'bg-theme-secondary', sticky && ['sticky', 'top-0', 'z-10']),
    [sticky],
  );

  return (
    <div className={`${headerClasses} ${className}`} style={style} role="row">
      {enableSelection && (
        <div className="grid-header-select">
          <Checkbox
            checked={allSelected}
            indeterminate={someSelected && !allSelected}
            onChange={() => onSelectAll?.()}
            size="sm"
            aria-label={GRID_HEADER_SELECT_ALL_ARIA}
          />
        </div>
      )}

      {enableExpansion && (
        <div className="grid-header-expand-spacer" aria-hidden />
      )}

      {visibleColumns.map((col, index) => {
        const colState = columnStates.find((cs) => cs.id === col.id) || {
          id: col.id,
          visible: true,
          width: 150,
          order: index,
          pinned: null,
        };

        const sortDir = getSortDirection ? getSortDirection(col.id) : null;
        const sortIdx = state.sorting.findIndex((s) => s.columnId === col.id);
        const hasFilter = state.filters.some((f) => f.columnId === col.id);

        const existingFilter = state.filters.find((f) => f.columnId === col.id);
        const headerText = typeof col.header === 'string' ? col.header : col.id;

        return (
          <div key={col.id} className="relative" style={{ position: 'relative' }}>
            <HeaderCell
              column={col}
              columnState={colState}
              sortDirection={sortDir}
              sortIndex={sortIdx}
              isMultiSort={state.sorting.length > 1}
              enableSort={enableSort}
              enableFilter={enableFilter}
              enableDragDrop={enableDragDrop}
              enableResize={enableResize}
              enablePinControls={enablePinControls}
              hasFilter={hasFilter}
              isDragging={dragDrop.draggingColumnId === col.id}
              isDragOver={dragDrop.dragOverColumnId === col.id}
              isPinEdgeLeft={col.id === pinEdgeIds.lastLeftId}
              isPinEdgeRight={col.id === pinEdgeIds.firstRightId}
              isColumnAutoSized={state.autoSizedColumnIds.has(col.id)}
              onSort={() => actions.toggleSorting(col.id)}
              onFilterOpen={() => handleFilterClick(col.id)}
              onPinToggle={() => handlePinToggle(col.id)}
              onResizeStart={handleResizeStart(col.id, colState.width)}
              dragHandleProps={dragDrop.getDragHandleProps(col.id)}
              dropTargetProps={dragDrop.getDropTargetProps(col.id)}
            />
            {activeFilterColumn === col.id && (
              <FilterPopup
                columnId={col.id}
                columnHeader={headerText}
                filterType={col.filterType || 'text'}
                filterOptions={col.filterOptions}
                currentValue={existingFilter?.value}
                currentOperator={existingFilter?.operator}
                onApply={(value, operator) => handleFilterApply(col.id, value, operator)}
                onClear={() => handleFilterClear(col.id)}
                onClose={handleFilterClose}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

