import { BOOLEAN_TRUE_VALUE } from '@constants/keyboard.const';

export const EDITABLE_CELL_BOOLEAN_OPTIONS = (yesLabel: string, noLabel: string) => ([
  { value: BOOLEAN_TRUE_VALUE, label: yesLabel },
  { value: 'false', label: noLabel },
]);
