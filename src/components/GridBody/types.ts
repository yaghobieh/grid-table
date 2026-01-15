import type { ReactNode, CSSProperties } from 'react';
import type { RowData, ColumnDefinition, ColumnState } from '../../types';
import type { CellClickEvent } from '../GridCell/types';

export interface GridBodyProps<T extends RowData = RowData> {
  data: T[];
  columns: ColumnDefinition<T>[];
  columnStates: ColumnState[];
  className?: string;
  style?: CSSProperties;
  isMobile?: boolean;
  showMobileLabels?: boolean;
  enableSelection?: boolean;
  enableExpansion?: boolean;
  selectedIds?: Set<string | number>;
  expandedIds?: Set<string | number>;
  onRowClick?: (row: T, index: number) => void;
  onRowDoubleClick?: (row: T, index: number) => void;
  onCellClick?: (event: CellClickEvent<T>) => void;
  onRowSelect?: (id: string | number, selected: boolean) => void;
  onRowExpand?: (id: string | number, expanded: boolean) => void;
  getRowId: (row: T) => string | number;
  getRowClassName?: (row: T, index: number) => string;
  getRowStyle?: (row: T, index: number) => CSSProperties;
  isRowDisabled?: (row: T) => boolean;
  renderRowExpansion?: (row: T) => ReactNode;
}

