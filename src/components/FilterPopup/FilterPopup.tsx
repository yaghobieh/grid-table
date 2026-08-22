import type { ReactNode, RefObject } from 'react';
import { Button, BearIcons } from '@forgedevstack/bear';
import { EMPTY_STRING, PERCENT_HUNDRED } from '@constants/strings.const';
import { ZERO } from '@constants/numbers.const';
import type { FilterPopupProps } from './FilterPopup.types';
import {
  FILTER_POPUP_APPLY_CLASS,
  FILTER_POPUP_BODY_CLASS,
  FILTER_POPUP_CLASS,
  FILTER_POPUP_CLEAR_CLASS,
  FILTER_POPUP_CLOSE_ARIA,
  FILTER_POPUP_FOOTER_CLASS,
  FILTER_POPUP_HEADER_CLASS,
  FILTER_POPUP_HEADER_CLOSE_CLASS,
  FILTER_POPUP_HEADER_CONTENT_CLASS,
  FILTER_POPUP_HEADER_TITLE_CLASS,
  FILTER_POPUP_TOP_OFFSET,
} from './FilterPopup.const';
import { useFilterPopup } from './hooks';
import { FilterPopupBody } from './helpers';

export function FilterPopup(props: FilterPopupProps): ReactNode {
  const popup = useFilterPopup(props);

  return (
    <div
      ref={popup.popupRef as RefObject<HTMLDivElement>}
      data-column-id={props.columnId}
      className={`${FILTER_POPUP_CLASS} ${props.className ?? EMPTY_STRING}`}
      style={{
        top: props.position?.top ?? PERCENT_HUNDRED,
        left: props.position?.left ?? ZERO,
        marginTop: FILTER_POPUP_TOP_OFFSET,
        ...props.style,
      }}
    >
      <div className={FILTER_POPUP_HEADER_CLASS}>
        <div className={FILTER_POPUP_HEADER_CONTENT_CLASS}>
          <span className={FILTER_POPUP_HEADER_TITLE_CLASS}>{props.columnHeader}</span>
          <Button
            onClick={props.onClose}
            className={FILTER_POPUP_HEADER_CLOSE_CLASS}
            aria-label={FILTER_POPUP_CLOSE_ARIA}
            variant="ghost"
            size="sm"
            icon={<BearIcons.CloseIcon size="xs" />}
          />
        </div>
      </div>

      <div className={FILTER_POPUP_BODY_CLASS}>
        <FilterPopupBody
          filterType={popup.filterType}
          filterOptions={props.filterOptions}
          setSearch={popup.setSearch}
          setValues={popup.setValues}
          value={popup.value}
          operator={popup.operator}
          dateFrom={popup.dateFrom}
          dateTo={popup.dateTo}
          columnHeader={props.columnHeader}
          onSearchChange={popup.setSetSearch}
          onToggleValue={popup.toggleSetValue}
          onValueChange={popup.setValue}
          onOperatorChange={popup.setOperator}
          onDateFromChange={popup.setDateFrom}
          onDateToChange={popup.setDateTo}
          onKeyDown={popup.handleKeyDown}
        />
      </div>

      <div className={FILTER_POPUP_FOOTER_CLASS}>
        <button onClick={popup.handleClear} className={FILTER_POPUP_CLEAR_CLASS}>
          {popup.translations.clearFilter}
        </button>
        <button onClick={popup.handleApply} className={FILTER_POPUP_APPLY_CLASS}>
          {popup.translations.apply}
        </button>
      </div>
    </div>
  );
}
