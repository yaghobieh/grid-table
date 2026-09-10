import type { FC } from 'react';
import { useMemo } from 'react';
import { Badge, Button, Flex, Typography, BearIcons } from '@forgedevstack/bear';
import { GridTable, GridTableTheme } from '@forgedevstack/grid-table';
import { Layout } from '@/components/Layout';
import { DemoCodeSection } from '@/components/DemoCodeSection';
import { useDemoNavigation } from '@/hooks';
import { useI18n } from '@/i18n';
import { CURRENT_VERSION } from '@/constants/numbers.const';
import {
  RELEASE_116_DEMO_COLUMNS,
  RELEASE_116_DEMO_DATA,
  RELEASE_116_DEMO_SOURCE,
  RELEASE_116_TABLE_THEME,
} from './Release116Demo.const';

export const Release116Demo: FC = () => {
  const { t } = useI18n();
  const { openDemosIndex } = useDemoNavigation();
  const copy = t.release116Demo;
  const columns = useMemo(() => RELEASE_116_DEMO_COLUMNS, []);

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
          {copy.bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <GridTableTheme theme={RELEASE_116_TABLE_THEME}>
          <GridTable
            data={RELEASE_116_DEMO_DATA}
            columns={columns}
            themeMode="dark"
            stickyHeader
            showPagination={false}
            tableEffects={{ hover: true }}
          />
        </GridTableTheme>
        <DemoCodeSection title={t.demoCodeTitles.release116} code={RELEASE_116_DEMO_SOURCE} />
      </div>
    </Layout>
  );
};
