import type { FC } from 'react';
import { Badge, Button, Flex, Typography, BearIcons } from '@forgedevstack/bear';
import { GridTable } from '@forgedevstack/grid-table';
import { Layout } from '@/components/Layout';
import { useDemoNavigation, useGridTableThemeMode } from '@/hooks';

const DATA = [
  { id: 1, group: 'Finance', item: 'Revenue', amount: 950000 },
  { id: 2, group: 'Finance', item: 'Cost', amount: 640000 },
  { id: 3, group: 'Marketing', item: 'Campaign A', amount: 120000 },
  { id: 4, group: 'Marketing', item: 'Campaign B', amount: 96000 },
];

const GROUP_TOTALS = [
  { id: 1001, group: 'Finance Total', item: 'Subtotal', amount: 1590000 },
  { id: 1002, group: 'Marketing Total', item: 'Subtotal', amount: 216000 },
  { id: 1003, group: 'Grand Total', item: 'All Groups', amount: 1806000 },
];

const COLUMNS = [
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

export const PinnedRowGroupsDemo: FC = () => {
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
        <Typography variant="h2" className="text-2xl font-bold mb-1">Pinned Row Groups + Aggregate Footers</Typography>
        <Typography variant="body2" className="opacity-50 mb-6">
          This demo shows grouped summaries pinned at the bottom, so aggregate footers remain visible while scrolling.
        </Typography>
        <GridTable
          data={DATA}
          columns={COLUMNS}
          showPagination={false}
          showGlobalFilter
          stickyHeader
          themeMode={themeMode}
          tableEffects={{ hover: true }}
          frozenRows={{ bottom: GROUP_TOTALS }}
          statusBar={{
            enabled: true,
            showRowCount: true,
            aggregations: [{ columnId: 'amount', type: 'sum', label: 'Total Amount' }],
          }}
        />
      </div>
    </Layout>
  );
};
