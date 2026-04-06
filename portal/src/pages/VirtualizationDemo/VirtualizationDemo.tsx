import type { FC } from 'react';
import { useMemo, useState } from 'react';
import { Button, Typography, Flex, Badge, BearIcons, Switch, Tour, Input } from '@forgedevstack/bear';
import type { TourStep } from '@forgedevstack/bear';
import { GridTable } from '@forgedevstack/grid-table';
import { Layout } from '@/components/Layout';
import { DemoCodeSection } from '@/components/DemoCodeSection';
import { useDemoNavigation, useGridTableThemeMode } from '@/hooks';
import { useI18n } from '@/i18n';
import {
  buildVirtualDemoRows,
  VIRTUAL_DEMO_COLUMNS,
  VIRTUAL_DEMO_ROW_COUNT,
  buildVirtualizationDemoSource,
} from './VirtualizationDemo.const';

export const VirtualizationDemo: FC = () => {
  const { t } = useI18n();
  const themeMode = useGridTableThemeMode();
  const { openDemosIndex } = useDemoNavigation();
  const data = useMemo(buildVirtualDemoRows, []);
  const [initialRows, setInitialRows] = useState(40);
  const [batchSize, setBatchSize] = useState(40);
  const [maxHeight, setMaxHeight] = useState(420);
  const [lazyEnabled, setLazyEnabled] = useState(true);
  const [tourOpen, setTourOpen] = useState(false);

  const vt = t.virtualizationDemo;

  const tourSteps: TourStep[] = useMemo(
    () => [
      {
        target: '#lazy-demo-toolbar',
        title: vt.tourToolbarTitle,
        description: vt.tourToolbarBody,
        placement: 'bottom',
      },
      {
        target: '#lazy-demo-grid',
        title: vt.tourGridTitle,
        description: vt.tourGridBody,
        placement: 'top',
      },
    ],
    [vt.tourToolbarTitle, vt.tourToolbarBody, vt.tourGridTitle, vt.tourGridBody],
  );

  const source = useMemo(
    () =>
      buildVirtualizationDemoSource({
        initialRows,
        batchSize,
        maxHeight,
        lazyEnabled,
      }),
    [initialRows, batchSize, maxHeight, lazyEnabled],
  );

  const applyPreset = (kind: 'dense' | 'default' | 'heavy') => {
    if (kind === 'dense') {
      setInitialRows(20);
      setBatchSize(20);
      setMaxHeight(360);
    } else if (kind === 'default') {
      setInitialRows(40);
      setBatchSize(40);
      setMaxHeight(420);
    } else {
      setInitialRows(80);
      setBatchSize(80);
      setMaxHeight(520);
    }
  };

  return (
    <Layout>
      <div className="max-w-[1000px] mx-auto px-6 py-8">
        <Flex align="center" gap={3} className="mb-4">
          <Button variant="ghost" size="xs" leftIcon={<BearIcons.ArrowLeftIcon size="xs" />} onClick={openDemosIndex}>
            {t.common.demos}
          </Button>
          <Badge variant="warning">Scale</Badge>
        </Flex>
        <Typography variant="h2" className="text-2xl font-bold mb-2">
          {vt.title}
        </Typography>
        <Typography variant="body2" className="opacity-50 mb-6">
          {vt.lead}
        </Typography>

        <div
          id="lazy-demo-toolbar"
          className="mb-4 rounded-xl p-4 space-y-4"
          style={{ border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}
        >
          <Flex align="center" justify="between" wrap="wrap" gap={3}>
            <Typography variant="body2" className="font-semibold">
              {vt.presets}
            </Typography>
            <Flex gap={2} wrap="wrap">
              <Button variant="outline" size="sm" onClick={() => applyPreset('dense')}>
                {vt.presetDense}
              </Button>
              <Button variant="outline" size="sm" onClick={() => applyPreset('default')}>
                {vt.presetDefault}
              </Button>
              <Button variant="outline" size="sm" onClick={() => applyPreset('heavy')}>
                {vt.presetHeavy}
              </Button>
              <Button variant="gridGhost" size="sm" onClick={() => setTourOpen(true)}>
                {vt.startTour}
              </Button>
            </Flex>
          </Flex>

          <Flex align="center" gap={4} wrap="wrap">
            <Switch
              checked={lazyEnabled}
              onCheckedChange={setLazyEnabled}
              label={vt.lazyEnabled}
              size="sm"
            />
            <Flex align="center" gap={2}>
              <Typography variant="caption" className="whitespace-nowrap">
                {vt.initialRows}
              </Typography>
              <Input
                type="number"
                size="sm"
                style={{ width: 72 }}
                value={String(initialRows)}
                onChange={(e) => setInitialRows(Math.max(1, Number(e.target.value) || 1))}
              />
            </Flex>
            <Flex align="center" gap={2}>
              <Typography variant="caption" className="whitespace-nowrap">
                {vt.batchSize}
              </Typography>
              <Input
                type="number"
                size="sm"
                style={{ width: 72 }}
                value={String(batchSize)}
                onChange={(e) => setBatchSize(Math.max(1, Number(e.target.value) || 1))}
              />
            </Flex>
            <Flex align="center" gap={2}>
              <Typography variant="caption" className="whitespace-nowrap">
                {vt.maxHeight}
              </Typography>
              <Input
                type="number"
                size="sm"
                style={{ width: 88 }}
                value={String(maxHeight)}
                onChange={(e) => setMaxHeight(Math.max(120, Number(e.target.value) || 120))}
              />
            </Flex>
          </Flex>
        </div>

        <div id="lazy-demo-grid" className="relative">
          <div className="dark">
            <GridTable
              data={data}
              columns={VIRTUAL_DEMO_COLUMNS}
              themeMode="dark"
              stickyHeader
              showPagination={false}
              showGlobalFilter={false}
              dimensions={{ maxHeight }}
              lazyLoad={
                lazyEnabled
                  ? {
                      enabled: true,
                      initialRows,
                      batchSize,
                    }
                  : undefined
              }
              tableEffects={{ hover: true }}
            />
          </div>
        </div>

        <DemoCodeSection title={t.demoCodeTitles.virtualization} code={source} />

        <Tour steps={tourSteps} open={tourOpen} onClose={() => setTourOpen(false)} onFinish={() => setTourOpen(false)} />
      </div>
    </Layout>
  );
};
