import { useState, useCallback, useEffect } from 'react';
import type { EditHistoryEntry } from '../types/features.types';

const DEFAULT_MAX_HISTORY = 50;

export interface UseUndoRedoReturn {
  canUndo: boolean;
  canRedo: boolean;
  undo: () => EditHistoryEntry | null;
  redo: () => EditHistoryEntry | null;
  pushEdit: (entry: Omit<EditHistoryEntry, 'timestamp'>) => void;
  clear: () => void;
  history: EditHistoryEntry[];
  cursor: number;
}

export function useUndoRedo(
  maxHistory = DEFAULT_MAX_HISTORY,
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
