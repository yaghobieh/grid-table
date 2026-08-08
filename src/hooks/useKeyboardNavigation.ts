import { useState, useCallback, useEffect, useRef } from 'react';
import type { KeyboardEvent, RefObject } from 'react';
import type { FocusedCell, KeyboardNavConfig } from '../types/features.types';
import type { UseKeyboardNavigationReturn } from '../types/hooks.types';
import {
  KEY_ARROW_DOWN,
  KEY_ARROW_LEFT,
  KEY_ARROW_RIGHT,
  KEY_ARROW_UP,
  KEY_END,
  KEY_ENTER,
  KEY_ESCAPE,
  KEY_F2,
  KEY_HOME,
  KEY_PAGE_DOWN,
  KEY_PAGE_UP,
  KEY_TAB,
} from '@/constants/keyboard.const';
import { ONE, TEN, ZERO } from '@/constants/numbers.const';

export function useKeyboardNavigation(
  rowCount: number,
  colCount: number,
  config?: KeyboardNavConfig,
): UseKeyboardNavigationReturn {
  const enabled = config?.enabled ?? false;
  const wrap = config?.wrap ?? false;
  const editOnEnter = config?.enableEditOnEnter ?? true;
  const editOnF2 = config?.enableEditOnF2 ?? true;

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
      if (e.key === KEY_ESCAPE) {
        setIsEditing(false);
        e.preventDefault();
      } else if (e.key === KEY_ENTER) {
        setIsEditing(false);
        setFocusedCell(clamp(focusedCell.rowIndex + 1, focusedCell.colIndex));
        e.preventDefault();
      } else if (e.key === KEY_TAB) {
        setIsEditing(false);
        const delta = e.shiftKey ? -ONE : ONE;
        setFocusedCell(clamp(focusedCell.rowIndex, focusedCell.colIndex + delta));
        e.preventDefault();
      }
      return;
    }

    if (e.shiftKey && (
      e.key === KEY_ARROW_UP ||
      e.key === KEY_ARROW_DOWN ||
      e.key === KEY_ARROW_LEFT ||
      e.key === KEY_ARROW_RIGHT
    )) {
      return;
    }

    const { rowIndex, colIndex } = focusedCell;
    let handled = true;

    switch (e.key) {
      case KEY_ARROW_UP:
        setFocusedCell(clamp(rowIndex - 1, colIndex));
        break;
      case KEY_ARROW_DOWN:
        setFocusedCell(clamp(rowIndex + 1, colIndex));
        break;
      case KEY_ARROW_LEFT:
        setFocusedCell(clamp(rowIndex, colIndex - 1));
        break;
      case KEY_ARROW_RIGHT:
        setFocusedCell(clamp(rowIndex, colIndex + 1));
        break;
      case KEY_HOME:
        setFocusedCell(e.ctrlKey ? { rowIndex: ZERO, colIndex: ZERO } : { rowIndex, colIndex: ZERO });
        break;
      case KEY_END:
        setFocusedCell(e.ctrlKey
          ? { rowIndex: rowCount - 1, colIndex: colCount - 1 }
          : { rowIndex, colIndex: colCount - 1 });
        break;
      case KEY_PAGE_UP:
        setFocusedCell(clamp(Math.max(ZERO, rowIndex - TEN), colIndex));
        break;
      case KEY_PAGE_DOWN:
        setFocusedCell(clamp(Math.min(rowCount - ONE, rowIndex + TEN), colIndex));
        break;
      case KEY_ENTER:
        if (editOnEnter) setIsEditing(true);
        break;
      case KEY_F2:
        if (editOnF2) setIsEditing(true);
        break;
      case KEY_TAB: {
        const delta = e.shiftKey ? -ONE : ONE;
        setFocusedCell(clamp(rowIndex, colIndex + delta));
        break;
      }
      default:
        handled = false;
    }

    if (handled) e.preventDefault();
  }, [enabled, focusedCell, isEditing, clamp, rowCount, colCount, editOnEnter, editOnF2]);

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
