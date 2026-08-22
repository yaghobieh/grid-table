import type { ReactNode } from 'react';
import { FILTER_TYPE_DATE, FILTER_TYPE_SELECT, FILTER_TYPE_SET } from '../FilterPopup.const';
import type { FilterPopupBodyProps, FilterPopupFilterType } from '../FilterPopup.types';
import { FilterPopupDateBody } from './FilterPopupDateBody';
import { FilterPopupSelectBody } from './FilterPopupSelectBody';
import { FilterPopupSetBody } from './FilterPopupSetBody';
import { FilterPopupTextBody } from './FilterPopupTextBody';

const FILTER_POPUP_BODY_BY_TYPE: Record<string, (props: FilterPopupBodyProps) => ReactNode> = {
  [FILTER_TYPE_SET]: (props) =>
    props.filterOptions ? (
      <FilterPopupSetBody
        filterOptions={props.filterOptions}
        setSearch={props.setSearch}
        setValues={props.setValues}
        onSearchChange={props.onSearchChange}
        onToggleValue={props.onToggleValue}
      />
    ) : null,
  [FILTER_TYPE_SELECT]: (props) =>
    props.filterOptions ? (
      <FilterPopupSelectBody
        value={props.value}
        filterOptions={props.filterOptions}
        onValueChange={props.onValueChange}
      />
    ) : null,
  [FILTER_TYPE_DATE]: (props) => (
    <FilterPopupDateBody
      operator={props.operator}
      dateFrom={props.dateFrom}
      dateTo={props.dateTo}
      onOperatorChange={props.onOperatorChange}
      onDateFromChange={props.onDateFromChange}
      onDateToChange={props.onDateToChange}
    />
  ),
};

export function FilterPopupBody(props: FilterPopupBodyProps): ReactNode {
  const render = FILTER_POPUP_BODY_BY_TYPE[props.filterType as FilterPopupFilterType];
  if (render) return render(props);
  return (
    <FilterPopupTextBody
      filterType={props.filterType}
      operator={props.operator}
      value={props.value}
      columnHeader={props.columnHeader}
      onOperatorChange={props.onOperatorChange}
      onValueChange={props.onValueChange}
      onKeyDown={props.onKeyDown}
    />
  );
}
