import type { CSSProperties } from 'react';

export interface RowData {
  id: string | number;
  [key: string]: unknown;
}

export interface RowState {
  id: string | number;
  selected: boolean;
  expanded: boolean;
  disabled: boolean;
}

export interface RowProps<T extends RowData = RowData> {
  data: T;
  index: number;
  isSelected?: boolean;
  isExpanded?: boolean;
  isDisabled?: boolean;
  isHovered?: boolean;
  className?: string;
  style?: CSSProperties;
  onClick?: (row: T, index: number) => void;
  onDoubleClick?: (row: T, index: number) => void;
  onContextMenu?: (row: T, index: number, event: React.MouseEvent) => void;
  onSelect?: (row: T, selected: boolean) => void;
  onExpand?: (row: T, expanded: boolean) => void;
}

export interface RowSelectionState {
  selectedIds: Set<string | number>;
  allSelected: boolean;
  someSelected: boolean;
}

export interface RowSelectionActions {
  selectRow: (id: string | number) => void;
  deselectRow: (id: string | number) => void;
  toggleRow: (id: string | number) => void;
  selectAll: () => void;
  deselectAll: () => void;
  toggleAll: () => void;
  isSelected: (id: string | number) => boolean;
}

export interface RowExpansionState {
  expandedIds: Set<string | number>;
}

export interface RowExpansionActions {
  expandRow: (id: string | number) => void;
  collapseRow: (id: string | number) => void;
  toggleRow: (id: string | number) => void;
  expandAll: () => void;
  collapseAll: () => void;
  isExpanded: (id: string | number) => boolean;
}

