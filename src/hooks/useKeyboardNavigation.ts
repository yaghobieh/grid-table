import { useState, useCallback, useEffect, useRef } from 'react';
import type { KeyboardEvent, RefObject } from 'react';
import type { FocusedCell, KeyboardNavConfig } from '../types/features.types';
import type { UseKeyboardNavigationReturn } from '../types/hooks.types';

/**
 * Arrow-key cell focus, Enter/Tab edit flow, and optional wrap for grid keyboard navigation.
 */
export function useKeyboardNavigation(
  rowCount: number,
  colCount: number,
  config?: KeyboardNavConfig,
): UseKeyboardNavigationReturn {
  const enabled = config?.enabled ?? false;
  const wrap = config?.wrap ?? false;
  const editOnEnter = config?.enableEditOnEnter ?? true;

  const [focusedCell, setFocusedCell] = useState<FocusedCell | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null!) as RefObject<HTMLDivElement>;

  const clamp = useCallback((row: number, col: number): FocusedCell => {
    let r = row;
    let c = col;

    if (wrap) {
      if (c < 0) { c = colCount - 1; r--; }
      if (c >= colCount) { c = 0; r++; }
      if (r < 0) r = rowCount - 1;
      if (r >= rowCount) r = 0;
    } else {
      r = Math.max(0, Math.min(r, rowCount - 1));
      c = Math.max(0, Math.min(c, colCount - 1));
    }

    return { rowIndex: r, colIndex: c };
  }, [rowCount, colCount, wrap]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!enabled || !focusedCell) return;

    if (isEditing) {
      if (e.key === 'Escape') {
        setIsEditing(false);
        e.preventDefault();
      } else if (e.key === 'Enter') {
        setIsEditing(false);
        setFocusedCell(clamp(focusedCell.rowIndex + 1, focusedCell.colIndex));
        e.preventDefault();
      } else if (e.key === 'Tab') {
        setIsEditing(false);
        const delta = e.shiftKey ? -1 : 1;
        setFocusedCell(clamp(focusedCell.rowIndex, focusedCell.colIndex + delta));
        e.preventDefault();
      }
      return;
    }

    const { rowIndex, colIndex } = focusedCell;
    let handled = true;

    switch (e.key) {
      case 'ArrowUp':
        setFocusedCell(clamp(rowIndex - 1, colIndex));
        break;
      case 'ArrowDown':
        setFocusedCell(clamp(rowIndex + 1, colIndex));
        break;
      case 'ArrowLeft':
        setFocusedCell(clamp(rowIndex, colIndex - 1));
        break;
      case 'ArrowRight':
        setFocusedCell(clamp(rowIndex, colIndex + 1));
        break;
      case 'Home':
        setFocusedCell(e.ctrlKey ? { rowIndex: 0, colIndex: 0 } : { rowIndex, colIndex: 0 });
        break;
      case 'End':
        setFocusedCell(e.ctrlKey
          ? { rowIndex: rowCount - 1, colIndex: colCount - 1 }
          : { rowIndex, colIndex: colCount - 1 });
        break;
      case 'PageUp':
        setFocusedCell(clamp(Math.max(0, rowIndex - 10), colIndex));
        break;
      case 'PageDown':
        setFocusedCell(clamp(Math.min(rowCount - 1, rowIndex + 10), colIndex));
        break;
      case 'Enter':
        if (editOnEnter) setIsEditing(true);
        break;
      case 'Tab': {
        const delta = e.shiftKey ? -1 : 1;
        setFocusedCell(clamp(rowIndex, colIndex + delta));
        break;
      }
      default:
        handled = false;
    }

    if (handled) e.preventDefault();
  }, [enabled, focusedCell, isEditing, clamp, rowCount, colCount, editOnEnter]);

  useEffect(() => {
    if (!enabled || !focusedCell || !containerRef.current) return;
    const selector = `[data-row="${focusedCell.rowIndex}"][data-col="${focusedCell.colIndex}"]`;
    const cell = containerRef.current.querySelector(selector) as HTMLElement | null;
    cell?.focus();
  }, [enabled, focusedCell]);

  return {
    focusedCell,
    setFocusedCell,
    handleKeyDown,
    containerRef,
    isEditing,
    startEditing: () => setIsEditing(true),
    stopEditing: () => setIsEditing(false),
  };
}
