import type { ReactNode } from 'react';
import { BearIcons } from '@forgedevstack/bear';
import type { SortDirection } from '@/types';
import type { HeaderCellSortIconProps } from '../HeaderCell.types';
import {
  HEADER_CELL_ICON_ACTIVE_CLASS,
  HEADER_CELL_ICON_MUTED_CLASS,
  SORT_DIRECTION_ASC,
  SORT_DIRECTION_DESC,
} from '../HeaderCell.const';

const SORT_ICON_MAP: Record<Exclude<SortDirection, null>, () => ReactNode> = {
  [SORT_DIRECTION_ASC]: () => (
    <BearIcons.Navigation.ChevronUpIcon size="xs" className={HEADER_CELL_ICON_ACTIVE_CLASS} />
  ),
  [SORT_DIRECTION_DESC]: () => (
    <BearIcons.Navigation.ChevronDownIcon size="xs" className={HEADER_CELL_ICON_ACTIVE_CLASS} />
  ),
};

function renderDefaultSortIcon(): ReactNode {
  return <BearIcons.ArrowDownIcon size="xs" className={HEADER_CELL_ICON_MUTED_CLASS} />;
}

export function HeaderCellSortIcon(props: HeaderCellSortIconProps): ReactNode {
  const render = props.sortDirection ? SORT_ICON_MAP[props.sortDirection] : renderDefaultSortIcon;
  return render();
}
