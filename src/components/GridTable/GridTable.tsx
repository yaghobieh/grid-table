import type { ReactNode, CSSProperties } from 'react';
import { useMemo, useCallback, useState, useEffect, useRef } from 'react';
import type { GridTableComponentProps } from './GridTable.types';
import type { ContextMenuAction, ContextMenuContext as CtxMenuCtx, EditHistoryEntry, RowData, TableEffects } from '@/types';
import { TableProvider, useTableContext } from '@/context';
import { useBreakpoint, useKeyboardNavigation, useRowReorder, useTreeData, useUndoRedo, useSavedViews, useVirtualizedWindow, useRangeSelection, useInfiniteScroll, useRowGroupExpansion } from '@/hooks';
import { FilterBuilder } from '../FilterBuilder';
import { ColumnGroupHeader } from '../ColumnGroupHeader';
import { getRowGroupMeta } from '@/utils/rowGroups.utils';
import { applyClipboardToRange, parseClipboardGrid } from '@/utils/transaction.utils';
import { applyFillDownFromRange, isBottomRightOfRange } from '@/utils/fillRange.utils';
import { getFlashCellClassName, scheduleFlashRemoval, buildFlashCellKey } from '@/utils/flashCells.utils';
import { RANGE_SELECTION_ACTIVE_CLASS, RANGE_SELECTION_ANCHOR_CLASS } from '@constants/rangeSelection.const';
import { FILL_HANDLE_KEY } from '@constants/fillHandle.const';
import {
  buildDisplayRows,
  resolveVirtualizeConfig,
  shouldEnableVirtualization,
  sliceVirtualRows,
} from './GridTable.display.utils';
import { GridHeader } from '../GridHeader';
import { GridBody } from '../GridBody';
import { Pagination as BearPagination, Typography, Select, BearProvider } from '@forgedevstack/bear';
import { Skeleton } from '../Skeleton';
import { TableStudioPanel } from '../TableStudioPanel';
import { EmptyState } from '../EmptyState';
import { MobileDrawer } from '../MobileDrawer';
import { ContextMenu } from '../ContextMenu';
import { StatusBar } from '../StatusBar';
import { copyToClipboard, exportToCSV, exportToExcel, exportToJSON, exportToPDF, printTable } from '@/utils/export.utils';
import { resolveExportData } from '@/utils/exportScope.utils';
import { resolveExportColumns } from '@/utils/exportColumns.utils';
import { copyRangeToClipboard } from '@/utils/rangeClipboard.utils';
import { DEFAULT_EXPORT_SCOPE } from '@constants/exportScope.const';
import {
  RANGE_COPY_MENU_ID,
  RANGE_COPY_MENU_LABEL,
  RANGE_COPY_SHORTCUT,
} from '@constants/rangeSelection.const';
import {
  CONTEXT_MENU_COPY_CELL,
  CONTEXT_MENU_FILTER_VALUE,
  CONTEXT_MENU_HIDE,
  CONTEXT_MENU_PIN_LEFT,
  CONTEXT_MENU_PIN_RIGHT,
} from '@constants/strings.const';
import {
  KEY_ARROW_DOWN,
  KEY_ARROW_LEFT,
  KEY_ARROW_RIGHT,
  KEY_ARROW_UP,
  KEY_C,
  KEY_ESCAPE,
  KEY_V,
} from '@constants/keyboard.const';
import { DEFAULT_LAZY_BATCH_SIZE, DEFAULT_LAZY_INITIAL_ROWS, ONE, ZERO } from '@constants/numbers.const';
import { resolveTableEffects } from './GridTable.utils';

