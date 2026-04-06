import type { ColumnDefinition } from '@forgedevstack/grid-table';
import type { LogRow } from './VirtualizationDemo.types';

export const VIRTUAL_DEMO_ROW_COUNT = 500;

export function buildVirtualDemoRows(): LogRow[] {
  return Array.from({ length: VIRTUAL_DEMO_ROW_COUNT }, (_, i) => ({
    id: i + 1,
    level: ['info', 'warn', 'error'][i % 3],
    message: `Event batch ${i + 1} processed`,
    ms: 12 + (i % 40),
  }));
}

export const VIRTUAL_DEMO_COLUMNS: ColumnDefinition<LogRow>[] = [
  { id: 'id', accessor: 'id', header: 'ID', width: 64, align: 'right' },
  { id: 'level', accessor: 'level', header: 'Level', width: 80 },
  { id: 'message', accessor: 'message', header: 'Message', width: 280 },
  { id: 'ms', accessor: 'ms', header: 'ms', align: 'right', width: 64 },
];

export function buildVirtualizationDemoSource(opts: {
  initialRows: number;
  batchSize: number;
  maxHeight: number;
  lazyEnabled: boolean;
}): string {
  const lazyBlock = opts.lazyEnabled
    ? `      lazyLoad={{
        enabled: true,
        initialRows: ${opts.initialRows},
        batchSize: ${opts.batchSize},
      }}`
    : '';
  return `import { useMemo } from 'react';
import { GridTable } from '@forgedevstack/grid-table';
import type { ColumnDefinition } from '@forgedevstack/grid-table';

type Row = { id: number; level: string; message: string; ms: number; [key: string]: unknown };

const columns: ColumnDefinition<Row>[] = [
  { id: 'id', accessor: 'id', header: 'ID', width: 64, align: 'right' },
  { id: 'level', accessor: 'level', header: 'Level', width: 80 },
  { id: 'message', accessor: 'message', header: 'Message', width: 280 },
  { id: 'ms', accessor: 'ms', header: 'ms', align: 'right', width: 64 },
];

export function LargeTable() {
  const data = useMemo(
    () =>
      Array.from({ length: 500 }, (_, i) => ({
        id: i + 1,
        level: ['info', 'warn', 'error'][i % 3],
        message: \`Event batch \${i + 1} processed\`,
        ms: 12 + (i % 40),
      })),
    [],
  );

  return (
    <GridTable
      data={data}
      columns={columns}
      themeMode="light"
      showPagination={false}
      showGlobalFilter={false}
      dimensions={{ maxHeight: ${opts.maxHeight} }}
      stickyHeader
${lazyBlock}
    />
  );
}`;
}
