import type { CSSProperties } from 'react';
import type { FilterOperator } from '@/types';

export type FilterPopupFilterType = 'text' | 'number' | 'date' | 'select' | 'set' | 'boolean' | 'custom';

export interface FilterPopupProps {
  columnId: string;
  columnHeader: string;
  filterType: FilterPopupFilterType;
  filterOptions?: Array<{ value: string | number | boolean; label: string }>;
  currentValue?: unknown;
  currentOperator?: FilterOperator;
  position?: { top: number; left: number };
  onApply: (value: unknown, operator: FilterOperator) => void;
  onClear: () => void;
  onClose: () => void;
  className?: string;
  style?: CSSProperties;
}

export interface FilterPopupSetBodyProps {
  filterOptions: Array<{ value: string | number | boolean; label: string }>;
  setSearch: string;
  setValues: Set<string>;
  onSearchChange: (value: string) => void;
  onToggleValue: (value: string) => void;
}

export interface FilterPopupSelectBodyProps {
  value: string;
  filterOptions: Array<{ value: string | number | boolean; label: string }>;
  onValueChange: (value: string) => void;
}

export interface FilterPopupDateBodyProps {
  operator: FilterOperator;
  dateFrom: string;
  dateTo: string;
  onOperatorChange: (operator: FilterOperator) => void;
  onDateFromChange: (value: string) => void;
  onDateToChange: (value: string) => void;
}

export interface FilterPopupTextBodyProps {
  filterType: FilterPopupFilterType;
  operator: FilterOperator;
  value: string;
  columnHeader: string;
  onOperatorChange: (operator: FilterOperator) => void;
  onValueChange: (value: string) => void;
  onKeyDown: (event: React.KeyboardEvent) => void;
}

export interface FilterPopupBodyProps {
  filterType: FilterPopupFilterType;
  filterOptions?: Array<{ value: string | number | boolean; label: string }>;
  setSearch: string;
  setValues: Set<string>;
  value: string;
  operator: FilterOperator;
  dateFrom: string;
  dateTo: string;
  columnHeader: string;
  onSearchChange: (value: string) => void;
  onToggleValue: (value: string) => void;
  onValueChange: (value: string) => void;
  onOperatorChange: (operator: FilterOperator) => void;
  onDateFromChange: (value: string) => void;
  onDateToChange: (value: string) => void;
  onKeyDown: (event: React.KeyboardEvent) => void;
}
