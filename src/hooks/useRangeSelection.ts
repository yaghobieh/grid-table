import { useCallback, useMemo, useState } from 'react';
import type { CellCoord, CellRange } from '@/types/features.types';
import { ZERO } from '@constants/numbers.const';

function normalizeRange(anchor: CellCoord, focus: CellCoord): CellRange {
  return {
    startRow: Math.min(anchor.rowIndex, focus.rowIndex),
    endRow: Math.max(anchor.rowIndex, focus.rowIndex),
    startCol: Math.min(anchor.colIndex, focus.colIndex),
    endCol: Math.max(anchor.colIndex, focus.colIndex),
  };
}

export interface UseRangeSelectionReturn {
  range: CellRange | null;
  isDragging: boolean;
  isFilling: boolean;
  isCellInRange: (rowIndex: number, colIndex: number) => boolean;
  isAnchorCell: (rowIndex: number, colIndex: number) => boolean;
  handleCellMouseDown: (coord: CellCoord) => void;
  handleCellMouseEnter: (coord: CellCoord) => void;
  handleMouseUp: () => void;
  beginFillDrag: () => void;
  setFocusCoord: (coord: CellCoord) => void;
  clearRange: () => void;
}

export function useRangeSelection(enabled: boolean): UseRangeSelectionReturn {
  const [anchor, setAnchor] = useState<CellCoord | null>(null);
  const [focus, setFocus] = useState<CellCoord | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isFilling, setIsFilling] = useState(false);

  const range = useMemo(() => {
    if (!enabled || !anchor || !focus) return null;
    return normalizeRange(anchor, focus);
  }, [enabled, anchor, focus]);

  const handleCellMouseDown = useCallback(
    (coord: CellCoord) => {
      if (!enabled) return;
      setAnchor(coord);
      setFocus(coord);
      setIsDragging(true);
      setIsFilling(false);
    },
    [enabled],
  );

  const handleCellMouseEnter = useCallback(
    (coord: CellCoord) => {
      if (!enabled || (!isDragging && !isFilling)) return;
      if (isFilling && anchor) {
        setFocus({ rowIndex: coord.rowIndex, colIndex: focus?.colIndex ?? anchor.colIndex });
        return;
      }
      setFocus(coord);
    },
    [enabled, isDragging, isFilling, anchor, focus?.colIndex],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsFilling(false);
  }, []);

  const beginFillDrag = useCallback(() => {
    if (!enabled || !anchor) return;
    setIsFilling(true);
    setIsDragging(false);
  }, [enabled, anchor]);

  const setFocusCoord = useCallback((coord: CellCoord) => {
    setFocus(coord);
  }, []);

  const clearRange = useCallback(() => {
    setAnchor(null);
    setFocus(null);
    setIsDragging(false);
    setIsFilling(false);
  }, []);

  const isCellInRange = useCallback(
    (rowIndex: number, colIndex: number) => {
      if (!range) return false;
      return (
        rowIndex >= range.startRow &&
        rowIndex <= range.endRow &&
        colIndex >= range.startCol &&
        colIndex <= range.endCol
      );
    },
    [range],
  );

  const isAnchorCell = useCallback(
    (rowIndex: number, colIndex: number) => {
      if (!anchor) return false;
      return anchor.rowIndex === rowIndex && anchor.colIndex === colIndex;
    },
    [anchor],
  );

  return {
    range,
    isDragging,
    isFilling,
    isCellInRange,
    isAnchorCell,
    handleCellMouseDown,
    handleCellMouseEnter,
    handleMouseUp,
    beginFillDrag,
    setFocusCoord,
    clearRange,
  };
}

export function getRangeCellCount(range: CellRange | null): number {
  if (!range) return ZERO;
  return (range.endRow - range.startRow + 1) * (range.endCol - range.startCol + 1);
}
