import type { FC } from 'react';
import { useMemo, useState } from 'react';
import { Badge, Button, Flex, Typography, BearIcons } from '@forgedevstack/bear';
import { GridTable, buildCellCommentKey } from '@forgedevstack/grid-table';
import type { RowGroupConfig } from '@forgedevstack/grid-table';
import { Layout } from '@/components/Layout';
import { DemoCodeSection } from '@/components/DemoCodeSection';
import { useDemoNavigation, useGridTableThemeMode } from '@/hooks';
import { useI18n } from '@/i18n';
import { CURRENT_VERSION } from '@/constants/numbers.const';
import {
  RELEASE_115_DEMO_COLUMNS,
  RELEASE_115_DEMO_DATA,
  RELEASE_115_DEMO_SOURCE,
} from './Release115Demo.const';

export const Release115Demo: FC = () => {
  const { t } = useI18n();
  const themeMode = useGridTableThemeMode();
  const { openDemosIndex } = useDemoNavigation();
  const copy = t.release115Demo;
  const [data] = useState(RELEASE_115_DEMO_DATA);
  const [groups, setGroups] = useState<RowGroupConfig[]>([]);
  const [comments, setComments] = useState<Record<string, string>>({
    [buildCellCommentKey(2, 'notes')]: 'Check warehouse notes',
  });
  const [pivotOn, setPivotOn] = useState(false);
  const columns = useMemo(() => RELEASE_115_DEMO_COLUMNS, []);

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
        <Flex gap={2} className="mb-4">
          <Button size="xs" variant={pivotOn ? 'primary' : 'ghost'} onClick={() => setPivotOn((value) => !value)}>
            {copy.pivotToggle}
          </Button>
        </Flex>
        <GridTable
          data={data}
          columns={columns}
          themeMode={themeMode}
          stickyHeader
          showPagination={false}
          enableDragDrop
          enableCellEdit
          enableCopy
          rowGroups={groups}
          onRowGroupsChange={setGroups}
          rowGroupDropZone
          pivot={{
            enabled: pivotOn,
            rowFields: ['region'],
            columnFields: ['quarter'],
            valueFields: [{ field: 'amount', type: 'sum', label: 'Amount' }],
          }}
          cellSpan={{
            getColSpan: (row, columnId) => (columnId === 'notes' && row.region === 'EU' ? 1 : 1),
            getRowSpan: (row, columnId, rowIndex) =>
              columnId === 'region' && rowIndex === 0 ? 2 : 1,
          }}
          cellComments={{
            enabled: true,
            comments,
            onCommentChange: (rowId, columnId, comment) => {
              const key = buildCellCommentKey(rowId, columnId);
              setComments((prev) => {
                const next = { ...prev };
                if (comment) {
                  next[key] = comment;
                } else {
                  delete next[key];
                }
                return next;
              });
            },
          }}
          rowHeight={{ auto: true, resizable: true }}
          rangeSelection={{
            enabled: true,
            enablePaste: true,
            enableCut: true,
            fillHandle: true,
            fillSeries: true,
          }}
          tableEffects={{ hover: true }}
        />
        <DemoCodeSection title={t.demoCodeTitles.release115} code={RELEASE_115_DEMO_SOURCE} />
      </div>
    </Layout>
  );
};
