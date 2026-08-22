import type { ReactNode } from 'react';
import clsx from 'clsx';
import { BearIcons } from '@forgedevstack/bear';
import type { RowData } from '@/types';
import { GRID_HEADER_AUTOSIZE_ARIA, ONE, ZERO } from '@/constants';
import {
  ColumnMenu,
  COLUMN_MENU_AUTOSIZE,
  COLUMN_MENU_HIDE,
  COLUMN_MENU_PIN_LEFT,
  COLUMN_MENU_PIN_RIGHT,
} from '@/components/ColumnMenu';
import { GRID_HEADER_FILTER_ARIA, GRID_HEADER_PIN_ACTIVE_CLASS } from '../GridHeader.const';
import type { GridHeaderCellProps } from './HeaderCell.types';
import {
  HEADER_CELL_CONTENT_CLASS,
  HEADER_CELL_FILTER_CLASS,
  HEADER_CELL_ICON_ACTIVE_CLASS,
  HEADER_CELL_ICON_MUTED_CLASS,
  HEADER_CELL_ORIENTATION_VERTICAL,
  HEADER_CELL_PIN_CLASS,
  HEADER_CELL_RESIZE_CLASS,
  HEADER_CELL_SORT_CLASS,
  HEADER_CELL_SORT_INDEX_CLASS,
} from './HeaderCell.const';
import { useHeaderCell } from './hooks';
import { HeaderCellSortIcon } from './helpers';

export function HeaderCell<T extends RowData>(props: GridHeaderCellProps<T>): ReactNode {
  const cell = useHeaderCell(props);

  return (
    <div
      className={cell.cellClasses}
      style={cell.cellStyle}
      role="columnheader"
      aria-sort={cell.ariaSort}
      onClick={cell.handleClick}
      {...cell.dragDropProps}
    >
      <span className={HEADER_CELL_CONTENT_CLASS}>{cell.headerContent}</span>

      {cell.isSortable && (
        <span className={HEADER_CELL_SORT_CLASS}>
          <HeaderCellSortIcon sortDirection={props.sortDirection} />
          {props.isMultiSort && props.sortIndex !== undefined && props.sortIndex >= ZERO && props.sortDirection && (
            <span className={HEADER_CELL_SORT_INDEX_CLASS}>{props.sortIndex + ONE}</span>
          )}
        </span>
      )}

      {props.enableFilter && props.column.filterable !== false && (
        <button onClick={cell.handleFilterClick} className={HEADER_CELL_FILTER_CLASS} aria-label={GRID_HEADER_FILTER_ARIA}>
          <BearIcons.FilterIcon
            size="xs"
            className={props.hasFilter ? HEADER_CELL_ICON_ACTIVE_CLASS : HEADER_CELL_ICON_MUTED_CLASS}
          />
        </button>
      )}

      {props.enablePinControls && (
        <button
          type="button"
          onClick={cell.handlePinClick}
          className={clsx(HEADER_CELL_PIN_CLASS, cell.isPinned && GRID_HEADER_PIN_ACTIVE_CLASS)}
          aria-label={cell.pinAria}
          title={cell.pinAria}
        >
          <BearIcons.MapPinIcon
            size="xs"
            className={cell.isPinned ? HEADER_CELL_ICON_ACTIVE_CLASS : HEADER_CELL_ICON_MUTED_CLASS}
          />
        </button>
      )}

      {props.enableColumnMenu && (
        <ColumnMenu
          open={Boolean(props.menuOpen)}
          onToggle={() => props.onMenuToggle?.()}
          onAutosize={() => props.onMenuAutosize?.()}
          onPinLeft={() => props.onMenuPinLeft?.()}
          onPinRight={() => props.onMenuPinRight?.()}
          onHide={() => props.onMenuHide?.()}
          autosizeLabel={COLUMN_MENU_AUTOSIZE}
          pinLeftLabel={COLUMN_MENU_PIN_LEFT}
          pinRightLabel={COLUMN_MENU_PIN_RIGHT}
          hideLabel={COLUMN_MENU_HIDE}
        />
      )}

      {props.enableResize && props.column.resizable !== false && (
        <div
          className={HEADER_CELL_RESIZE_CLASS}
          role="separator"
          aria-orientation={HEADER_CELL_ORIENTATION_VERTICAL}
          aria-label={GRID_HEADER_AUTOSIZE_ARIA}
          title={GRID_HEADER_AUTOSIZE_ARIA}
          onMouseDown={props.onResizeStart}
          onDoubleClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            props.onResizeAutoSize?.(event);
          }}
          onClick={(event) => event.stopPropagation()}
        />
      )}
    </div>
  );
}
