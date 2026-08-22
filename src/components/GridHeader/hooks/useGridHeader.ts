import { useCallback, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import type { FilterOperator, RowData } from '@/types';
import { useTableContext } from '@/context';
import { useDragDrop } from '@/hooks';
import {
  COLUMN_RESIZE_DOUBLE_CLICK_MS,
  MAX_COLUMN_WIDTH,
  MIN_COLUMN_WIDTH,
  ZERO,
} from '@/constants';
import { measureColumnContentWidth } from '@/utils/columnAutosize.utils';
import { resolveColumnSticky } from '@/utils/columnSticky.utils';
import type { GridHeaderProps } from '../GridHeader.types';
import {
  GRID_HEADER_BG_CLASS,
  GRID_HEADER_CLASS,
  GRID_HEADER_FLEX_CLASS,
  GRID_HEADER_PIN_LEFT,
  GRID_HEADER_PIN_RIGHT,
  GRID_HEADER_STICKY_CLASS,
  GRID_HEADER_TOP_CLASS,
  GRID_HEADER_Z_CLASS,
} from '../GridHeader.const';
import { findColumnState } from '../GridHeader.utils';

export interface UseGridHeaderReturn<T extends RowData> {
  state: ReturnType<typeof useTableContext<T>>['state'];
  actions: ReturnType<typeof useTableContext<T>>['actions'];
  dragDrop: ReturnType<typeof useDragDrop>;
  activeFilterColumn: string | null;
  openMenuColumnId: string | null;
  visibleColumns: GridHeaderProps<T>['columns'];
  pinEdgeIds: { lastLeftId: string | null; firstRightId: string | null };
  headerClasses: string;
  setOpenMenuColumnId: (columnId: string | null) => void;
  handleFilterClick: (columnId: string) => void;
  handleFilterApply: (columnId: string, value: unknown, operator: FilterOperator) => void;
  handleFilterClear: (columnId: string) => void;
  handleFilterClose: () => void;
  handlePinToggle: (columnId: string) => void;
  autoSizeColumn: (columnId: string) => void;
  handleResizeStart: (columnId: string, currentWidth: number) => (event: React.MouseEvent) => void;
}

/**
 * Owns GridHeader filter popup, resize, pin, and column-menu state.
 */
export function useGridHeader<T extends RowData>(props: GridHeaderProps<T>): UseGridHeaderReturn<T> {
  const { columns, columnStates, sticky = true } = props;
  const { state, actions, computed } = useTableContext<T>();
  const dragDrop = useDragDrop();
  const [activeFilterColumn, setActiveFilterColumn] = useState<string | null>(null);
  const [openMenuColumnId, setOpenMenuColumnId] = useState<string | null>(null);
  const resizeStartX = useRef<number>(ZERO);
  const resizeStartWidth = useRef<number>(ZERO);
  const lastResizeDownAt = useRef<number>(ZERO);

  const handleFilterClick = useCallback((columnId: string) => {
    setActiveFilterColumn((current) => (current === columnId ? null : columnId));
  }, []);

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

  const visibleColumns = useMemo(
    () =>
      columns
        .filter((column) => findColumnState(columnStates, column.id)?.visible !== false)
        .sort((left, right) => {
          const leftOrder = findColumnState(columnStates, left.id)?.order ?? ZERO;
          const rightOrder = findColumnState(columnStates, right.id)?.order ?? ZERO;
          return leftOrder - rightOrder;
        }),
    [columns, columnStates],
  );

  const pinEdgeIds = useMemo(() => {
    let lastLeftId: string | null = null;
    let firstRightId: string | null = null;
    for (const column of visibleColumns) {
      const side = resolveColumnSticky(column, findColumnState(columnStates, column.id));
      if (side === GRID_HEADER_PIN_LEFT) lastLeftId = column.id;
    }
    for (const column of visibleColumns) {
      const side = resolveColumnSticky(column, findColumnState(columnStates, column.id));
      if (side === GRID_HEADER_PIN_RIGHT) {
        firstRightId = column.id;
        break;
      }
    }
    return { lastLeftId, firstRightId };
  }, [visibleColumns, columnStates]);

  const handlePinToggle = useCallback(
    (columnId: string) => {
      const current = findColumnState(columnStates, columnId)?.pinned ?? null;
      if (current === GRID_HEADER_PIN_LEFT) {
        actions.pinColumn(columnId, GRID_HEADER_PIN_RIGHT);
        return;
      }
      if (current === GRID_HEADER_PIN_RIGHT) {
        actions.pinColumn(columnId, null);
        return;
      }
      actions.pinColumn(columnId, GRID_HEADER_PIN_LEFT);
    },
    [actions, columnStates],
  );

  const autoSizeColumn = useCallback(
    (columnId: string) => {
      const column = columns.find((item) => item.id === columnId);
      if (!column) return;
      actions.resizeColumn(columnId, measureColumnContentWidth(computed.sortedData as T[], column));
    },
    [actions, columns, computed.sortedData],
  );

  const handleResizeStart = useCallback(
    (columnId: string, currentWidth: number) => (event: React.MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      const now = Date.now();
      if (now - lastResizeDownAt.current <= COLUMN_RESIZE_DOUBLE_CLICK_MS) {
        lastResizeDownAt.current = ZERO;
        autoSizeColumn(columnId);
        return;
      }
      lastResizeDownAt.current = now;
      resizeStartX.current = event.clientX;
      resizeStartWidth.current = currentWidth;

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const delta = moveEvent.clientX - resizeStartX.current;
        actions.resizeColumn(
          columnId,
          Math.max(MIN_COLUMN_WIDTH, Math.min(MAX_COLUMN_WIDTH, resizeStartWidth.current + delta)),
        );
      };

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [actions, autoSizeColumn],
  );

  return {
    state,
    actions,
    dragDrop,
    activeFilterColumn,
    openMenuColumnId,
    visibleColumns,
    pinEdgeIds,
    headerClasses: clsx(
      GRID_HEADER_CLASS,
      GRID_HEADER_FLEX_CLASS,
      GRID_HEADER_BG_CLASS,
      sticky && [GRID_HEADER_STICKY_CLASS, GRID_HEADER_TOP_CLASS, GRID_HEADER_Z_CLASS],
    ),
    setOpenMenuColumnId,
    handleFilterClick,
    handleFilterApply,
    handleFilterClear,
    handleFilterClose,
    handlePinToggle,
    autoSizeColumn,
    handleResizeStart,
  };
}
