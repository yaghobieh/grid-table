import type { ColumnDefinition } from '@forgedevstack/grid-table';
import type { RemoteRow } from './ServerDrivenDemo.types';

export const SERVER_DEMO_TOTAL = 240;

export function buildServerDemoDataset(): RemoteRow[] {
  return Array.from({ length: SERVER_DEMO_TOTAL }, (_, i) => ({
    id: i + 1,
    title: `Ticket ${i + 1}`,
    owner: ['Alex', 'Blair', 'Casey', 'Dana'][i % 4],
    status: ['open', 'done', 'wip'][i % 3],
  }));
}

export const SERVER_DEMO_COLUMNS: ColumnDefinition<RemoteRow>[] = [
  { id: 'id', accessor: 'id', header: 'ID', sortable: true, width: 72, align: 'right' },
  { id: 'title', accessor: 'title', header: 'Title', sortable: true, width: 220 },
  { id: 'owner', accessor: 'owner', header: 'Owner', width: 100 },
  { id: 'status', accessor: 'status', header: 'Status', width: 90 },
];

export const SERVER_DRIVEN_DEMO_SOURCE = `import { useCallback, useEffect, useState } from 'react';
import { GridTable } from '@forgedevstack/grid-table';
import type { ColumnDefinition } from '@forgedevstack/grid-table';

type Row = { id: number; title: string; owner: string; status: string; [key: string]: unknown };

const TOTAL = 240;
const allRows: Row[] = Array.from({ length: TOTAL }, (_, i) => ({
  id: i + 1,
  title: \`Ticket \${i + 1}\`,
  owner: ['Alex', 'Blair', 'Casey', 'Dana'][i % 4],
  status: ['open', 'done', 'wip'][i % 3],
}));

const columns: ColumnDefinition<Row>[] = [
  { id: 'id', accessor: 'id', header: 'ID', sortable: true, width: 72, align: 'right' },
  { id: 'title', accessor: 'title', header: 'Title', sortable: true },
  { id: 'owner', accessor: 'owner', header: 'Owner' },
  { id: 'status', accessor: 'status', header: 'Status' },
];

export function ServerPagedGrid() {
  const [data, setData] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPage = useCallback((page: number, pageSize: number) => {
    setLoading(true);
    window.setTimeout(() => {
      const start = (page - 1) * pageSize;
      setData(allRows.slice(start, start + pageSize));
      setLoading(false);
    }, 300);
  }, [allRows]);

  useEffect(() => {
    fetchPage(1, 10);
  }, [fetchPage]);

  // Note: replace window.setTimeout with fetch('/api/...') in production.

  return (
    <GridTable
      data={data}
      columns={columns}
      loading={loading}
      themeMode="light"
      mobileBreakpoint="tablet"
      mobileLayout="stacked"
      paginationConfig={{
        manualPagination: true,
        totalRowCount: TOTAL,
        initialPage: 1,
        initialPageSize: 10,
        pageSizeOptions: [10, 20, 50],
      }}
      onPageChange={(page, pageSize) => fetchPage(page, pageSize)}
    />
  );
}`;
