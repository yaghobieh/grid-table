export const FINANCE_DEMO_SOURCE = `import { GridTable } from '@forgedevstack/grid-table';
import type { ColumnDefinition } from '@forgedevstack/grid-table';

type Ticker = {
  id: string;
  symbol: string;
  price: number;
  change: number;
  sparkline: number[];
  [key: string]: unknown;
};

const columns: ColumnDefinition<Ticker>[] = [
  { id: 'symbol', accessor: 'symbol', header: 'Symbol', sortable: true, width: 90 },
  {
    id: 'price',
    accessor: 'price',
    header: 'Price',
    sortable: true,
    align: 'right',
    width: 100,
    render: (v: unknown) => \`$\${Number(v).toFixed(2)}\`,
  },
];

export function FinanceGrid({ data }: { data: Ticker[] }) {
  return (
    <GridTable
      data={data}
      columns={columns}
      showPagination={false}
      stickyHeader
      themeMode="light"
      tableEffects={{ hover: false, sort: true, row: false }}
    />
  );
}`;
