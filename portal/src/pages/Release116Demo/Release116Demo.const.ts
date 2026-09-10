import type { ColumnDefinition, GridTableThemeTokens } from '@forgedevstack/grid-table';
import type { Release116Row } from './Release116Demo.types';

export const RELEASE_116_DEMO_DATA: Release116Row[] = [
  { id: 1, sku: 'BR-110', product: 'Bear Kit', region: 'EU', amount: 240, status: 'Ready' },
  { id: 2, sku: 'GT-220', product: 'Grid Core', region: 'US', amount: 180, status: 'Hold' },
  { id: 3, sku: 'IN-330', product: 'Ink Pack', region: 'APAC', amount: 95, status: 'Ready' },
  { id: 4, sku: 'RL-440', product: 'Rail Deck', region: 'EU', amount: 130, status: 'Review' },
  { id: 5, sku: 'TR-550', product: 'Torch Reel', region: 'US', amount: 210, status: 'Ready' },
];

export const RELEASE_116_DEMO_COLUMNS: ColumnDefinition<Release116Row>[] = [
  { id: 'sku', accessor: 'sku', header: 'SKU', sortable: true, width: 120 },
  { id: 'product', accessor: 'product', header: 'Product', sortable: true, width: 160 },
  { id: 'region', accessor: 'region', header: 'Region', width: 110 },
  { id: 'amount', accessor: 'amount', header: 'Amount', align: 'right', width: 120 },
  { id: 'status', accessor: 'status', header: 'Status', width: 120 },
];

export const RELEASE_116_TABLE_THEME: GridTableThemeTokens = {
  colors: {
    accent: { primary: '#22c55e' },
  },
  header: {
    background: '#052e16',
    text: '#bbf7d0',
    border: 'rgba(34, 197, 94, 0.35)',
    hover: '#14532d',
  },
  columns: {
    background: '#0a1f14',
    text: '#e2e8f0',
    hover: '#14532d',
  },
  col: {
    1: {
      background: '#14532d',
      text: '#86efac',
    },
    4: {
      background: '#022c22',
      text: '#4ade80',
    },
  },
};

export const RELEASE_116_DEMO_SOURCE = `import { GridTable, GridTableTheme } from '@forgedevstack/grid-table';

const theme = {
  header: { background: '#052e16', text: '#bbf7d0' },
  columns: { background: '#0a1f14', text: '#e2e8f0' },
  col: {
    1: { background: '#14532d', text: '#86efac' },
    4: { background: '#022c22', text: '#4ade80' },
  },
};

export function Release116Grid({ data, columns }) {
  return (
    <GridTableTheme theme={theme}>
      <GridTable data={data} columns={columns} themeMode="dark" stickyHeader />
    </GridTableTheme>
  );
}

<GridTable
  data={data}
  columns={columns}
  theme={theme}
  themeMode="dark"
/>
`;
