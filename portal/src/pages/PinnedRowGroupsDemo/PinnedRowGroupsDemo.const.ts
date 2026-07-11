import type { RowGroupConfig } from '@forgedevstack/grid-table';

export const PINNED_ROW_GROUPS_DEMO_MAX_HEIGHT = 320;

export const PINNED_ROW_GROUPS_DEMO_DATA = [
  { id: 1, group: 'Finance', item: 'Revenue', amount: 950000 },
  { id: 2, group: 'Finance', item: 'Cost', amount: 640000 },
  { id: 3, group: 'Finance', item: 'Payroll', amount: 210000 },
  { id: 4, group: 'Finance', item: 'Facilities', amount: 85000 },
  { id: 5, group: 'Finance', item: 'Software', amount: 42000 },
  { id: 6, group: 'Marketing', item: 'Campaign A', amount: 120000 },
  { id: 7, group: 'Marketing', item: 'Campaign B', amount: 96000 },
  { id: 8, group: 'Marketing', item: 'Events', amount: 54000 },
  { id: 9, group: 'Marketing', item: 'Content', amount: 38000 },
  { id: 10, group: 'Marketing', item: 'Paid Social', amount: 72000 },
  { id: 11, group: 'Operations', item: 'Logistics', amount: 156000 },
  { id: 12, group: 'Operations', item: 'Support', amount: 98000 },
];

export const PINNED_ROW_GROUPS_DEMO_COLUMNS = [
  { id: 'group', accessor: 'group', header: 'Group', sortable: true },
  { id: 'item', accessor: 'item', header: 'Item', sortable: true },
  {
    id: 'amount',
    accessor: 'amount',
    header: 'Amount',
    align: 'right' as const,
    render: (value: unknown) => `$${Number(value).toLocaleString()}`,
  },
];

export const PINNED_ROW_GROUPS_DEMO_CONFIG: RowGroupConfig[] = [
  {
    by: 'group',
    pinned: true,
    showHeaders: true,
    defaultExpanded: true,
    footer: ['sum:amount'],
    footerLabelField: 'item',
  },
];

export const PINNED_ROW_GROUPS_STATUS_AGGREGATIONS = [
  { columnId: 'amount', type: 'sum' as const, label: 'Total Amount' },
];
