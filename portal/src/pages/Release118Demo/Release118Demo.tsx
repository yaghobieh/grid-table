import type { FC } from 'react';
import { useMemo, useState } from 'react';
import { Button, Flex, Input, Typography, BearIcons } from '@forgedevstack/bear';
import { GridTable } from '@forgedevstack/grid-table';
import type { ColumnDefinition } from '@forgedevstack/grid-table';
import { Layout } from '@/components/Layout';
import { DemoCodeSection } from '@/components/DemoCodeSection';
import { useDemoNavigation } from '@/hooks';
import { useI18n } from '@/i18n';
import {
  RELEASE_118_COLUMN_OVERSCAN,
  RELEASE_118_COLUMN_THRESHOLD,
  RELEASE_118_COLUMN_WIDTH,
  RELEASE_118_DEMO_SOURCE,
  RELEASE_118_MAX_HEIGHT,
  RELEASE_118_NAME_WIDTH,
  RELEASE_118_PIVOT_ROWS,
  RELEASE_118_ROW_HEIGHT,
  RELEASE_118_ROW_SPAN,
  RELEASE_118_ROWS,
} from './Release118Demo.const';
import type { Release118Sale } from './Release118Demo.types';

const QUARTER_IDS = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8'] as const;

export const Release118Demo: FC = () => {
  const { t } = useI18n();
  const { openDemosIndex } = useDemoNavigation();
  const copy = t.release118Demo;
  const [rows, setRows] = useState<Release118Sale[]>(RELEASE_118_ROWS);
  const [saved, setSaved] = useState('');

  const columns = useMemo<ColumnDefinition<Release118Sale>[]>(() => [
    {
      id: 'region',
      accessor: 'region',
      header: 'Region',
      width: RELEASE_118_NAME_WIDTH,
      filterType: 'custom',
      renderFilter: ({ value, onValueChange }) => (
        <Input value={value} onChange={(event) => onValueChange(event.target.value)} aria-label="Region" />
      ),
    },
    { id: 'product', accessor: 'product', header: 'Product', width: RELEASE_118_NAME_WIDTH },
    { id: 'units', accessor: 'units', header: 'Units', width: RELEASE_118_COLUMN_WIDTH, editable: true },
    ...QUARTER_IDS.map((id) => ({
      id,
      accessor: id,
      header: id.toUpperCase(),
      width: RELEASE_118_COLUMN_WIDTH,
    })),
  ], []);

  const pivotColumns = useMemo<ColumnDefinition[]>(() => [
    { id: 'region', accessor: 'region', header: 'Region', width: RELEASE_118_NAME_WIDTH },
    { id: 'units', accessor: 'units', header: 'Units', width: RELEASE_118_COLUMN_WIDTH },
  ], []);

  return (
    <Layout>
      <div className="max-w-[1200px] mx-auto px-6 py-8">
        <Button variant="ghost" size="xs" leftIcon={<BearIcons.ArrowLeftIcon size="xs" />} onClick={openDemosIndex} className="mb-3">
          {t.common.demos}
        </Button>
        <Typography variant="h2" className="text-2xl font-bold mb-1">{copy.title}</Typography>
        <Typography variant="body2" className="opacity-50 mb-4">{copy.description}</Typography>
        <ul className="mb-4 opacity-70 text-sm list-disc pl-5">
          {copy.bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <Typography variant="body2" className="mb-3">{copy.savedValue}: {saved}</Typography>
        <GridTable
          data={rows}
          columns={columns}
          getRowId={(row) => row.id}
          enableRowSelection
          enableCellEdit
          bulkEdit={{ enabled: true }}
          columnGroups={[
            { id: 'place', label: 'Place', columnIds: ['region'] },
            { id: 'catalog', label: 'Catalog', columnIds: ['product'], parentId: 'book' },
            { id: 'amount', label: 'Amount', columnIds: ['units'], parentId: 'book' },
            { id: 'book', label: 'Book', columnIds: [] },
          ]}
          cellSpan={{
            getRowSpan: (row, columnId, rowIndex) => {
              if (columnId !== 'region') return undefined;
              const next = rows[rowIndex + 1];
              if (next && next.region === row.region) return RELEASE_118_ROW_SPAN;
              return undefined;
            },
          }}
          virtualize={{
            enabled: true,
            columnThreshold: RELEASE_118_COLUMN_THRESHOLD,
            columnOverscan: RELEASE_118_COLUMN_OVERSCAN,
            rowHeight: RELEASE_118_ROW_HEIGHT,
          }}
          dimensions={{ maxHeight: RELEASE_118_MAX_HEIGHT }}
          onCellEdit={(rowId, columnId, value) => {
            setSaved(String(value));
            setRows((current) => current.map((row) => (
              row.id === rowId ? { ...row, [columnId]: Number(value) } : row
            )));
          }}
        />
        <Typography variant="h3" className="text-xl font-semibold mt-8 mb-3">{copy.pivotTitle}</Typography>
        <GridTable
          data={RELEASE_118_ROWS}
          columns={columns}
          pivot={{
            enabled: true,
            rowFields: ['region'],
            columnFields: [],
            valueFields: [{ field: 'units', type: 'sum' }],
            onQuery: () => ({ rows: RELEASE_118_PIVOT_ROWS, columns: pivotColumns }),
          }}
        />
        <DemoCodeSection title={t.demoCodeTitles.release118} code={RELEASE_118_DEMO_SOURCE} />
      </div>
    </Layout>
  );
};
