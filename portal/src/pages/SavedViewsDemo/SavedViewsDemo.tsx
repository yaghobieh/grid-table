import type { FC } from 'react';
import { Badge, Button, Flex, Typography, BearIcons } from '@forgedevstack/bear';
import { GridTable } from '@forgedevstack/grid-table';
import { Layout } from '@/components/Layout';
import { useDemoNavigation, useGridTableThemeMode } from '@/hooks';
import { useI18n } from '@/i18n';
import {
  SAVED_VIEWS_ACTIVE_VIEW_ID,
  SAVED_VIEWS_DEMO_COLUMNS,
  SAVED_VIEWS_DEMO_DATA,
  SAVED_VIEWS_DEMO_VIEWS,
} from './SavedViewsDemo.const';

export const SavedViewsDemo: FC = () => {
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
        <Typography variant="h2" className="text-2xl font-bold mb-1">{t.savedViewsDemo.title}</Typography>
        <Typography variant="body2" className="opacity-50 mb-4">
          {t.savedViewsDemo.description}
        </Typography>
        <GridTable
          data={SAVED_VIEWS_DEMO_DATA}
          columns={SAVED_VIEWS_DEMO_COLUMNS}
          showPagination={false}
          showGlobalFilter
          stickyHeader
          themeMode={themeMode}
          tableEffects={{ hover: true }}
          savedViews={{
            views: SAVED_VIEWS_DEMO_VIEWS,
            activeViewId: SAVED_VIEWS_ACTIVE_VIEW_ID,
            showViewSwitcher: true,
          }}
        />
      </div>
    </Layout>
  );
};
