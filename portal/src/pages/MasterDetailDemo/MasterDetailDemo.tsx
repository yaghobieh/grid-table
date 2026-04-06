import type { FC } from 'react';
import { useDemoNavigation, useGridTableThemeMode } from '@/hooks';
import { Button, Typography, Flex, BearIcons } from '@forgedevstack/bear';
import { GridTable } from '@forgedevstack/grid-table';
import { Layout } from '@/components/Layout';
import { useI18n } from '@/i18n';
import { DemoCodeSection } from '@/components/DemoCodeSection';
import { MASTER_DETAIL_DATA, MASTER_DETAIL_COLUMNS, MASTER_DETAIL_DEMO_SOURCE } from './MasterDetailDemo.const';
import type { OrderRow } from './MasterDetailDemo.types';

export const MasterDetailDemo: FC = () => {
  const { t } = useI18n();
  const themeMode = useGridTableThemeMode();
  const { openDemosIndex } = useDemoNavigation();
  const copy = t.demos['master-detail'];

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
          <GridTable<OrderRow>
            data={MASTER_DETAIL_DATA}
            columns={MASTER_DETAIL_COLUMNS}
            themeMode={themeMode}
            stickyHeader
            showPagination={false}
            enableRowExpansion
            renderRowExpansion={(row) => (
              <div className="px-4 py-3 text-sm" style={{ background: 'var(--bg-tertiary)' }}>
                <Typography variant="body2" className="font-semibold mb-2">Line items</Typography>
                <ul className="space-y-1 opacity-90">
                  {row.lines.map((line) => (
                    <li key={line.sku}>{line.sku} × {line.qty} @ ${line.price.toLocaleString()}</li>
                  ))}
                </ul>
              </div>
            )}
            tableEffects={{ hover: true }}
          />
        </div>

        <DemoCodeSection title={t.demoCodeTitles.masterDetail} code={MASTER_DETAIL_DEMO_SOURCE} />
      </div>
    </Layout>
  );
};
