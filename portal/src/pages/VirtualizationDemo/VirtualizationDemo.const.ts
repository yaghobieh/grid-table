import type { ColumnDefinition } from '@forgedevstack/grid-table';
import type { TourStep } from '@forgedevstack/bear';
import {
  VIRTUAL_DEMO_BATCH_SIZE,
  VIRTUAL_DEMO_INITIAL_ROWS,
  VIRTUAL_DEMO_MAX_HEIGHT,
  VIRTUAL_DEMO_PRESET_DENSE_MAX_HEIGHT,
  VIRTUAL_DEMO_PRESET_DENSE_ROWS,
  VIRTUAL_DEMO_PRESET_HEAVY_MAX_HEIGHT,
  VIRTUAL_DEMO_PRESET_HEAVY_ROWS,
} from '@/constants/numbers.const';
import type { LogRow } from './VirtualizationDemo.types';

export const VIRTUAL_DEMO_ROW_COUNT = 500;

export const VIRTUAL_DEMO_TOUR_TARGET_TOOLBAR = 'lazy-demo-toolbar';
export const VIRTUAL_DEMO_TOUR_TARGET_GRID = 'lazy-demo-grid';

export type VirtualizationPresetKind = 'dense' | 'default' | 'heavy';

export const VIRTUAL_DEMO_DEFAULT_INITIAL_ROWS = VIRTUAL_DEMO_INITIAL_ROWS;
export const VIRTUAL_DEMO_DEFAULT_BATCH_SIZE = VIRTUAL_DEMO_BATCH_SIZE;
export const VIRTUAL_DEMO_DEFAULT_MAX_HEIGHT = VIRTUAL_DEMO_MAX_HEIGHT;

export const VIRTUAL_DEMO_PRESETS: Record<
  VirtualizationPresetKind,
  { initialRows: number; batchSize: number; maxHeight: number }
> = {
  dense: {
    initialRows: VIRTUAL_DEMO_PRESET_DENSE_ROWS,
    batchSize: VIRTUAL_DEMO_PRESET_DENSE_ROWS,
    maxHeight: VIRTUAL_DEMO_PRESET_DENSE_MAX_HEIGHT,
  },
  default: {
    initialRows: VIRTUAL_DEMO_INITIAL_ROWS,
    batchSize: VIRTUAL_DEMO_BATCH_SIZE,
    maxHeight: VIRTUAL_DEMO_MAX_HEIGHT,
  },
  heavy: {
    initialRows: VIRTUAL_DEMO_PRESET_HEAVY_ROWS,
    batchSize: VIRTUAL_DEMO_PRESET_HEAVY_ROWS,
    maxHeight: VIRTUAL_DEMO_PRESET_HEAVY_MAX_HEIGHT,
  },
};

export function buildVirtualDemoTourSteps(messages: {
  tourToolbarTitle: string;
  tourToolbarBody: string;
  tourGridTitle: string;
  tourGridBody: string;
}): TourStep[] {
  return [
    {
      target: `#${VIRTUAL_DEMO_TOUR_TARGET_TOOLBAR}`,
      title: messages.tourToolbarTitle,
      description: messages.tourToolbarBody,
      placement: 'bottom',
    },
    {
      target: `#${VIRTUAL_DEMO_TOUR_TARGET_GRID}`,
      title: messages.tourGridTitle,
      description: messages.tourGridBody,
      placement: 'top',
    },
  ];
}

export function buildVirtualDemoRows(): LogRow[] {
  return Array.from({ length: VIRTUAL_DEMO_ROW_COUNT }, (_, i) => ({
    id: i + 1,
    level: ['info', 'warn', 'error'][i % 3],
    message: `Event batch ${i + 1} processed`,
    ms: 12 + (i % 40),
  }));
}

export const VIRTUAL_DEMO_COLUMNS: ColumnDefinition<LogRow>[] = [
  { id: 'id', accessor: 'id', header: 'ID', width: 64, align: 'right' },
  { id: 'level', accessor: 'level', header: 'Level', width: 80 },
  { id: 'message', accessor: 'message', header: 'Message', width: 280 },
  { id: 'ms', accessor: 'ms', header: 'ms', align: 'right', width: 64 },
];

export function buildVirtualizationDemoSource(opts: {
  initialRows: number;
  batchSize: number;
  maxHeight: number;
  lazyEnabled: boolean;
}): string {
  const lazyBlock = opts.lazyEnabled
    ? `      lazyLoad={{
        enabled: true,
        initialRows: ${opts.initialRows},
        batchSize: ${opts.batchSize},
      }}`
    : '';
  return `import { useMemo } from 'react';
import { GridTable } from '@forgedevstack/grid-table';
import type { ColumnDefinition } from '@forgedevstack/grid-table';

type Row = { id: number; level: string; message: string; ms: number; [key: string]: unknown };

const columns: ColumnDefinition<Row>[] = [
  { id: 'id', accessor: 'id', header: 'ID', width: 64, align: 'right' },
  { id: 'level', accessor: 'level', header: 'Level', width: 80 },
  { id: 'message', accessor: 'message', header: 'Message', width: 280 },
  { id: 'ms', accessor: 'ms', header: 'ms', align: 'right', width: 64 },
];

export function LargeTable() {
  const data = useMemo(
    () =>
      Array.from({ length: ${VIRTUAL_DEMO_ROW_COUNT} }, (_, i) => ({
        id: i + 1,
        level: ['info', 'warn', 'error'][i % 3],
        message: \`Event batch \${i + 1} processed\`,
        ms: 12 + (i % 40),
      })),
    [],
  );

  return (
    <GridTable
      data={data}
      columns={columns}
      themeMode="light"
      showPagination={false}
      showGlobalFilter={false}
      dimensions={{ maxHeight: ${opts.maxHeight} }}
      stickyHeader
${lazyBlock}
    />
  );
}`;
}
