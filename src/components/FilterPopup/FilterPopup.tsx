import type { ReactNode } from 'react';
import { useState, useCallback, useEffect, useRef } from 'react';
import type { FilterPopupProps } from './types';
import type { FilterOperator } from '../../types';
import { useTableContext } from '../../context';

const TEXT_OPERATORS: FilterOperator[] = ['contains', 'equals', 'startsWith', 'endsWith', 'notContains', 'notEquals'];
const NUMBER_OPERATORS: FilterOperator[] = ['equals', 'notEquals', 'greaterThan', 'lessThan', 'greaterThanOrEqual', 'lessThanOrEqual'];

const OPERATOR_LABELS: Record<FilterOperator, string> = {
  equals: 'Equals',
  notEquals: 'Not equals',
  contains: 'Contains',
  notContains: 'Not contains',
  startsWith: 'Starts with',
  endsWith: 'Ends with',
  greaterThan: 'Greater than',
  lessThan: 'Less than',
  greaterThanOrEqual: 'Greater or equal',
  lessThanOrEqual: 'Less or equal',
  between: 'Between',
  isEmpty: 'Is empty',
  isNotEmpty: 'Is not empty',
};

export function FilterPopup({
  columnId,
  columnHeader,
  filterType = 'text',
  filterOptions,
  currentValue,
  currentOperator = 'contains',
  position,
  onApply,
  onClear,
  onClose,
  className = '',
  style,
}: FilterPopupProps): ReactNode {
  const { state } = useTableContext();
  const { translations } = state;
  const popupRef = useRef<HTMLDivElement>(null);

  const [value, setValue] = useState<string>(currentValue ? String(currentValue) : '');
  const [operator, setOperator] = useState<FilterOperator>(currentOperator);

  const operators = filterType === 'number' ? NUMBER_OPERATORS : TEXT_OPERATORS;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const handleApply = useCallback(() => {
    if (value.trim()) {
      onApply(filterType === 'number' ? Number(value) : value, operator);
    }
    onClose();
  }, [value, operator, filterType, onApply, onClose]);

  const handleClear = useCallback(() => {
    setValue('');
    onClear();
    onClose();
  }, [onClear, onClose]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleApply();
      }
    },
    [handleApply]
  );

  return (
    <div
      ref={popupRef}
      className={`filter-popup absolute z-50 bg-theme-primary border border-theme-border rounded-lg shadow-xl min-w-[280px] ${className}`}
      style={{
        top: position?.top ?? '100%',
        left: position?.left ?? 0,
        marginTop: 4,
        ...style,
      }}
    >
      <div className="filter-popup-header px-4 py-3 border-b border-theme-border">
        <div className="flex items-center justify-between">
          <span className="font-medium text-theme-primary">{columnHeader}</span>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-theme-hover text-theme-muted"
            aria-label="Close"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div className="filter-popup-body p-4 space-y-4">
        {filterType === 'select' && filterOptions ? (
          <select
            value={String(value)}
            onChange={(e) => setValue(e.target.value)}
            className="w-full px-3 py-2 text-sm rounded border border-theme-border bg-theme-secondary text-theme-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
          >
            <option value="">Select...</option>
            {filterOptions.map((opt) => (
              <option key={String(opt.value)} value={String(opt.value)}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : (
          <>
            <div>
              <label className="block text-xs text-theme-muted mb-1">Operator</label>
              <select
                value={operator}
                onChange={(e) => setOperator(e.target.value as FilterOperator)}
                className="w-full px-3 py-2 text-sm rounded border border-theme-border bg-theme-secondary text-theme-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
              >
                {operators.map((op) => (
                  <option key={op} value={op}>
                    {OPERATOR_LABELS[op]}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs text-theme-muted mb-1">Value</label>
              <input
                type={filterType === 'number' ? 'number' : 'text'}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Filter ${columnHeader}...`}
                className="w-full px-3 py-2 text-sm rounded border border-theme-border bg-theme-secondary text-theme-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
                autoFocus
              />
            </div>
          </>
        )}
      </div>

      <div className="filter-popup-footer px-4 py-3 border-t border-theme-border flex items-center justify-between">
        <button
          onClick={handleClear}
          className="px-3 py-1.5 text-sm text-theme-muted hover:text-theme-primary transition-colors"
        >
          {translations.clearFilter}
        </button>
        <button
          onClick={handleApply}
          className="px-4 py-1.5 text-sm bg-accent-primary text-white rounded hover:opacity-90 transition-opacity"
        >
          {translations.apply}
        </button>
      </div>
    </div>
  );
}

