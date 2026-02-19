import { useState, useRef, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { CellEditConfig } from '../../types/column.types';
import type { RowData } from '../../types/row.types';

interface EditableCellProps<T extends RowData> {
  value: unknown;
  row: T;
  columnId: string;
  config: CellEditConfig<T>;
  onSave: (row: T, columnId: string, oldValue: unknown, newValue: unknown) => void;
  children: ReactNode;
}

export function EditableCell<T extends RowData>({
  value,
  row,
  columnId,
  config,
  onSave,
  children,
}: EditableCellProps<T>): ReactNode {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(String(value ?? ''));
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | HTMLSelectElement>(null);

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

  const save = useCallback(() => {
    let parsed: unknown = draft;
    if (config.type === 'number') parsed = Number(draft);
    if (config.type === 'boolean') parsed = draft === 'true';

    if (config.validate) {
      const result = config.validate(parsed, row);
      if (result !== true) {
        setError(result);
        return;
      }
    }

    setEditing(false);
    setError(null);

    if (parsed !== value) {
      if (config.onSave) {
        config.onSave(row, columnId, value, parsed);
      }
      onSave(row, columnId, value, parsed);
    }
  }, [draft, config, row, columnId, value, onSave]);

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
        title="Double-click to edit"
      >
        {children}
      </div>
    );
  }

  if (config.type === 'select' && config.options) {
    return (
      <div className="gt-edit-wrapper">
        <select
          ref={inputRef as React.RefObject<HTMLSelectElement>}
          className="gt-edit-input gt-edit-select"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={save}
          onKeyDown={handleKeyDown}
        >
          {config.options.map((opt) => (
            <option key={String(opt.value)} value={String(opt.value)}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <span className="gt-edit-error">{error}</span>}
      </div>
    );
  }

  if (config.type === 'boolean') {
    return (
      <div className="gt-edit-wrapper">
        <select
          ref={inputRef as React.RefObject<HTMLSelectElement>}
          className="gt-edit-input gt-edit-select"
          value={draft}
          onChange={(e) => { setDraft(e.target.value); }}
          onBlur={save}
          onKeyDown={handleKeyDown}
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        {error && <span className="gt-edit-error">{error}</span>}
      </div>
    );
  }

  return (
    <div className="gt-edit-wrapper">
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
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
