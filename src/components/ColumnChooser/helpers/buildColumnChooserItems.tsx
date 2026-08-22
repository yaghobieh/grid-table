import type { DropdownItem } from '@forgedevstack/bear';
import { Checkbox } from '@forgedevstack/bear';
import type { RowData } from '@/types';
import type { ColumnChooserProps } from '../ColumnChooser.types';
import { COLUMN_CHOOSER_CHECKBOX_CLASS } from '../ColumnChooser.const';

export function resolveColumnChooserLabel<T extends RowData>(
  column: ColumnChooserProps<T>['columns'][number],
): string {
  return typeof column.header === 'string' ? column.header : column.id;
}

export function buildColumnChooserItems<T extends RowData>(props: ColumnChooserProps<T>): DropdownItem[] {
  return props.columns.map((column) => {
    const visible = props.columnStates.find((item) => item.id === column.id)?.visible !== false;
    return {
      key: column.id,
      label: resolveColumnChooserLabel(column),
      selected: visible,
      icon: (
        <span className={COLUMN_CHOOSER_CHECKBOX_CLASS}>
          <Checkbox checked={visible} size="sm" tabIndex={-1} readOnly />
        </span>
      ),
      onClick: () => props.onToggleColumn(column.id),
    };
  });
}
