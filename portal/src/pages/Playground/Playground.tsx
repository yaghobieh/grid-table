import { FC, useState, useMemo } from 'react';
import { Link } from '@forgedevstack/forge-compass/react';
import {
  Button,
  Typography,
  Container,
  Flex,
  Card,
  CardBody,
  Badge,
  BearIcons,
  GradientText,
  CodeBlock,
} from '@forgedevstack/bear';
import { GridTable } from '@forgedevstack/grid-table';
import type { ColumnDefinition } from '@forgedevstack/grid-table';
import { Layout } from '@/components/Layout';
import { useI18n } from '@/i18n';
import { TOGGLE_OPTIONS, EFFECT_OPTIONS, DEFAULT_PLAYGROUND_ROWS } from './Playground.const';
import type { PlaygroundRow, PlaygroundConfig } from './Playground.types';

const GRADIENT: [string, string] = ['#22c55e', '#16a34a'];

const generateData = (count: number): PlaygroundRow[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: ['Admin', 'Editor', 'Viewer'][i % 3],
    department: ['Engineering', 'Design', 'Marketing', 'Sales'][i % 4],
    status: i % 5 === 0 ? 'Inactive' : 'Active',
    salary: 50000 + i * 2500,
  }));

const columns: ColumnDefinition<PlaygroundRow>[] = [
  { id: 'name', accessor: 'name', header: 'Name', sortable: true, filterable: true, width: 160, editable: true },
  { id: 'email', accessor: 'email', header: 'Email', sortable: true, filterable: true, width: 220, editable: true },
  { id: 'role', accessor: 'role', header: 'Role', sortable: true, filterable: true, width: 100, editable: { enabled: true, type: 'select', options: [{ value: 'Admin', label: 'Admin' }, { value: 'Editor', label: 'Editor' }, { value: 'Viewer', label: 'Viewer' }] } },
  { id: 'department', accessor: 'department', header: 'Department', sortable: true, filterable: true, width: 130 },
  { id: 'status', accessor: 'status', header: 'Status', sortable: true, width: 100 },
  { id: 'salary', accessor: 'salary', header: 'Salary', sortable: true, align: 'right', width: 120, render: (v: unknown) => `$${Number(v).toLocaleString()}` },
];

const DEFAULT_CONFIG: PlaygroundConfig = {
  enableRowSelection: true,
  enableDragDrop: true,
  enableColumnResize: true,
  showPagination: true,
  showFilter: true,
  showGlobalFilter: true,
  stickyHeader: true,
  enableExport: true,
  enableCellEdit: true,
  themeMode: 'dark',
  effects: { hover: true, sort: true, row: true },
};

function generateCode(cfg: PlaygroundConfig): string {
  const props: string[] = [];
  if (cfg.enableRowSelection) props.push('enableRowSelection');
  if (cfg.enableDragDrop) props.push('enableDragDrop');
  if (cfg.enableColumnResize) props.push('enableColumnResize');
  if (cfg.showPagination) props.push('showPagination');
  if (cfg.showFilter) props.push('showFilter');
  if (cfg.showGlobalFilter) props.push('showGlobalFilter');
  if (cfg.stickyHeader) props.push('stickyHeader');
  if (cfg.enableExport) props.push('enableExport');
  if (cfg.enableCellEdit) props.push('enableCellEdit');
  const fx = Object.entries(cfg.effects).filter(([, v]) => v).map(([k]) => `${k}: true`);
  if (fx.length) props.push(`tableEffects={{ ${fx.join(', ')} }}`);
  props.push(`themeMode="${cfg.themeMode}"`);

  return `<GridTable
  data={data}
  columns={columns}
  ${props.join('\n  ')}
/>`;
}

