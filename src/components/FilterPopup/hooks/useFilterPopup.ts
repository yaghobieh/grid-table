import { useCallback, useRef, useState } from 'react';
import type { FilterOperator } from '@/types';
import { useTableContext } from '@/context';
import { useFilterPopupDismiss } from '@hooks/useFilterPopupDismiss';
import { KEY_ENTER } from '@constants/keyboard.const';
import { EMPTY_STRING } from '@constants/strings.const';
import { ONE, ZERO } from '@constants/numbers.const';
import { FILTER_OP_BETWEEN, FILTER_OP_CONTAINS, FILTER_OP_IN } from '@constants/filterOperators.const';
import { FILTER_TYPE_DATE, FILTER_TYPE_NUMBER, FILTER_TYPE_SET, FILTER_TYPE_TEXT } from '../FilterPopup.const';
import type { FilterPopupProps } from '../FilterPopup.types';
import {
  createSetValues,
  resolveDateBound,
  resolveFilterOperators,
  resolveInitialTextValue,
  nextSetValues,
} from '../FilterPopup.utils';

export interface UseFilterPopupReturn {
  popupRef: React.RefObject<HTMLDivElement | null>;
  translations: ReturnType<typeof useTableContext>['state']['translations'];
  value: string;
  operator: FilterOperator;
  setSearch: string;
  setValues: Set<string>;
  dateFrom: string;
  dateTo: string;
  operators: FilterOperator[];
  filterType: FilterPopupProps['filterType'];
  setValue: (value: string) => void;
  setOperator: (operator: FilterOperator) => void;
  setSetSearch: (value: string) => void;
  setDateFrom: (value: string) => void;
  setDateTo: (value: string) => void;
  toggleSetValue: (optionValue: string) => void;
  handleApply: () => void;
  handleClear: () => void;
  handleKeyDown: (event: React.KeyboardEvent) => void;
}

/**
 * Owns FilterPopup draft state, apply/clear, and dismiss handlers.
 */
export function useFilterPopup(props: FilterPopupProps): UseFilterPopupReturn {
  const {
    filterType = FILTER_TYPE_TEXT,
    currentValue,
    currentOperator = FILTER_OP_CONTAINS,
    onApply,
    onClear,
    onClose,
  } = props;
  const { state } = useTableContext();
  const popupRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState<string>(resolveInitialTextValue(currentValue));
  const [operator, setOperator] = useState<FilterOperator>(currentOperator);
  const [setSearch, setSetSearch] = useState(EMPTY_STRING);
  const [setValues, setSetValues] = useState<Set<string>>(() => createSetValues(currentValue));
  const [dateFrom, setDateFrom] = useState<string>(() => resolveDateBound(currentValue, ZERO));
  const [dateTo, setDateTo] = useState<string>(() => resolveDateBound(currentValue, ONE));

  useFilterPopupDismiss(popupRef, onClose);

  const handleApply = useCallback(() => {
    if (filterType === FILTER_TYPE_SET) {
      if (setValues.size > ZERO) {
        onApply(Array.from(setValues), FILTER_OP_IN);
      }
      onClose();
      return;
    }
    if (filterType === FILTER_TYPE_DATE) {
      if (operator === FILTER_OP_BETWEEN) {
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
      onApply(filterType === FILTER_TYPE_NUMBER ? Number(value) : value, operator);
    }
    onClose();
  }, [value, operator, filterType, onApply, onClose, setValues, dateFrom, dateTo]);

  const handleClear = useCallback(() => {
    setValue(EMPTY_STRING);
    setSetValues(new Set());
    setDateFrom(EMPTY_STRING);
    setDateTo(EMPTY_STRING);
    onClear();
    onClose();
  }, [onClear, onClose]);

  const toggleSetValue = useCallback((optionValue: string) => {
    setSetValues((prev) => nextSetValues(prev, optionValue));
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === KEY_ENTER) {
        handleApply();
      }
    },
    [handleApply],
  );

  return {
    popupRef,
    translations: state.translations,
    value,
    operator,
    setSearch,
    setValues,
    dateFrom,
    dateTo,
    operators: resolveFilterOperators(filterType),
    filterType,
    setValue,
    setOperator,
    setSetSearch,
    setDateFrom,
    setDateTo,
    toggleSetValue,
    handleApply,
    handleClear,
    handleKeyDown,
  };
}