function GridTableContent<T extends RowData>({
  data,
  columns,
  loading = false,
  error = null,
  emptyContent,
  loadingContent,
  errorContent,
  dimensions,
  classNames = {},
  styles = {},
  showMobileLabels = true,
  enableDragDrop = true,
  enableColumnResize = true,
  enableRowSelection = false,
  enableRowExpansion = false,
  stickyHeader = true,
  showPagination = true,
  showFilter = true,
  showGlobalFilter = true,
  onRowClick,
  onRowDoubleClick,
  onCellClick,
  onRowSelect: _onRowSelect,
  onSort: _onSort,
  onFilter: _onFilter,
  onPageChange,
  onError: _onError,
  onRetry,
  getRowId,
  getRowClassName,
  getRowStyle,
  isRowDisabled,
  renderRowExpansion,
  renderHeader,
  renderFooter,
  className = '',
  style,
  showOverflowTooltip: _showOverflowTooltip,
  enableCellAutoSizeOnDoubleClick: _enableCellAutoSizeOnDoubleClick,
  subCellExpandTrigger: _subCellExpandTrigger,
  expandRowOnDoubleClick,
  themeMode,
  paginationConfig,
  gridThemeVars,
  tableEffects,
  defaultExpandedIds,
  lazyLoad,
  enableExport,
  exportFileName,
  exportScope = DEFAULT_EXPORT_SCOPE,
  enableCellEdit,
  onCellEdit,
  contextMenu: contextMenuConfig,
  statusBar: statusBarConfig,
  frozenRows,
  treeData: treeConfig,
  keyboardNavigation: kbConfig,
  rowReorder: rowReorderConfig,
  onRowReorder,
  undoRedo: undoRedoConfig,
  onUndo,
  onRedo,
  printConfig,
  autoFit: _autoFit,
  enableCopy,
  mobileLayout = 'scroll',
  savedViews,
  advancedFilter: advancedFilterConfig,
  advancedFilterWhere,
  onAdvancedFilterChange,
  rowGroups,
  columnGroups,
  conditionalFormat: _conditionalFormat,
  masterDetail,
  virtualize,
  density = 'comfortable',
  columnStatePersistence,
  touchGestures,
  rangeSelection,
  infiniteScroll,
  flashCells,
  bulkEdit: _bulkEdit,
  alignColumnGroups = true,
}: Omit<GridTableComponentProps<T>, 'theme' | 'translations' | 'mobileBreakpoint' | 'filterConfig' | 'sortConfig'> & {
  advancedFilterWhere?: import('@/types/filter.types').FilterTreeGroup | null;
  onAdvancedFilterChange?: (where: import('@/types/filter.types').FilterTreeGroup | null) => void;
}): ReactNode {
  const { state, actions, computed } = useTableContext<T>();
  const savedViewsApi = useSavedViews(savedViews);
  const rowGroupExpansion = useRowGroupExpansion(rowGroups);
  const rangeApi = useRangeSelection(rangeSelection?.enabled === true);
  const infiniteApi = useInfiniteScroll(infiniteScroll, computed.paginatedData);
  const [activeFlashes, setActiveFlashes] = useState<Set<string>>(new Set());
  const { shouldShowMobileView, breakpointValue } = useBreakpoint();
  const stackedMobile = shouldShowMobileView && mobileLayout === 'stacked';
  const scrollMobile = shouldShowMobileView && mobileLayout === 'scroll';
  const showTableHeader = !shouldShowMobileView || scrollMobile;
  const mobileRootClass = scrollMobile ? 'gt-mobile gt-mobile-scroll' : stackedMobile ? 'gt-mobile gt-mobile-stacked' : '';

  const [ctxMenu, setCtxMenu] = useState<{ visible: boolean; x: number; y: number; context: CtxMenuCtx<T> | null }>({
    visible: false, x: 0, y: 0, context: null,
  });

  const visibleCols = useMemo(
    () =>
      resolveExportColumns({
        columns,
        columnStates: state.columnStates,
      }),
    [columns, state.columnStates],
  );
  const { focusedCell, setFocusedCell, handleKeyDown: kbHandleKeyDown, containerRef: kbRef, isEditing: kbIsEditing } =
    useKeyboardNavigation(computed.paginatedData.length, visibleCols.length, kbConfig);

  const onCellEditRef = useRef(onCellEdit);
  onCellEditRef.current = onCellEdit;
  const rangeRowsRef = useRef<T[]>([]);
  const visibleColsRef = useRef(visibleCols);
  visibleColsRef.current = visibleCols;
  const undoRedo = useUndoRedo(
    undoRedoConfig?.maxHistory,
    (e: EditHistoryEntry) => {
      onCellEditRef.current?.(e.rowId, e.columnId, e.oldValue);
      onUndo?.(e.rowId, e.columnId, e.oldValue);
    },
    (e: EditHistoryEntry) => {
      onCellEditRef.current?.(e.rowId, e.columnId, e.newValue);
      onRedo?.(e.rowId, e.columnId, e.newValue);
    },
  );

  const tree = useTreeData(data, treeConfig);

  const defaultCtxActions = useMemo((): ContextMenuAction<T>[] => {
    const acts: ContextMenuAction<T>[] = [];
    if (contextMenuConfig?.showCopy !== false) {
      acts.push({
        id: 'copy',
        label: CONTEXT_MENU_COPY_CELL,
        shortcut: RANGE_COPY_SHORTCUT,
        onClick: (ctx) => navigator.clipboard?.writeText(ctx.value == null ? '' : String(ctx.value)),
      });
    }
    if (rangeSelection?.enabled && rangeSelection.enableCopy !== false) {
      acts.push({
        id: RANGE_COPY_MENU_ID,
        label: RANGE_COPY_MENU_LABEL,
        shortcut: RANGE_COPY_SHORTCUT,
        onClick: () => {
          copyRangeToClipboard(rangeRowsRef.current, visibleColsRef.current, rangeApi.range);
        },
      });
    }
    if (contextMenuConfig?.showFilter !== false) {
      acts.push({
        id: 'filter',
        label: CONTEXT_MENU_FILTER_VALUE,
        onClick: (ctx) => actions.setFilter(ctx.columnId, ctx.value, 'equals'),
      });
    }
    if (contextMenuConfig?.showPin !== false) {
      acts.push({
        id: 'pin-left',
        label: CONTEXT_MENU_PIN_LEFT,
        onClick: (ctx) => {
          const cs = state.columnStates.find(c => c.id === ctx.columnId);
          actions.pinColumn(ctx.columnId, cs?.pinned === 'left' ? null : 'left');
        },
      });
      acts.push({
        id: 'pin-right',
        label: CONTEXT_MENU_PIN_RIGHT,
        onClick: (ctx) => {
          const cs = state.columnStates.find(c => c.id === ctx.columnId);
          actions.pinColumn(ctx.columnId, cs?.pinned === 'right' ? null : 'right');
        },
      });
    }
    if (contextMenuConfig?.showHide !== false) {
      acts.push({
        id: 'divider-hide',
        label: '',
        divider: true,
        onClick: () => {},
      });
      acts.push({
        id: 'hide',
        label: CONTEXT_MENU_HIDE,
        onClick: (ctx) => actions.toggleColumnVisibility(ctx.columnId),
      });
    }
    return [...acts, ...(contextMenuConfig?.actions ?? [])];
  }, [contextMenuConfig, actions, state.columnStates, rangeSelection, rangeApi.range]);

  const openContextMenuAt = useCallback((row: T, rowIndex: number, x: number, y: number, columnId = '') => {
    if (!contextMenuConfig?.enabled) return;
    const col = columns.find(c => c.id === columnId);
    const value = col
      ? (typeof col.accessor === 'function' ? col.accessor(row) : (row as Record<string, unknown>)[col.accessor as string])
      : undefined;
    setCtxMenu({ visible: true, x, y, context: { row, rowIndex, columnId, value } });
  }, [contextMenuConfig, columns]);

  const handleContextMenu = useCallback((row: T, rowIndex: number, e: React.MouseEvent) => {
    if (!contextMenuConfig?.enabled) return;
    e.preventDefault();
    const target = (e.target as HTMLElement).closest('[data-column-id]') as HTMLElement | null;
    const columnId = target?.dataset.columnId ?? '';
    openContextMenuAt(row, rowIndex, e.clientX, e.clientY, columnId);
  }, [contextMenuConfig, openContextMenuAt]);

  const handleLongPressContextMenu = useCallback((row: T, rowIndex: number, clientX: number, clientY: number) => {
    if (!contextMenuConfig?.enabled || touchGestures?.longPressContextMenu !== true) return;
    openContextMenuAt(row, rowIndex, clientX, clientY);
  }, [contextMenuConfig, touchGestures?.longPressContextMenu, openContextMenuAt]);

  const handleRangeMouseDown = useCallback((rowIndex: number, colIndex: number, event: React.MouseEvent) => {
    if (!rangeSelection?.enabled) return;
    if (event.button !== 0) return;
    event.preventDefault();
    rangeApi.handleCellMouseDown({ rowIndex, colIndex });
  }, [rangeSelection?.enabled, rangeApi]);

  const handleRangeMouseEnter = useCallback((rowIndex: number, colIndex: number) => {
    if (!rangeSelection?.enabled) return;
    rangeApi.handleCellMouseEnter({ rowIndex, colIndex });
  }, [rangeSelection?.enabled, rangeApi]);

  const handleFillHandleMouseDown = useCallback((rowIndex: number, colIndex: number, event: React.MouseEvent) => {
    if (!rangeSelection?.enabled || rangeSelection.fillHandle === false) return;
    if (event.button !== 0) return;
    rangeApi.beginFillDrag();
    rangeApi.setFocusCoord({ rowIndex, colIndex });
  }, [rangeSelection, rangeApi]);

  const showFillHandleForCell = useCallback((rowIndex: number, colIndex: number) => {
    if (!rangeSelection?.enabled || rangeSelection.fillHandle === false || !enableCellEdit) return false;
    return isBottomRightOfRange(rangeApi.range, rowIndex, colIndex);
  }, [rangeSelection, enableCellEdit, rangeApi.range]);

  const themeClass = themeMode === 'dark' ? 'dark' : themeMode === 'light' ? 'light' : undefined;
  const hasGridThemeVars = gridThemeVars && Object.keys(gridThemeVars).length > 0;

  const fx = useMemo(() => resolveTableEffects(tableEffects), [tableEffects]);

  const shouldShowExport = useCallback((format: 'csv' | 'json' | 'excel' | 'pdf'): boolean => {
    if (enableExport === true) return true;
    if (enableExport === format) return true;
    if (Array.isArray(enableExport)) return enableExport.includes(format);
    return false;
  }, [enableExport]);

  const didInitExpand = useRef(false);
  useEffect(() => {
    if (defaultExpandedIds && defaultExpandedIds.length > 0 && !didInitExpand.current) {
      didInitExpand.current = true;
      defaultExpandedIds.forEach((id) => actions.expandRow(id));
    }
  }, [defaultExpandedIds, actions]);

  const lazyEnabled = lazyLoad?.enabled ?? false;
  const lazyInitial = lazyLoad?.initialRows ?? DEFAULT_LAZY_INITIAL_ROWS;
  const lazyBatch = lazyLoad?.batchSize ?? DEFAULT_LAZY_BATCH_SIZE;
  const [lazyVisibleCount, setLazyVisibleCount] = useState(lazyEnabled ? lazyInitial : Infinity);
  const [lazyLoading, setLazyLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lazyEnabled) setLazyVisibleCount(lazyInitial);
  }, [lazyEnabled, lazyInitial, state.data.length]);

  useEffect(() => {
    if (!lazyEnabled || !sentinelRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !lazyLoading) {
          setLazyLoading(true);
          setTimeout(() => {
            setLazyVisibleCount((prev) => prev + lazyBatch);
            setLazyLoading(false);
          }, 300);
        }
      },
      { rootMargin: '100px' }
    );
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [lazyEnabled, lazyBatch, lazyLoading]);

  const getRowIdFn = useCallback(
    (row: T): string | number => {
      if (getRowId) return getRowId(row);
      if ('id' in row) return row.id as string | number;
      return data.indexOf(row);
    },
    [getRowId, data]
  );

  const exportData = useMemo(
    () =>
      resolveExportData({
        scope: exportScope,
        allData: state.data,
        filteredData: computed.filteredData,
        sortedData: computed.sortedData,
        selectedIds: state.selectedIds,
        getRowId: getRowIdFn,
      }),
    [exportScope, state.data, computed.filteredData, computed.sortedData, state.selectedIds, getRowIdFn],
  );

  const exportColumns = visibleCols;

  const rowReorder = useRowReorder<T>(data, getRowIdFn, onRowReorder);

  const handleCellSave = useCallback(
    (rowId: string | number, columnId: string, oldValue: unknown, newValue: unknown) => {
      if (undoRedoConfig?.enabled) {
        undoRedo.pushEdit({ rowId, columnId, oldValue, newValue });
      }
      onCellEdit?.(rowId, columnId, newValue);
    },
    [undoRedoConfig?.enabled, undoRedo, onCellEdit],
  );

  const handleRowSelect = useCallback(
    (id: string | number, selected: boolean) => {
      if (selected) {
        actions.selectRow(id);
      } else {
        actions.deselectRow(id);
      }
    },
    [actions]
  );

  const handleRowExpand = useCallback(
    (id: string | number, expanded: boolean) => {
      if (expanded) {
        actions.expandRow(id);
      } else {
        actions.collapseRow(id);
      }
    },
    [actions]
  );

  const handleRowDoubleClick = useCallback(
    (row: T, index: number) => {
      if (expandRowOnDoubleClick) {
        actions.toggleRowExpansion(getRowIdFn(row));
      }
      onRowDoubleClick?.(row, index);
    },
    [expandRowOnDoubleClick, actions, getRowIdFn, onRowDoubleClick]
  );

  const handleSelectAll = useCallback(() => {
    if (computed.allSelected) {
      actions.deselectAll();
    } else {
      actions.selectAll();
    }
  }, [computed.allSelected, actions]);

  const handleFilterOpen = useCallback(
    (columnId: string) => {
      if (shouldShowMobileView) {
        actions.openMobileDrawer('filter');
      } else {
        actions.setActiveFilterColumn(columnId);
      }
    },
    [shouldShowMobileView, actions]
  );

  const containerStyle = useMemo(() => {
    const baseStyle: React.CSSProperties = { ...style, ...styles.root };

    if (dimensions?.width) {
      baseStyle.width = breakpointValue(dimensions.width, 'auto');
    }
    if (dimensions?.height) {
      baseStyle.height = breakpointValue(dimensions.height, 'auto');
    }
    if (dimensions?.maxHeight) {
      baseStyle.maxHeight = breakpointValue(dimensions.maxHeight, 'none');
    }

    return baseStyle;
  }, [style, styles.root, dimensions, breakpointValue]);

  const columnWidths = useMemo(() => {
    return state.columnStates.map((cs) => cs.width);
  }, [state.columnStates]);

  const isEmpty = computed.paginatedData.length === 0;

  const sourceRows = infiniteScroll?.enabled ? infiniteApi.rows : computed.paginatedData;

  const displayPipeline = useMemo(
    () => buildDisplayRows({
      rows: sourceRows,
      columns,
      rowGroups,
      collapsedGroupKeys: rowGroupExpansion.collapsedKeys,
      defaultGroupExpanded: rowGroups?.[0]?.defaultExpanded,
    }),
    [sourceRows, columns, rowGroups, rowGroupExpansion.collapsedKeys],
  );

  const displayData = useMemo(() => {
    const baseRows = displayPipeline.bodyRows;
    if (!lazyEnabled) return baseRows;
    return baseRows.slice(0, lazyVisibleCount);
  }, [lazyEnabled, lazyVisibleCount, displayPipeline.bodyRows]);

  const virtualizeConfig = useMemo(() => resolveVirtualizeConfig(virtualize), [virtualize]);
  const virtualizationEnabled = shouldEnableVirtualization(displayData.length, virtualizeConfig);
  const virtualWindow = useVirtualizedWindow({
    itemCount: displayData.length,
    enabled: virtualizationEnabled,
    rowHeight: virtualizeConfig.rowHeight,
    overscan: virtualizeConfig.overscan,
  });
  const virtualizedRows = useMemo(
    () => sliceVirtualRows(displayData, virtualWindow.startIndex, virtualWindow.endIndex),
    [displayData, virtualWindow.startIndex, virtualWindow.endIndex],
  );
  const bodyRows = virtualizationEnabled ? virtualizedRows : displayData;
  const rowIndexOffset = virtualizationEnabled ? virtualWindow.startIndex : ZERO;
  rangeRowsRef.current = displayData;

  const mergedFrozenBottom = useMemo(() => {
    const manual = frozenRows?.bottom ?? [];
    return [...manual, ...displayPipeline.pinnedBottomRows];
  }, [frozenRows?.bottom, displayPipeline.pinnedBottomRows]);

  const handleEditNavigate = useCallback(
    (rowIndex: number, colIndex: number, direction: 1 | -1) => {
      let nextCol = colIndex + direction;
      let nextRow = rowIndex;
      while (nextRow >= ZERO && nextRow < displayData.length) {
        while (nextCol >= ZERO && nextCol < visibleCols.length) {
          const column = visibleCols[nextCol];
          if (column?.editable) {
            setFocusedCell({ rowIndex: nextRow, colIndex: nextCol });
            return;
          }
          nextCol += direction;
        }
        nextRow += direction;
        nextCol = direction > ZERO ? ZERO : visibleCols.length - ONE;
      }
    },
    [displayData.length, visibleCols, setFocusedCell],
  );

  const effectiveRowExpansion = masterDetail?.enabled && masterDetail.renderPanel
    ? (row: T, rowId: string | number) => masterDetail.renderPanel?.(row) ?? null
    : renderRowExpansion;

  const mergedRowClassName = useCallback(
    (row: T, index: number) => {
      const base = getRowClassName?.(row, index) ?? '';
      const meta = getRowGroupMeta(row);
      if (meta?.isGroupFooter) return `${base} gt-row-group-footer`.trim();
      if (meta?.isGroupHeader) return `${base} gt-row-group-header`.trim();
      return base;
    },
    [getRowClassName],
  );

  const getCellClassName = useCallback(
    (rowIndex: number, columnId: string) => {
      const colIndex = visibleCols.findIndex((col) => col.id === columnId);
      const classes: string[] = [];
      if (rangeApi.isCellInRange(rowIndex, colIndex)) {
        classes.push(RANGE_SELECTION_ACTIVE_CLASS);
      }
      if (rangeApi.isAnchorCell(rowIndex, colIndex)) {
        classes.push(RANGE_SELECTION_ANCHOR_CLASS);
      }
      if (flashCells?.enabled !== false) {
        const row = displayData[rowIndex];
        if (row) {
          const flashClass = getFlashCellClassName(getRowIdFn(row), columnId, activeFlashes);
          if (flashClass) classes.push(flashClass);
        }
      }
      return classes.join(' ');
    },
    [visibleCols, rangeApi, flashCells?.enabled, displayData, activeFlashes, getRowIdFn],
  );

  const handleContainerScroll = useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      const target = event.currentTarget;
      infiniteApi.handleScroll(target.scrollTop, target.scrollHeight, target.clientHeight);
      if (virtualizationEnabled) {
        virtualWindow.onScroll();
      }
    },
    [infiniteApi, virtualizationEnabled, virtualWindow],
  );

  useEffect(() => {
    if (!rangeSelection?.enabled) return;
    const handleRangeKeys = async (event: KeyboardEvent) => {
      if (event.key === KEY_ESCAPE && !kbIsEditing) {
        if (rangeApi.range) {
          event.preventDefault();
          rangeApi.clearRange();
        }
        return;
      }

      if (
        event.shiftKey &&
        !kbIsEditing &&
        (event.key === KEY_ARROW_UP ||
          event.key === KEY_ARROW_DOWN ||
          event.key === KEY_ARROW_LEFT ||
          event.key === KEY_ARROW_RIGHT)
      ) {
        const maxRow = Math.max(ZERO, displayData.length - ONE);
        const maxCol = Math.max(ZERO, visibleCols.length - ONE);
        const next = rangeApi.extendWithArrowKey(event.key, maxRow, maxCol, focusedCell);
        if (next) {
          event.preventDefault();
          setFocusedCell(next);
        }
        return;
      }

      const meta = event.metaKey || event.ctrlKey;
      if (!meta || !rangeApi.range) return;

      if (event.key.toLowerCase() === KEY_C && rangeSelection.enableCopy !== false) {
        event.preventDefault();
        copyRangeToClipboard(displayData, visibleCols, rangeApi.range);
        return;
      }

      if (!enableCellEdit) return;

      if (event.key.toLowerCase() === KEY_V && rangeSelection.enablePaste !== false) {
        event.preventDefault();
        const text = await navigator.clipboard.readText();
        const matrix = parseClipboardGrid(text);
        if (matrix.length === 0) return;
        applyClipboardToRange(matrix, displayData, visibleCols, rangeApi.range, (row, columnId, value) => {
          const rowId = getRowIdFn(row);
          onCellEditRef.current?.(rowId, columnId, value);
          if (flashCells?.enabled !== false) {
            scheduleFlashRemoval([buildFlashCellKey(rowId, columnId)], activeFlashes, setActiveFlashes, flashCells?.durationMs);
          }
        });
        return;
      }

      if (event.key.toLowerCase() === FILL_HANDLE_KEY && rangeSelection.fillHandle !== false) {
        event.preventDefault();
        applyFillDownFromRange(displayData, visibleCols, rangeApi.range, (row, columnId, value) => {
          const rowId = getRowIdFn(row);
          onCellEditRef.current?.(rowId, columnId, value);
          if (flashCells?.enabled !== false) {
            scheduleFlashRemoval([buildFlashCellKey(rowId, columnId)], activeFlashes, setActiveFlashes, flashCells?.durationMs);
          }
        });
      }
    };
    window.addEventListener('keydown', handleRangeKeys);
    return () => window.removeEventListener('keydown', handleRangeKeys);
  }, [
    rangeSelection,
    rangeApi,
    enableCellEdit,
    displayData,
    visibleCols,
    getRowIdFn,
    flashCells,
    activeFlashes,
    kbIsEditing,
    focusedCell,
    setFocusedCell,
  ]);

  useEffect(() => {
    if (!rangeSelection?.enabled || !rangeApi.isFilling || !rangeApi.range || !enableCellEdit) return;
    if (rangeSelection.fillHandle === false) return;
    const onUp = () => {
      applyFillDownFromRange(displayData, visibleCols, rangeApi.range!, (row, columnId, value) => {
        const rowId = getRowIdFn(row);
        onCellEditRef.current?.(rowId, columnId, value);
        if (flashCells?.enabled !== false) {
          scheduleFlashRemoval([buildFlashCellKey(rowId, columnId)], activeFlashes, setActiveFlashes, flashCells?.durationMs);
        }
      });
      rangeApi.handleMouseUp();
    };
    window.addEventListener('mouseup', onUp);
    return () => window.removeEventListener('mouseup', onUp);
  }, [rangeSelection, rangeApi.isFilling, rangeApi.range, enableCellEdit, visibleCols, displayData, getRowIdFn, flashCells, activeFlashes, rangeApi]);
  useEffect(() => {
    rangeSelection?.onRangeChange?.(rangeApi.range);
  }, [rangeSelection, rangeApi.range]);

  useEffect(() => {
    if (!columnStatePersistence?.persistKey) return;
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(
      columnStatePersistence.persistKey,
      JSON.stringify(state.columnStates),
    );
    columnStatePersistence.onStateChange?.(state.columnStates);
  }, [state.columnStates, columnStatePersistence]);

  const hasMoreLazy = lazyEnabled && lazyVisibleCount < computed.paginatedData.length;

  if (error) {
    const errorMessage = typeof error === 'string' ? error : error.message;
    if (errorContent) {
      return (
        <div className={`grid-table-error ${classNames.root || ''} ${className}`} style={containerStyle}>
          {typeof errorContent === 'function' ? errorContent(error) : errorContent}
        </div>
      );
    }

    return (
      <div className={`grid-table-error ${classNames.root || ''} ${className}`} style={containerStyle}>
        <EmptyState
          title={state.translations.errorLoading}
          description={errorMessage}
          action={
            onRetry && (
              <button
                onClick={onRetry}
                className="px-4 py-2 bg-accent-primary text-white rounded hover:opacity-90 cursor-pointer"
              >
                {state.translations.retry}
              </button>
            )
          }
        />
      </div>
    );
  }

  if (loading) {
    if (loadingContent) {
      return (
        <div className={`grid-table-loading ${classNames.root || ''} ${className}`} style={containerStyle}>
          {loadingContent}
        </div>
      );
    }

    return (
      <div className={`grid-table-loading ${classNames.root || ''} ${className}`} style={containerStyle}>
        <Skeleton
          rows={5}
          columns={columns.length}
          columnWidths={columnWidths}
          showHeader={true}
          animate={true}
          className={classNames.skeleton}
          style={styles.skeleton}
        />
      </div>
    );
  }

  const tableContent = (
    <div
      ref={kbConfig?.enabled ? kbRef as React.RefObject<HTMLDivElement> : undefined}
      className={`grid-table rounded-lg border overflow-hidden ${mobileRootClass} gt-density-${density} ${touchGestures?.enabled ? 'gt-touch-gestures' : ''} ${fx.sort ? 'gt-sort-animated' : ''} ${fx.row ? 'gt-row-animated' : ''} ${fx.hover ? 'gt-hover-effect' : ''} ${fx.className} ${classNames.root || ''} ${className}`}
      style={containerStyle}
      role="table"
      tabIndex={kbConfig?.enabled ? 0 : undefined}
      onKeyDown={kbConfig?.enabled ? kbHandleKeyDown : undefined}
      onMouseUp={rangeSelection?.enabled ? rangeApi.handleMouseUp : undefined}
    >
      {renderHeader && <div className="grid-table-custom-header">{renderHeader()}</div>}

      {savedViews?.showViewSwitcher && savedViewsApi.views.length > 0 && (
        <div className="grid-table-view-switcher">
          {savedViewsApi.views.map((view) => (
            <button
              key={view.id}
              type="button"
              className={`grid-table-view-chip ${savedViewsApi.activeViewId === view.id ? 'is-active' : ''}`}
              onClick={() => savedViewsApi.setActiveViewId(view.id)}
            >
              {view.label}
            </button>
          ))}
        </div>
      )}

      {advancedFilterConfig?.showBuilder && onAdvancedFilterChange && (
        <FilterBuilder
          value={advancedFilterWhere ?? null}
          fields={columns.map((col) => ({
            id: col.id,
            label: typeof col.header === 'string' ? col.header : col.id,
          }))}
          onChange={onAdvancedFilterChange}
          onApply={onAdvancedFilterChange}
          className="grid-table-advanced-filter"
        />
      )}

      {showGlobalFilter && (
        <div className="grid-table-toolbar">
          <div className="toolbar-search-wrapper">
            <svg
              className="search-icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={state.globalFilter}
              onChange={(e) => actions.setGlobalFilter(e.target.value)}
              placeholder={state.translations.search}
              className="w-full pl-10 pr-3 py-2 text-sm rounded"
            />
            {state.globalFilter && (
              <button
                onClick={() => actions.setGlobalFilter('')}
                className="clear-button"
                aria-label="Clear search"
              >
                <svg className="icon-md" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {enableExport && (
            <div className="toolbar-export-actions" style={{ display: 'flex', gap: '0.25rem' }}>
              {shouldShowExport('csv') && (
                <button
                  onClick={() => exportToCSV(exportData, exportColumns, exportFileName)}
                  className="toolbar-action-button"
                  aria-label="Export CSV"
                  title="Export CSV"
                >
                  <svg className="icon-md" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </button>
              )}
              {shouldShowExport('json') && (
                <button
                  onClick={() => exportToJSON(exportData, exportColumns, exportFileName)}
                  className="toolbar-action-button"
                  aria-label="Export JSON"
                  title="Export JSON"
                >
                  <svg className="icon-md" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </button>
              )}
              {shouldShowExport('excel') && (
                <button
                  onClick={() => exportToExcel(exportData, exportColumns, exportFileName)}
                  className="toolbar-action-button"
                  aria-label="Export Excel"
                  title="Export Excel"
                >
                  <svg className="icon-md" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </button>
              )}
              {shouldShowExport('pdf') && (
                <button
                  onClick={() => exportToPDF(exportData, exportColumns, exportFileName, printConfig?.title)}
                  className="toolbar-action-button"
                  aria-label="Export PDF"
                  title="Export PDF"
                >
                  <svg className="icon-md" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </button>
              )}
            </div>
          )}

          {enableCopy && (
            <button
              onClick={() => copyToClipboard(exportData, exportColumns)}
              className="toolbar-action-button"
              aria-label="Copy to clipboard"
              title="Copy to clipboard"
            >
              <svg className="icon-md" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          )}

          {printConfig?.enabled && (
            <button
              onClick={() => printTable(exportData, exportColumns, printConfig?.title)}
              className="toolbar-action-button"
              aria-label="Print"
              title="Print"
            >
              <svg className="icon-md" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
            </button>
          )}

          {undoRedoConfig?.enabled && (
            <div className="toolbar-undo-redo" style={{ display: 'flex', gap: '0.25rem' }}>
              <button
                onClick={() => undoRedo.undo()}
                className="toolbar-action-button"
                aria-label="Undo"
                title="Undo (Ctrl+Z)"
                disabled={!undoRedo.canUndo}
                style={{ opacity: undoRedo.canUndo ? 1 : 0.4 }}
              >
                <svg className="icon-md" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
              </button>
              <button
                onClick={() => undoRedo.redo()}
                className="toolbar-action-button"
                aria-label="Redo"
                title="Redo (Ctrl+Y)"
                disabled={!undoRedo.canRedo}
                style={{ opacity: undoRedo.canRedo ? 1 : 0.4 }}
              >
                <svg className="icon-md" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 10H11a8 8 0 00-8 8v2m18-10l-6 6m6-6l-6-6" />
                </svg>
              </button>
            </div>
          )}

          {state.filters.length > 0 && (
            <button
              onClick={() => actions.clearFilters()}
              className="filter-badge"
            >
              <svg className="icon-md" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>{state.filters.length} filter{state.filters.length > 1 ? 's' : ''}</span>
            </button>
          )}

          {shouldShowMobileView && (
            <div className="toolbar-actions">
              <button
                onClick={() => actions.openMobileDrawer('filter')}
                className="toolbar-action-button"
                aria-label={state.translations.filter}
              >
                <svg className="icon-md" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </button>
              <button
                onClick={() => actions.openMobileDrawer('sort')}
                className="toolbar-action-button"
                aria-label={state.translations.sort}
              >
                <svg className="icon-md" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
              </button>
              <button
                onClick={() => actions.openMobileDrawer('columns')}
                className="toolbar-action-button"
                aria-label={state.translations.columns}
              >
                <svg className="icon-md" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                </svg>
              </button>
            </div>
          )}
        </div>
      )}

      <div
        ref={virtualizationEnabled ? virtualWindow.scrollRef : undefined}
        className="grid-table-container overflow-auto"
        style={virtualizationEnabled ? { maxHeight: dimensions?.maxHeight ? undefined : '480px' } : undefined}
        onScroll={handleContainerScroll}
      >
        {alignColumnGroups && columnGroups && columnGroups.length > 0 && showTableHeader && (
          <ColumnGroupHeader
            columnGroups={columnGroups}
            visibleColumns={visibleCols}
            columnStates={state.columnStates}
            enableSelection={enableRowSelection}
            enableExpansion={enableRowExpansion}
          />
        )}
        {showTableHeader && (
          <GridHeader
            columns={columns}
            columnStates={state.columnStates}
            className={classNames.header}
            style={styles.header}
            sticky={stickyHeader}
            enableSort={true}
            enableFilter={showFilter}
            enableDragDrop={enableDragDrop}
            enableResize={enableColumnResize}
            enableSelection={enableRowSelection}
            enableExpansion={enableRowExpansion}
            allSelected={computed.allSelected}
            someSelected={computed.someSelected}
            onSelectAll={handleSelectAll}
            onFilterOpen={handleFilterOpen}
            getSortDirection={(colId) => {
              const sort = state.sorting.find((s) => s.columnId === colId);
              return sort?.direction ?? null;
            }}
          />
        )}

        {isEmpty ? (
          emptyContent || (
            <EmptyState
              className={classNames.empty}
              style={styles.empty}
            />
          )
        ) : (
          <>
            {virtualizationEnabled && (
              <div style={{ height: virtualWindow.offsetY }} aria-hidden />
            )}

            {frozenRows?.top && frozenRows.top.length > 0 && (
              <GridBody
                data={frozenRows.top}
                columns={columns}
                columnStates={state.columnStates}
                className={`gt-frozen-top ${classNames.body || ''}`}
                style={{ ...styles.body, position: 'sticky', top: stickyHeader ? 'var(--gt-header-height, 40px)' : 0, zIndex: 1, background: 'var(--gt-bg-primary, #fff)' }}
                applyHiddenOnMobile={stackedMobile}
                stackedMobileLayout={stackedMobile}
                showMobileLabels={showMobileLabels}
                enableSelection={enableRowSelection}
                enableExpansion={enableRowExpansion}
                selectedIds={state.selectedIds}
                expandedIds={state.expandedIds}
                onRowClick={onRowClick}
                onRowDoubleClick={handleRowDoubleClick}
                onCellClick={onCellClick}
                onRowSelect={handleRowSelect}
                onRowExpand={handleRowExpand}
                getRowId={getRowIdFn}
                getRowClassName={getRowClassName}
                getRowStyle={getRowStyle}
                isRowDisabled={isRowDisabled}
                renderRowExpansion={renderRowExpansion}
              />
            )}

            <GridBody
              data={treeConfig?.enabled ? tree.flatRows.map(r => r.data) : bodyRows}
              columns={columns}
              columnStates={state.columnStates}
              rowIndexOffset={treeConfig?.enabled ? ZERO : rowIndexOffset}
              className={classNames.body}
              style={styles.body}
              applyHiddenOnMobile={stackedMobile}
              stackedMobileLayout={stackedMobile}
              showMobileLabels={showMobileLabels}
              enableSelection={enableRowSelection}
              enableExpansion={enableRowExpansion}
              selectedIds={state.selectedIds}
              expandedIds={state.expandedIds}
              onRowClick={onRowClick}
              onRowDoubleClick={handleRowDoubleClick}
              onCellClick={onCellClick}
              onRowSelect={handleRowSelect}
              onRowExpand={handleRowExpand}
              getRowId={getRowIdFn}
              getRowClassName={mergedRowClassName}
              getRowStyle={getRowStyle}
              isRowDisabled={isRowDisabled}
              renderRowExpansion={effectiveRowExpansion}
              onRowContextMenu={contextMenuConfig?.enabled ? handleContextMenu : undefined}
              onLongPressContextMenu={
                contextMenuConfig?.enabled && touchGestures?.longPressContextMenu
                  ? handleLongPressContextMenu
                  : undefined
              }
              rowDragProps={rowReorderConfig?.enabled ? rowReorder.getRowDragProps : undefined}
              draggingRowId={rowReorder.draggingRowId}
              dragOverRowId={rowReorder.dragOverRowId}
              treeIndents={treeConfig?.enabled ? new Map(tree.flatRows.map(r => [getRowIdFn(r.data), tree.getIndent(r.depth)])) : undefined}
              treeToggle={treeConfig?.enabled ? tree.toggleExpand : undefined}
              treeHasChildren={treeConfig?.enabled ? ((id) => tree.flatRows.some(r => getRowIdFn(r.data) === id && r.hasChildren)) : undefined}
              treeIsExpanded={treeConfig?.enabled ? tree.isExpanded : undefined}
              focusedCell={focusedCell}
              enableCellEdit={enableCellEdit}
              onCellSave={handleCellSave}
              onEditNavigate={enableCellEdit ? handleEditNavigate : undefined}
              selectOnEditFocus={kbConfig?.selectOnEditFocus !== false}
              onGroupToggle={rowGroupExpansion.toggleGroup}
              isGroupExpanded={rowGroupExpansion.isExpanded}
              getCellClassName={rangeSelection?.enabled || flashCells?.enabled ? getCellClassName : undefined}
              touchGestures={touchGestures}
              onRangeMouseDown={rangeSelection?.enabled ? handleRangeMouseDown : undefined}
              onRangeMouseEnter={rangeSelection?.enabled ? handleRangeMouseEnter : undefined}
              onFillHandleMouseDown={
                rangeSelection?.enabled && rangeSelection.fillHandle !== false
                  ? handleFillHandleMouseDown
                  : undefined
              }
              showFillHandleForCell={
                rangeSelection?.enabled && rangeSelection.fillHandle !== false
                  ? showFillHandleForCell
                  : undefined
              }
            />
            {hasMoreLazy && (
              <div ref={sentinelRef} className="gt-lazy-sentinel" style={{ padding: '0.75rem', textAlign: 'center' }}>
                {lazyLoading && (
                  lazyLoad?.loadingContent ?? (
                    <div className="gt-lazy-loader" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', opacity: 0.6 }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="gt-spin">
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                      </svg>
                      <span style={{ fontSize: '0.8rem' }}>Loading…</span>
                    </div>
                  )
                )}
              </div>
            )}

            {virtualizationEnabled && (
              <div
                style={{ height: Math.max(virtualWindow.totalHeight - virtualWindow.offsetY - bodyRows.length * (virtualizeConfig.rowHeight ?? 48), 0) }}
                aria-hidden
              />
            )}

            {mergedFrozenBottom.length > 0 && (
              <GridBody
                data={mergedFrozenBottom}
                columns={columns}
                columnStates={state.columnStates}
                className={`gt-frozen-bottom ${classNames.body || ''}`}
                style={{ ...styles.body, position: 'sticky', bottom: 0, zIndex: 1, background: 'var(--gt-bg-primary, #fff)' }}
                applyHiddenOnMobile={stackedMobile}
                stackedMobileLayout={stackedMobile}
                showMobileLabels={showMobileLabels}
                enableSelection={enableRowSelection}
                enableExpansion={enableRowExpansion}
                selectedIds={state.selectedIds}
                expandedIds={state.expandedIds}
                onRowClick={onRowClick}
                onRowDoubleClick={handleRowDoubleClick}
                onCellClick={onCellClick}
                onRowSelect={handleRowSelect}
                onRowExpand={handleRowExpand}
                getRowId={getRowIdFn}
                getRowClassName={getRowClassName}
                getRowStyle={getRowStyle}
                isRowDisabled={isRowDisabled}
                renderRowExpansion={renderRowExpansion}
              />
            )}
          </>
        )}
      </div>

      {showPagination && !isEmpty && (
        <div className={`grid-pagination ${classNames.pagination ?? ''}`} style={styles.pagination} role="navigation" aria-label="Pagination">
          <div className="grid-pagination-info">
            <Typography component="span" variant="body2" color="secondary">
              {(state.page - 1) * state.pageSize + 1}-{Math.min(state.page * state.pageSize, computed.effectiveTotalItems)} {state.translations.of} {computed.effectiveTotalItems}
            </Typography>
            <Typography component="span" variant="caption" color="secondary" className="bear-sr-only">{state.translations.rowsPerPage}</Typography>
            <Select
              value={String(state.pageSize)}
              onChange={(value) => {
                const pageSize = Number(value);
                actions.setPageSize(pageSize);
                onPageChange?.(1, pageSize);
              }}
              options={(paginationConfig?.pageSizeOptions ?? [10, 20, 50, 100]).map((size) => ({ value: String(size), label: String(size) }))}
              size="sm"
            />
          </div>
          <div className="grid-pagination-controls">
            <BearPagination
              count={Math.max(1, computed.totalPages)}
              page={state.page}
              onChange={(page) => {
                actions.setPage(page);
                onPageChange?.(page, state.pageSize);
              }}
              showFirstLast
              showPrevNext
              size="sm"
              variant="outlined"
            />
          </div>
        </div>
      )}

      {statusBarConfig?.enabled && (
        <StatusBar
          config={statusBarConfig}
          data={computed.sortedData}
          totalCount={
            paginationConfig?.manualPagination && typeof paginationConfig.totalRowCount === 'number'
              ? paginationConfig.totalRowCount
              : data.length
          }
          filteredCount={
            paginationConfig?.manualPagination && typeof paginationConfig.totalRowCount === 'number'
              ? paginationConfig.totalRowCount
              : computed.sortedData.length
          }
          selectedCount={state.selectedIds.size}
          columns={columns}
          className={classNames.footer}
        />
      )}

      {renderFooter && <div className="grid-table-custom-footer">{renderFooter()}</div>}

      <MobileDrawer
        isOpen={state.showMobileDrawer}
        content={state.mobileDrawerContent}
        onClose={actions.closeMobileDrawer}
        className={classNames.drawer}
        style={styles.drawer}
      />

      {contextMenuConfig?.enabled && (
        <ContextMenu
          visible={ctxMenu.visible}
          x={ctxMenu.x}
          y={ctxMenu.y}
          context={ctxMenu.context}
          actions={defaultCtxActions}
          onClose={() => setCtxMenu(prev => ({ ...prev, visible: false }))}
        />
      )}
    </div>
  );

  if (themeClass || hasGridThemeVars) {
    return (
      <div className={themeClass ?? undefined} style={hasGridThemeVars ? gridThemeVars : undefined}>
        {tableContent}
      </div>
    );
  }
  return tableContent;
}

export function GridTable<T extends RowData = RowData>({
  data,
  columns,
  loading = false,
  error = null,
  theme,
  translations,
  mobileBreakpoint = 'tablet',
  paginationConfig,
  filterConfig,
  sortConfig,
  enableMultiSelect = false,
  getRowId,
  showOverflowTooltip,
  enableCellAutoSizeOnDoubleClick,
  subCellExpandTrigger,
  expandRowOnDoubleClick,
  themeMode,
  themeOverride,
  studio = false,
  advancedFilter,
  columnStatePersistence,
  ...props
}: GridTableComponentProps<T>): ReactNode {
  const [studioData, setStudioData] = useState(data);
  const [studioOpen, setStudioOpen] = useState(true);
  const [advancedFilterWhere, setAdvancedFilterWhere] = useState(advancedFilter?.where ?? null);

  const effectiveFilterConfig = useMemo(
    () => ({
      ...filterConfig,
      advancedFilter: advancedFilterWhere,
    }),
    [filterConfig, advancedFilterWhere],
  );
  useEffect(() => {
    if (studio) setStudioData(data);
  }, [data, studio]);

  const effectiveData = studio ? studioData : data;

  const gridThemeVars = useMemo((): CSSProperties => {
    if (!themeOverride || typeof themeOverride !== 'object') return {};
    const c = (themeOverride as Record<string, unknown>).colors as Record<string, Record<string, string>> | undefined;
    if (!c) return {};
    const vars: Record<string, string> = {};
    if (c.text?.primary) vars['--gt-text-primary' as string] = c.text.primary;
    if (c.text?.secondary) vars['--gt-text-secondary' as string] = c.text.secondary;
    if (c.text?.muted) vars['--gt-text-muted' as string] = c.text.muted;
    if (c.background?.primary) vars['--gt-bg-primary' as string] = c.background.primary;
    if (c.background?.secondary) vars['--gt-bg-secondary' as string] = c.background.secondary;
    if (c.background?.tertiary) vars['--gt-bg-tertiary' as string] = c.background.tertiary;
    if (c.background?.hover) vars['--gt-bg-hover' as string] = c.background.hover;
    if (c.border?.default) vars['--gt-border-color' as string] = c.border.default;
    if (c.accent?.primary) vars['--gt-accent-primary' as string] = c.accent.primary;
    return vars as CSSProperties;
  }, [themeOverride]);

  const tableContent = (
    <TableProvider
      data={effectiveData}
      columns={columns}
      loading={loading}
      error={error}
      theme={theme}
      translations={translations}
      mobileBreakpoint={mobileBreakpoint}
      paginationConfig={paginationConfig}
      filterConfig={effectiveFilterConfig}
      sortConfig={sortConfig}
      enableMultiSort={sortConfig?.multiSort}
      enableMultiSelect={enableMultiSelect}
      getRowId={getRowId}
      showOverflowTooltip={showOverflowTooltip}
      enableCellAutoSizeOnDoubleClick={enableCellAutoSizeOnDoubleClick}
      subCellExpandTrigger={subCellExpandTrigger}
      expandRowOnDoubleClick={expandRowOnDoubleClick}
      defaultExpandedIds={props.defaultExpandedIds}
    >
      <GridTableContent
        data={effectiveData}
        columns={columns}
        loading={loading}
        error={error}
        getRowId={getRowId}
        themeMode={themeMode}
        paginationConfig={paginationConfig}
        gridThemeVars={gridThemeVars}
        advancedFilter={advancedFilter}
        advancedFilterWhere={advancedFilterWhere}
        onAdvancedFilterChange={(where) => {
          setAdvancedFilterWhere(where);
          advancedFilter?.onChange?.(where);
        }}
        columnStatePersistence={columnStatePersistence}
        {...props}
      />
    </TableProvider>
  );

  const hasThemeOverride = themeOverride && Object.keys(themeOverride).length > 0;
  const withTheme =
    hasThemeOverride ? (
      <BearProvider theme={themeOverride as Record<string, unknown>} defaultMode={themeMode === 'dark' ? 'dark' : 'light'}>
        {tableContent}
      </BearProvider>
    ) : (
      tableContent
    );

  if (studio) {
    return (
      <>
        <div className="grid-table-studio-main" style={{ width: '100%' }}>
          {withTheme}
        </div>
        <TableStudioPanel
          data={studioData}
          columns={columns}
          propsSnapshot={{
            themeMode,
            themeOverride,
            showPagination: props.showPagination ?? true,
            showGlobalFilter: props.showGlobalFilter ?? true,
            enableRowSelection: props.enableRowSelection,
            enableRowExpansion: props.enableRowExpansion,
          }}
          onDataChange={setStudioData}
          open={studioOpen}
          onOpenChange={setStudioOpen}
        />
      </>
    );
  }

  return withTheme;
}

