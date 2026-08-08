import { useState, useRef, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { Select } from '@forgedevstack/bear';
import type { EditableCellNavigateDirection, EditableCellProps } from './EditableCell.types';
import type { RowData } from '../../types/row.types';
import { useTableContext } from '../../context';
import { BOOLEAN_TRUE_VALUE, KEY_ENTER, KEY_ESCAPE, KEY_TAB } from '@constants/keyboard.const';
import { EDITABLE_CELL_BOOLEAN_OPTIONS } from './EditableCell.const';

const NAVIGATE_FORWARD: EditableCellNavigateDirection = 1;
const NAVIGATE_BACKWARD: EditableCellNavigateDirection = -1;

export function EditableCell<T extends RowData>(props: EditableCellProps<T>): ReactNode {
  const {
    value,
    row,
    columnId,
    config,
    onSave,
    onNavigateAfterCommit,
    selectOnFocus = true,
    children,
  } = props;
  const { state } = useTableContext<T>();
  const { translations } = state;
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(String(value ?? ''));
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      if (selectOnFocus && inputRef.current instanceof HTMLInputElement) {
        inputRef.current.select();
      }
    }
  }, [editing, selectOnFocus]);

  const startEdit = useCallback(() => {
    setDraft(String(value ?? ''));
    setError(null);
    setEditing(true);
  }, [value]);

  const cancel = useCallback(() => {
    setEditing(false);
    setError(null);
  }, []);

  const commitParsed = useCallback(
    (parsed: unknown, closeAfter: boolean) => {
      if (config.validate) {
        const result = config.validate(parsed, row);
        if (result !== true) {
          setError(result);
          return false;
        }
      }

      if (closeAfter) {
        setEditing(false);
        setError(null);
      }

      if (parsed !== value) {
        if (config.onSave) {
          config.onSave(row, columnId, value, parsed);
        }
        onSave(row, columnId, value, parsed);
      }
      return true;
    },
    [config, row, columnId, value, onSave],
  );

  const save = useCallback(() => {
    let parsed: unknown = draft;
    if (config.type === 'number') parsed = Number(draft);
    if (config.type === 'boolean') parsed = draft === BOOLEAN_TRUE_VALUE;
    return commitParsed(parsed, true);
  }, [draft, config.type, commitParsed]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === KEY_ENTER) {
        e.preventDefault();
        save();
        return;
      }
      if (e.key === KEY_ESCAPE) {
        e.preventDefault();
        cancel();
        return;
      }
      if (e.key === KEY_TAB) {
        e.preventDefault();
        e.stopPropagation();
        const committed = save();
        if (committed) {
          onNavigateAfterCommit?.(e.shiftKey ? NAVIGATE_BACKWARD : NAVIGATE_FORWARD);
        }
      }
    },
    [save, cancel, onNavigateAfterCommit],
  );

  if (!editing) {
    return (
      <div
        className="gt-editable-cell"
        onDoubleClick={startEdit}
        title={translations.doubleClickToEdit}
      >
        {children}
      </div>
    );
  }

  if (config.type === 'select' && config.options) {
    return (
      <div className="gt-edit-wrapper">
        <Select
          options={config.options.map((opt) => ({ value: String(opt.value), label: opt.label }))}
          value={draft}
          onChange={(v) => {
            const opt = config.options!.find((o) => String(o.value) === v);
            const parsed = opt ? opt.value : v;
            setDraft(v);
            commitParsed(parsed, true);
          }}
          size="sm"
          fullWidth
          className="gt-edit-select-bear"
        />
        {error && <span className="gt-edit-error">{error}</span>}
      </div>
    );
  }

  if (config.type === 'boolean') {
    return (
      <div className="gt-edit-wrapper">
        <Select
          options={EDITABLE_CELL_BOOLEAN_OPTIONS(translations.editYes, translations.editNo)}
          value={draft}
          onChange={(v) => {
            setDraft(v);
            commitParsed(v === BOOLEAN_TRUE_VALUE, true);
          }}
          size="sm"
          fullWidth
          className="gt-edit-select-bear"
        />
        {error && <span className="gt-edit-error">{error}</span>}
      </div>
    );
  }

  return (
    <div className="gt-edit-wrapper">
      <input
        ref={inputRef}
        className="gt-edit-input"
        type={config.type === 'number' ? 'number' : config.type === 'date' ? 'date' : 'text'}
        value={draft}
        placeholder={config.placeholder}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={save}
        onKeyDown={handleKeyDown}
      />
      {error && <span className="gt-edit-error">{error}</span>}
    </div>
  );
}
