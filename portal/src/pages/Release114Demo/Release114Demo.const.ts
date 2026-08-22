import type { ColumnDefinition } from '@forgedevstack/grid-table';
import type { Release114Row } from './Release114Demo.types';

export const RELEASE_114_DEMO_DATA: Release114Row[] = [
  { id: 1, sku: 'SKU-200', region: 'EU', status: 'Active', qty: 10, notes: 'Long content for divider autosize — warehouse priority lane' },
  { id: 2, sku: 'SKU-201', region: 'US', status: 'Active', qty: 20, notes: 'Hold' },
  { id: 3, sku: 'SKU-202', region: 'EU', status: 'Paused', qty: 30, notes: 'Review packing notes before Friday cut-off' },
  { id: 4, sku: 'SKU-203', region: 'APAC', status: 'Active', qty: 40, notes: 'Bulk' },
  { id: 5, sku: 'SKU-204', region: 'US', status: 'Closed', qty: 50, notes: 'Done' },
  { id: 6, sku: 'SKU-205', region: 'LATAM', status: 'Active', qty: 60, notes: '' },
  { id: 7, sku: 'SKU-206', region: 'APAC', status: 'Paused', qty: 70, notes: 'Search this set filter for LATAM or Paused' },
  { id: 8, sku: 'SKU-207', region: 'EU', status: 'Active', qty: 80, notes: 'Cut this cell with Cmd/Ctrl+X' },
];

export const RELEASE_114_REGION_OPTIONS = [
  { label: 'EU', value: 'EU' },
  { label: 'US', value: 'US' },
  { label: 'APAC', value: 'APAC' },
  { label: 'LATAM', value: 'LATAM' },
];

export const RELEASE_114_STATUS_OPTIONS = [
  { label: 'Active', value: 'Active' },
  { label: 'Paused', value: 'Paused' },
  { label: 'Closed', value: 'Closed' },
];

export const RELEASE_114_DEMO_COLUMNS: ColumnDefinition<Release114Row>[] = [
  { id: 'sku', accessor: 'sku', header: 'SKU', sortable: true, width: 110, editable: true },
  {
    id: 'region',
    accessor: 'region',
    header: 'Region',
    width: 120,
    filterable: true,
    filterType: 'set',
    filterOptions: RELEASE_114_REGION_OPTIONS,
  },
  {
    id: 'status',
    accessor: 'status',
    header: 'Status',
    width: 120,
    filterable: true,
    filterType: 'set',
    filterOptions: RELEASE_114_STATUS_OPTIONS,
  },
  { id: 'qty', accessor: 'qty', header: 'Qty', align: 'right', width: 90, editable: { type: 'number' }, sortable: true },
  { id: 'notes', accessor: 'notes', header: 'Notes', width: 220, editable: true, filterable: true },
];

export const RELEASE_114_DEMO_SOURCE = `import { useState } from 'react';
import { GridTable, applyTransaction } from '@forgedevstack/grid-table';

export function Release114Grid({ data: initial }) {
  const [data, setData] = useState(initial);

  return (
    <GridTable
      data={data}
      columns={columns}
      showGlobalFilter
      showFilter
      showFilterChips
      showColumnToggle
      floatingFilters
      enableColumnMenu
      enableFind
      enableCellEdit
      autoFit={{ enabled: true }}
      rangeSelection={{
        enabled: true,
        enablePaste: true,
        enableCut: true,
        fillHandle: true,
        fillSeries: true,
      }}
      onCellEdit={(rowId, columnId, value) => {
        setData((prev) =>
          applyTransaction(
            prev,
            { update: prev.filter((row) => row.id === rowId).map((row) => ({ ...row, [columnId]: value })) },
            (row) => row.id,
          ),
        );
      }}
    />
  );
}
`;
