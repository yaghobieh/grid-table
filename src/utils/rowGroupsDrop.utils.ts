import type { RowGroupConfig } from '@/types/features.types';
import { ZERO } from '@constants/numbers.const';

export function addRowGroupField(groups: RowGroupConfig[], field: string): RowGroupConfig[] {
  if (groups.some((group) => group.by === field)) return groups;
  return [...groups, { by: field, showHeaders: true }];
}

export function removeRowGroupField(groups: RowGroupConfig[], field: string): RowGroupConfig[] {
  return groups.filter((group) => group.by !== field);
}

export function isRowGroupDropZoneEnabled(
  dropZone: boolean | { enabled?: boolean } | undefined,
  groups: RowGroupConfig[] | undefined,
): boolean {
  if (dropZone === true) return true;
  if (dropZone && typeof dropZone === 'object') return dropZone.enabled !== false;
  return Boolean(groups && groups.length > ZERO);
}
