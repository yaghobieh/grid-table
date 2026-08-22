import type { ReactNode } from 'react';
import type { RowData } from '@/types/row.types';
import type { EditableCellProps } from './EditableCell.types';
import {
  EDITABLE_CELL_CLASS,
  EDITABLE_CELL_INPUT_TYPE,
  EDITABLE_CELL_TYPE_BOOLEAN,
  EDITABLE_CELL_TYPE_SELECT,
  EDITABLE_CELL_TYPE_TEXT,
} from './EditableCell.const';
import { useEditableCell } from './hooks';
import { EditableBooleanEditor, EditableSelectEditor, EditableTextEditor } from './helpers';

export function EditableCell<T extends RowData>(props: EditableCellProps<T>): ReactNode {
  const cell = useEditableCell(props);

  if (!cell.editing) {
    return (
      <div
        className={EDITABLE_CELL_CLASS}
        onDoubleClick={cell.startEdit}
        title={cell.translations.doubleClickToEdit}
      >
        {props.children}
      </div>
    );
  }

  const editors = {
    [EDITABLE_CELL_TYPE_SELECT]: () =>
      props.config.options ? (
        <EditableSelectEditor
          draft={cell.draft}
          config={props.config}
          error={cell.error}
          onDraftChange={cell.setDraft}
          onCommit={cell.commitParsed}
        />
      ) : null,
    [EDITABLE_CELL_TYPE_BOOLEAN]: () => (
      <EditableBooleanEditor
        draft={cell.draft}
        yesLabel={cell.translations.editYes}
        noLabel={cell.translations.editNo}
        error={cell.error}
        onDraftChange={cell.setDraft}
        onCommit={cell.commitParsed}
      />
    ),
  } as const;

  const typedEditor = props.config.type ? editors[props.config.type as keyof typeof editors] : undefined;
  const editor = typedEditor?.();
  if (editor) return editor;

  return (
    <EditableTextEditor
      draft={cell.draft}
      inputType={EDITABLE_CELL_INPUT_TYPE[props.config.type ?? EDITABLE_CELL_TYPE_TEXT] ?? EDITABLE_CELL_TYPE_TEXT}
      placeholder={props.config.placeholder}
      error={cell.error}
      wrapperRef={cell.wrapperRef}
      onDraftChange={cell.setDraft}
      onBlur={cell.save}
      onKeyDown={cell.handleKeyDown}
    />
  );
}
