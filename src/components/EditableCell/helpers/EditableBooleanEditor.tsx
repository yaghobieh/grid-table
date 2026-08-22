import type { ReactNode } from 'react';
import { Select } from '@forgedevstack/bear';
import { BOOLEAN_TRUE_VALUE } from '@constants/keyboard.const';
import {
  EDITABLE_CELL_BOOLEAN_OPTIONS,
  EDITABLE_CELL_ERROR_CLASS,
  EDITABLE_CELL_SELECT_CLASS,
  EDITABLE_CELL_WRAPPER_CLASS,
} from '../EditableCell.const';
import type { EditableBooleanEditorProps } from '../EditableCell.types';

export function EditableBooleanEditor(props: EditableBooleanEditorProps): ReactNode {
  const { draft, yesLabel, noLabel, error, onDraftChange, onCommit } = props;

  return (
    <div className={EDITABLE_CELL_WRAPPER_CLASS}>
      <Select
        options={EDITABLE_CELL_BOOLEAN_OPTIONS(yesLabel, noLabel)}
        value={draft}
        onChange={(next) => {
          onDraftChange(next);
          onCommit(next === BOOLEAN_TRUE_VALUE, true);
        }}
        size="sm"
        fullWidth
        className={EDITABLE_CELL_SELECT_CLASS}
      />
      {error && <span className={EDITABLE_CELL_ERROR_CLASS}>{error}</span>}
    </div>
  );
}
