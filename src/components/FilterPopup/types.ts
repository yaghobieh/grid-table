import type { CSSProperties } from 'react';
import type { FilterOperator } from '../../types';

export interface FilterPopupProps {
  columnId: string;
  columnHeader: string;
  filterType: 'text' | 'number' | 'date' | 'select' | 'boolean' | 'custom';
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

