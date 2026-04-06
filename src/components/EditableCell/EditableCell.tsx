import { useState, useRef, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { Select } from '@forgedevstack/bear';
import type { EditableCellProps } from './EditableCell.types';
import type { RowData } from '../../types/row.types';
import { useTableContext } from '../../context';

export function EditableCell<T extends RowData>(props: EditableCellProps<T>): ReactNode {
  const { value, row, columnId, config, onSave, children } = props;
  const { state } = useTableContext<T>();
  const { translations } = state;
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(String(value ?? ''));
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      if (inputRef.current instanceof HTMLInputElement) {
        inputRef.current.select();
      }
    }
  }, [editing]);

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
          return;
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
    },
    [config, row, columnId, value, onSave],
  );

  const save = useCallback(() => {
    let parsed: unknown = draft;
    if (config.type === 'number') parsed = Number(draft);
    if (config.type === 'boolean') parsed = draft === 'true';
    commitParsed(parsed, true);
  }, [draft, config.type, commitParsed]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') save();
      if (e.key === 'Escape') cancel();
    },
    [save, cancel],
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
          options={[
            { value: 'true', label: translations.editYes },
            { value: 'false', label: translations.editNo },
          ]}
          value={draft}
          onChange={(v) => {
            setDraft(v);
            commitParsed(v === 'true', true);
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
