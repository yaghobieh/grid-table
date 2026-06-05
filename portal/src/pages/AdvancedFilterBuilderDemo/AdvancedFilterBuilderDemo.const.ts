export const ADVANCED_FILTER_DEMO_DATA = [
  { id: 1, region: 'US', status: 'Active', spend: 150000 },
  { id: 2, region: 'EU', status: 'Paused', spend: 42000 },
  { id: 3, region: 'US', status: 'Pending', spend: 78000 },
  { id: 4, region: 'APAC', status: 'Active', spend: 99000 },
  { id: 5, region: 'EU', status: 'Active', spend: 122000 },
];

export const ADVANCED_FILTER_DEMO_COLUMNS = [
  { id: 'region', accessor: 'region', header: 'Region', sortable: true, filterable: true },
  { id: 'status', accessor: 'status', header: 'Status', sortable: true, filterable: true },
  {
    id: 'spend',
    accessor: 'spend',
    header: 'Spend',
    sortable: true,
    render: (value: unknown) => `$${Number(value).toLocaleString()}`,
  },
];
