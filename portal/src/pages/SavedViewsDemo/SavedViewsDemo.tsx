import type { FC } from 'react';
import { useMemo, useState } from 'react';
import { Badge, Button, Flex, Typography, BearIcons } from '@forgedevstack/bear';
import { GridTable } from '@forgedevstack/grid-table';
import { Layout } from '@/components/Layout';
import { useDemoNavigation, useGridTableThemeMode } from '@/hooks';

const DATA = [
  { id: 1, name: 'Acme Inc', status: 'Active', priority: 'High', owner: 'Alice' },
  { id: 2, name: 'Blue Labs', status: 'Pending', priority: 'Medium', owner: 'Bob' },
  { id: 3, name: 'Core Media', status: 'Active', priority: 'Low', owner: 'Diana' },
  { id: 4, name: 'Delta Ads', status: 'Paused', priority: 'High', owner: 'Eli' },
];

const COLUMNS = [
  { id: 'name', accessor: 'name', header: 'Account', sortable: true },
  { id: 'status', accessor: 'status', header: 'Status', sortable: true, filterable: true },
  { id: 'priority', accessor: 'priority', header: 'Priority', sortable: true, filterable: true },
  { id: 'owner', accessor: 'owner', header: 'Owner', sortable: true, filterable: true },
];

type ViewPreset = 'all' | 'active' | 'priorityHigh';

export const SavedViewsDemo: FC = () => {
  const themeMode = useGridTableThemeMode();
  const { openDemosIndex } = useDemoNavigation();
  const [viewPreset, setViewPreset] = useState<ViewPreset>('all');

  const filteredData = useMemo(() => {
    if (viewPreset === 'active') {
      return DATA.filter((row) => row.status === 'Active');
    }
    if (viewPreset === 'priorityHigh') {
      return DATA.filter((row) => row.priority === 'High');
    }
    return DATA;
  }, [viewPreset]);

  return (
    <Layout>
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <Flex align="center" gap={3} className="mb-2">
          <Button variant="ghost" size="xs" leftIcon={<BearIcons.ArrowLeftIcon size="xs" />} onClick={openDemosIndex}>
            Demos
          </Button>
          <Badge variant="success">New</Badge>
        </Flex>
        <Typography variant="h2" className="text-2xl font-bold mb-1">Saved Views</Typography>
        <Typography variant="body2" className="opacity-50 mb-4">
          Simulated saved views that switch table state presets.
        </Typography>
        <Flex gap={2} className="mb-4">
          <Button size="sm" variant={viewPreset === 'all' ? 'solid' : 'ghost'} onClick={() => setViewPreset('all')}>All</Button>
          <Button size="sm" variant={viewPreset === 'active' ? 'solid' : 'ghost'} onClick={() => setViewPreset('active')}>Active View</Button>
          <Button size="sm" variant={viewPreset === 'priorityHigh' ? 'solid' : 'ghost'} onClick={() => setViewPreset('priorityHigh')}>High Priority View</Button>
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
