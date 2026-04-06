import type { ColumnDefinition } from '@forgedevstack/grid-table';
import type { StockRow } from './PersistedStateDemo.types';

export const PERSISTED_DEMO_STORAGE_KEY = 'grid-table-portal-demo-pagination';

export const PERSISTED_DEMO_DATA: StockRow[] = [
  { id: 1, symbol: 'AAA', sector: 'Tech', price: 120 },
  { id: 2, symbol: 'BBB', sector: 'Finance', price: 88 },
  { id: 3, symbol: 'CCC', sector: 'Tech', price: 210 },
  { id: 4, symbol: 'DDD', sector: 'Energy', price: 45 },
  { id: 5, symbol: 'EEE', sector: 'Health', price: 64 },
];

export const PERSISTED_DEMO_COLUMNS: ColumnDefinition<StockRow>[] = [
  { id: 'symbol', accessor: 'symbol', header: 'Symbol', sortable: true, width: 100 },
  { id: 'sector', accessor: 'sector', header: 'Sector', filterable: true, width: 120 },
  { id: 'price', accessor: 'price', header: 'Price', sortable: true, align: 'right', width: 100, render: (v: unknown) => `$${Number(v).toFixed(2)}` },
];

export const PERSISTED_STATE_DEMO_SOURCE = `import { useMemo } from 'react';
import { GridTable } from '@forgedevstack/grid-table';
import type { ColumnDefinition } from '@forgedevstack/grid-table';

const STORAGE_KEY = 'my-table-pagination';

type Row = { id: number; symbol: string; sector: string; price: number; [key: string]: unknown };

const columns: ColumnDefinition<Row>[] = [
  { id: 'symbol', accessor: 'symbol', header: 'Symbol', sortable: true },
  { id: 'sector', accessor: 'sector', header: 'Sector', filterable: true },
  { id: 'price', accessor: 'price', header: 'Price', sortable: true, align: 'right' },
];

export function GridWithSavedPagination({ data }: { data: Row[] }) {
  const saved = useMemo(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { page: 1, pageSize: 5 };
      return JSON.parse(raw) as { page: number; pageSize: number };
    } catch {
      return { page: 1, pageSize: 5 };
    }
  }, []);

  return (
    <GridTable
      data={data}
      columns={columns}
      paginationConfig={{
        initialPage: saved.page,
        initialPageSize: saved.pageSize,
        pageSizeOptions: [5, 10, 20],
      }}
      onPageChange={(page, pageSize) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ page, pageSize }));
      }}
    />
  );
}`;
