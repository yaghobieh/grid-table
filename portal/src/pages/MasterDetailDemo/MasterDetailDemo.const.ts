import type { ColumnDefinition } from '@forgedevstack/grid-table';
import type { OrderRow } from './MasterDetailDemo.types';

export const MASTER_DETAIL_DATA: OrderRow[] = [
  {
    id: 101,
    customer: 'Northwind LLC',
    region: 'EU',
    total: 1240,
    lines: [
      { sku: 'SKU-A1', qty: 2, price: 120 },
      { sku: 'SKU-B4', qty: 10, price: 100 },
    ],
  },
  {
    id: 102,
    customer: 'Contoso Ltd',
    region: 'US',
    total: 890,
    lines: [{ sku: 'SKU-C2', qty: 1, price: 890 }],
  },
];

export const MASTER_DETAIL_COLUMNS: ColumnDefinition<OrderRow>[] = [
  { id: 'customer', accessor: 'customer', header: 'Customer', sortable: true, width: 200 },
  { id: 'region', accessor: 'region', header: 'Region', width: 80 },
  { id: 'total', accessor: 'total', header: 'Total', align: 'right', width: 120, render: (v: unknown) => `$${Number(v).toLocaleString()}` },
];

export const MASTER_DETAIL_DEMO_SOURCE = `import { GridTable } from '@forgedevstack/grid-table';
import type { ColumnDefinition } from '@forgedevstack/grid-table';

type OrderLine = { sku: string; qty: number; price: number };
type Order = {
  id: number;
  customer: string;
  region: string;
  total: number;
  lines: OrderLine[];
  [key: string]: unknown;
};

const columns: ColumnDefinition<Order>[] = [
  { id: 'customer', accessor: 'customer', header: 'Customer', sortable: true, width: 200 },
  { id: 'region', accessor: 'region', header: 'Region', width: 80 },
  {
    id: 'total',
    accessor: 'total',
    header: 'Total',
    align: 'right',
    width: 120,
    render: (v: unknown) => \`$\${Number(v).toLocaleString()}\`,
  },
];

const data: Order[] = [
  {
    id: 101,
    customer: 'Northwind LLC',
    region: 'EU',
    total: 1240,
    lines: [{ sku: 'SKU-A1', qty: 2, price: 120 }],
  },
];

export function MasterDetailGrid() {
  return (
    <GridTable
      data={data}
      columns={columns}
      themeMode="light"
      showPagination={false}
      enableRowExpansion
      renderRowExpansion={(row) => (
        <div style={{ padding: '0.75rem 1rem' }}>
          <strong>Line items</strong>
          <ul>
            {row.lines.map((line) => (
              <li key={line.sku}>
                {line.sku} × {line.qty} @ \${line.price}
              </li>
            ))}
          </ul>
        </div>
      )}
    />
  );
}`;
