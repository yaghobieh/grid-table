import type { FC } from 'react';
import { useCallback, useMemo, useState } from 'react';
import { Badge, Button, Flex, Typography, BearIcons } from '@forgedevstack/bear';
import { GridTable } from '@forgedevstack/grid-table';
import { Layout } from '@/components/Layout';
import { DemoCodeSection } from '@/components/DemoCodeSection';
import { useDemoNavigation, useGridTableThemeMode } from '@/hooks';
import { useI18n } from '@/i18n';
import {
  INFINITE_BLOCK_SIZE,
  INFINITE_DEMO_COLUMNS,
  INFINITE_DEMO_MAX_HEIGHT,
  INFINITE_FETCH_DELAY_MS,
  INFINITE_SCROLL_DEMO_SOURCE,
  INFINITE_TOTAL_ROWS,
  buildInfiniteDataset,
} from './InfiniteScrollDemo.const';
import type { InfiniteRow } from './InfiniteScrollDemo.types';

export const InfiniteScrollDemo: FC = () => {
  const { t } = useI18n();
  const themeMode = useGridTableThemeMode();
  const { openDemosIndex } = useDemoNavigation();
  const copy = t.infiniteScrollDemo;
  const allRows = useMemo(buildInfiniteDataset, []);
  const [seed] = useState<InfiniteRow[]>(() => allRows.slice(0, INFINITE_BLOCK_SIZE));
  const [loadingHint, setLoadingHint] = useState(false);

  const onLoadBlock = useCallback(
    async (start: number, end: number) => {
      setLoadingHint(true);
      await new Promise((resolve) => {
        window.setTimeout(resolve, INFINITE_FETCH_DELAY_MS);
      });
      setLoadingHint(false);
      return allRows.slice(start, end);
    },
    [allRows],
  );

  return (
    <Layout>
      <div className="max-w-[1100px] mx-auto px-6 py-8">
        <Flex align="center" gap={3} className="mb-2">
          <Button variant="ghost" size="xs" leftIcon={<BearIcons.ArrowLeftIcon size="xs" />} onClick={openDemosIndex}>
            {t.common.demos}
          </Button>
          <Badge variant="success">v1.1.2</Badge>
        </Flex>
        <Typography variant="h2" className="text-2xl font-bold mb-1">{copy.title}</Typography>
        <Typography variant="body2" className="opacity-50 mb-4">
          {copy.description}
        </Typography>
        <Typography variant="body2" className="opacity-60 mb-6">
          {copy.compareHint}
        </Typography>
        {loadingHint && (
          <Typography variant="body2" className="opacity-70 mb-3">
            {copy.loading}
          </Typography>
        )}
        <div>
          <GridTable
            data={seed}
            columns={INFINITE_DEMO_COLUMNS}
            themeMode={themeMode}
            stickyHeader
            showPagination={false}
            showGlobalFilter={false}
            dimensions={{ maxHeight: INFINITE_DEMO_MAX_HEIGHT }}
            infiniteScroll={{
              enabled: true,
              blockSize: INFINITE_BLOCK_SIZE,
              totalRowCount: INFINITE_TOTAL_ROWS,
              onLoadBlock,
            }}
            tableEffects={{ hover: true }}
          />
        </div>
        <DemoCodeSection title={t.demoCodeTitles.infiniteScroll} code={INFINITE_SCROLL_DEMO_SOURCE} />
      </div>
    </Layout>
  );
};