export const Playground: FC = () => {
  const { t } = useI18n();
  const [config, setConfig] = useState<PlaygroundConfig>(DEFAULT_CONFIG);
  const data = useMemo(() => generateData(DEFAULT_PLAYGROUND_ROWS), []);

  const toggle = (key: string) => {
    setConfig((prev) => ({ ...prev, [key]: !prev[key as keyof PlaygroundConfig] }));
  };

  const toggleEffect = (key: string) => {
    setConfig((prev) => ({
      ...prev,
      effects: { ...prev.effects, [key]: !prev.effects[key as keyof typeof prev.effects] },
    }));
  };

  const code = useMemo(() => generateCode(config), [config]);

  return (
    <Layout>
      <Container style={{ maxWidth: '80rem' }} className="py-12">
        <div className="text-center mb-10">
          <Flex justify="center" className="mb-3">
            <Link to="/">
              <Button variant="ghost" size="xs" leftIcon={<BearIcons.ArrowLeftIcon size="xs" />}>
                {t.common.back}
              </Button>
            </Link>
          </Flex>
          <Typography variant="h1" className="text-4xl md:text-5xl font-extrabold mb-3">
            <GradientText colors={GRADIENT}>{t.playground.title}</GradientText>
          </Typography>
          <Typography style={{ color: 'var(--text-secondary)' }}>
            {t.playground.description}
          </Typography>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
          <div className="space-y-4">
            <Card variant="ghost" padding="lg" radius="xl">
              <CardBody>
                <Typography variant="h5" className="font-bold mb-4">
                  {t.playground.props}
                </Typography>

                <div className="space-y-2">
                  {TOGGLE_OPTIONS.map((opt) => (
                    <label key={opt.key} className="flex items-center gap-3 cursor-pointer py-1">
                      <input
                        type="checkbox"
                        checked={config[opt.key as keyof PlaygroundConfig] as boolean}
                        onChange={() => toggle(opt.key)}
                        className="w-4 h-4 rounded accent-green-500"
                      />
                      <Typography variant="body2">{opt.label}</Typography>
                    </label>
                  ))}
                </div>

                <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--border-color)' }}>
                  <Typography variant="h5" className="font-bold mb-3">
                    {t.playground.effects}
                  </Typography>
                  <div className="space-y-2">
                    {EFFECT_OPTIONS.map((opt) => (
                      <label key={opt.key} className="flex items-center gap-3 cursor-pointer py-1">
                        <input
                          type="checkbox"
                          checked={config.effects[opt.key as keyof typeof config.effects]}
                          onChange={() => toggleEffect(opt.key)}
                          className="w-4 h-4 rounded accent-green-500"
                        />
                        <Typography variant="body2">{opt.label}</Typography>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--border-color)' }}>
                  <Typography variant="h5" className="font-bold mb-3">
                    {t.playground.theme}
                  </Typography>
                  <Flex gap={2}>
                    {(['dark', 'light'] as const).map((m) => (
                      <Button
                        key={m}
                        variant={config.themeMode === m ? 'grid' : 'ghost'}
                        size="sm"
                        onClick={() => setConfig((p) => ({ ...p, themeMode: m }))}
                      >
                        {m === 'dark' ? '🌙 Dark' : '☀️ Light'}
                      </Button>
                    ))}
                  </Flex>
                </div>

                <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--border-color)' }}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setConfig(DEFAULT_CONFIG)}
                    leftIcon={<BearIcons.RefreshIcon size="xs" />}
                    className="w-full"
                  >
                    {t.playground.reset}
                  </Button>
                </div>
              </CardBody>
            </Card>

            <Card variant="ghost" padding="lg" radius="xl">
              <CardBody>
                <Flex align="center" justify="between" className="mb-3">
                  <Typography variant="h5" className="font-bold">{t.playground.generatedCode}</Typography>
                  <Badge variant="success" className="text-xs font-mono">JSX</Badge>
                </Flex>
                <CodeBlock code={code} language="tsx" copyable showLineNumbers />
              </CardBody>
            </Card>
          </div>

          <div>
            <Card variant="ghost" padding="none" radius="xl" className="overflow-hidden">
              <CardBody className="p-0">
                <Flex align="center" gap={2} className="px-4 py-3" style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)' }}>
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#ef4444', opacity: 0.8 }} />
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#eab308', opacity: 0.8 }} />
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#22c55e', opacity: 0.8 }} />
                  <Typography variant="caption" className="ml-3 font-mono" style={{ color: 'var(--text-muted)' }}>
                    {t.playground.livePreview}
                  </Typography>
                </Flex>

                <div className={config.themeMode} style={{ padding: '1rem' }}>
                  <GridTable
                    data={data}
                    columns={columns}
                    enableRowSelection={config.enableRowSelection}
                    enableDragDrop={config.enableDragDrop}
                    enableColumnResize={config.enableColumnResize}
                    showPagination={config.showPagination}
                    showFilter={config.showFilter}
                    showGlobalFilter={config.showGlobalFilter}
                    stickyHeader={config.stickyHeader}
                    enableExport={config.enableExport}
                    enableCellEdit={config.enableCellEdit}
                    tableEffects={config.effects}
                    themeMode={config.themeMode}
                    paginationConfig={{ initialPageSize: 5, pageSizeOptions: [5, 10] }}
                    dimensions={{ maxHeight: 'calc(100vh - 300px)' }}
                    onCellEdit={(row: PlaygroundRow, col: string, _old: unknown, _new: unknown) => console.log('Cell edit:', { row, col, _old, _new })}
                  />
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </Container>
    </Layout>
  );
};
