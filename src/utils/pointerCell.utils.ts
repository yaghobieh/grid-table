import type { CellCoord } from '@/types/features.types';
import { DATA_COL_INDEX_ATTR, DATA_ROW_INDEX_ATTR, POINTER_CELL_SELECTOR } from '@constants/pointerCell.const';

function parseIndexAttr(value: string | null): number | null {
  if (value == null || value === '') return null;
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return null;
  return parsed;
}

export function resolveCellCoordFromPoint(clientX: number, clientY: number): CellCoord | null {
  if (typeof document === 'undefined') return null;
  const hit = document.elementFromPoint(clientX, clientY);
  if (!(hit instanceof Element)) return null;
  const cell = hit.closest(POINTER_CELL_SELECTOR);
  if (!(cell instanceof Element)) return null;
  const rowIndex = parseIndexAttr(cell.getAttribute(DATA_ROW_INDEX_ATTR));
  const colIndex = parseIndexAttr(cell.getAttribute(DATA_COL_INDEX_ATTR));
  if (rowIndex == null || colIndex == null) return null;
  return { rowIndex, colIndex };
}
