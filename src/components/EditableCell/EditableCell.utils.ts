import type { CellEditConfig } from '@/types/column.types';
import type { RowData } from '@/types/row.types';
import { BOOLEAN_TRUE_VALUE } from '@constants/keyboard.const';
import { EMPTY_STRING } from '@constants/strings.const';
import {
  EDITABLE_CELL_TYPE_BOOLEAN,
  EDITABLE_CELL_TYPE_NUMBER,
} from './EditableCell.const';

export function parseEditableDraft(draft: string, type: string | undefined): unknown {
  if (type === EDITABLE_CELL_TYPE_NUMBER) return Number(draft);
  if (type === EDITABLE_CELL_TYPE_BOOLEAN) return draft === BOOLEAN_TRUE_VALUE;
  return draft;
}

export function createValidateEdit<T extends RowData>(
  validate: CellEditConfig<T>['validate'],
  row: T,
) {
  return (parsed: unknown): true | string => {
    if (!validate) return true;
    return validate(parsed, row);
  };
}

export function createPersistEdit<T extends RowData>(
  config: CellEditConfig<T>,
  row: T,
  columnId: string,
  value: unknown,
  onSave: (row: T, columnId: string, oldValue: unknown, newValue: unknown) => void,
) {
  return (parsed: unknown): void => {
    if (parsed === value) return;
    config.onSave?.(row, columnId, value, parsed);
    onSave(row, columnId, value, parsed);
  };
}

export function createCommitParsed<T extends RowData>(options: {
  config: CellEditConfig<T>;
  row: T;
  columnId: string;
  value: unknown;
  onSave: (row: T, columnId: string, oldValue: unknown, newValue: unknown) => void;
  setError: (error: string | null) => void;
  close: () => void;
}) {
  const validate = createValidateEdit(options.config.validate, options.row);
  const persist = createPersistEdit(
    options.config,
    options.row,
    options.columnId,
    options.value,
    options.onSave,
  );

  return (parsed: unknown, closeAfter: boolean): boolean => {
    const result = validate(parsed);
    if (result !== true) {
      options.setError(result);
      return false;
    }
    if (closeAfter) {
      options.close();
    }
    persist(parsed);
    return true;
  };
}

export function toDraftString(value: unknown): string {
  return String(value ?? EMPTY_STRING);
}
