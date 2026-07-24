import type { ColumnDefinition } from '@forgedevstack/grid-table';
import type { InfiniteRow } from './InfiniteScrollDemo.types';

export const INFINITE_TOTAL_ROWS = 500;
export const INFINITE_BLOCK_SIZE = 40;
export const INFINITE_FETCH_DELAY_MS = 280;
export const INFINITE_DEMO_MAX_HEIGHT = 420;

export function buildInfiniteDataset(): InfiniteRow[] {
  return Array.from({ length: INFINITE_TOTAL_ROWS }, (_, index) => ({
    id: index + 1,
    name: `Record ${index + 1}`,
    region: ['EU', 'US', 'APAC'][index % 3] ?? 'EU',
    score: ((index * 17) % 100) + 1,
  }));
}

export const INFINITE_DEMO_COLUMNS: ColumnDefinition<InfiniteRow>[] = [
  { id: 'id', accessor: 'id', header: 'ID', width: 80, sortable: true },
  { id: 'name', accessor: 'name', header: 'Name', width: 180, sortable: true },
  { id: 'region', accessor: 'region', header: 'Region', width: 110 },
  { id: 'score', accessor: 'score', header: 'Score', align: 'right', width: 100, sortable: true },
];

export const INFINITE_SCROLL_DEMO_SOURCE = `import { useMemo, useState } from 'react';
import { GridTable } from '@forgedevstack/grid-table';

const TOTAL = 500;
const BLOCK = 40;

export function InfiniteScrollGrid() {
  const all = useMemo(() => buildRows(TOTAL), []);
  const [seed] = useState(() => all.slice(0, BLOCK));

  return (
    <GridTable
      data={seed}
      columns={columns}
      showPagination={false}
      dimensions={{ maxHeight: 420 }}
      infiniteScroll={{
        enabled: true,
        blockSize: BLOCK,
        totalRowCount: TOTAL,
        onLoadBlock: async (start, end) => {
          await delay(280);
          return all.slice(start, end);
        },
      }}
    />
  );
}`;
