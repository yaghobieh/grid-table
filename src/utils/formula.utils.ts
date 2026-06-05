import type { RowData } from '@/types';
import type { ColumnDefinition } from '@/types/column.types';
import {
  FORMULA_ALLOWED_PATTERN,
  FORMULA_STRICT_WRAPPER_PREFIX,
  FORMULA_STRICT_WRAPPER_SUFFIX,
} from '@constants/formula.const';
import { ZERO } from '@constants/numbers.const';

function getNumericFieldValue<T extends RowData>(
  row: T,
  field: string,
  columns: ColumnDefinition<T>[],
): number {
  const column = columns.find((col) => col.id === field);
  if (!column) {
    const raw = (row as Record<string, unknown>)[field];
    return Number(raw ?? ZERO);
  }
  const accessor = column.accessor;
  const value = typeof accessor === 'function' ? accessor(row) : row[accessor as keyof T];
  return Number(value ?? ZERO);
}

export function evaluateFormula<T extends RowData>(
  formula: string,
  row: T,
  columns: ColumnDefinition<T>[],
): number | null {
  const trimmed = formula.trim();
  if (!trimmed || !FORMULA_ALLOWED_PATTERN.test(trimmed)) return null;

  let expression = trimmed;
  const fieldIds = columns.map((col) => col.id).sort((a, b) => b.length - a.length);
  for (const fieldId of fieldIds) {
    if (!expression.includes(fieldId)) continue;
    const value = getNumericFieldValue(row, fieldId, columns);
    expression = expression.split(fieldId).join(String(value));
  }

  try {
    const result = Function(`${FORMULA_STRICT_WRAPPER_PREFIX}${expression}${FORMULA_STRICT_WRAPPER_SUFFIX}`)();
    return typeof result === 'number' && Number.isFinite(result) ? result : null;
  } catch {
    return null;
  }
}

export function applyFormulaColumns<T extends RowData>(
  row: T,
  columns: ColumnDefinition<T>[],
): T {
  const next = { ...row } as T;
  for (const column of columns) {
    if (!column.formula) continue;
    const value = evaluateFormula(column.formula, row, columns);
    if (value === null) continue;
    const accessor = column.accessor;
    if (typeof accessor === 'string') {
      (next as Record<string, unknown>)[accessor] = value;
    }
  }
  return next;
}

export function applyFormulaColumnsToData<T extends RowData>(
  data: T[],
  columns: ColumnDefinition<T>[],
): T[] {
  const hasFormula = columns.some((col) => Boolean(col.formula));
  if (!hasFormula) return data;
  return data.map((row) => applyFormulaColumns(row, columns));
}
