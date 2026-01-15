import type { SortDirection } from './common.types';

export interface SortValue {
  columnId: string;
  direction: SortDirection;
}

export interface SortState {
  sorting: SortValue[];
  multiSort: boolean;
}

export interface SortActions {
  setSorting: (columnId: string, direction: SortDirection) => void;
  toggleSorting: (columnId: string) => void;
  clearSorting: () => void;
  clearColumnSorting: (columnId: string) => void;
  getSortDirection: (columnId: string) => SortDirection;
  getSortIndex: (columnId: string) => number;
  isSorted: (columnId: string) => boolean;
}

export interface SortConfig {
  multiSort?: boolean;
  maxMultiSortColumns?: number;
  sortDescFirst?: boolean;
  nullsFirst?: boolean;
  persistSort?: boolean;
  sortStorageKey?: string;
}

