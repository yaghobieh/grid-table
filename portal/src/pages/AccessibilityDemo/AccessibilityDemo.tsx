import type { FC } from 'react';
import { useDemoNavigation, useGridTableThemeMode } from '@/hooks';
import { Button, Typography, Flex, Badge, BearIcons } from '@forgedevstack/bear';
import { GridTable } from '@forgedevstack/grid-table';
import { Layout } from '@/components/Layout';
import { useI18n } from '@/i18n';
import { DemoCodeSection } from '@/components/DemoCodeSection';
import {
  ACCESSIBILITY_DEMO_DATA,
  ACCESSIBILITY_DEMO_COLUMNS,
  ACCESSIBILITY_DEMO_SOURCE,
} from './AccessibilityDemo.const';

export const AccessibilityDemo: FC = () => {
  const { t } = useI18n();
  const themeMode = useGridTableThemeMode();
  const { openDemosIndex } = useDemoNavigation();
  const ad = t.accessibilityDemo;

  return (
    <Layout>
      <div className="max-w-[1100px] mx-auto px-6 py-8">
        <Flex align="center" gap={3} className="mb-4">
          <Button variant="ghost" size="xs" leftIcon={<BearIcons.ArrowLeftIcon size="xs" />} onClick={openDemosIndex}>{t.common.demos}</Button>
          <Badge variant="info">{ad.badge}</Badge>
        </Flex>
        <Typography variant="h2" className="text-2xl font-bold mb-2">{ad.title}</Typography>
        <Typography variant="body2" className="opacity-50 mb-4">
          {ad.description}
        </Typography>
        <ul className="list-disc ps-5 space-y-1 mb-6 text-sm opacity-80">
          {ad.bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div>
          <GridTable
            data={ACCESSIBILITY_DEMO_DATA}
            columns={ACCESSIBILITY_DEMO_COLUMNS}
            themeMode={themeMode}
            stickyHeader
            showPagination={false}
            keyboardNavigation={{ enabled: true, enableEditOnEnter: true }}
            enableCellEdit
            onCellEdit={() => {}}
            tableEffects={{ hover: true }}
          />
        </div>

        <DemoCodeSection title={t.demoCodeTitles.accessibility} code={ACCESSIBILITY_DEMO_SOURCE} />
      </div>
    </Layout>
  );
};
