import { useState, useCallback, useEffect } from 'react';
import type { EditHistoryEntry } from '../types/features.types';
import type { UseUndoRedoReturn } from '../types/hooks.types';
import { DEFAULT_UNDO_HISTORY_MAX } from '../constants';

/**
 * Cell edit history with undo/redo stack and Ctrl/Cmd+Z / Ctrl+Y shortcuts.
 */
export function useUndoRedo(
  maxHistory = DEFAULT_UNDO_HISTORY_MAX,
  onUndo?: (entry: EditHistoryEntry) => void,
  onRedo?: (entry: EditHistoryEntry) => void,
): UseUndoRedoReturn {
  const [history, setHistory] = useState<EditHistoryEntry[]>([]);
  const [cursor, setCursor] = useState(-1);

  const canUndo = cursor >= 0;
  const canRedo = cursor < history.length - 1;

  const pushEdit = useCallback((entry: Omit<EditHistoryEntry, 'timestamp'>) => {
    setHistory(prev => {
      const trimmed = prev.slice(0, cursor + 1);
      const next = [...trimmed, { ...entry, timestamp: Date.now() }];
      if (next.length > maxHistory) next.shift();
      return next;
    });
    setCursor(prev => Math.min(prev + 1, maxHistory - 1));
  }, [cursor, maxHistory]);

  const undo = useCallback((): EditHistoryEntry | null => {
    if (!canUndo) return null;
    const entry = history[cursor];
    setCursor(prev => prev - 1);
    onUndo?.(entry);
    return entry;
  }, [canUndo, cursor, history, onUndo]);

  const redo = useCallback((): EditHistoryEntry | null => {
    if (!canRedo) return null;
    const entry = history[cursor + 1];
    setCursor(prev => prev + 1);
    onRedo?.(entry);
    return entry;
  }, [canRedo, cursor, history, onRedo]);

  const clear = useCallback(() => {
    setHistory([]);
    setCursor(-1);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        redo();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [undo, redo]);

  return { canUndo, canRedo, undo, redo, pushEdit, clear, history, cursor };
}
