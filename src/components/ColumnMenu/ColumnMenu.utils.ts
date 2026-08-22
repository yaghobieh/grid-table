import type { ColumnMenuItem, ColumnMenuProps } from './ColumnMenu.types';
import {
  COLUMN_MENU_ITEM_AUTOSIZE_ID,
  COLUMN_MENU_ITEM_HIDE_ID,
  COLUMN_MENU_ITEM_PIN_LEFT_ID,
  COLUMN_MENU_ITEM_PIN_RIGHT_ID,
} from './ColumnMenu.const';

export function buildColumnMenuItems(props: ColumnMenuProps): ColumnMenuItem[] {
  return [
    { id: COLUMN_MENU_ITEM_AUTOSIZE_ID, label: props.autosizeLabel, onClick: props.onAutosize },
    { id: COLUMN_MENU_ITEM_PIN_LEFT_ID, label: props.pinLeftLabel, onClick: props.onPinLeft },
    { id: COLUMN_MENU_ITEM_PIN_RIGHT_ID, label: props.pinRightLabel, onClick: props.onPinRight },
    { id: COLUMN_MENU_ITEM_HIDE_ID, label: props.hideLabel, onClick: props.onHide },
  ];
}
