import type { FC } from 'react';
import { useMemo, useState } from 'react';
import { Badge, Button, Flex, Typography, BearIcons } from '@forgedevstack/bear';
import { GridTable, applyTransaction } from '@forgedevstack/grid-table';
import { Layout } from '@/components/Layout';
import { DemoCodeSection } from '@/components/DemoCodeSection';
import { useDemoNavigation, useGridTableThemeMode } from '@/hooks';
import { useI18n } from '@/i18n';
import { CURRENT_VERSION } from '@/constants/numbers.const';
import {
  RELEASE_114_DEMO_COLUMNS,
  RELEASE_114_DEMO_DATA,
  RELEASE_114_DEMO_SOURCE,
} from './Release114Demo.const';
import type { Release114Row } from './Release114Demo.types';

export const Release114Demo: FC = () => {
  const { t } = useI18n();
  const themeMode = useGridTableThemeMode();
  const { openDemosIndex } = useDemoNavigation();
  const copy = t.release114Demo;
  const [data, setData] = useState(RELEASE_114_DEMO_DATA);
  const columns = useMemo(() => RELEASE_114_DEMO_COLUMNS, []);

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
        <GridTable
          data={data}
          columns={columns}
          themeMode={themeMode}
          stickyHeader
          showPagination={false}
          showGlobalFilter
          showFilter
          showFilterChips
          showColumnToggle
          floatingFilters
          enableColumnMenu
          enableFind
          enableCellEdit
          enableCopy
          autoFit={{ enabled: true }}
          rangeSelection={{
            enabled: true,
            enablePaste: true,
            enableCut: true,
            fillHandle: true,
            fillSeries: true,
          }}
          flashCells={{ enabled: true }}
          contextMenu={{ enabled: true, showCopy: true, showFilter: true, showPin: true, showHide: true }}
          tableEffects={{ hover: true }}
          onCellEdit={(rowId, columnId, value) => {
            setData((prev) =>
              applyTransaction(
                prev,
                {
                  update: prev
                    .filter((row) => row.id === rowId)
                    .map((row) => ({ ...row, [columnId]: value })),
                },
                (row) => row.id,
              ),
            );
          }}
        />
        <DemoCodeSection title={t.demoCodeTitles.release114} code={RELEASE_114_DEMO_SOURCE} />
      </div>
    </Layout>
  );
};
