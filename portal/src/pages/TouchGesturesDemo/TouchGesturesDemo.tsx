import type { FC } from 'react';
import { useMemo, useState } from 'react';
import { Badge, Button, Flex, Typography, BearIcons } from '@forgedevstack/bear';
import { GridTable } from '@forgedevstack/grid-table';
import { Layout } from '@/components/Layout';
import { DemoCodeSection } from '@/components/DemoCodeSection';
import { useDemoNavigation, useGridTableThemeMode } from '@/hooks';
import { useI18n } from '@/i18n';
import { CURRENT_VERSION } from '@/constants/numbers.const';
import {
  TOUCH_GESTURES_DEMO_COLUMNS,
  TOUCH_GESTURES_DEMO_DATA,
  TOUCH_GESTURES_DEMO_SOURCE,
} from './TouchGesturesDemo.const';

export const TouchGesturesDemo: FC = () => {
  const { t } = useI18n();
  const themeMode = useGridTableThemeMode();
  const { openDemosIndex } = useDemoNavigation();
  const copy = t.touchGesturesDemo;
  const [data, setData] = useState(TOUCH_GESTURES_DEMO_DATA);
  const columns = useMemo(() => TOUCH_GESTURES_DEMO_COLUMNS, []);

  return (
    <Layout>
      <div className="max-w-[1200px] mx-auto px-6 py-8">
        <Flex align="center" gap={3} className="mb-2">
          <Button variant="ghost" size="xs" leftIcon={<BearIcons.ArrowLeftIcon size="xs" />} onClick={openDemosIndex}>
            {t.common.demos}
          </Button>
          <Badge variant="success">v{CURRENT_VERSION}</Badge>
        </Flex>
        <Typography variant="h2" className="text-2xl font-bold mb-1">{copy.title}</Typography>
        <Typography variant="body2" className="opacity-50 mb-4">
          {copy.description}
        </Typography>
        <ul className="mb-6 opacity-70 text-sm list-disc pl-5">
          {copy.steps.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <GridTable
          data={data}
          columns={columns}
          themeMode={themeMode}
          stickyHeader
          showPagination={false}
          contextMenu={{ enabled: true, showCopy: true, showFilter: true }}
          touchGestures={{
            enabled: true,
            swipeActions: true,
            longPressContextMenu: true,
            swipeActionItems: [
              {
                id: 'copy',
                label: copy.swipeCopy,
                onAction: () => undefined,
              },
              {
                id: 'delete',
                label: copy.swipeDelete,
                danger: true,
                onAction: (row) => setData((prev) => prev.filter((item) => item.id !== row.id)),
              },
            ],
          }}
        />
        <DemoCodeSection title={t.demoCodeTitles.touchGestures} code={TOUCH_GESTURES_DEMO_SOURCE} />
      </div>
    </Layout>
  );
};
