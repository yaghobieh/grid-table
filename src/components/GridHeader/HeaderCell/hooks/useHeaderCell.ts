import { useCallback, useMemo } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import clsx from 'clsx';
import type { RowData } from '@/types';
import { resolveColumnSticky } from '@/utils/columnSticky.utils';
import {
  EMPTY_STRING,
  GRID_HEADER_PIN_ARIA,
  GRID_HEADER_UNPIN_ARIA,
  MAX_COLUMN_WIDTH,
  MIN_COLUMN_WIDTH,
  PIN_EDGE_LEFT_CLASS,
  PIN_EDGE_RIGHT_CLASS,
  TWO,
  ZERO,
} from '@/constants';
import { GRID_HEADER_ALIGN_CLASSES } from '../../GridHeader.const';
import type { GridHeaderCellProps } from '../HeaderCell.types';
import {
  ARIA_SORT_BY_DIRECTION,
  ARIA_SORT_NONE,
  HEADER_CELL_ALIGN_LEFT,
  HEADER_CELL_CLASS,
  HEADER_CELL_CURSOR_POINTER_CLASS,
  HEADER_CELL_DRAG_OVER_CLASS,
  HEADER_CELL_DRAGGING_CLASS,
  HEADER_CELL_MAX_WIDTH_NONE,
  HEADER_CELL_MIN_WIDTH_MAX_CONTENT,
  HEADER_CELL_PIN_CLASS,
  HEADER_CELL_POSITION_STICKY,
  HEADER_CELL_SORTED_CLASS,
  HEADER_CELL_STICKY_BACKGROUND,
  HEADER_CELL_WIDTH_AUTO,
} from '../HeaderCell.const';

export interface UseHeaderCellReturn {
  isSortable: boolean;
  isPinned: boolean;
  pinAria: string;
  headerContent: ReactNode;
  cellClasses: string;
  cellStyle: CSSProperties;
  ariaSort: 'none' | 'ascending' | 'descending';
  dragDropProps: Record<string, unknown>;
  handleClick: () => void;
  handleFilterClick: (event: React.MouseEvent) => void;
  handlePinClick: (event: React.MouseEvent) => void;
}

/**
 * Derives HeaderCell sticky/sort presentation, styles, and header click handlers.
 */
export function useHeaderCell<T extends RowData>(props: GridHeaderCellProps<T>): UseHeaderCellReturn {
  const {
    column,
    columnState,
    sortDirection,
    enableSort = true,
    enableDragDrop = true,
    isDragging = false,
    isDragOver = false,
    isPinEdgeLeft = false,
    isPinEdgeRight = false,
    isColumnAutoSized = false,
    onSort,
    onFilterOpen,
    onPinToggle,
    dragHandleProps,
    dropTargetProps,
  } = props;

  const stickySide = resolveColumnSticky(column, columnState);
  const isSortable = enableSort && column.sortable !== false;
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
    (event: React.MouseEvent) => {
      event.stopPropagation();
      onFilterOpen?.();
    },
    [onFilterOpen],
  );

  const handlePinClick = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      onPinToggle?.();
    },
    [onPinToggle],
  );

  const cellClasses = useMemo(
    () =>
      clsx(
        HEADER_CELL_CLASS,
        GRID_HEADER_ALIGN_CLASSES[column.align || HEADER_CELL_ALIGN_LEFT],
        isSortable && HEADER_CELL_CURSOR_POINTER_CLASS,
        isDragging && HEADER_CELL_DRAGGING_CLASS,
        isDragOver && HEADER_CELL_DRAG_OVER_CLASS,
        sortDirection && HEADER_CELL_SORTED_CLASS,
        stickySide && `${HEADER_CELL_POSITION_STICKY}-${stickySide}`,
        isPinEdgeLeft && PIN_EDGE_LEFT_CLASS,
        isPinEdgeRight && PIN_EDGE_RIGHT_CLASS,
      ),
    [column.align, isSortable, isDragging, isDragOver, sortDirection, stickySide, isPinEdgeLeft, isPinEdgeRight],
  );

  const cellStyle = useMemo(() => {
    const base: CSSProperties = {
      flexShrink: ZERO,
      ...(stickySide && {
        position: HEADER_CELL_POSITION_STICKY,
        [stickySide]: 0,
        zIndex: TWO,
        backgroundColor: HEADER_CELL_STICKY_BACKGROUND,
      }),
      ...column.headerStyle,
    };
    if (isColumnAutoSized) {
      base.width = HEADER_CELL_WIDTH_AUTO;
      base.minWidth = HEADER_CELL_MIN_WIDTH_MAX_CONTENT;
      base.maxWidth = HEADER_CELL_MAX_WIDTH_NONE;
      return base;
    }
    base.width = typeof columnState.width === 'number' ? `${columnState.width}px` : columnState.width;
    base.minWidth = column.minWidth || MIN_COLUMN_WIDTH;
    base.maxWidth = column.maxWidth || MAX_COLUMN_WIDTH;
    return base;
  }, [column, columnState.width, isColumnAutoSized, stickySide]);

  return {
    isSortable,
    isPinned,
    pinAria: isPinned ? GRID_HEADER_UNPIN_ARIA : GRID_HEADER_PIN_ARIA,
    headerContent,
    cellClasses: clsx(cellClasses, column.headerClassName ?? EMPTY_STRING),
    cellStyle,
    ariaSort: sortDirection ? ARIA_SORT_BY_DIRECTION[sortDirection] : ARIA_SORT_NONE,
    dragDropProps: enableDragDrop && column.draggable !== false ? { ...dragHandleProps, ...dropTargetProps } : {},
    handleClick,
    handleFilterClick,
    handlePinClick,
  };
}
