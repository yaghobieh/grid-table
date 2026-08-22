import type { ReactNode } from 'react';
import clsx from 'clsx';
import type { GridHeaderProps } from './GridHeader.types';
import type { RowData } from '@/types';
import { EMPTY_STRING, ONE } from '@/constants';
import { Checkbox } from '@forgedevstack/bear';
import { FilterPopup } from '@/components/FilterPopup';
import { FILTER_TYPE_TEXT } from '@/components/FilterPopup/FilterPopup.const';
import { HeaderCell } from './HeaderCell';
import {
  GRID_HEADER_COLUMN_WRAP_CLASS,
  GRID_HEADER_POSITION_RELATIVE,
  GRID_HEADER_EXPAND_SPACER_CLASS,
  GRID_HEADER_PIN_LEFT,
  GRID_HEADER_PIN_RIGHT,
  GRID_HEADER_SELECT_ALL_ARIA,
  GRID_HEADER_SELECT_CLASS,
} from './GridHeader.const';
import { createFallbackColumnState, findColumnState } from './GridHeader.utils';
import { useGridHeader } from './hooks';

export function GridHeader<T extends RowData = RowData>(props: GridHeaderProps<T>): ReactNode {
  const {
    columnStates,
    className = EMPTY_STRING,
    style,
    enableSort = true,
    enableFilter = true,
    enableDragDrop = true,
    enableResize = true,
    enablePinControls = true,
    enableColumnMenu = true,
    enableSelection = false,
    enableExpansion = false,
    allSelected = false,
    someSelected = false,
    onSelectAll,
  } = props;
  const header = useGridHeader(props);

  return (
    <div className={clsx(header.headerClasses, className)} style={style} role="row">
      {enableSelection && (
        <div className={GRID_HEADER_SELECT_CLASS}>
          <Checkbox
            checked={allSelected}
            indeterminate={someSelected && !allSelected}
            onChange={() => onSelectAll?.()}
            size="sm"
            aria-label={GRID_HEADER_SELECT_ALL_ARIA}
          />
        </div>
      )}

      {enableExpansion && <div className={GRID_HEADER_EXPAND_SPACER_CLASS} aria-hidden />}

      {header.visibleColumns.map((column, index) => {
        const columnState = findColumnState(columnStates, column.id) ?? createFallbackColumnState(column.id, index);
        const headerText = typeof column.header === 'string' ? column.header : column.id;
        const existingFilter = header.state.filters.find((filter) => filter.columnId === column.id);

        return (
          <div key={column.id} className={GRID_HEADER_COLUMN_WRAP_CLASS} style={{ position: GRID_HEADER_POSITION_RELATIVE }}>
            <HeaderCell
              column={column}
              columnState={columnState}
              sortDirection={props.getSortDirection ? props.getSortDirection(column.id) : null}
              sortIndex={header.state.sorting.findIndex((item) => item.columnId === column.id)}
              isMultiSort={header.state.sorting.length > ONE}
              enableSort={enableSort}
              enableFilter={enableFilter}
              enableDragDrop={enableDragDrop}
              enableResize={enableResize}
              enablePinControls={enablePinControls}
              enableColumnMenu={enableColumnMenu}
              menuOpen={header.openMenuColumnId === column.id}
              onMenuToggle={() => header.setOpenMenuColumnId(header.openMenuColumnId === column.id ? null : column.id)}
              onMenuAutosize={() => {
                header.autoSizeColumn(column.id);
                header.setOpenMenuColumnId(null);
              }}
              onMenuPinLeft={() => {
                header.actions.pinColumn(column.id, GRID_HEADER_PIN_LEFT);
                header.setOpenMenuColumnId(null);
              }}
              onMenuPinRight={() => {
                header.actions.pinColumn(column.id, GRID_HEADER_PIN_RIGHT);
                header.setOpenMenuColumnId(null);
              }}
              onMenuHide={() => {
                header.actions.toggleColumnVisibility(column.id);
                header.setOpenMenuColumnId(null);
              }}
              hasFilter={header.state.filters.some((filter) => filter.columnId === column.id)}
              isDragging={header.dragDrop.draggingColumnId === column.id}
              isDragOver={header.dragDrop.dragOverColumnId === column.id}
              isPinEdgeLeft={column.id === header.pinEdgeIds.lastLeftId}
              isPinEdgeRight={column.id === header.pinEdgeIds.firstRightId}
              isColumnAutoSized={header.state.autoSizedColumnIds.has(column.id)}
              onSort={() => header.actions.toggleSorting(column.id)}
              onFilterOpen={() => header.handleFilterClick(column.id)}
              onPinToggle={() => header.handlePinToggle(column.id)}
              onResizeStart={header.handleResizeStart(column.id, columnState.width)}
              onResizeAutoSize={() => header.autoSizeColumn(column.id)}
              dragHandleProps={header.dragDrop.getDragHandleProps(column.id)}
              dropTargetProps={header.dragDrop.getDropTargetProps(column.id)}
            />
            {header.activeFilterColumn === column.id && (
              <FilterPopup
                columnId={column.id}
                columnHeader={headerText}
                filterType={column.filterType || FILTER_TYPE_TEXT}
                filterOptions={column.filterOptions}
                currentValue={existingFilter?.value}
                currentOperator={existingFilter?.operator}
                onApply={(value, operator) => header.handleFilterApply(column.id, value, operator)}
                onClear={() => header.handleFilterClear(column.id)}
                onClose={header.handleFilterClose}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
