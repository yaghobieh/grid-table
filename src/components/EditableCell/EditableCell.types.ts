import type { ReactNode } from 'react';
import type { CellEditConfig } from '@/types/column.types';
import type { RowData } from '@/types/row.types';

export type EditableCellNavigateDirection = 1 | -1;

export interface EditableCellProps<T extends RowData> {
  value: unknown;
  row: T;
  columnId: string;
  config: CellEditConfig<T>;
  onSave: (row: T, columnId: string, oldValue: unknown, newValue: unknown) => void;
  onNavigateAfterCommit?: (direction: EditableCellNavigateDirection) => void;
  selectOnFocus?: boolean;
  children: ReactNode;
}

export interface EditableSelectEditorProps<T extends RowData> {
  draft: string;
  config: CellEditConfig<T>;
  error: string | null;
  onDraftChange: (value: string) => void;
  onCommit: (parsed: unknown, closeAfter: boolean) => boolean;
}

export interface EditableBooleanEditorProps {
  draft: string;
  yesLabel: string;
  noLabel: string;
  error: string | null;
  onDraftChange: (value: string) => void;
  onCommit: (parsed: unknown, closeAfter: boolean) => boolean;
}

export interface EditableTextEditorProps {
  draft: string;
  inputType: string;
  placeholder?: string;
  error: string | null;
  wrapperRef: React.Ref<HTMLDivElement | null>;
  onDraftChange: (value: string) => void;
  onBlur: () => void;
  onKeyDown: (event: React.KeyboardEvent) => void;
}
