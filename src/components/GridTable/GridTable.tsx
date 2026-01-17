import type { ReactNode } from 'react';
import { useMemo, useCallback } from 'react';
import type { GridTableComponentProps } from './types';
import type { RowData, SortDirection, Breakpoint } from '../../types';
import { TableProvider, useTableContext } from '../../context';
import { useBreakpoint } from '../../hooks';
import { GridHeader } from '../GridHeader';
import { GridBody } from '../GridBody';
import { Pagination } from '../Pagination';
import { Skeleton } from '../Skeleton';
import { EmptyState } from '../EmptyState';
import { MobileDrawer } from '../MobileDrawer';

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
}: Omit<GridTableComponentProps<T>, 'theme' | 'translations' | 'mobileBreakpoint' | 'paginationConfig' | 'filterConfig' | 'sortConfig'>): ReactNode {
  const { state, actions, computed } = useTableContext<T>();
  const { shouldShowMobileView, breakpointValue } = useBreakpoint();

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

  return (
    <div
      className={`grid-table rounded-lg border overflow-hidden ${classNames.root || ''} ${className}`}
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
            allSelected={computed.allSelected}
            someSelected={computed.someSelected}
            onSelectAll={actions.selectAll}
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
          <GridBody
            data={computed.paginatedData}
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
            onRowDoubleClick={onRowDoubleClick}
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
      </div>

      {showPagination && !isEmpty && (
        <Pagination
          page={state.page}
          pageSize={state.pageSize}
          totalItems={computed.sortedData.length}
          totalPages={computed.totalPages}
          className={classNames.pagination}
          style={styles.pagination}
          onPageChange={(page) => {
            actions.setPage(page);
            onPageChange?.(page, state.pageSize);
          }}
          onPageSizeChange={(pageSize) => {
            actions.setPageSize(pageSize);
            onPageChange?.(1, pageSize);
          }}
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
    </div>
  );
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
  ...props
}: GridTableComponentProps<T>): ReactNode {
  return (
    <TableProvider
      data={data}
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
    >
      <GridTableContent
        data={data}
        columns={columns}
        loading={loading}
        error={error}
        getRowId={getRowId}
        {...props}
      />
    </TableProvider>
  );
}

