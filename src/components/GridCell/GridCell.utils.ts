import type { CSSProperties, ReactNode } from 'react';
import type { RowData } from '@/types';
import type { GridCellProps } from './GridCell.types';
import {
  GRID_CELL_BOOLEAN_NO,
  GRID_CELL_BOOLEAN_YES,
  GRID_CELL_EMPTY_VALUE,
  GRID_CELL_SUBCELL_TRIGGER_BOTH,
} from './GridCell.const';
import { ONE } from '@constants/numbers.const';

export interface DerivedGridCellState {
  showOverflowTooltip: boolean;
  hasSubCell: boolean;
  trigger: 'arrow' | 'doubleClick' | 'both';
  showArrow: boolean;
  enableCellAutoSize: boolean;
  cellKey: string;
  isSubCellExpanded: boolean;
  isAutoSized: boolean;
}

export function deriveGridCellState<T extends RowData = RowData>(
  props: Pick<GridCellProps<T>, 'column' | 'rowId'>,
  tableOptions: {
    showOverflowTooltip?: boolean;
    subCellExpandTrigger?: 'arrow' | 'doubleClick' | 'both';
    enableCellAutoSizeOnDoubleClick?: boolean;
  },
  state: {
    expandedCellIds: Set<string>;
    autoSizedColumnIds: Set<string>;
  },
): DerivedGridCellState {
  const showOverflowTooltip = (props.column.showOverflowTooltip ?? tableOptions.showOverflowTooltip) !== false;
  const hasSubCell = Boolean(props.column.renderSubCell);
  const trigger = props.column.subCellExpandTrigger ?? tableOptions.subCellExpandTrigger ?? GRID_CELL_SUBCELL_TRIGGER_BOTH;
  const showArrow = hasSubCell && (trigger === 'arrow' || trigger === GRID_CELL_SUBCELL_TRIGGER_BOTH);
  const enableCellAutoSize = tableOptions.enableCellAutoSizeOnDoubleClick === true;
  const cellKey = `${String(props.rowId)}-${props.column.id}`;
  const isSubCellExpanded = state.expandedCellIds.has(cellKey);
  const isAutoSized = state.autoSizedColumnIds.has(props.column.id);

  return {
    showOverflowTooltip,
    hasSubCell,
    trigger,
    showArrow,
    enableCellAutoSize,
    cellKey,
    isSubCellExpanded,
    isAutoSized,
  };
}

export function formatGridCellValue<T extends RowData = RowData>(
  column: GridCellProps<T>['column'],
  value: unknown,
  row: T,
  rowIndex: number,
): ReactNode {
  if (column.render) {
    return column.render(value, row as Record<string, unknown>, rowIndex);
  }

  if (value === null || value === undefined) {
    return GRID_CELL_EMPTY_VALUE;
  }

  if (typeof value === 'boolean') {
    return value ? GRID_CELL_BOOLEAN_YES : GRID_CELL_BOOLEAN_NO;
  }

  if (value instanceof Date) {
    return value.toLocaleDateString();
  }

  return String(value);
}

interface GetGridCellStyleParams {
  style: CSSProperties | undefined;
  width: number | string | undefined;
  sticky: 'left' | 'right' | undefined;
  stickyOffset: number;
  isAutoSized: boolean;
  stickyBackground: string;
}

export function getGridCellStyle({
  style,
  width,
  sticky,
  stickyOffset,
  isAutoSized,
  stickyBackground,
}: GetGridCellStyleParams): CSSProperties {
  const baseStyle: CSSProperties = { ...style };

  if (isAutoSized) {
    baseStyle.width = 'auto';
    baseStyle.minWidth = 'max-content';
    baseStyle.maxWidth = 'none';
  } else if (width !== undefined) {
    baseStyle.width = typeof width === 'number' ? `${width}px` : width;
    baseStyle.minWidth = baseStyle.width;
    baseStyle.maxWidth = baseStyle.width;
  }

  if (sticky) {
    baseStyle.position = 'sticky';
    baseStyle.zIndex = ONE;
    baseStyle.backgroundColor = stickyBackground;

    if (sticky === 'left') {
      baseStyle.left = stickyOffset;
    } else if (sticky === 'right') {
      baseStyle.right = stickyOffset;
    }
  }

  return baseStyle;
}
