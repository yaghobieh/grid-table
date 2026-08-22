import type { ReactNode } from 'react';
import { EMPTY_STRING } from '@constants/strings.const';
import {
  FILTER_POPUP_CONTROL_CLASS,
  FILTER_POPUP_SELECT_PLACEHOLDER,
} from '../FilterPopup.const';
import type { FilterPopupSelectBodyProps } from '../FilterPopup.types';

export function FilterPopupSelectBody(props: FilterPopupSelectBodyProps): ReactNode {
  const { value, filterOptions, onValueChange } = props;

  return (
    <select
      value={String(value)}
      onChange={(event) => onValueChange(event.target.value)}
      className={FILTER_POPUP_CONTROL_CLASS}
    >
      <option value={EMPTY_STRING}>{FILTER_POPUP_SELECT_PLACEHOLDER}</option>
      {filterOptions.map((opt) => (
        <option key={String(opt.value)} value={String(opt.value)}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
