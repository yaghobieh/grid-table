import type { ReactNode } from 'react';
import { Button, BearIcons } from '@forgedevstack/bear';
import type { ColumnMenuProps } from './ColumnMenu.types';
import {
  COLUMN_MENU_CLASS,
  COLUMN_MENU_ITEM_CLASS,
  COLUMN_MENU_PANEL_CLASS,
  COLUMN_MENU_TRIGGER_CLASS,
  COLUMN_MENU_TRIGGER_LABEL,
} from './ColumnMenu.const';
import { buildColumnMenuItems } from './ColumnMenu.utils';

export function ColumnMenu(props: ColumnMenuProps): ReactNode {
  const items = buildColumnMenuItems(props);

  return (
    <div className={COLUMN_MENU_CLASS}>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className={COLUMN_MENU_TRIGGER_CLASS}
        aria-label={COLUMN_MENU_TRIGGER_LABEL}
        aria-expanded={props.open}
        icon={<BearIcons.MoreVertIcon size="xs" />}
        onClick={(event) => {
          event.stopPropagation();
          props.onToggle();
        }}
      />
      {props.open && (
        <div className={COLUMN_MENU_PANEL_CLASS} role="menu">
          {items.map((item) => (
            <Button
              key={item.id}
              type="button"
              variant="ghost"
              size="sm"
              className={COLUMN_MENU_ITEM_CLASS}
              role="menuitem"
              onClick={(event) => {
                event.stopPropagation();
                item.onClick();
              }}
            >
              {item.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
