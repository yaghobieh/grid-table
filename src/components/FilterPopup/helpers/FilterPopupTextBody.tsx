import type { ReactNode } from 'react';
import type { FilterOperator } from '@/types';
import { ELLIPSIS } from '@constants/strings.const';
import {
  FILTER_POPUP_CONTROL_CLASS,
  FILTER_POPUP_FIELD_CLASS,
  FILTER_POPUP_FILTER_PREFIX,
  FILTER_POPUP_OPERATOR_LABEL,
  FILTER_POPUP_OPERATOR_LABELS,
  FILTER_POPUP_TEXT_BODY_CLASS,
  FILTER_POPUP_VALUE_INPUT_TYPE,
  FILTER_POPUP_VALUE_LABEL,
  FILTER_TYPE_TEXT,
} from '../FilterPopup.const';
import type { FilterPopupTextBodyProps } from '../FilterPopup.types';
import { resolveFilterOperators } from '../FilterPopup.utils';

export function FilterPopupTextBody(props: FilterPopupTextBodyProps): ReactNode {
  const { filterType, operator, value, columnHeader, onOperatorChange, onValueChange, onKeyDown } = props;
  const operators = resolveFilterOperators(filterType);
  const inputType = FILTER_POPUP_VALUE_INPUT_TYPE[filterType] ?? FILTER_POPUP_VALUE_INPUT_TYPE[FILTER_TYPE_TEXT];

  return (
    <div className={FILTER_POPUP_TEXT_BODY_CLASS}>
      <div className={FILTER_POPUP_FIELD_CLASS}>
        <label>{FILTER_POPUP_OPERATOR_LABEL}</label>
        <select
          value={operator}
          onChange={(event) => onOperatorChange(event.target.value as FilterOperator)}
          className={FILTER_POPUP_CONTROL_CLASS}
        >
          {operators.map((op) => (
            <option key={op} value={op}>
              {FILTER_POPUP_OPERATOR_LABELS[op]}
            </option>
          ))}
        </select>
      </div>
      <div className={FILTER_POPUP_FIELD_CLASS}>
        <label>{FILTER_POPUP_VALUE_LABEL}</label>
        <input
          type={inputType}
          value={value}
          onChange={(event) => onValueChange(event.target.value)}
          onKeyDown={onKeyDown}
          placeholder={`${FILTER_POPUP_FILTER_PREFIX} ${columnHeader}${ELLIPSIS}`}
          className={FILTER_POPUP_CONTROL_CLASS}
          autoFocus
        />
      </div>
    </div>
  );
}
