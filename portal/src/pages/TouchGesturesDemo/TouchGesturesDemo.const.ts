import type { ColumnDefinition } from '@forgedevstack/grid-table';
import type { TouchGesturesRow } from './TouchGesturesDemo.types';

export const TOUCH_GESTURES_DEMO_DATA: TouchGesturesRow[] = [
  { id: 1, sku: 'SKU-310', region: 'EU', notes: 'Swipe left to reveal actions' },
  { id: 2, sku: 'SKU-311', region: 'US', notes: 'Long-press for the context menu' },
  { id: 3, sku: 'SKU-312', region: 'APAC', notes: 'Desktop: DevTools → sensors → touch' },
  { id: 4, sku: 'SKU-313', region: 'LATAM', notes: 'Or hold Shift while using pointer events' },
];

export const TOUCH_GESTURES_DEMO_COLUMNS: ColumnDefinition<TouchGesturesRow>[] = [
  { id: 'sku', accessor: 'sku', header: 'SKU', width: 120 },
  { id: 'region', accessor: 'region', header: 'Region', width: 120 },
  { id: 'notes', accessor: 'notes', header: 'Notes', width: 280 },
];

export const TOUCH_GESTURES_DEMO_SOURCE = `import { GridTable } from '@forgedevstack/grid-table';

<GridTable
  data={data}
  columns={columns}
  touchGestures={{
    enabled: true,
    swipeActions: true,
    longPressContextMenu: true,
  }}
  contextMenu={{ enabled: true, showCopy: true }}
/>
`;
