import { FC, useState, useMemo, useCallback } from 'react';
import {
  Button,
  Typography,
  Flex,
  Container,
  Card,
  CardBody,
  Badge,
  GradientText,
  CodeBlock,
  BearIcons,
} from '@forgedevstack/bear';
import { GridTable } from '@forgedevstack/grid-table';
import type { ColumnDefinition } from '@forgedevstack/grid-table';
import { Layout } from '@/components/Layout';
import { THEME_PRESETS, THEME_EXPORT_TEMPLATE } from '@/constants';
import type { ThemeExportConfig, ThemePreset } from '@/types';
import {
  THEME_PREVIEW_ROWS,
  DEFAULT_FONT_SIZE,
  DEFAULT_BORDER_RADIUS,
  DEFAULT_SPACING,
  MIN_FONT_SIZE,
  MAX_FONT_SIZE,
  MIN_BORDER_RADIUS,
  MAX_BORDER_RADIUS,
  MIN_SPACING,
  MAX_SPACING,
} from '@/constants/numbers.const';
import { useI18n } from '@/i18n';
import { GRADIENT_PRIMARY } from './ThemeBuilder.const';
import type { PreviewRow } from './ThemeBuilder.types';

// ── Preview data ─────────────────────────────────────
const PREVIEW_DATA: PreviewRow[] = [
  { id: 1, name: 'Sarah Chen', role: 'Engineering Lead', department: 'Engineering', status: 'Active', salary: 145000 },
  { id: 2, name: 'James Rodriguez', role: 'Product Manager', department: 'Product', status: 'Active', salary: 130000 },
  { id: 3, name: 'Emily Watson', role: 'Designer', department: 'Design', status: 'Remote', salary: 115000 },
  { id: 4, name: 'Michael Kim', role: 'Sales Director', department: 'Sales', status: 'Active', salary: 125000 },
  { id: 5, name: 'Lisa Patel', role: 'HR Manager', department: 'HR', status: 'On Leave', salary: 105000 },
  { id: 6, name: 'David Park', role: 'DevOps', department: 'Engineering', status: 'Active', salary: 135000 },
  { id: 7, name: 'Anna Müller', role: 'Backend Dev', department: 'Engineering', status: 'Remote', salary: 128000 },
  { id: 8, name: 'Carlos Mendez', role: 'Frontend Dev', department: 'Engineering', status: 'Active', salary: 122000 },
];

const previewColumns: ColumnDefinition<PreviewRow>[] = [
  { id: 'name', accessor: 'name', header: 'Name', sortable: true, filterable: true, width: 180 },
  { id: 'role', accessor: 'role', header: 'Role', sortable: true, width: 160 },
  { id: 'department', accessor: 'department', header: 'Dept', sortable: true, filterable: true, width: 120 },
  { id: 'status', accessor: 'status', header: 'Status', sortable: true, width: 100 },
  { id: 'salary', accessor: 'salary', header: 'Salary', sortable: true, align: 'right', width: 110, render: (val: unknown) => `$${Number(val).toLocaleString()}` },
];

// ── Helpers ──────────────────────────────────────────
const applyPreset = (preset: ThemePreset): ThemeExportConfig => ({
  mode: preset.mode,
  backgroundColor: preset.backgroundColor,
  foregroundColor: preset.foregroundColor,
  accentColor: preset.accentColor,
  borderColor: preset.borderColor,
  headerBg: preset.headerBg,
  headerText: preset.headerText,
  rowHoverBg: preset.rowHoverBg,
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  fontSize: DEFAULT_FONT_SIZE,
  borderRadius: DEFAULT_BORDER_RADIUS,
  spacing: DEFAULT_SPACING,
  stripedRows: false,
});

const buildExportCode = (cfg: ThemeExportConfig): string => {
  return THEME_EXPORT_TEMPLATE
    .replace(/\{\{mode\}\}/g, cfg.mode)
    .replace(/\{\{backgroundColor\}\}/g, cfg.backgroundColor)
    .replace(/\{\{foregroundColor\}\}/g, cfg.foregroundColor)
    .replace(/\{\{accentColor\}\}/g, cfg.accentColor)
    .replace(/\{\{borderColor\}\}/g, cfg.borderColor)
    .replace(/\{\{headerBg\}\}/g, cfg.headerBg)
    .replace(/\{\{headerText\}\}/g, cfg.headerText)
    .replace(/\{\{rowHoverBg\}\}/g, cfg.rowHoverBg);
};

// ── Color Input ──────────────────────────────────────
const ColorInput: FC<{ label: string; value: string; onChange: (v: string) => void }> = ({ label, value, onChange }) => (
  <Flex align="center" justify="between" className="py-2">
    <Typography variant="body2" className="opacity-70">{label}</Typography>
    <Flex align="center" gap={2}>
      <input
        type="color"
        value={value.startsWith('rgba') ? '#333333' : value}
        onChange={(e) => onChange(e.target.value)}
        className="w-8 h-8 rounded border-0 cursor-pointer bg-transparent"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-28 px-2 py-1 text-xs font-mono rounded"
        style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
      />
    </Flex>
  </Flex>
);

