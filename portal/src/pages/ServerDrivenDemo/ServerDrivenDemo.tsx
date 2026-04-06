import type { FC } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDemoNavigation, useGridTableThemeMode } from '@/hooks';
import { Button, Typography, Flex, BearIcons } from '@forgedevstack/bear';
import { GridTable } from '@forgedevstack/grid-table';
import { Layout } from '@/components/Layout';
import { useI18n } from '@/i18n';
import { DemoCodeSection } from '@/components/DemoCodeSection';
import {
  SERVER_DEMO_TOTAL,
  buildServerDemoDataset,
  SERVER_DEMO_COLUMNS,
  SERVER_DRIVEN_DEMO_SOURCE,
} from './ServerDrivenDemo.const';
import type { RemoteRow } from './ServerDrivenDemo.types';

export const ServerDrivenDemo: FC = () => {
  const { t } = useI18n();
  const themeMode = useGridTableThemeMode();
  const { openDemosIndex } = useDemoNavigation();
  const copy = t.demos['server-driven'];
  const allRows = useMemo(buildServerDemoDataset, []);
  const [data, setData] = useState<RemoteRow[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPage = useCallback(
    (page: number, pageSize: number) => {
      setLoading(true);
      window.setTimeout(() => {
        const start = (page - 1) * pageSize;
        setData(allRows.slice(start, start + pageSize));
        setLoading(false);
      }, 320);
    },
    [allRows],
  );

  useEffect(() => {
    fetchPage(1, 10);
  }, [fetchPage]);

  return (
    <Layout>
      <div className="max-w-[1100px] mx-auto px-6 py-8">
        <Flex align="center" gap={3} className="mb-4">
          <Button variant="ghost" size="xs" leftIcon={<BearIcons.ArrowLeftIcon size="xs" />} onClick={openDemosIndex}>{t.common.demos}</Button>
        </Flex>
        <Typography variant="h2" className="text-2xl font-bold mb-2">{copy.title}</Typography>
        <Typography variant="body2" className="opacity-50 mb-6">
          {copy.description}
        </Typography>

        <div>
          <GridTable
            data={data}
            columns={SERVER_DEMO_COLUMNS}
            loading={loading}
            mobileBreakpoint="mobile"
            mobileLayout="stacked"
            themeMode={themeMode}
            stickyHeader
            showGlobalFilter={false}
            paginationConfig={{
              manualPagination: true,
              totalRowCount: SERVER_DEMO_TOTAL,
              initialPage: 1,
              initialPageSize: 10,
              pageSizeOptions: [10, 20, 50],
            }}
            onPageChange={(page, pageSize) => fetchPage(page, pageSize)}
            tableEffects={{ hover: true }}
          />
        </div>

        <DemoCodeSection title={t.demoCodeTitles.server} code={SERVER_DRIVEN_DEMO_SOURCE} />
      </div>
    </Layout>
  );
};
