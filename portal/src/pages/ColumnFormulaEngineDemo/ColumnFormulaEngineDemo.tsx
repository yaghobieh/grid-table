import type { FC } from 'react';
import { Badge, Button, Flex, Typography, BearIcons } from '@forgedevstack/bear';
import { GridTable } from '@forgedevstack/grid-table';
import { Layout } from '@/components/Layout';
import { useDemoNavigation, useGridTableThemeMode } from '@/hooks';

const BASE_DATA = [
  { id: 1, product: 'Alpha', revenue: 120000, cost: 76000 },
  { id: 2, product: 'Beta', revenue: 99000, cost: 54000 },
  { id: 3, product: 'Gamma', revenue: 143000, cost: 83000 },
];

const DATA = BASE_DATA.map((row) => {
  const profit = row.revenue - row.cost;
  const margin = (profit / row.revenue) * 100;
  return { ...row, profit, margin };
});

const COLUMNS = [
  { id: 'product', accessor: 'product', header: 'Product' },
  { id: 'revenue', accessor: 'revenue', header: 'Revenue', render: (value: unknown) => `$${Number(value).toLocaleString()}` },
  { id: 'cost', accessor: 'cost', header: 'Cost', render: (value: unknown) => `$${Number(value).toLocaleString()}` },
  { id: 'profit', accessor: 'profit', header: 'Formula: revenue - cost', render: (value: unknown) => `$${Number(value).toLocaleString()}` },
  { id: 'margin', accessor: 'margin', header: 'Formula: (profit / revenue) * 100', render: (value: unknown) => `${Number(value).toFixed(1)}%` },
];

export const ColumnFormulaEngineDemo: FC = () => {
  const themeMode = useGridTableThemeMode();
  const { openDemosIndex } = useDemoNavigation();

  return (
    <Layout>
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <Flex align="center" gap={3} className="mb-2">
          <Button variant="ghost" size="xs" leftIcon={<BearIcons.ArrowLeftIcon size="xs" />} onClick={openDemosIndex}>
            Demos
          </Button>
          <Badge variant="success">New</Badge>
        </Flex>
        <Typography variant="h2" className="text-2xl font-bold mb-1">Column Formula Engine</Typography>
        <Typography variant="body2" className="opacity-50 mb-6">
          This demo shows computed columns for `profit` and `margin` derived from base fields.
        </Typography>
        <GridTable
          data={DATA}
          columns={COLUMNS}
          showPagination={false}
          showGlobalFilter
          stickyHeader
          themeMode={themeMode}
          tableEffects={{ hover: true }}
          statusBar={{
            enabled: true,
            showRowCount: true,
            aggregations: [
              { columnId: 'profit', type: 'sum', label: 'Total Profit' },
              { columnId: 'margin', type: 'avg', label: 'Avg Margin', format: (value: number) => `${value.toFixed(1)}%` },
            ],
          }}
        />
      </div>
    </Layout>
  );
};
