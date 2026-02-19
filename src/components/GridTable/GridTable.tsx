import type { ReactNode, CSSProperties } from 'react';
import { useMemo, useCallback, useState, useEffect, useRef } from 'react';
import type { GridTableComponentProps } from './types';
import type { RowData, TableEffects } from '../../types';
import { TableProvider, useTableContext } from '../../context';
import { useBreakpoint } from '../../hooks';
import { GridHeader } from '../GridHeader';
import { GridBody } from '../GridBody';
import { Pagination as BearPagination, Typography, Select, BearProvider } from '@forgedevstack/bear';
import { Skeleton } from '../Skeleton';
import { TableStudioPanel } from '../TableStudioPanel';
import { EmptyState } from '../EmptyState';
import { MobileDrawer } from '../MobileDrawer';
import { exportToCSV, exportToJSON } from '../../utils/export.utils';

function isEffectEnabled(cfg: boolean | Record<string, unknown> | undefined): boolean {
  if (cfg === true) return true;
  if (cfg && typeof cfg === 'object' && cfg.enabled !== false) return true;
  return false;
}

function resolveEffects(te?: TableEffects) {
  if (!te) return { sort: false, row: false, hover: false, className: '' };
  return {
    sort: isEffectEnabled(te.sort as boolean | Record<string, unknown> | undefined),
    row: isEffectEnabled(te.row as boolean | Record<string, unknown> | undefined),
    hover: isEffectEnabled(te.hover as boolean | Record<string, unknown> | undefined),
    className: te.className ?? '',
  };
}

const DEFAULT_LAZY_INITIAL = 20;
const DEFAULT_LAZY_BATCH = 10;

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
  onRowSelect,
  onSort,
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
  showOverflowTooltip,
  enableCellAutoSizeOnDoubleClick,
  subCellExpandTrigger,
  expandRowOnDoubleClick,
  themeMode,
  paginationConfig,
  gridThemeVars,
  tableEffects,
  defaultExpandedIds,
  lazyLoad,
  enableExport,
  exportFileName,
  enableCellEdit,
  onCellEdit,
}: Omit<GridTableComponentProps<T>, 'theme' | 'translations' | 'mobileBreakpoint' | 'filterConfig' | 'sortConfig'>): ReactNode {
  const { state, actions, computed } = useTableContext<T>();
  const { shouldShowMobileView, breakpointValue } = useBreakpoint();

  const themeClass = themeMode === 'dark' ? 'dark' : themeMode === 'light' ? 'light' : undefined;
  const hasGridThemeVars = gridThemeVars && Object.keys(gridThemeVars).length > 0;

  const fx = useMemo(() => resolveEffects(tableEffects), [tableEffects]);

  const didInitExpand = useRef(false);
  useEffect(() => {
    if (defaultExpandedIds && defaultExpandedIds.length > 0 && !didInitExpand.current) {
      didInitExpand.current = true;
      defaultExpandedIds.forEach((id) => actions.expandRow(id));
    }
  }, [defaultExpandedIds, actions]);

  const lazyEnabled = lazyLoad?.enabled ?? false;
  const lazyInitial = lazyLoad?.initialRows ?? DEFAULT_LAZY_INITIAL;
  const lazyBatch = lazyLoad?.batchSize ?? DEFAULT_LAZY_BATCH;
  const [lazyVisibleCount, setLazyVisibleCount] = useState(lazyEnabled ? lazyInitial : Infinity);
  const [lazyLoading, setLazyLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Reset lazy count when data changes
  useEffect(() => {
    if (lazyEnabled) setLazyVisibleCount(lazyInitial);
  }, [lazyEnabled, lazyInitial, state.data.length]);

  // Intersection observer for infinite scroll
  useEffect(() => {
    if (!lazyEnabled || !sentinelRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !lazyLoading) {
          setLazyLoading(true);
          // Simulate a tiny delay so the loader is visible
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

  const isEmpty = computed.paginatedData.length === 0;

  const displayData = useMemo(() => {
    if (!lazyEnabled) return computed.paginatedData;
    return computed.paginatedData.slice(0, lazyVisibleCount);
  }, [lazyEnabled, lazyVisibleCount, computed.paginatedData]);

  const hasMoreLazy = lazyEnabled && lazyVisibleCount < computed.paginatedData.length;

  const tableContent = (
    <div
      className={`grid-table rounded-lg border overflow-hidden ${fx.sort ? 'gt-sort-animated' : ''} ${fx.row ? 'gt-row-animated' : ''} ${fx.hover ? 'gt-hover-effect' : ''} ${fx.className} ${classNames.root || ''} ${className}`}
      style={containerStyle}
      role="table"
    >
      {renderHeader && <div className="grid-table-custom-header">{renderHeader()}</div>}

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
              <button
                onClick={() => exportToCSV(computed.sortedData, columns, exportFileName)}
                className="toolbar-action-button"
                aria-label="Export CSV"
                title="Export CSV"
              >
                <svg className="icon-md" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </button>
              <button
                onClick={() => exportToJSON(computed.sortedData, columns, exportFileName)}
                className="toolbar-action-button"
                aria-label="Export JSON"
                title="Export JSON"
              >
                <svg className="icon-md" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
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

      <div className="grid-table-container overflow-auto">
        {!shouldShowMobileView && (
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
            <GridBody
              data={displayData}
              columns={columns}
              columnStates={state.columnStates}
              className={classNames.body}
              style={styles.body}
              isMobile={shouldShowMobileView}
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
          </>
        )}
      </div>

      {showPagination && !isEmpty && (
        <div className={`grid-pagination ${classNames.pagination ?? ''}`} style={styles.pagination} role="navigation" aria-label="Pagination">
          <div className="grid-pagination-info">
            <Typography component="span" variant="body2" color="secondary">
              {(state.page - 1) * state.pageSize + 1}-{Math.min(state.page * state.pageSize, computed.sortedData.length)} {state.translations.of} {computed.sortedData.length}
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

      {renderFooter && <div className="grid-table-custom-footer">{renderFooter()}</div>}

      <MobileDrawer
        isOpen={state.showMobileDrawer}
        content={state.mobileDrawerContent}
        onClose={actions.closeMobileDrawer}
        className={classNames.drawer}
        style={styles.drawer}
      />
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
  ...props
}: GridTableComponentProps<T>): ReactNode {
  const [studioData, setStudioData] = useState(data);
  const [studioOpen, setStudioOpen] = useState(true);
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
      filterConfig={filterConfig}
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

