import type { ReactNode } from 'react';
import { useState, useCallback, useRef } from 'react';
import { Button, BearIcons } from '@forgedevstack/bear';
import type { FilterPopupProps } from './FilterPopup.types';
import type { FilterOperator } from '@/types';
import { useTableContext } from '../../context';
import { useFilterPopupDismiss } from '@hooks/useFilterPopupDismiss';
import {
  FILTER_POPUP_CLOSE_ARIA,
  FILTER_POPUP_DATE_FROM_LABEL,
  FILTER_POPUP_DATE_OPERATORS,
  FILTER_POPUP_DATE_TO_LABEL,
  FILTER_POPUP_FILTER_PREFIX,
  FILTER_POPUP_KEY_ENTER,
  FILTER_POPUP_NUMBER_OPERATORS,
  FILTER_POPUP_OPERATOR_LABEL,
  FILTER_POPUP_OPERATOR_LABELS,
  FILTER_POPUP_SELECT_PLACEHOLDER,
  FILTER_POPUP_SET_LABEL,
  FILTER_POPUP_TEXT_OPERATORS,
  FILTER_POPUP_TOP_OFFSET,
  FILTER_POPUP_VALUE_LABEL,
} from './FilterPopup.const';

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
  const [setValues, setSetValues] = useState<Set<string>>(() => {
    if (Array.isArray(currentValue)) {
      return new Set(currentValue.map(String));
    }
    return new Set<string>();
  });
  const [dateFrom, setDateFrom] = useState<string>(() => {
    if (Array.isArray(currentValue)) return String(currentValue[0] ?? '');
    return currentValue ? String(currentValue) : '';
  });
  const [dateTo, setDateTo] = useState<string>(() => {
    if (Array.isArray(currentValue)) return String(currentValue[1] ?? '');
    return '';
  });

  const operators =
    filterType === 'number'
      ? FILTER_POPUP_NUMBER_OPERATORS
      : filterType === 'date'
        ? FILTER_POPUP_DATE_OPERATORS
        : FILTER_POPUP_TEXT_OPERATORS;
  useFilterPopupDismiss(popupRef, onClose);

  const handleApply = useCallback(() => {
    if (filterType === 'set') {
      if (setValues.size > 0) {
        onApply(Array.from(setValues), 'in');
      }
      onClose();
      return;
    }
    if (filterType === 'date') {
      if (operator === 'between') {
        if (dateFrom && dateTo) {
          onApply([dateFrom, dateTo], operator);
        }
      } else if (dateFrom) {
        onApply(dateFrom, operator);
      }
      onClose();
      return;
    }
    if (value.trim()) {
      onApply(filterType === 'number' ? Number(value) : value, operator);
    }
    onClose();
  }, [value, operator, filterType, onApply, onClose, setValues, dateFrom, dateTo]);

  const handleClear = useCallback(() => {
    setValue('');
    setSetValues(new Set());
    setDateFrom('');
    setDateTo('');
    onClear();
    onClose();
  }, [onClear, onClose]);

  const toggleSetValue = useCallback((optionValue: string) => {
    setSetValues((prev) => {
      const next = new Set(prev);
      if (next.has(optionValue)) {
        next.delete(optionValue);
      } else {
        next.add(optionValue);
      }
      return next;
    });
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === FILTER_POPUP_KEY_ENTER) {
        handleApply();
      }
    },
    [handleApply]
  );

  return (
    <div
      ref={popupRef}
      className={`filter-popup ${className}`}
      style={{
        top: position?.top ?? '100%',
        left: position?.left ?? 0,
        marginTop: FILTER_POPUP_TOP_OFFSET,
        ...style,
      }}
    >
      <div className="filter-popup-header">
        <div className="header-content">
          <span className="header-title">{columnHeader}</span>
          <Button
            onClick={onClose}
            className="header-close"
            aria-label={FILTER_POPUP_CLOSE_ARIA}
            variant="ghost"
            size="sm"
            icon={<BearIcons.CloseIcon size="xs" />}
          />
        </div>
      </div>

      <div className="filter-popup-body">
        {filterType === 'set' && filterOptions ? (
          <div className="filter-popup-set">
            <label>{FILTER_POPUP_SET_LABEL}</label>
            <div className="filter-popup-set-options">
              {filterOptions.map((opt) => {
                const optionValue = String(opt.value);
                return (
                  <label key={optionValue} className="filter-popup-set-option">
                    <input
                      type="checkbox"
                      checked={setValues.has(optionValue)}
                      onChange={() => toggleSetValue(optionValue)}
                    />
                    <span>{opt.label}</span>
                  </label>
                );
              })}
            </div>
          </div>
        ) : filterType === 'select' && filterOptions ? (
          <select
            value={String(value)}
            onChange={(e) => setValue(e.target.value)}
            className="w-full px-3 py-2 text-sm rounded"
          >
            <option value="">{FILTER_POPUP_SELECT_PLACEHOLDER}</option>
            {filterOptions.map((opt) => (
              <option key={String(opt.value)} value={String(opt.value)}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : filterType === 'date' ? (
          <>
            <div className="filter-field">
              <label>{FILTER_POPUP_OPERATOR_LABEL}</label>
              <select
                value={operator}
                onChange={(e) => setOperator(e.target.value as FilterOperator)}
                className="w-full px-3 py-2 text-sm rounded"
              >
                {operators.map((op) => (
                  <option key={op} value={op}>
                    {FILTER_POPUP_OPERATOR_LABELS[op]}
                  </option>
                ))}
              </select>
            </div>
            <div className="filter-field">
              <label>{operator === 'between' ? FILTER_POPUP_DATE_FROM_LABEL : FILTER_POPUP_VALUE_LABEL}</label>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded"
              />
            </div>
            {operator === 'between' && (
              <div className="filter-field">
                <label>{FILTER_POPUP_DATE_TO_LABEL}</label>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded"
                />
              </div>
            )}
          </>
        ) : (
          <>
            <div className="filter-field">
              <label>{FILTER_POPUP_OPERATOR_LABEL}</label>
              <select
                value={operator}
                onChange={(e) => setOperator(e.target.value as FilterOperator)}
                className="w-full px-3 py-2 text-sm rounded"
              >
                {operators.map((op) => (
                  <option key={op} value={op}>
                    {FILTER_POPUP_OPERATOR_LABELS[op]}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-field">
              <label>{FILTER_POPUP_VALUE_LABEL}</label>
              <input
                type={filterType === 'number' ? 'number' : 'text'}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`${FILTER_POPUP_FILTER_PREFIX} ${columnHeader}...`}
                className="w-full px-3 py-2 text-sm rounded"
                autoFocus
              />
            </div>
          </>
        )}
      </div>

      <div className="filter-popup-footer">
        <button
          onClick={handleClear}
          className="filter-clear"
        >
          {translations.clearFilter}
        </button>
        <button
          onClick={handleApply}
          className="filter-apply"
        >
          {translations.apply}
        </button>
      </div>
    </div>
  );
}

