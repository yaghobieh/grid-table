import type { RowHeightConfig } from '@/types/features.types';
import { DEFAULT_ROW_HEIGHT_PX, MAX_ROW_HEIGHT_PX, MIN_ROW_HEIGHT_PX } from '@constants/rowHeight.const';

export function clampRowHeight(height: number, config?: RowHeightConfig): number {
  const min = config?.minHeight ?? MIN_ROW_HEIGHT_PX;
  const max = config?.maxHeight ?? MAX_ROW_HEIGHT_PX;
  return Math.min(max, Math.max(min, height));
}

export function resolveDefaultRowHeight(config?: RowHeightConfig): number {
  return clampRowHeight(config?.defaultHeight ?? DEFAULT_ROW_HEIGHT_PX, config);
}
