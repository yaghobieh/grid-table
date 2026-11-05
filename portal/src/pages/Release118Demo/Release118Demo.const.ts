import type { Release118Sale } from './Release118Demo.types';

export const RELEASE_118_MAX_HEIGHT = 360;
export const RELEASE_118_COLUMN_THRESHOLD = 6;
export const RELEASE_118_COLUMN_OVERSCAN = 2;
export const RELEASE_118_ROW_HEIGHT = 44;
export const RELEASE_118_ROW_SPAN = 2;
export const RELEASE_118_COLUMN_WIDTH = 110;
export const RELEASE_118_NAME_WIDTH = 140;

export const RELEASE_118_ROWS: Release118Sale[] = [
  { id: 'a', region: 'North', product: 'Anvil', units: 12, q1: 1, q2: 2, q3: 3, q4: 4, q5: 5, q6: 6, q7: 7, q8: 8 },
  { id: 'b', region: 'North', product: 'Bear', units: 4, q1: 2, q2: 2, q3: 2, q4: 2, q5: 2, q6: 2, q7: 2, q8: 2 },
  { id: 'c', region: 'South', product: 'Kiln', units: 9, q1: 3, q2: 1, q3: 4, q4: 1, q5: 3, q6: 1, q7: 4, q8: 1 },
  { id: 'd', region: 'South', product: 'Rail', units: 7, q1: 1, q2: 3, q3: 1, q4: 3, q5: 1, q6: 3, q7: 1, q8: 3 },
];

export const RELEASE_118_PIVOT_ROWS = [
  { id: 'north', region: 'North', units: 16 },
  { id: 'south', region: 'South', units: 16 },
];

export const RELEASE_118_DEMO_SOURCE = `<GridTable
  data={rows}
  columns={columns}
  bulkEdit={{ enabled: true }}
  columnGroups={[
    { id: 'place', label: 'Place', columnIds: ['region'] },
    { id: 'catalog', label: 'Catalog', columnIds: ['product'], parentId: 'sales' },
    { id: 'sales', label: 'Sales', columnIds: ['units'], parentId: 'sales' },
  ]}
  virtualize={{ enabled: true, columnThreshold: 6, rowHeight: 44 }}
  pivot={{
    enabled: true,
    rowFields: ['region'],
    columnFields: [],
    valueFields: [{ field: 'units', type: 'sum' }],
    onQuery: () => ({ rows: pivotRows, columns: pivotColumns }),
  }}
/>`;
