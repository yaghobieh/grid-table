import type { ColumnState } from '@/types';
import { DEFAULT_COLUMN_WIDTH } from '@constants/numbers.const';

export function findColumnState(columnStates: ColumnState[], columnId: string): ColumnState | undefined {
  return columnStates.find((columnState) => columnState.id === columnId);
}

export function createFallbackColumnState(columnId: string, order: number): ColumnState {
  return {
    id: columnId,
    visible: true,
    width: DEFAULT_COLUMN_WIDTH,
    order,
    pinned: null,
  };
}
