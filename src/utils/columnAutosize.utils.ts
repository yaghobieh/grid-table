import type { ColumnDefinition, RowData } from '@/types';
import {
  COLUMN_AUTOSIZE_BOOLEAN_NO,
  COLUMN_AUTOSIZE_BOOLEAN_YES,
  COLUMN_AUTOSIZE_FALLBACK_CHAR_PX,
  COLUMN_AUTOSIZE_FONT,
  COLUMN_AUTOSIZE_HEADER_CHROME_PX,
  COLUMN_AUTOSIZE_PADDING_PX,
} from '@constants/columnAutosize.const';
import { MAX_COLUMN_WIDTH, MIN_COLUMN_WIDTH } from '@constants/numbers.const';
import { getCellAccessorValue } from './fillRange.utils';

function measureTextWidth(text: string, font: string): number {
  if (typeof document === 'undefined') {
    return text.length * COLUMN_AUTOSIZE_FALLBACK_CHAR_PX;
  }
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) {
    return text.length * COLUMN_AUTOSIZE_FALLBACK_CHAR_PX;
  }
  context.font = font;
  return context.measureText(text).width;
}

function cellTextFromValue(value: unknown): string {
  if (value == null) return '';
  if (typeof value === 'boolean') return value ? COLUMN_AUTOSIZE_BOOLEAN_YES : COLUMN_AUTOSIZE_BOOLEAN_NO;
  if (value instanceof Date) return value.toLocaleDateString();
  return String(value);
}

export function measureColumnContentWidth<T extends RowData>(
  rows: readonly T[],
  column: ColumnDefinition<T>,
): number {
  const headerText = typeof column.header === 'string' ? column.header : column.id;
  let maxWidth = measureTextWidth(headerText, COLUMN_AUTOSIZE_FONT) + COLUMN_AUTOSIZE_HEADER_CHROME_PX;

  for (const row of rows) {
    const text = cellTextFromValue(getCellAccessorValue(row, column));
    if (!text) continue;
    const width = measureTextWidth(text, COLUMN_AUTOSIZE_FONT) + COLUMN_AUTOSIZE_PADDING_PX;
    if (width > maxWidth) maxWidth = width;
  }

  const minWidth = column.minWidth ?? MIN_COLUMN_WIDTH;
  const maxLimit = column.maxWidth ?? MAX_COLUMN_WIDTH;
  return Math.max(minWidth, Math.min(maxLimit, Math.ceil(maxWidth)));
}
