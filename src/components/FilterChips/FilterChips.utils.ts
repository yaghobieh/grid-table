import { EMPTY_STRING, LIST_SEPARATOR } from '@constants/strings.const';

export function formatFilterValue(value: unknown): string {
  if (Array.isArray(value)) {
    return value.map(String).join(LIST_SEPARATOR);
  }
  if (value == null) return EMPTY_STRING;
  return String(value);
}
