import { FLASH_CELL_CLASS, DEFAULT_FLASH_DURATION_MS } from '@constants/flashCells.const';

export type FlashCellKey = string;

export function buildFlashCellKey(rowId: string | number, columnId: string): FlashCellKey {
  return `${rowId}:${columnId}`;
}

export function scheduleFlashRemoval(
  keys: FlashCellKey[],
  activeFlashes: Set<FlashCellKey>,
  onUpdate: (next: Set<FlashCellKey>) => void,
  durationMs: number = DEFAULT_FLASH_DURATION_MS,
): void {
  const next = new Set(activeFlashes);
  for (const key of keys) {
    next.add(key);
  }
  onUpdate(next);

  window.setTimeout(() => {
    const cleared = new Set(next);
    for (const key of keys) {
      cleared.delete(key);
    }
    onUpdate(cleared);
  }, durationMs);
}

export function getFlashCellClassName(
  rowId: string | number,
  columnId: string,
  activeFlashes: Set<FlashCellKey>,
): string {
  return activeFlashes.has(buildFlashCellKey(rowId, columnId)) ? FLASH_CELL_CLASS : '';
}