// ── Range Input ──────────────────────────────────────
const RangeInput: FC<{ label: string; value: number; min: number; max: number; unit: string; onChange: (v: number) => void }> = ({ label, value, min, max, unit, onChange }) => (
  <Flex align="center" justify="between" className="py-2">
    <Typography variant="body2" className="opacity-70">{label}</Typography>
    <Flex align="center" gap={2}>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-24 accent-green-500"
      />
      <Typography variant="caption" className="w-12 text-right font-mono">{value}{unit}</Typography>
    </Flex>
  </Flex>
);

export const ThemeBuilder: FC = () => {
  const { t } = useI18n();
  const [config, setConfig] = useState<ThemeExportConfig>(() => applyPreset(THEME_PRESETS[0]));
  const [showCode, setShowCode] = useState(false);

  const update = useCallback(<K extends keyof ThemeExportConfig>(key: K, val: ThemeExportConfig[K]) => {
    setConfig((prev) => ({ ...prev, [key]: val }));
  }, []);

  const themeOverride = useMemo(() => ({
    colors: {
      background: {
        primary: config.backgroundColor,
        secondary: config.headerBg,
        tertiary: config.borderColor,
        hover: config.rowHoverBg,
      },
      text: {
        primary: config.foregroundColor,
        secondary: config.headerText,
        muted: `${config.headerText}88`,
      },
      border: {
        default: config.borderColor,
        hover: `${config.accentColor}44`,
      },
      accent: {
        primary: config.accentColor,
        success: '#22c55e',
        warning: '#eab308',
        error: '#ef4444',
      },
    },
  }), [config]);

  const exportCode = useMemo(() => buildExportCode(config), [config]);

  return (
    <Layout>
      <div className="pt-24 pb-20">
        <Container style={{ maxWidth: '80rem' }}>
          {/* Header */}
          <div className="text-center mb-12">
            <Typography variant="h1" className="text-4xl md:text-5xl font-extrabold mb-4">
              <GradientText colors={GRADIENT_PRIMARY}>{t.themeBuilderPage.title}</GradientText>
            </Typography>
            <Typography className="opacity-50 max-w-xl mx-auto text-lg">
              {t.themeBuilderPage.description}
            </Typography>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
            <div className="space-y-6">
              {/* Presets */}
              <Card variant="ghost" padding="md" radius="xl">
                <CardBody>
                  <Typography variant="h5" className="font-bold mb-4">
                    <Flex align="center" gap={2}>
                      <BearIcons.PaletteIcon size="xs" color="var(--grid-accent)" />
                      {t.themeBuilderPage.presets}
                    </Flex>
                  </Typography>
                  <div className="grid grid-cols-3 gap-2">
                    {THEME_PRESETS.map((preset) => (
                      <button
                        key={preset.id}
                        onClick={() => setConfig(applyPreset(preset))}
                        className="p-2 rounded-lg text-xs text-center transition-all hover:ring-2 ring-green-500/50"
                        style={{
                          backgroundColor: preset.backgroundColor,
                          color: preset.foregroundColor,
                          border: `1px solid ${preset.borderColor}`,
                        }}
                      >
                        <div className="w-4 h-4 rounded-full mx-auto mb-1" style={{ backgroundColor: preset.accentColor }} />
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </CardBody>
              </Card>

              {/* Colors */}
              <Card variant="ghost" padding="md" radius="xl">
                <CardBody>
                  <Typography variant="h5" className="font-bold mb-4">
                    <Flex align="center" gap={2}>
                      <BearIcons.DropletIcon size="xs" color="var(--grid-accent)" />
                      {t.themeBuilderPage.colors}
                    </Flex>
                  </Typography>
                  <ColorInput label={t.themeBuilderPage.background} value={config.backgroundColor} onChange={(v) => update('backgroundColor', v)} />
                  <ColorInput label={t.themeBuilderPage.foreground} value={config.foregroundColor} onChange={(v) => update('foregroundColor', v)} />
                  <ColorInput label={t.themeBuilderPage.accent} value={config.accentColor} onChange={(v) => update('accentColor', v)} />
                  <ColorInput label={t.themeBuilderPage.border} value={config.borderColor} onChange={(v) => update('borderColor', v)} />
                  <ColorInput label={t.themeBuilderPage.headerBg} value={config.headerBg} onChange={(v) => update('headerBg', v)} />
                  <ColorInput label={t.themeBuilderPage.headerText} value={config.headerText} onChange={(v) => update('headerText', v)} />
                  <ColorInput label={t.themeBuilderPage.rowHover} value={config.rowHoverBg} onChange={(v) => update('rowHoverBg', v)} />
                </CardBody>
              </Card>

              {/* Layout */}
              <Card variant="ghost" padding="md" radius="xl">
                <CardBody>
                  <Typography variant="h5" className="font-bold mb-4">
                    <Flex align="center" gap={2}>
                      <BearIcons.SettingsIcon size="xs" color="var(--grid-accent)" />
                      {t.themeBuilderPage.layout}
                    </Flex>
                  </Typography>
                  <RangeInput label={t.themeBuilderPage.fontSize} value={config.fontSize} min={MIN_FONT_SIZE} max={MAX_FONT_SIZE} unit="px" onChange={(v) => update('fontSize', v)} />
                  <RangeInput label={t.themeBuilderPage.radius} value={config.borderRadius} min={MIN_BORDER_RADIUS} max={MAX_BORDER_RADIUS} unit="px" onChange={(v) => update('borderRadius', v)} />
                  <RangeInput label={t.themeBuilderPage.spacing} value={config.spacing} min={MIN_SPACING} max={MAX_SPACING} unit="px" onChange={(v) => update('spacing', v)} />
                  <Flex align="center" justify="between" className="py-2">
                    <Typography variant="body2" className="opacity-70">{t.themeBuilderPage.stripedRows}</Typography>
                    <button
                      onClick={() => update('stripedRows', !config.stripedRows)}
                      className={`w-10 h-5 rounded-full transition-colors ${config.stripedRows ? 'bg-green-500' : 'bg-gray-600'}`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white transition-transform ${config.stripedRows ? 'translate-x-5' : 'translate-x-0.5'}`} />
                    </button>
                  </Flex>
                  <Flex align="center" justify="between" className="py-2">
                    <Typography variant="body2" className="opacity-70">{t.themeBuilderPage.mode}</Typography>
                    <Flex gap={2}>
                      <button
                        onClick={() => update('mode', 'dark')}
                        className={`px-3 py-1 text-xs rounded ${config.mode === 'dark' ? 'bg-green-500 text-white' : 'opacity-50'}`}
                      >
                        {t.themeBuilderPage.dark}
                      </button>
                      <button
                        onClick={() => update('mode', 'light')}
                        className={`px-3 py-1 text-xs rounded ${config.mode === 'light' ? 'bg-green-500 text-white' : 'opacity-50'}`}
                      >
                        {t.themeBuilderPage.light}
                      </button>
                    </Flex>
                  </Flex>
                </CardBody>
              </Card>

              {/* Export */}
              <Button
                variant="grid"
                size="md"
                className="w-full"
                leftIcon={<BearIcons.CodeIcon size="xs" />}
                onClick={() => setShowCode(!showCode)}
              >
                {showCode ? t.themeBuilderPage.hideCode : t.themeBuilderPage.exportCode}
              </Button>
            </div>

            <div className="space-y-6">
              <Card variant="ghost" padding="md" radius="xl">
                <CardBody>
                  <Flex align="center" justify="between" className="mb-4">
                    <Typography variant="h5" className="font-bold">
                      <Flex align="center" gap={2}>
                        <BearIcons.VisibilityIcon size="xs" color="var(--grid-accent)" />
                        {t.themeBuilderPage.livePreview}
                      </Flex>
                    </Typography>
                    <Badge variant="success" className="text-xs">
                      {config.mode} {t.common.modeLabel}
                    </Badge>
                  </Flex>

                  <div
                    className="rounded-xl overflow-hidden"
                    style={{
                      backgroundColor: config.backgroundColor,
                      border: `1px solid ${config.borderColor}`,
                      fontSize: `${config.fontSize}px`,
                      borderRadius: `${config.borderRadius}px`,
                    }}
                  >
                    <GridTable
                      data={PREVIEW_DATA.slice(0, THEME_PREVIEW_ROWS)}
                      columns={previewColumns}
                      showPagination={false}
                      showFilter={false}
                      showGlobalFilter
                      stickyHeader
                      enableColumnResize
                      enableDragDrop
                      themeMode={config.mode}
                      themeOverride={themeOverride}
                      enableRowSelection
                    />
                  </div>
                </CardBody>
              </Card>

              {/* Export Code */}
              {showCode && (
                <Card variant="ghost" padding="md" radius="xl">
                  <CardBody>
                    <Flex align="center" justify="between" className="mb-4">
                      <Typography variant="h5" className="font-bold">
                        <Flex align="center" gap={2}>
                          <BearIcons.CodeIcon size="xs" color="var(--grid-accent)" />
                          {t.themeBuilderPage.exportCode}
                        </Flex>
                      </Typography>
                      <Badge variant="secondary" className="text-xs font-mono">TypeScript</Badge>
                    </Flex>
                    <CodeBlock
                      code={exportCode}
                      title="theme.tsx"
                      language="typescript"
                      copyable
                      showLineNumbers
                    />
                  </CardBody>
                </Card>
              )}
            </div>
          </div>
        </Container>
      </div>
    </Layout>
  );
};
