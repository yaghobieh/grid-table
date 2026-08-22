import type { ReactNode } from 'react';
import {
  FILTER_POPUP_SET_CLASS,
  FILTER_POPUP_SET_LABEL,
  FILTER_POPUP_SET_OPTION_CLASS,
  FILTER_POPUP_SET_OPTIONS_CLASS,
  FILTER_POPUP_SET_SEARCH_CLASS,
  FILTER_POPUP_SET_SEARCH_PLACEHOLDER,
} from '../FilterPopup.const';
import type { FilterPopupSetBodyProps } from '../FilterPopup.types';
import { matchesSetSearch } from '../FilterPopup.utils';

export function FilterPopupSetBody(props: FilterPopupSetBodyProps): ReactNode {
  const { filterOptions, setSearch, setValues, onSearchChange, onToggleValue } = props;

  return (
    <div className={FILTER_POPUP_SET_CLASS}>
      <label>{FILTER_POPUP_SET_LABEL}</label>
      <input
        type="text"
        value={setSearch}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder={FILTER_POPUP_SET_SEARCH_PLACEHOLDER}
        className={FILTER_POPUP_SET_SEARCH_CLASS}
      />
      <div className={FILTER_POPUP_SET_OPTIONS_CLASS}>
        {filterOptions
          .filter((opt) => matchesSetSearch(opt.label, String(opt.value), setSearch))
          .map((opt) => {
            const optionValue = String(opt.value);
            return (
              <label key={optionValue} className={FILTER_POPUP_SET_OPTION_CLASS}>
                <input
                  type="checkbox"
                  checked={setValues.has(optionValue)}
                  onChange={() => onToggleValue(optionValue)}
                />
                <span>{opt.label}</span>
              </label>
            );
          })}
      </div>
    </div>
  );
}
