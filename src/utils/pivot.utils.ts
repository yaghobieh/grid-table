import type { ColumnDefinition, RowData } from '@/types';
import type { PivotConfig } from '@/types/features.types';
import { computeAggregation } from './export.utils';
import { EMPTY_STRING } from '@constants/strings.const';
import { ONE, ZERO } from '@constants/numbers.const';
import {
  PIVOT_FIELD_SEPARATOR,
  PIVOT_KEY_SEPARATOR,
  PIVOT_ROW_ID_PREFIX,
} from '@constants/pivot.const';

export interface PivotTableResult<T extends RowData> {
  rows: T[];
  columns: ColumnDefinition<T>[];
}

function readField(row: RowData, field: string): unknown {
  return (row as Record<string, unknown>)[field];
}

function formatFieldValue(value: unknown): string {
  if (value == null) return EMPTY_STRING;
  return String(value);
}

function buildKey(parts: string[]): string {
  return parts.join(PIVOT_KEY_SEPARATOR);
}

export function isPivotEnabled(config: PivotConfig | undefined): boolean {
  return Boolean(config?.enabled && config.rowFields.length > ZERO && config.valueFields.length > ZERO);
}

export function buildPivotTable<T extends RowData>(
  data: T[],
  sourceColumns: ColumnDefinition<T>[],
  config: PivotConfig,
): PivotTableResult<T> {
  const rowFields = config.rowFields;
  const columnFields = config.columnFields;
  const valueFields = config.valueFields;

  const columnKeys = new Set<string>();
  const grouped = new Map<string, T[]>();

  for (const row of data) {
    const rowKey = buildKey(rowFields.map((field) => formatFieldValue(readField(row, field))));
    const existing = grouped.get(rowKey);
    if (existing) {
      existing.push(row);
    } else {
      grouped.set(rowKey, [row]);
    }
    if (columnFields.length > ZERO) {
      columnKeys.add(buildKey(columnFields.map((field) => formatFieldValue(readField(row, field)))));
    }
  }

  const sortedColumnKeys = columnFields.length > ZERO ? Array.from(columnKeys).sort() : [EMPTY_STRING];

  const columns: ColumnDefinition<T>[] = rowFields.map((field) => {
    const source = sourceColumns.find((column) => column.id === field || column.accessor === field);
    return {
      id: field,
      accessor: field,
      header: source && typeof source.header === 'string' ? source.header : field,
      sortable: true,
    };
  });

  for (const columnKey of sortedColumnKeys) {
    for (const valueField of valueFields) {
      const source = sourceColumns.find(
        (column) => column.id === valueField.field || column.accessor === valueField.field,
      );
      const valueLabel = valueField.label ?? (source && typeof source.header === 'string' ? source.header : valueField.field);
      const header = columnKey ? `${columnKey}${PIVOT_FIELD_SEPARATOR}${valueLabel}` : valueLabel;
      const id = columnKey ? `${columnKey}${PIVOT_FIELD_SEPARATOR}${valueField.field}` : valueField.field;
      columns.push({
        id,
        accessor: id,
        header,
        align: 'right',
      });
    }
  }

  const rows = Array.from(grouped.entries()).map(([rowKey, groupRows], index) => {
    const next = {} as T;
    (next as Record<string, unknown>).id = `${PIVOT_ROW_ID_PREFIX}${rowKey || index}`;
    rowFields.forEach((field, fieldIndex) => {
      const sample = groupRows[ZERO];
      (next as Record<string, unknown>)[field] = sample ? readField(sample, field) : rowKey.split(PIVOT_KEY_SEPARATOR)[fieldIndex];
    });
    for (const columnKey of sortedColumnKeys) {
      const slice = columnFields.length > ZERO
        ? groupRows.filter((row) =>
            buildKey(columnFields.map((field) => formatFieldValue(readField(row, field)))) === columnKey,
          )
        : groupRows;
      for (const valueField of valueFields) {
        const source = sourceColumns.find(
          (column) => column.id === valueField.field || column.accessor === valueField.field,
        );
        const accessor = source?.accessor ?? valueField.field;
        const columnDef = source ?? { id: valueField.field, accessor, header: valueField.field };
        const id = columnKey ? `${columnKey}${PIVOT_FIELD_SEPARATOR}${valueField.field}` : valueField.field;
        (next as Record<string, unknown>)[id] = computeAggregation(slice, columnDef, valueField.type);
      }
    }
    return next;
  });

  return { rows, columns };
}

export function countPivotValueCells(columnCount: number, rowFieldCount: number): number {
  const valueCols = columnCount - rowFieldCount;
  return valueCols > ZERO ? valueCols : ONE;
}
