import type { CellRange } from '@/types/features.types';
import { ONE, ZERO } from '@constants/numbers.const';
import { RANGE_ANNOUNCE_COUNT_TOKEN } from '@constants/rangeAnnounce.const';
import { EMPTY_STRING } from '@constants/strings.const';

export function countRangeCells(range: CellRange | null): number {
  if (!range) return ZERO;
  const rows = Math.abs(range.endRow - range.startRow) + ONE;
  const cols = Math.abs(range.endCol - range.startCol) + ONE;
  return rows * cols;
}

export function formatRangeAnnouncement(template: string, count: number): string {
  if (!template) return EMPTY_STRING;
  return template.replace(RANGE_ANNOUNCE_COUNT_TOKEN, String(count));
}
