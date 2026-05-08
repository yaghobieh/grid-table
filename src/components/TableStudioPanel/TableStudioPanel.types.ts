import type { ColumnDefinition, RowData } from '@/types';

export interface TableStudioPanelProps<T extends RowData = RowData> {
  data: T[];
  columns: ColumnDefinition<T>[];
  propsSnapshot: Record<string, unknown>;
  onDataChange?: (data: T[]) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}
