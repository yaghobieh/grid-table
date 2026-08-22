import type { AutoFitConfig, ColumnDefinition, RowData } from '@/types';
import { MAX_COLUMN_WIDTH, MIN_COLUMN_WIDTH, ZERO } from '@constants/numbers.const';
import { measureColumnContentWidth } from './columnAutosize.utils';

export function autoSizeVisibleColumns<T extends RowData>(
  rows: readonly T[],
  columns: ColumnDefinition<T>[],
  resizeColumn: (columnId: string, width: number) => void,
  config?: AutoFitConfig,
): void {
  for (const column of columns) {
    let width = measureColumnContentWidth(rows, column);
    if (config?.padding) {
      width += config.padding;
    }
    if (config?.minWidth != null) {
      width = Math.max(config.minWidth, width);
    }
    if (config?.maxWidth != null) {
      width = Math.min(config.maxWidth, width);
    }
    resizeColumn(column.id, width);
  }
}

export function sizeVisibleColumnsToFit<T extends RowData>(
  columns: ColumnDefinition<T>[],
  containerWidth: number,
  resizeColumn: (columnId: string, width: number) => void,
  config?: AutoFitConfig,
): void {
  if (columns.length === ZERO || containerWidth <= ZERO) return;
  const minWidth = config?.minWidth ?? MIN_COLUMN_WIDTH;
  const maxWidth = config?.maxWidth ?? MAX_COLUMN_WIDTH;
  const raw = Math.floor(containerWidth / columns.length);
  const width = Math.max(minWidth, Math.min(maxWidth, raw));
  for (const column of columns) {
    const next = Math.max(column.minWidth ?? minWidth, Math.min(column.maxWidth ?? maxWidth, width));
    resizeColumn(column.id, next);
  }
}
