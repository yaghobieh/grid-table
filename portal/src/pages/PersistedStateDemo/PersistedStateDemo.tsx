import type { FC } from 'react';
import { useMemo } from 'react';
import { useDemoNavigation, useGridTableThemeMode } from '@/hooks';
import { Button, Typography, Flex, BearIcons } from '@forgedevstack/bear';
import { GridTable } from '@forgedevstack/grid-table';
import { Layout } from '@/components/Layout';
import { useI18n } from '@/i18n';
import { DemoCodeSection } from '@/components/DemoCodeSection';
import {
  PERSISTED_DEMO_STORAGE_KEY,
  PERSISTED_DEMO_DATA,
  PERSISTED_DEMO_COLUMNS,
  PERSISTED_STATE_DEMO_SOURCE,
} from './PersistedStateDemo.const';

export const PersistedStateDemo: FC = () => {
  const { t } = useI18n();
  const themeMode = useGridTableThemeMode();
  const { openDemosIndex } = useDemoNavigation();
  const copy = t.demos['persisted-state'];

  const saved = useMemo(() => {
    try {
      const raw = localStorage.getItem(PERSISTED_DEMO_STORAGE_KEY);
      if (!raw) return { page: 1, pageSize: 5 };
      return JSON.parse(raw) as { page: number; pageSize: number };
    } catch {
      return { page: 1, pageSize: 5 };
    }
  }, []);

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
            data={PERSISTED_DEMO_DATA}
            columns={PERSISTED_DEMO_COLUMNS}
            themeMode={themeMode}
            stickyHeader
            showGlobalFilter={false}
            paginationConfig={{
              initialPage: saved.page,
              initialPageSize: saved.pageSize,
              pageSizeOptions: [5, 10, 20],
            }}
            onPageChange={(page, pageSize) => {
              localStorage.setItem(PERSISTED_DEMO_STORAGE_KEY, JSON.stringify({ page, pageSize }));
            }}
            tableEffects={{ hover: true }}
          />
        </div>

        <DemoCodeSection title={t.demoCodeTitles.persisted} code={PERSISTED_STATE_DEMO_SOURCE} />
      </div>
    </Layout>
  );
};
