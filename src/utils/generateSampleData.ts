import type { ColumnDefinition } from '../types';
import type { RowData } from '../types';

/**
 * Generate sample rows for Studio based on column definitions.
 * Uses column id as keys; produces string values by default, or id for the first column named 'id'.
 */
export function generateSampleData<T extends RowData>(
  columns: ColumnDefinition<T>[],
  rowCount: number
): T[] {
  const ids = columns.map((c) => c.id);
  return Array.from({ length: rowCount }, (_, i) => {
    const row: Record<string, unknown> = {};
    ids.forEach((key) => {
      if (key === 'id' || key === 'idNumber') {
        row[key] = i + 1;
      } else if (key === 'email') {
        row[key] = `user${i + 1}@example.com`;
      } else if (key === 'name' || key === 'firstName' || key === 'title') {
        row[key] = `Sample ${i + 1}`;
      } else if (key === 'status' || key === 'role') {
        row[key] = ['active', 'inactive', 'pending'][i % 3];
      } else if (key === 'date' || key === 'joinDate' || key === 'createdAt') {
        row[key] = new Date(2020 + (i % 4), i % 12, (i % 28) + 1).toISOString().slice(0, 10);
      } else if (key === 'salary' || key === 'amount' || key === 'count') {
        row[key] = 1000 * (i + 1) + (i % 100);
      } else if (key === 'department') {
        row[key] = ['Engineering', 'Design', 'Marketing', 'Sales', 'HR'][i % 5];
      } else {
        row[key] = `Value ${i + 1}`;
      }
    });
    if (!('id' in row) && ids.length > 0) {
      row.id = i + 1;
    }
    return row as T;
  });
}
