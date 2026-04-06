import type { FC } from 'react';
import { useDemoNavigation, useGridTableThemeMode } from '@/hooks';
import { Button, Typography, Flex, BearIcons } from '@forgedevstack/bear';
import { GridTable } from '@forgedevstack/grid-table';
import { Layout } from '@/components/Layout';
import { useI18n } from '@/i18n';
import { DemoCodeSection } from '@/components/DemoCodeSection';
import {
  COLUMN_GROUPING_DATA,
  COLUMN_GROUPING_COLUMNS,
  COLUMN_GROUPING_DEMO_SOURCE,
} from './ColumnGroupingDemo.const';

export const ColumnGroupingDemo: FC = () => {
  const { t } = useI18n();
  const themeMode = useGridTableThemeMode();
  const { openDemosIndex } = useDemoNavigation();
  const copy = t.demos['column-grouping'];

  return (
    <Layout>
      <div className="max-w-[1000px] mx-auto px-6 py-8">
        <Flex align="center" gap={3} className="mb-4">
          <Button variant="ghost" size="xs" leftIcon={<BearIcons.ArrowLeftIcon size="xs" />} onClick={openDemosIndex}>{t.common.demos}</Button>
        </Flex>
        <Typography variant="h2" className="text-2xl font-bold mb-2">{copy.title}</Typography>
        <Typography variant="body2" className="opacity-50 mb-6">
          {copy.description}
        </Typography>

        <div>
          <GridTable
            data={COLUMN_GROUPING_DATA}
            columns={COLUMN_GROUPING_COLUMNS}
            themeMode={themeMode}
            stickyHeader
            showPagination={false}
            showGlobalFilter={false}
            renderHeader={() => (
              <div
                className="grid grid-cols-4 text-[11px] font-semibold uppercase tracking-wide border-b"
                style={{ borderColor: 'var(--border-color)' }}
              >
                <div className="col-span-2 py-2 text-center opacity-70">Catalog</div>
                <div className="col-span-2 py-2 text-center opacity-70">Performance</div>
              </div>
            )}
            tableEffects={{ hover: true }}
          />
        </div>

        <DemoCodeSection title={t.demoCodeTitles.columnGrouping} code={COLUMN_GROUPING_DEMO_SOURCE} />
      </div>
    </Layout>
  );
};
