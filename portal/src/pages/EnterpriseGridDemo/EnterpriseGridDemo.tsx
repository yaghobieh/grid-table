import type { FC } from 'react';
import { useMemo, useState } from 'react';
import { Badge, Button, Flex, Typography, BearIcons } from '@forgedevstack/bear';
import { GridTable, applyTransaction } from '@forgedevstack/grid-table';
import type { ExportScope } from '@forgedevstack/grid-table';
import { Layout } from '@/components/Layout';
import { DemoCodeSection } from '@/components/DemoCodeSection';
import { useDemoNavigation, useGridTableThemeMode } from '@/hooks';
import { useI18n } from '@/i18n';
import {
  DEFAULT_EXPORT_SCOPE,
  ENTERPRISE_DEMO_COLUMNS,
  ENTERPRISE_DEMO_DATA,
  ENTERPRISE_DEMO_SOURCE,
  EXPORT_SCOPE_OPTIONS,
} from './EnterpriseGridDemo.const';
import type { EnterpriseRow } from './EnterpriseGridDemo.types';

export const EnterpriseGridDemo: FC = () => {
  const { t } = useI18n();
  const themeMode = useGridTableThemeMode();
  const { openDemosIndex } = useDemoNavigation();
  const copy = t.enterpriseGridDemo;
  const [data, setData] = useState(ENTERPRISE_DEMO_DATA);
  const [exportScope, setExportScope] = useState<ExportScope>(DEFAULT_EXPORT_SCOPE);

  const columns = useMemo(() => ENTERPRISE_DEMO_COLUMNS, []);

  return (
    <Layout>
      <div className="max-w-[1200px] mx-auto px-6 py-8">
        <Flex align="center" gap={3} className="mb-2">
          <Button variant="ghost" size="xs" leftIcon={<BearIcons.ArrowLeftIcon size="xs" />} onClick={openDemosIndex}>
            {t.common.demos}
          </Button>
          <Badge variant="success">v1.1.3</Badge>
        </Flex>
        <Typography variant="h2" className="text-2xl font-bold mb-1">{copy.title}</Typography>
        <Typography variant="body2" className="opacity-50 mb-6">
          {copy.description}
        </Typography>

        <section className="mb-8">
          <Typography variant="h3" className="text-lg font-semibold mb-2">{copy.sections.range.title}</Typography>
          <Typography variant="body2" className="opacity-50 mb-4">
            {copy.sections.range.description}
          </Typography>
          <Flex gap={2} className="mb-3 flex-wrap">
            {EXPORT_SCOPE_OPTIONS.map((scope) => (
              <Button
                key={scope}
                size="xs"
                variant={exportScope === scope ? 'primary' : 'ghost'}
                onClick={() => setExportScope(scope)}
              >
                {copy.exportScopeLabel}: {scope}
              </Button>
            ))}
            <Button
              size="xs"
              variant="ghost"
              onClick={() => {
                const next: EnterpriseRow = {
                  id: Date.now(),
                  sku: `SKU-${Math.floor(Math.random() * 900 + 100)}`,
                  region: 'EU',
                  status: 'Active',
                  qty: 1,
                  shipDate: '2026-07-20',
                  notes: 'Added',
                };
                setData((prev) => applyTransaction(prev, { add: [next] }, (row) => row.id));
              }}
            >
              {copy.addRow}
            </Button>
          </Flex>
          <GridTable
            data={data}
            columns={columns}
            themeMode={themeMode}
            stickyHeader
            showPagination={false}
            showGlobalFilter
            enableRowSelection
            enableCellEdit
            enableExport="csv"
            enableCopy
            exportScope={exportScope}
            rangeSelection={{ enabled: true, enablePaste: true, fillHandle: true }}
            flashCells={{ enabled: true }}
            touchGestures={{
              enabled: true,
              swipeActions: true,
              longPressContextMenu: true,
              swipeActionItems: [
                {
                  id: 'copy',
                  label: copy.swipeCopy,
                  onAction: (row) => {
                    void navigator.clipboard?.writeText(JSON.stringify(row));
                  },
                },
                {
                  id: 'delete',
                  label: copy.swipeDelete,
                  danger: true,
                  onAction: (row) => {
                    setData((prev) => applyTransaction(prev, { remove: [row.id] }, (r) => r.id));
                  },
                },
              ],
            }}
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
        </section>

        <Typography variant="body2" className="opacity-60 mb-6">
          {copy.filtersHint}
        </Typography>

        <DemoCodeSection title={t.demoCodeTitles.enterpriseGrid} code={ENTERPRISE_DEMO_SOURCE} />
      </div>
    </Layout>
  );
};
