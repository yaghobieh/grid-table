import type { ReactNode, RefObject } from 'react';
import { Input } from '@forgedevstack/bear';
import {
  EDITABLE_CELL_ERROR_CLASS,
  EDITABLE_CELL_WRAPPER_CLASS,
} from '../EditableCell.const';
import type { EditableTextEditorProps } from '../EditableCell.types';

export function EditableTextEditor(props: EditableTextEditorProps): ReactNode {
  const { draft, inputType, placeholder, error, wrapperRef, onDraftChange, onBlur, onKeyDown } = props;

  return (
    <div ref={wrapperRef as RefObject<HTMLDivElement>} className={EDITABLE_CELL_WRAPPER_CLASS}>
      <Input
        size="sm"
        fullWidth
        type={inputType}
        value={draft}
        placeholder={placeholder}
        onChange={(event) => onDraftChange(event.target.value)}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
      />
      {error && <span className={EDITABLE_CELL_ERROR_CLASS}>{error}</span>}
    </div>
  );
}
