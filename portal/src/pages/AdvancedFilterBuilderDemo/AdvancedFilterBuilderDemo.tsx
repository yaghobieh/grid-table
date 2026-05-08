import type { FC } from 'react';
import { useMemo, useState } from 'react';
import { Badge, Button, Flex, Typography, BearIcons } from '@forgedevstack/bear';
import { GridTable } from '@forgedevstack/grid-table';
import { Layout } from '@/components/Layout';
import { useDemoNavigation, useGridTableThemeMode } from '@/hooks';

const DATA = [
  { id: 1, region: 'US', status: 'Active', spend: 150000 },
  { id: 2, region: 'EU', status: 'Paused', spend: 42000 },
  { id: 3, region: 'US', status: 'Pending', spend: 78000 },
  { id: 4, region: 'APAC', status: 'Active', spend: 99000 },
  { id: 5, region: 'EU', status: 'Active', spend: 122000 },
];

const COLUMNS = [
  { id: 'region', accessor: 'region', header: 'Region', sortable: true, filterable: true },
  { id: 'status', accessor: 'status', header: 'Status', sortable: true, filterable: true },
  { id: 'spend', accessor: 'spend', header: 'Spend', sortable: true, render: (value: unknown) => `$${Number(value).toLocaleString()}` },
];

type FilterPreset = 'all' | 'andRule' | 'orRule';

export const AdvancedFilterBuilderDemo: FC = () => {
  const themeMode = useGridTableThemeMode();
  const { openDemosIndex } = useDemoNavigation();
  const [filterPreset, setFilterPreset] = useState<FilterPreset>('all');

  const filteredData = useMemo(() => {
    if (filterPreset === 'andRule') {
      return DATA.filter((row) => row.region === 'EU' && row.status === 'Active');
    }
    if (filterPreset === 'orRule') {
      return DATA.filter((row) => row.region === 'US' || row.spend >= 100000);
    }
    return DATA;
  }, [filterPreset]);

  return (
    <Layout>
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <Flex align="center" gap={3} className="mb-2">
          <Button variant="ghost" size="xs" leftIcon={<BearIcons.ArrowLeftIcon size="xs" />} onClick={openDemosIndex}>
            Demos
          </Button>
          <Badge variant="success">New</Badge>
        </Flex>
        <Typography variant="h2" className="text-2xl font-bold mb-1">Advanced Filter Builder</Typography>
        <Typography variant="body2" className="opacity-50 mb-4">
          Simulated filter presets for nested rule groups (AND/OR).
        </Typography>
        <Flex gap={2} className="mb-4">
          <Button size="sm" variant={filterPreset === 'all' ? 'solid' : 'ghost'} onClick={() => setFilterPreset('all')}>All</Button>
          <Button size="sm" variant={filterPreset === 'andRule' ? 'solid' : 'ghost'} onClick={() => setFilterPreset('andRule')}>
            AND: region=EU and status=Active
          </Button>
          <Button size="sm" variant={filterPreset === 'orRule' ? 'solid' : 'ghost'} onClick={() => setFilterPreset('orRule')}>
            OR: region=US or spend&gt;=100k
          </Button>
        </Flex>
        <GridTable
          data={filteredData}
          columns={COLUMNS}
          showPagination={false}
          showGlobalFilter
          stickyHeader
          themeMode={themeMode}
          tableEffects={{ hover: true }}
        />
      </div>
    </Layout>
  );
};
