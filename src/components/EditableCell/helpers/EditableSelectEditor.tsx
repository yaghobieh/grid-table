import type { ReactNode } from 'react';
import { Select } from '@forgedevstack/bear';
import type { RowData } from '@/types/row.types';
import {
  EDITABLE_CELL_ERROR_CLASS,
  EDITABLE_CELL_SELECT_CLASS,
  EDITABLE_CELL_WRAPPER_CLASS,
} from '../EditableCell.const';
import type { EditableSelectEditorProps } from '../EditableCell.types';

export function EditableSelectEditor<T extends RowData>(props: EditableSelectEditorProps<T>): ReactNode {
  const { draft, config, error, onDraftChange, onCommit } = props;
  const options = config.options ?? [];

  return (
    <div className={EDITABLE_CELL_WRAPPER_CLASS}>
      <Select
        options={options.map((opt) => ({ value: String(opt.value), label: opt.label }))}
        value={draft}
        onChange={(next) => {
          const opt = options.find((item) => String(item.value) === next);
          onDraftChange(next);
          onCommit(opt ? opt.value : next, true);
        }}
        size="sm"
        fullWidth
        className={EDITABLE_CELL_SELECT_CLASS}
      />
      {error && <span className={EDITABLE_CELL_ERROR_CLASS}>{error}</span>}
    </div>
  );
}
