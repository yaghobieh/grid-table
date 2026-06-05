import type { FC } from 'react';
import { Badge, Button, Flex, Typography, BearIcons } from '@forgedevstack/bear';
import { GridTable } from '@forgedevstack/grid-table';
import { Layout } from '@/components/Layout';
import { useDemoNavigation, useGridTableThemeMode } from '@/hooks';
import { useI18n } from '@/i18n';
import { ADVANCED_FILTER_DEMO_COLUMNS, ADVANCED_FILTER_DEMO_DATA } from './AdvancedFilterBuilderDemo.const';

export const AdvancedFilterBuilderDemo: FC = () => {
  const themeMode = useGridTableThemeMode();
  const { openDemosIndex } = useDemoNavigation();
  const { t } = useI18n();

  return (
    <Layout>
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <Flex align="center" gap={3} className="mb-2">
          <Button variant="ghost" size="xs" leftIcon={<BearIcons.ArrowLeftIcon size="xs" />} onClick={openDemosIndex}>
            {t.common.demos}
          </Button>
          <Badge variant="success">v1.1.0</Badge>
        </Flex>
        <Typography variant="h2" className="text-2xl font-bold mb-1">{t.advancedFilterDemo.title}</Typography>
        <Typography variant="body2" className="opacity-50 mb-4">
          {t.advancedFilterDemo.description}
        </Typography>
        <GridTable
          data={ADVANCED_FILTER_DEMO_DATA}
          columns={ADVANCED_FILTER_DEMO_COLUMNS}
          showPagination={false}
          showGlobalFilter={false}
          stickyHeader
          themeMode={themeMode}
          tableEffects={{ hover: true }}
          advancedFilter={{
            enabled: true,
            showBuilder: true,
            where: {
              op: 'and',
              rules: [
                { field: 'region', op: 'in', value: ['US', 'EU'] },
                { field: 'status', op: 'equals', value: 'Active' },
              ],
            },
          }}
        />
      </div>
    </Layout>
  );
};
