import type { ReactNode } from 'react';
import { Button, Dropdown } from '@forgedevstack/bear';
import type { RowData } from '@/types';
import type { ColumnChooserProps } from './ColumnChooser.types';
import {
  COLUMN_CHOOSER_CLASS,
  COLUMN_CHOOSER_MIN_WIDTH,
  COLUMN_CHOOSER_PLACEMENT,
  COLUMN_CHOOSER_SIZE,
  COLUMN_CHOOSER_TRIGGER_CLASS,
} from './ColumnChooser.const';
import { buildColumnChooserItems } from './helpers';

export function ColumnChooser<T extends RowData>(props: ColumnChooserProps<T>): ReactNode {
  return (
    <Dropdown
      className={COLUMN_CHOOSER_CLASS}
      open={props.open}
      onOpenChange={(nextOpen) => {
        if (nextOpen !== props.open) props.onToggle();
      }}
      closeOnSelect={false}
      placement={COLUMN_CHOOSER_PLACEMENT}
      size={COLUMN_CHOOSER_SIZE}
      minWidth={COLUMN_CHOOSER_MIN_WIDTH}
      trigger={
        <Button
          type="button"
          size={COLUMN_CHOOSER_SIZE}
          variant="outline"
          className={COLUMN_CHOOSER_TRIGGER_CLASS}
          aria-label={props.label}
        >
          {props.label}
        </Button>
      }
      items={buildColumnChooserItems(props)}
    />
  );
}
