import type { FC, ReactNode } from 'react';
import { useMemo, useState } from 'react';
import { Button, Flex, Typography, BearIcons } from '@forgedevstack/bear';
import { GridTable } from '@forgedevstack/grid-table';
import type { GridFeature, GridLocaleId } from '@forgedevstack/grid-table';
import { Layout } from '@/components/Layout';
import { DemoCodeSection } from '@/components/DemoCodeSection';
import { useDemoNavigation } from '@/hooks';
import { useI18n } from '@/i18n';
import { STAFF_OFFICE_COLOR, STAFF_ROWS, type StaffMember } from '@/data/staff.data';
import { STAFF_LOCALE_IDS } from '@/pages/Home/helpers/StaffHero/StaffHero.const';
import { RELEASE_117_DEMO_SOURCE, RELEASE_117_PAGE_SIZES } from './Release117Demo.const';

export const Release117Demo: FC = () => {
  const { t } = useI18n();
  const { openDemosIndex } = useDemoNavigation();
  const copy = t.release117Demo;
  const [locale, setLocale] = useState<GridLocaleId>('en');
  const [pageSize, setPageSize] = useState<number>(RELEASE_117_PAGE_SIZES[0]);
  const [toolPanel, setToolPanel] = useState(true);

  const feature = useMemo<GridFeature<StaffMember>>(() => ({
    id: 'selected-salary',
    toolbar: ({ selectedRows }) => (
      <span>
        {copy.selectedSum}{' '}
        {selectedRows.reduce((sum, row) => sum + row.salary, 0).toLocaleString()}
      </span>
    ),
  }), [copy.selectedSum]);

  const columns = useMemo(() => [
    { id: 'name', accessor: 'name', header: 'Name', width: 180, responsivePriority: 1 },
    { id: 'position', accessor: 'position', header: 'Position', width: 200, responsivePriority: 4 },
    {
      id: 'office',
      accessor: 'office',
      header: 'Office',
      width: 140,
      responsivePriority: 2,
      render: (value: unknown): ReactNode => (
        <span className="staff-pill" style={{ background: STAFF_OFFICE_COLOR[String(value)] ?? '#94a3b8' }}>
          {String(value)}
        </span>
      ),
    },
    { id: 'salary', accessor: 'salary', header: 'Salary', width: 110, responsivePriority: 1 },
    { id: 'trend', accessor: 'trend', header: 'Trend', width: 120, sparkline: true, responsivePriority: 3 },
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
        <Flex align="center" gap={3} wrap="wrap" className="staff-hero-lang mb-3">
          <span>{t.home.staff.language}</span>
          {STAFF_LOCALE_IDS.map((id) => (
            <button key={id} type="button" aria-pressed={locale === id} onClick={() => setLocale(id)}>
              {id}
            </button>
          ))}
          <span>{t.home.staff.paging}</span>
          {RELEASE_117_PAGE_SIZES.map((size) => (
            <button key={size} type="button" aria-pressed={pageSize === size} onClick={() => setPageSize(size)}>
              {size}
            </button>
          ))}
          <button type="button" aria-pressed={toolPanel} onClick={() => setToolPanel((open) => !open)}>
            {copy.toolPanel}
          </button>
        </Flex>
        <GridTable<StaffMember>
          key={`${locale}-${pageSize}-${toolPanel}`}
          data={STAFF_ROWS}
          columns={columns}
          themeMode="dark"
          locale={locale}
          enableRowSelection
          showGlobalFilter
          enableColumnMenu
          responsive
          columnToolPanel={toolPanel}
          sortConfig={{ multiSort: true }}
          paginationConfig={{ initialPageSize: pageSize, pageSizeOptions: RELEASE_117_PAGE_SIZES }}
          features={[feature]}
          statusBar={{
            enabled: true,
            showSelectedCount: true,
            aggregations: [{ columnId: 'salary', type: 'sum', scope: 'selected', label: copy.selectedSum }],
          }}
        />
        <DemoCodeSection title={t.demoCodeTitles.release117} code={RELEASE_117_DEMO_SOURCE} />
      </div>
    </Layout>
  );
};
