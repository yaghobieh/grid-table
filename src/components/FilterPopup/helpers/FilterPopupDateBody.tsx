import type { ReactNode } from 'react';
import type { FilterOperator } from '@/types';
import { FILTER_OP_BETWEEN } from '@constants/filterOperators.const';
import {
  FILTER_POPUP_CONTROL_CLASS,
  FILTER_POPUP_DATE_BODY_CLASS,
  FILTER_POPUP_DATE_FROM_LABEL,
  FILTER_POPUP_DATE_TO_LABEL,
  FILTER_POPUP_FIELD_CLASS,
  FILTER_POPUP_INPUT_TYPE_DATE,
  FILTER_POPUP_OPERATOR_LABEL,
  FILTER_POPUP_OPERATOR_LABELS,
  FILTER_POPUP_VALUE_LABEL,
  FILTER_TYPE_DATE,
} from '../FilterPopup.const';
import type { FilterPopupDateBodyProps } from '../FilterPopup.types';
import { resolveFilterOperators } from '../FilterPopup.utils';

export function FilterPopupDateBody(props: FilterPopupDateBodyProps): ReactNode {
  const { operator, dateFrom, dateTo, onOperatorChange, onDateFromChange, onDateToChange } = props;
  const operators = resolveFilterOperators(FILTER_TYPE_DATE);

  return (
    <div className={FILTER_POPUP_DATE_BODY_CLASS}>
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
        <label>{operator === FILTER_OP_BETWEEN ? FILTER_POPUP_DATE_FROM_LABEL : FILTER_POPUP_VALUE_LABEL}</label>
        <input
          type={FILTER_POPUP_INPUT_TYPE_DATE}
          value={dateFrom}
          onChange={(event) => onDateFromChange(event.target.value)}
          className={FILTER_POPUP_CONTROL_CLASS}
        />
      </div>
      {operator === FILTER_OP_BETWEEN && (
        <div className={FILTER_POPUP_FIELD_CLASS}>
          <label>{FILTER_POPUP_DATE_TO_LABEL}</label>
          <input
            type={FILTER_POPUP_INPUT_TYPE_DATE}
            value={dateTo}
            onChange={(event) => onDateToChange(event.target.value)}
            className={FILTER_POPUP_CONTROL_CLASS}
          />
        </div>
      )}
    </div>
  );
}
