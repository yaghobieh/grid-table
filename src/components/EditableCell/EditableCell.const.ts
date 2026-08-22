import { BOOLEAN_TRUE_VALUE } from '@constants/keyboard.const';
import { NEGATIVE_ONE, ONE } from '@constants/numbers.const';
import type { EditableCellNavigateDirection } from './EditableCell.types';

export const NAVIGATE_FORWARD: EditableCellNavigateDirection = ONE as EditableCellNavigateDirection;
export const NAVIGATE_BACKWARD: EditableCellNavigateDirection = NEGATIVE_ONE as EditableCellNavigateDirection;

export const EDITABLE_CELL_CLASS = 'gt-editable-cell';
export const EDITABLE_CELL_WRAPPER_CLASS = 'gt-edit-wrapper';
export const EDITABLE_CELL_ERROR_CLASS = 'gt-edit-error';
export const EDITABLE_CELL_SELECT_CLASS = 'gt-edit-select-bear';
export const EDITABLE_CELL_TYPE_NUMBER = 'number';
export const EDITABLE_CELL_TYPE_BOOLEAN = 'boolean';
export const EDITABLE_CELL_TYPE_SELECT = 'select';
export const EDITABLE_CELL_TYPE_DATE = 'date';
export const EDITABLE_CELL_TYPE_TEXT = 'text';
export const EDITABLE_CELL_INPUT_TAG = 'input';
export const EDITABLE_CELL_INPUT_TYPE: Record<string, string> = {
  [EDITABLE_CELL_TYPE_NUMBER]: EDITABLE_CELL_TYPE_NUMBER,
  [EDITABLE_CELL_TYPE_DATE]: EDITABLE_CELL_TYPE_DATE,
  [EDITABLE_CELL_TYPE_TEXT]: EDITABLE_CELL_TYPE_TEXT,
};

export const EDITABLE_CELL_BOOLEAN_FALSE = 'false';

export const EDITABLE_CELL_BOOLEAN_OPTIONS = (yesLabel: string, noLabel: string) => ([
  { value: BOOLEAN_TRUE_VALUE, label: yesLabel },
  { value: EDITABLE_CELL_BOOLEAN_FALSE, label: noLabel },
]);
