import type { ReactNode, CSSProperties } from 'react';
import type { ColumnDefinition, ColumnState } from './column.types';
import type { FilterTreeGroup, FilterValue } from './filter.types';
import type { RowData } from './row.types';
import type { SortValue } from './sort.types';

// ---- Context Menu ----
export interface ContextMenuAction<T extends RowData = RowData> {
  id: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
  hidden?: boolean;
  divider?: boolean;
  shortcut?: string;
  onClick: (ctx: ContextMenuContext<T>) => void;
}

export interface ContextMenuContext<T extends RowData = RowData> {
  row: T;
  rowIndex: number;
  columnId: string;
  value: unknown;
}

export interface ContextMenuConfig<T extends RowData = RowData> {
  enabled?: boolean;
  actions?: ContextMenuAction<T>[];
  showCopy?: boolean;
  showFilter?: boolean;
  showPin?: boolean;
  showHide?: boolean;
}

// ---- Status Bar ----
export type AggregationType = 'sum' | 'avg' | 'min' | 'max' | 'count';

export interface StatusBarConfig {
  enabled?: boolean;
  showRowCount?: boolean;
  showSelectedCount?: boolean;
  showFilteredCount?: boolean;
  aggregations?: Array<{
    columnId: string;
    type: AggregationType;
    label?: string;
    format?: (value: number) => string;
  }>;
  customContent?: ReactNode;
}

// ---- Frozen / Pinned Rows ----
export interface FrozenRowsConfig<T extends RowData = RowData> {
  top?: T[];
  bottom?: T[];
}

// ---- Tree Data ----
export interface TreeConfig {
  enabled?: boolean;
  childrenField?: string;
  idField?: string;
  expandAll?: boolean;
  indentSize?: number;
}

export interface FlatTreeRow<T extends RowData = RowData> {
  data: T;
  depth: number;
  hasChildren: boolean;
  isExpanded: boolean;
  parentId: string | number | null;
}

// ---- Keyboard Navigation ----
export interface KeyboardNavConfig {
  enabled?: boolean;
  enableCellFocus?: boolean;
  enableEditOnEnter?: boolean;
  wrap?: boolean;
}

export interface FocusedCell {
  rowIndex: number;
  colIndex: number;
}

// ---- Row Reorder ----
export interface RowReorderConfig {
  enabled?: boolean;
  handle?: boolean;
}

// ---- Undo / Redo ----
export interface EditHistoryEntry {
  rowId: string | number;
  columnId: string;
  oldValue: unknown;
  newValue: unknown;
  timestamp: number;
}

export interface UndoRedoConfig {
  enabled?: boolean;
  maxHistory?: number;
}

// ---- Print Mode ----
export interface PrintConfig {
  enabled?: boolean;
  title?: string;
  showDate?: boolean;
  pageSize?: 'A4' | 'letter' | 'auto';
  orientation?: 'portrait' | 'landscape';
}

// ---- Column Auto-Fit ----
export interface AutoFitConfig {
  enabled?: boolean;
  onMount?: boolean;
  minWidth?: number;
  maxWidth?: number;
  padding?: number;
}

// ---- Aggregation on Column ----
export interface ColumnAggregation {
  type: AggregationType;
  label?: string;
  format?: (value: number) => string;
}

export type TableDensity = 'compact' | 'comfortable' | 'spacious';

export interface TableViewSnapshot {
  sorting: SortValue[];
  filters: FilterValue[];
  globalFilter: string;
  hiddenColumnIds: string[];
  columnWidths: Record<string, number>;
  page: number;
  pageSize: number;
  density?: TableDensity;
  advancedFilter?: FilterTreeGroup | null;
}

export interface SavedViewDefinition {
  id: string;
  label: string;
  snapshot: TableViewSnapshot;
}

export interface SavedViewsConfig {
  views: SavedViewDefinition[];
  activeViewId?: string;
  persistKey?: string;
  showViewSwitcher?: boolean;
  onViewChange?: (viewId: string, snapshot: TableViewSnapshot) => void;
}

export interface GroupFooterSpec {
  type: 'sum' | 'avg' | 'min' | 'max' | 'count';
  field: string;
  label?: string;
}

export interface RowGroupConfig {
  by: string;
  pinned?: boolean;
  footer?: Array<string | GroupFooterSpec>;
  footerLabelField?: string;
}

export interface RowGroupMeta {
  isGroupFooter?: boolean;
  isGroupHeader?: boolean;
  groupKey?: string;
  groupLabel?: string;
}

export interface ColumnGroupConfig {
  id: string;
  label: string;
  columnIds: string[];
}

export interface ConditionalFormatRule<T extends RowData = RowData> {
  id?: string;
  columnId?: string;
  when: (row: T, value: unknown) => boolean;
  className?: string;
  cellStyle?: CSSProperties;
}

export interface ConditionalFormatConfig<T extends RowData = RowData> {
  rules: ConditionalFormatRule<T>[];
}

export interface ConditionalCellFormat {
  className: string;
  style: CSSProperties;
}

export interface MasterDetailConfig<T extends RowData = RowData> {
  enabled?: boolean;
  renderPanel?: (row: T) => ReactNode;
  panelHeight?: number;
  expandOnRowClick?: boolean;
}

export interface VirtualizeConfig {
  enabled?: boolean;
  threshold?: number;
  rowHeight?: number;
  overscan?: number;
}

export interface ColumnStatePersistenceConfig {
  persistKey?: string;
  onStateChange?: (states: ColumnState[]) => void;
}

export interface TouchGesturesConfig {
  enabled?: boolean;
  swipeActions?: boolean;
  longPressContextMenu?: boolean;
}
