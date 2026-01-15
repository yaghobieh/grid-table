import type { FilterOperator } from './common.types';

export interface FilterValue {
  columnId: string;
  value: unknown;
  operator: FilterOperator;
}

export interface FilterState {
  filters: FilterValue[];
  globalFilter: string;
}

export interface FilterActions {
  setFilter: (columnId: string, value: unknown, operator?: FilterOperator) => void;
  removeFilter: (columnId: string) => void;
  clearFilters: () => void;
  setGlobalFilter: (value: string) => void;
  clearGlobalFilter: () => void;
  getFilterValue: (columnId: string) => FilterValue | undefined;
  hasFilter: (columnId: string) => boolean;
  hasAnyFilter: () => boolean;
}

export interface FilterConfig {
  debounceMs?: number;
  caseSensitive?: boolean;
  globalFilterColumns?: string[];
  persistFilters?: boolean;
  filterStorageKey?: string;
}

export interface FilterPanelProps {
  columnId: string;
  filterType: 'text' | 'number' | 'date' | 'select' | 'boolean' | 'custom';
  filterValue?: FilterValue;
  filterOptions?: Array<{ value: string | number | boolean; label: string }>;
  operators?: FilterOperator[];
  onApply: (value: unknown, operator: FilterOperator) => void;
  onClear: () => void;
  onClose: () => void;
}

