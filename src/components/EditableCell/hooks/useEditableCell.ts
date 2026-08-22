import { useCallback, useEffect, useRef, useState } from 'react';
import { useTableContext } from '@/context';
import { KEY_ENTER, KEY_ESCAPE, KEY_TAB } from '@constants/keyboard.const';
import type { RowData } from '@/types/row.types';
import type { EditableCellProps } from '../EditableCell.types';
import { EDITABLE_CELL_INPUT_TAG, NAVIGATE_BACKWARD, NAVIGATE_FORWARD } from '../EditableCell.const';
import { createCommitParsed, parseEditableDraft, toDraftString } from '../EditableCell.utils';

export interface UseEditableCellReturn {
  editing: boolean;
  draft: string;
  error: string | null;
  wrapperRef: React.RefObject<HTMLDivElement | null>;
  translations: ReturnType<typeof useTableContext>['state']['translations'];
  startEdit: () => void;
  setDraft: (value: string) => void;
  commitParsed: (parsed: unknown, closeAfter: boolean) => boolean;
  save: () => boolean;
  handleKeyDown: (event: React.KeyboardEvent) => void;
}

/**
 * Owns EditableCell edit draft, validation commit, and keyboard save/cancel/tab.
 */
export function useEditableCell<T extends RowData>(props: EditableCellProps<T>): UseEditableCellReturn {
  const { value, row, columnId, config, onSave, onNavigateAfterCommit, selectOnFocus = true } = props;
  const { state } = useTableContext<T>();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(toDraftString(value));
  const [error, setError] = useState<string | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const input = wrapperRef.current?.querySelector(EDITABLE_CELL_INPUT_TAG);
    if (!editing || !input) return;
    input.focus();
    if (selectOnFocus) {
      input.select();
    }
  }, [editing, selectOnFocus]);

  const startEdit = useCallback(() => {
    setDraft(toDraftString(value));
    setError(null);
    setEditing(true);
  }, [value]);

  const close = useCallback(() => {
    setEditing(false);
    setError(null);
  }, []);

  const commitParsed = useCallback(
    createCommitParsed({
      config,
      row,
      columnId,
      value,
      onSave,
      setError,
      close,
    }),
    [config, row, columnId, value, onSave, close],
  );

  const save = useCallback(() => {
    return commitParsed(parseEditableDraft(draft, config.type), true);
  }, [draft, config.type, commitParsed]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === KEY_ENTER) {
        event.preventDefault();
        save();
        return;
      }
      if (event.key === KEY_ESCAPE) {
        event.preventDefault();
        close();
        return;
      }
      if (event.key === KEY_TAB) {
        event.preventDefault();
        event.stopPropagation();
        if (save()) {
          onNavigateAfterCommit?.(event.shiftKey ? NAVIGATE_BACKWARD : NAVIGATE_FORWARD);
        }
      }
    },
    [save, close, onNavigateAfterCommit],
  );

  return {
    editing,
    draft,
    error,
    wrapperRef,
    translations: state.translations,
    startEdit,
    setDraft,
    commitParsed,
    save,
    handleKeyDown,
  };
}
