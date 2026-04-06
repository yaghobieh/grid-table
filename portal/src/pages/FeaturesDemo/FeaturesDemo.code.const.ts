export const FEATURES_PRODUCT_GRID_SOURCE = `import { GridTable } from '@forgedevstack/grid-table';
import type { ColumnDefinition } from '@forgedevstack/grid-table';

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
  status: string;
  [key: string]: unknown;
};

const productColumns: ColumnDefinition<Product>[] = [
  { id: 'name', accessor: 'name', header: 'Product', sortable: true, filterable: true, width: 200, sticky: 'left' },
  { id: 'price', accessor: 'price', header: 'Price', sortable: true, align: 'right', width: 100, render: (v: unknown) => \`$\${Number(v).toLocaleString()}\` },
];

const productTotal: Product = {
  id: 9999,
  name: 'TOTAL',
  category: '',
  price: 0,
  stock: 0,
  rating: 0,
  status: '',
};

export function ProductsExample({ data }: { data: Product[] }) {
  return (
    <GridTable
      data={data}
      columns={productColumns}
      enableRowSelection
      showPagination={false}
      showGlobalFilter
      stickyHeader
      themeMode="light"
      contextMenu={{ enabled: true, showCopy: true, showFilter: true, showPin: true, showHide: true }}
      statusBar={{
        enabled: true,
        showRowCount: true,
        showSelectedCount: true,
        aggregations: [
          { columnId: 'price', type: 'avg', label: 'Avg Price', format: (v: number) => \`$\${Math.round(v).toLocaleString()}\` },
        ],
      }}
      enableExport={['csv', 'excel', 'pdf']}
      enableCopy
      printConfig={{ enabled: true, title: 'Product Inventory' }}
      frozenRows={{ bottom: [productTotal] }}
    />
  );
}`;
