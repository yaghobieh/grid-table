import type { ColumnDefinition } from '@forgedevstack/grid-table';
import type { GroupedMetricRow } from './ColumnGroupingDemo.types';

export const COLUMN_GROUPING_DATA: GroupedMetricRow[] = [
  { id: 1, product: 'Alpha', channel: 'Web', revenue: 12000, growth: 12 },
  { id: 2, product: 'Beta', channel: 'Retail', revenue: 8400, growth: -3 },
  { id: 3, product: 'Gamma', channel: 'Web', revenue: 15200, growth: 8 },
];

export const COLUMN_GROUPING_COLUMNS: ColumnDefinition<GroupedMetricRow>[] = [
  { id: 'product', accessor: 'product', header: 'Product', sortable: true, width: 140 },
  { id: 'channel', accessor: 'channel', header: 'Channel', width: 100 },
  { id: 'revenue', accessor: 'revenue', header: 'Revenue', align: 'right', sortable: true, width: 120, render: (v: unknown) => `$${Number(v).toLocaleString()}` },
  { id: 'growth', accessor: 'growth', header: 'Growth %', align: 'right', width: 100, render: (v: unknown) => `${Number(v)}%` },
];

export const COLUMN_GROUPING_DEMO_SOURCE = `import { GridTable } from '@forgedevstack/grid-table';
import type { ColumnDefinition } from '@forgedevstack/grid-table';

type Row = {
  id: number;
  product: string;
  channel: string;
  revenue: number;
  growth: number;
  [key: string]: unknown;
};

const columns: ColumnDefinition<Row>[] = [
  { id: 'product', accessor: 'product', header: 'Product', sortable: true },
  { id: 'channel', accessor: 'channel', header: 'Channel' },
  {
    id: 'revenue',
    accessor: 'revenue',
    header: 'Revenue',
    align: 'right',
    sortable: true,
    render: (v: unknown) => \`$\${Number(v).toLocaleString()}\`,
  },
  { id: 'growth', accessor: 'growth', header: 'Growth %', align: 'right', render: (v: unknown) => \`\${Number(v)}%\` },
];

export function GroupedHeaderGrid({ data }: { data: Row[] }) {
  return (
    <GridTable
      data={data}
      columns={columns}
      themeMode="light"
      showPagination={false}
      renderHeader={() => (
        <div
          className="grid grid-cols-4 text-[11px] font-semibold uppercase tracking-wide border-b"
          style={{ borderColor: 'var(--border-color)' }}
        >
          <div className="col-span-2 py-2 text-center opacity-70">Catalog</div>
          <div className="col-span-2 py-2 text-center opacity-70">Performance</div>
        </div>
      )}
    />
  );
}`;
