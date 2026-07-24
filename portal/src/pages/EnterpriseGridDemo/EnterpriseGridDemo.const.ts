import type { ColumnDefinition, ExportScope } from '@forgedevstack/grid-table';
import type { EnterpriseRow, ExportScopeOption } from './EnterpriseGridDemo.types';

export const ENTERPRISE_DEMO_DATA: EnterpriseRow[] = [
  { id: 1, sku: 'SKU-100', region: 'EU', status: 'Active', qty: 40, shipDate: '2026-07-01', notes: 'Priority' },
  { id: 2, sku: 'SKU-101', region: 'US', status: 'Active', qty: 12, shipDate: '2026-07-03', notes: 'Hold' },
  { id: 3, sku: 'SKU-102', region: 'EU', status: 'Paused', qty: 8, shipDate: '2026-07-05', notes: '' },
  { id: 4, sku: 'SKU-103', region: 'APAC', status: 'Active', qty: 55, shipDate: '2026-07-08', notes: 'Bulk' },
  { id: 5, sku: 'SKU-104', region: 'US', status: 'Closed', qty: 0, shipDate: '2026-06-20', notes: 'Done' },
  { id: 6, sku: 'SKU-105', region: 'EU', status: 'Active', qty: 22, shipDate: '2026-07-12', notes: '' },
  { id: 7, sku: 'SKU-106', region: 'APAC', status: 'Paused', qty: 17, shipDate: '2026-07-14', notes: 'Review' },
  { id: 8, sku: 'SKU-107', region: 'US', status: 'Active', qty: 33, shipDate: '2026-07-16', notes: '' },
];

export const ENTERPRISE_DEMO_COLUMNS: ColumnDefinition<EnterpriseRow>[] = [
  { id: 'sku', accessor: 'sku', header: 'SKU', sortable: true, width: 110, editable: true },
  {
    id: 'region',
    accessor: 'region',
    header: 'Region',
    width: 110,
    filterable: true,
    filterType: 'set',
    filterOptions: [
      { label: 'EU', value: 'EU' },
      { label: 'US', value: 'US' },
      { label: 'APAC', value: 'APAC' },
    ],
  },
  {
    id: 'status',
    accessor: 'status',
    header: 'Status',
    width: 120,
    filterable: true,
    filterType: 'set',
    filterOptions: [
      { label: 'Active', value: 'Active' },
      { label: 'Paused', value: 'Paused' },
      { label: 'Closed', value: 'Closed' },
    ],
  },
  { id: 'qty', accessor: 'qty', header: 'Qty', align: 'right', width: 90, editable: { type: 'number' }, sortable: true },
  {
    id: 'shipDate',
    accessor: 'shipDate',
    header: 'Ship date',
    width: 130,
    filterable: true,
    filterType: 'date',
    editable: { type: 'date' },
  },
  { id: 'notes', accessor: 'notes', header: 'Notes', width: 160, editable: true },
];

export const EXPORT_SCOPE_OPTIONS: ExportScopeOption[] = ['all', 'filtered', 'sorted', 'selected'];

export const ENTERPRISE_DEMO_SOURCE = `import { useState } from 'react';
import { GridTable, applyTransaction } from '@forgedevstack/grid-table';
import type { ExportScope } from '@forgedevstack/grid-table';

export function EnterpriseGrid({ data: initial }) {
  const [data, setData] = useState(initial);
  const [exportScope, setExportScope] = useState<ExportScope>('sorted');

  return (
    <GridTable
      data={data}
      columns={columns}
      enableRowSelection
      enableCellEdit
      enableExport="csv"
      enableCopy
      exportScope={exportScope}
      rangeSelection={{ enabled: true, enablePaste: true, fillHandle: true }}
      flashCells={{ enabled: true }}
      touchGestures={{ enabled: true, swipeActions: true, longPressContextMenu: true }}
      contextMenu={{ enabled: true }}
      onCellEdit={(rowId, columnId, value) => {
        setData((prev) =>
          applyTransaction(prev, {
            update: prev
              .filter((row) => row.id === rowId)
              .map((row) => ({ ...row, [columnId]: value })),
          }, (row) => row.id),
        );
      }}
    />
  );
}`;

export const DEFAULT_EXPORT_SCOPE: ExportScope = 'sorted';
