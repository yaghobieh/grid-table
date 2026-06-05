export const FORMULA_DEMO_DATA = [
  { id: 1, product: 'Alpha', revenue: 120000, cost: 76000 },
  { id: 2, product: 'Beta', revenue: 99000, cost: 54000 },
  { id: 3, product: 'Gamma', revenue: 143000, cost: 83000 },
];

export const FORMULA_DEMO_COLUMNS = [
  { id: 'product', accessor: 'product', header: 'Product' },
  {
    id: 'revenue',
    accessor: 'revenue',
    header: 'Revenue',
    render: (value: unknown) => `$${Number(value).toLocaleString()}`,
  },
  {
    id: 'cost',
    accessor: 'cost',
    header: 'Cost',
    render: (value: unknown) => `$${Number(value).toLocaleString()}`,
  },
  {
    id: 'profit',
    accessor: 'profit',
    header: 'profit = revenue - cost',
    formula: 'revenue - cost',
    render: (value: unknown) => `$${Number(value).toLocaleString()}`,
  },
  {
    id: 'margin',
    accessor: 'margin',
    header: 'margin = (profit / revenue) * 100',
    formula: '(profit / revenue) * 100',
    render: (value: unknown) => `${Number(value).toFixed(1)}%`,
  },
];

export const FORMULA_DEMO_AGGREGATIONS = [
  { columnId: 'profit', type: 'sum' as const, label: 'Total Profit' },
  {
    columnId: 'margin',
    type: 'avg' as const,
    label: 'Avg Margin',
    format: (value: number) => `${value.toFixed(1)}%`,
  },
];
