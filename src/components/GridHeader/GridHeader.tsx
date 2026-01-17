import type { ReactNode } from 'react';
import { useMemo, useCallback, useState, useRef } from 'react';
import type { GridHeaderProps, GridHeaderCellProps } from './types';
import type { RowData, ColumnDefinition, ColumnState, SortDirection, FilterOperator } from '../../types';
import { useTableContext } from '../../context';
import { useDragDrop } from '../../hooks';
import { MIN_COLUMN_WIDTH, MAX_COLUMN_WIDTH } from '../../constants';
import { FilterPopup } from '../FilterPopup';

const FilterIcon = ({ active = false }: { active?: boolean }) => (
  <svg
    className={`icon-sm ${active ? 'text-accent-primary' : 'text-theme-muted'}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
    />
  </svg>
);

const SortIcon = ({ direction }: { direction: SortDirection }) => (
  <svg
    className={`icon-sm ${direction ? 'text-accent-primary' : 'text-theme-muted'}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    {direction === 'asc' ? (
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
    ) : direction === 'desc' ? (
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    ) : (
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
    )}
  </svg>
);

const DragIcon = () => (
  <svg className="icon-sm text-theme-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
  </svg>
);

const ALIGN_CLASSES = {
  left: 'text-left justify-start',
  center: 'text-center justify-center',
  right: 'text-right justify-end',
} as const;

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
  hasFilter = false,
  isDragging = false,
  isDragOver = false,
  onSort,
  onFilterOpen,
  onResizeStart,
  dragHandleProps,
  dropTargetProps,
}: GridHeaderCellProps<T>): ReactNode {
  const isSortable = enableSort && column.sortable !== false;
  const isFilterable = enableFilter && column.filterable !== false;
  const isDraggable = enableDragDrop && column.draggable !== false;
  const isResizable = enableResize && column.resizable !== false;

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

  const cellClasses = useMemo(() => {
    const classes = [
      'grid-header-cell',
      ALIGN_CLASSES[column.align || 'left'],
    ];

    if (isSortable) {
      classes.push('cursor-pointer');
    }

    if (isDragging) {
      classes.push('opacity-50');
    }

    if (isDragOver) {
      classes.push('bg-accent-primary/10');
    }

    return classes.join(' ');
  }, [column.align, isSortable, isDragging, isDragOver]);

  return (
    <div
      className={`${cellClasses} ${column.headerClassName || ''} ${column.sticky ? `sticky-${column.sticky}` : ''}`}
      style={{
        width: columnState.width,
        minWidth: column.minWidth || MIN_COLUMN_WIDTH,
        maxWidth: column.maxWidth || MAX_COLUMN_WIDTH,
        flexShrink: 0,
        ...(column.sticky && {
          position: 'sticky',
          [column.sticky]: 0,
          zIndex: 2,
          backgroundColor: 'var(--bg-secondary, #2b2b2b)',
        }),
        ...column.headerStyle,
      }}
      role="columnheader"
      aria-sort={sortDirection === 'asc' ? 'ascending' : sortDirection === 'desc' ? 'descending' : 'none'}
      onClick={handleClick}
      {...(isDraggable ? { ...dragHandleProps, ...dropTargetProps } : {})}
    >
      <span className="grid-header-content">{headerContent}</span>

      {isSortable && (
        <span className="grid-header-sort">
          <SortIcon direction={sortDirection ?? null} />
          {isMultiSort && sortIndex !== undefined && sortIndex >= 0 && sortDirection && (
            <span className="text-xs text-theme-muted">{sortIndex + 1}</span>
          )}
        </span>
      )}

      {isFilterable && (
        <button
          onClick={handleFilterClick}
          className="grid-header-filter"
          aria-label="Filter column"
        >
          <FilterIcon active={hasFilter} />
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
  enableSelection = false,
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
        return (aState?.order ?? 0) - (bState?.order ?? 0);
      });
  }, [columns, columnStates]);

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

  const headerClasses = useMemo(() => {
    const classes = ['grid-header', 'flex', 'bg-theme-secondary'];

    if (sticky) {
      classes.push('sticky', 'top-0', 'z-10');
    }

    return classes.join(' ');
  }, [sticky]);

  return (
    <div className={`${headerClasses} ${className}`} style={style} role="row">
      {enableSelection && (
        <div className="grid-header-select">
          <input
            type="checkbox"
            checked={allSelected}
            ref={(el) => {
              if (el) el.indeterminate = someSelected && !allSelected;
            }}
            onChange={onSelectAll}
            className="grid-header-checkbox"
            aria-label="Select all rows"
          />
        </div>
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
              hasFilter={hasFilter}
              isDragging={dragDrop.draggingColumnId === col.id}
              isDragOver={dragDrop.dragOverColumnId === col.id}
              onSort={() => actions.toggleSorting(col.id)}
              onFilterOpen={() => handleFilterClick(col.id)}
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

