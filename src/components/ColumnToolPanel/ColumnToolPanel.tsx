import type { ReactNode } from 'react';
import type { RowData } from '@/types';
import type { ColumnToolPanelProps } from './ColumnToolPanel.types';
import {
  COLUMN_TOOL_PANEL_ACTIONS_CLASS,
  COLUMN_TOOL_PANEL_CLASS,
  COLUMN_TOOL_PANEL_ROW_CLASS,
} from './ColumnToolPanel.const';

export function ColumnToolPanel<T extends RowData>(props: ColumnToolPanelProps<T>): ReactNode {
  const {
    columns,
    columnStates,
    label,
    pinLeftLabel,
    pinRightLabel,
    unpinLabel,
    side,
    onToggleColumn,
    onPinColumn,
  } = props;

  return (
    <aside className={`${COLUMN_TOOL_PANEL_CLASS} ${COLUMN_TOOL_PANEL_CLASS}--${side}`} aria-label={label}>
      <strong>{label}</strong>
      {columns.map((column) => {
        const columnState = columnStates.find((item) => item.id === column.id);
        const header = typeof column.header === 'function' ? column.id : column.header;
        const pinned = columnState?.pinned ?? null;
        return (
          <div key={column.id} className={COLUMN_TOOL_PANEL_ROW_CLASS}>
            <label>
              <input
                type="checkbox"
                checked={columnState?.visible !== false}
                onChange={() => onToggleColumn(column.id)}
              />
              <span>{header}</span>
            </label>
            <div className={COLUMN_TOOL_PANEL_ACTIONS_CLASS}>
              <button type="button" aria-pressed={pinned === 'left'} title={pinned === 'left' ? unpinLabel : pinLeftLabel} aria-label={pinLeftLabel} onClick={() => onPinColumn(column.id, pinned === 'left' ? null : 'left')}>
                L
              </button>
              <button type="button" aria-pressed={pinned === 'right'} title={pinned === 'right' ? unpinLabel : pinRightLabel} aria-label={pinRightLabel} onClick={() => onPinColumn(column.id, pinned === 'right' ? null : 'right')}>
                R
              </button>
            </div>
          </div>
        );
      })}
    </aside>
  );
}
