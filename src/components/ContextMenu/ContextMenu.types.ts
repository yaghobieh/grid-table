import type { ContextMenuAction, ContextMenuContext } from '@/types/features.types';
import type { RowData } from '@/types';

export interface ContextMenuProps<T extends RowData = RowData> {
  visible: boolean;
  x: number;
  y: number;
  context: ContextMenuContext<T> | null;
  actions: ContextMenuAction<T>[];
  onClose: () => void;
}
