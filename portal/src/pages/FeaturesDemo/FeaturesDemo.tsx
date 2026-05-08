import { FC, useState } from 'react';
import { useDemoNavigation, useGridTableThemeMode } from '@/hooks';
import {
  Button,
  Typography,
  Flex,
  Badge,
  BearIcons,
} from '@forgedevstack/bear';
import { GridTable } from '@forgedevstack/grid-table';
import { Layout } from '@/components/Layout';
import { DemoCodeSection } from '@/components/DemoCodeSection';
import { useI18n } from '@/i18n';
import { PRODUCT_DATA, TASK_DATA, TREE_DATA, SECTION_GAP_PX, NEW_FEATURE_EXAMPLES } from './FeaturesDemo.const';
import { FEATURES_PRODUCT_GRID_SOURCE } from './FeaturesDemo.code.const';
import type { Task } from './FeaturesDemo.types';
import { productColumns, taskColumns, treeColumns, productTotal } from './FeaturesDemo.columns';

export const FeaturesDemo: FC = () => {
  const { t } = useI18n();
  const themeMode = useGridTableThemeMode();
  const [tasks, setTasks] = useState(TASK_DATA);
  const { openDemosIndex } = useDemoNavigation();
  const fd = t.featuresDemo;

  return (
    <Layout>
      <div className="max-w-[1600px] mx-auto px-6 py-8">
        <Flex align="center" gap={3} className="mb-2">
          <Button variant="ghost" size="xs" leftIcon={<BearIcons.ArrowLeftIcon size="xs" />} onClick={openDemosIndex}>{t.common.demos}</Button>
          <Badge variant="info">{fd.badge}</Badge>
        </Flex>
        <Typography variant="h2" className="text-2xl font-bold mb-1">{fd.title}</Typography>
        <Typography variant="body2" className="opacity-50 mb-8">
          {fd.description}
        </Typography>

        <section style={{ marginBottom: SECTION_GAP_PX }}>
          <Flex align="center" gap={2} className="mb-3">
            <Typography variant="h3" className="text-lg font-semibold">{fd.sections[0]?.title}</Typography>
            <Badge variant="success" className="text-xs">{t.tags.new}</Badge>
          </Flex>
          <Typography variant="body2" className="opacity-50 mb-4">
            {fd.sections[0]?.description}
          </Typography>
          <div>
            <GridTable
              data={PRODUCT_DATA}
              columns={productColumns}
              enableRowSelection
              showPagination={false}
              showGlobalFilter
              stickyHeader
              themeMode={themeMode}
              tableEffects={{ hover: true }}
              contextMenu={{ enabled: true, showCopy: true, showFilter: true, showPin: true, showHide: true }}
              statusBar={{
                enabled: true,
                showRowCount: true,
                showSelectedCount: true,
                aggregations: [
                  { columnId: 'price', type: 'avg', label: 'Avg Price', format: (v: number) => `$${Math.round(v).toLocaleString()}` },
                  { columnId: 'stock', type: 'sum', label: 'Total Stock' },
                  { columnId: 'rating', type: 'avg', label: 'Avg Rating', format: (v: number) => v.toFixed(1) },
                ],
              }}
              enableExport={['csv', 'excel', 'pdf']}
              enableCopy
              printConfig={{ enabled: true, title: 'Product Inventory' }}
              frozenRows={{ bottom: [productTotal] }}
            />
          </div>
        </section>

        <section style={{ marginBottom: SECTION_GAP_PX }}>
          <Flex align="center" gap={2} className="mb-3">
            <Typography variant="h3" className="text-lg font-semibold">New feature examples</Typography>
            <Badge variant="success" className="text-xs">{t.tags.new}</Badge>
          </Flex>
          <Typography variant="body2" className="opacity-50 mb-4">
            Quick examples for the next feature set planned in Grid Table.
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {NEW_FEATURE_EXAMPLES.map((item) => (
              <div key={item.title} className="rounded-lg border border-white/10 p-4 bg-black/20">
                <Typography variant="subtitle1" className="font-semibold mb-2">
                  {item.title}
                </Typography>
                <Typography variant="body2" className="opacity-70 mb-3">
                  {item.summary}
                </Typography>
                <pre className="text-xs opacity-80 overflow-x-auto">
                  <code>{item.example}</code>
                </pre>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: SECTION_GAP_PX }}>
          <Flex align="center" gap={2} className="mb-3">
            <Typography variant="h3" className="text-lg font-semibold">{fd.sections[1]?.title}</Typography>
            <Badge variant="success" className="text-xs">{t.tags.new}</Badge>
          </Flex>
          <Typography variant="body2" className="opacity-50 mb-4">
            {fd.sections[1]?.description}
          </Typography>
          <div>
            <GridTable
              data={tasks}
              columns={taskColumns}
              showPagination={false}
              showGlobalFilter
              stickyHeader
              themeMode={themeMode}
              tableEffects={{ hover: true }}
              enableCellEdit
              onCellEdit={(rowId, columnId, newValue) => {
                setTasks(prev => prev.map(t => t.id === rowId ? { ...t, [columnId]: newValue } : t));
              }}
              rowReorder={{ enabled: true }}
              onRowReorder={(reordered) => setTasks(reordered as Task[])}
              undoRedo={{ enabled: true, maxHistory: 30 }}
              keyboardNavigation={{ enabled: true, enableEditOnEnter: true }}
              statusBar={{
                enabled: true,
                showRowCount: true,
                aggregations: [
                  { columnId: 'effort', type: 'sum', label: 'Total Effort' },
                  { columnId: 'effort', type: 'avg', label: 'Avg Effort', format: (v: number) => v.toFixed(1) },
                ],
              }}
            />
          </div>
        </section>

        <section style={{ marginBottom: SECTION_GAP_PX }}>
          <Flex align="center" gap={2} className="mb-3">
            <Typography variant="h3" className="text-lg font-semibold">{fd.sections[2]?.title}</Typography>
            <Badge variant="success" className="text-xs">{t.tags.new}</Badge>
          </Flex>
          <Typography variant="body2" className="opacity-50 mb-4">
            {fd.sections[2]?.description}
          </Typography>
          <div>
            <GridTable
              data={TREE_DATA}
              columns={treeColumns}
              showPagination={false}
              showGlobalFilter={false}
              stickyHeader
              themeMode={themeMode}
              tableEffects={{ hover: true }}
              treeData={{ enabled: true, childrenField: 'children', expandAll: true, indentSize: 24 }}
              statusBar={{
                enabled: true,
                showRowCount: true,
                aggregations: [
                  { columnId: 'salary', type: 'sum', label: 'Total Payroll', format: (v: number) => `$${v.toLocaleString()}` },
                ],
              }}
            />
          </div>
        </section>

        <section style={{ marginBottom: SECTION_GAP_PX }}>
          <Flex align="center" gap={2} className="mb-3">
            <Typography variant="h3" className="text-lg font-semibold">{fd.sections[3]?.title}</Typography>
            <Badge variant="success" className="text-xs">{t.tags.new}</Badge>
          </Flex>
          <Typography variant="body2" className="opacity-50 mb-4">
            {fd.sections[3]?.description}
          </Typography>
          <div>
            <GridTable
              data={PRODUCT_DATA}
              columns={productColumns}
              showPagination={false}
              showGlobalFilter
              stickyHeader
              themeMode={themeMode}
              tableEffects={{ hover: true }}
              frozenRows={{
                bottom: [productTotal],
              }}
              printConfig={{ enabled: true, title: 'Product Report' }}
              enableExport={['pdf']}
            />
          </div>
        </section>

        <DemoCodeSection
          title={t.demoCodeTitles.features}
          code={FEATURES_PRODUCT_GRID_SOURCE}
        />
      </div>
    </Layout>
  );
};
