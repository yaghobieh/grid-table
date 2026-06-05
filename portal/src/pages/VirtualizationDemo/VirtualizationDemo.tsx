import type { FC } from 'react';
import { useMemo, useState } from 'react';
import { Button, Typography, Flex, Badge, BearIcons, Switch, Tour, Input } from '@forgedevstack/bear';
import { GridTable } from '@forgedevstack/grid-table';
import { Layout } from '@/components/Layout';
import { DemoCodeSection } from '@/components/DemoCodeSection';
import { useDemoNavigation } from '@/hooks';
import { useI18n } from '@/i18n';
import {
  VIRTUAL_DEMO_INPUT_WIDTH_PX,
  VIRTUAL_DEMO_MAX_HEIGHT_INPUT_WIDTH_PX,
  VIRTUAL_DEMO_MIN_MAX_HEIGHT,
  VIRTUAL_DEMO_MIN_ROWS,
  VIRTUAL_DEMO_VIRTUALIZE_OVERSCAN,
  VIRTUAL_DEMO_VIRTUALIZE_ROW_HEIGHT,
  VIRTUAL_DEMO_VIRTUALIZE_THRESHOLD,
} from '@/constants/numbers.const';
import {
  buildVirtualDemoRows,
  buildVirtualDemoTourSteps,
  buildVirtualizationDemoSource,
  VIRTUAL_DEMO_COLUMNS,
  VIRTUAL_DEMO_DEFAULT_BATCH_SIZE,
  VIRTUAL_DEMO_DEFAULT_INITIAL_ROWS,
  VIRTUAL_DEMO_DEFAULT_MAX_HEIGHT,
  VIRTUAL_DEMO_PRESETS,
  VIRTUAL_DEMO_TOUR_TARGET_GRID,
  VIRTUAL_DEMO_TOUR_TARGET_TOOLBAR,
  type VirtualizationPresetKind,
} from './VirtualizationDemo.const';

export const VirtualizationDemo: FC = () => {
  const { t } = useI18n();
  const vt = t.virtualizationDemo;
  const { openDemosIndex } = useDemoNavigation();
  const data = useMemo(buildVirtualDemoRows, []);
  const [initialRows, setInitialRows] = useState(VIRTUAL_DEMO_DEFAULT_INITIAL_ROWS);
  const [batchSize, setBatchSize] = useState(VIRTUAL_DEMO_DEFAULT_BATCH_SIZE);
  const [maxHeight, setMaxHeight] = useState(VIRTUAL_DEMO_DEFAULT_MAX_HEIGHT);
  const [lazyEnabled, setLazyEnabled] = useState(false);
  const [virtualizeEnabled, setVirtualizeEnabled] = useState(true);
  const [tourOpen, setTourOpen] = useState(false);

  const tourSteps = useMemo(
    () =>
      buildVirtualDemoTourSteps({
        tourToolbarTitle: vt.tourToolbarTitle,
        tourToolbarBody: vt.tourToolbarBody,
        tourGridTitle: vt.tourGridTitle,
        tourGridBody: vt.tourGridBody,
      }),
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

  const applyPreset = (kind: VirtualizationPresetKind) => {
    const preset = VIRTUAL_DEMO_PRESETS[kind];
    setInitialRows(preset.initialRows);
    setBatchSize(preset.batchSize);
    setMaxHeight(preset.maxHeight);
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
          id={VIRTUAL_DEMO_TOUR_TARGET_TOOLBAR}
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
              onCheckedChange={(checked) => {
                setLazyEnabled(checked);
                if (checked) setVirtualizeEnabled(false);
              }}
              label={vt.lazyEnabled}
              size="sm"
            />
            <Switch
              checked={virtualizeEnabled}
              onCheckedChange={(checked) => {
                setVirtualizeEnabled(checked);
                if (checked) setLazyEnabled(false);
              }}
              label={vt.virtualizeEnabled}
              size="sm"
            />
            <Flex align="center" gap={2}>
              <Typography variant="caption" className="whitespace-nowrap">
                {vt.initialRows}
              </Typography>
              <Input
                type="number"
                size="sm"
                style={{ width: VIRTUAL_DEMO_INPUT_WIDTH_PX }}
                value={String(initialRows)}
                onChange={(e) => setInitialRows(Math.max(VIRTUAL_DEMO_MIN_ROWS, Number(e.target.value) || VIRTUAL_DEMO_MIN_ROWS))}
              />
            </Flex>
            <Flex align="center" gap={2}>
              <Typography variant="caption" className="whitespace-nowrap">
                {vt.batchSize}
              </Typography>
              <Input
                type="number"
                size="sm"
                style={{ width: VIRTUAL_DEMO_INPUT_WIDTH_PX }}
                value={String(batchSize)}
                onChange={(e) => setBatchSize(Math.max(VIRTUAL_DEMO_MIN_ROWS, Number(e.target.value) || VIRTUAL_DEMO_MIN_ROWS))}
              />
            </Flex>
            <Flex align="center" gap={2}>
              <Typography variant="caption" className="whitespace-nowrap">
                {vt.maxHeight}
              </Typography>
              <Input
                type="number"
                size="sm"
                style={{ width: VIRTUAL_DEMO_MAX_HEIGHT_INPUT_WIDTH_PX }}
                value={String(maxHeight)}
                onChange={(e) => setMaxHeight(Math.max(VIRTUAL_DEMO_MIN_MAX_HEIGHT, Number(e.target.value) || VIRTUAL_DEMO_MIN_MAX_HEIGHT))}
              />
            </Flex>
          </Flex>
        </div>

        <div id={VIRTUAL_DEMO_TOUR_TARGET_GRID} className="relative">
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
              virtualize={
                virtualizeEnabled && !lazyEnabled
                  ? {
                      enabled: true,
                      threshold: VIRTUAL_DEMO_VIRTUALIZE_THRESHOLD,
                      rowHeight: VIRTUAL_DEMO_VIRTUALIZE_ROW_HEIGHT,
                      overscan: VIRTUAL_DEMO_VIRTUALIZE_OVERSCAN,
                    }
                  : false
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
