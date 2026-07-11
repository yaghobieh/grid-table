import type { FC } from 'react';
import { Badge, Button, Card, CardBody, Flex, Typography, BearIcons } from '@forgedevstack/bear';
import { GridTable } from '@forgedevstack/grid-table';
import { Layout } from '@/components/Layout';
import { useDemoNavigation, useGridTableThemeMode } from '@/hooks';
import { useI18n } from '@/i18n';
import {
  PINNED_ROW_GROUPS_DEMO_COLUMNS,
  PINNED_ROW_GROUPS_DEMO_CONFIG,
  PINNED_ROW_GROUPS_DEMO_DATA,
  PINNED_ROW_GROUPS_DEMO_MAX_HEIGHT,
  PINNED_ROW_GROUPS_STATUS_AGGREGATIONS,
} from './PinnedRowGroupsDemo.const';

export const PinnedRowGroupsDemo: FC = () => {
  const themeMode = useGridTableThemeMode();
  const { openDemosIndex } = useDemoNavigation();
  const { t } = useI18n();
  const prg = t.pinnedRowGroupsDemo;

  return (
    <Layout>
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <Flex align="center" gap={3} className="mb-2">
          <Button variant="ghost" size="xs" leftIcon={<BearIcons.ArrowLeftIcon size="xs" />} onClick={openDemosIndex}>
            {t.common.demos}
          </Button>
          <Badge variant="success">v1.1.1</Badge>
        </Flex>
        <Typography variant="h2" className="text-2xl font-bold mb-1">{prg.title}</Typography>
        <Typography variant="body2" className="opacity-50 mb-4">
          {prg.description}
        </Typography>

        <Card variant="ghost" padding="md" radius="lg" className="mb-6">
          <CardBody>
            <Typography variant="body2" className="font-semibold mb-2">{prg.explainerTitle}</Typography>
            <ul className="space-y-2">
              {prg.explainerItems.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <BearIcons.CheckIcon size="xs" color="#22c55e" className="mt-0.5 flex-shrink-0" />
                  <Typography variant="body2" className="opacity-70">{item}</Typography>
                </li>
              ))}
            </ul>
            <Typography variant="caption" className="opacity-50 mt-3 block">
              {prg.scrollHint}
            </Typography>
          </CardBody>
        </Card>

        <GridTable
          data={PINNED_ROW_GROUPS_DEMO_DATA}
          columns={PINNED_ROW_GROUPS_DEMO_COLUMNS}
          showPagination={false}
          showGlobalFilter
          stickyHeader
          themeMode={themeMode}
          dimensions={{ maxHeight: PINNED_ROW_GROUPS_DEMO_MAX_HEIGHT }}
          tableEffects={{ hover: true }}
          rowGroups={PINNED_ROW_GROUPS_DEMO_CONFIG}
          statusBar={{
            enabled: true,
            showRowCount: true,
            aggregations: PINNED_ROW_GROUPS_STATUS_AGGREGATIONS,
          }}
        />
      </div>
    </Layout>
  );
};
