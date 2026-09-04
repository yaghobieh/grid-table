import type { CellCommentsConfig } from '@/types/features.types';
import { CELL_COMMENT_KEY_SEPARATOR } from '@constants/cellComments.const';
import { EMPTY_STRING } from '@constants/strings.const';

export function buildCellCommentKey(rowId: string | number, columnId: string): string {
  return `${rowId}${CELL_COMMENT_KEY_SEPARATOR}${columnId}`;
}

export function resolveCellComment(
  config: CellCommentsConfig | undefined,
  rowId: string | number,
  columnId: string,
): string {
  if (!config?.enabled) return EMPTY_STRING;
  const fromGetter = config.getComment?.(rowId, columnId);
  if (fromGetter) return fromGetter;
  const key = buildCellCommentKey(rowId, columnId);
  return config.comments?.[key] ?? EMPTY_STRING;
}
