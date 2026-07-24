import type { ColumnDefinition, ColumnGroupConfig } from '@forgedevstack/grid-table';
import type { GroupedMetricRow } from './ColumnGroupingDemo.types';

export const COLUMN_GROUPING_DATA: GroupedMetricRow[] = [
  { id: 1, product: 'Alpha', channel: 'Web', revenue: 12000, growth: 12 },
  { id: 2, product: 'Beta', channel: 'Retail', revenue: 8400, growth: -3 },
  { id: 3, product: 'Gamma', channel: 'Web', revenue: 15200, growth: 8 },
];

export const COLUMN_GROUPING_COLUMNS: ColumnDefinition<GroupedMetricRow>[] = [
  { id: 'product', accessor: 'product', header: 'Product', sortable: true, width: 140, groupId: 'catalog' },
  { id: 'channel', accessor: 'channel', header: 'Channel', width: 100, groupId: 'catalog' },
  {
    id: 'revenue',
    accessor: 'revenue',
    header: 'Revenue',
    align: 'right',
    sortable: true,
    width: 120,
    groupId: 'performance',
    render: (v: unknown) => `$${Number(v).toLocaleString()}`,
  },
  {
    id: 'growth',
    accessor: 'growth',
    header: 'Growth %',
    align: 'right',
    width: 100,
    groupId: 'performance',
    render: (v: unknown) => `${Number(v)}%`,
  },
];

export const COLUMN_GROUPING_GROUPS: ColumnGroupConfig[] = [
  { id: 'catalog', label: 'Catalog', columnIds: ['product', 'channel'] },
  { id: 'performance', label: 'Performance', columnIds: ['revenue', 'growth'] },
];

export const COLUMN_GROUPING_DEMO_SOURCE = `import { GridTable } from '@forgedevstack/grid-table';
import type { ColumnDefinition, ColumnGroupConfig } from '@forgedevstack/grid-table';

const columns: ColumnDefinition<Row>[] = [
  { id: 'product', accessor: 'product', header: 'Product', groupId: 'catalog' },
  { id: 'channel', accessor: 'channel', header: 'Channel', groupId: 'catalog' },
  { id: 'revenue', accessor: 'revenue', header: 'Revenue', groupId: 'performance' },
  { id: 'growth', accessor: 'growth', header: 'Growth %', groupId: 'performance' },
];

const columnGroups: ColumnGroupConfig[] = [
  { id: 'catalog', label: 'Catalog', columnIds: ['product', 'channel'] },
  { id: 'performance', label: 'Performance', columnIds: ['revenue', 'growth'] },
];

export function GroupedHeaderGrid({ data }: { data: Row[] }) {
  return (
    <GridTable
      data={data}
      columns={columns}
      columnGroups={columnGroups}
      alignColumnGroups
      themeMode="light"
      showPagination={false}
    />
  );
}`;
