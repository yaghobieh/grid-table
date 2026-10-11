import type { FC, ReactNode } from 'react';
import { useMemo, useState } from 'react';
import { GridTable } from '@forgedevstack/grid-table';
import type { GridLocaleId } from '@forgedevstack/grid-table';
import { useI18n } from '@/i18n';
import { STAFF_OFFICE_COLOR, STAFF_PAGE_SIZE, STAFF_ROWS, type StaffMember } from '@/data/staff.data';
import { STAFF_HERO_CLASS, STAFF_LOCALE_IDS } from './StaffHero.const';
import { StaffCallout } from './StaffCallout';

function initials(name: string): string {
  return name.split(' ').slice(0, 2).map((part) => part[0]).join('');
}

function money(value: number): string {
  return `$${value.toLocaleString()}`;
}

export const StaffHero: FC = () => {
  const { t } = useI18n();
  const [locale, setLocale] = useState<GridLocaleId>('en');
  const columns = useMemo(() => [
    {
      id: 'name',
      accessor: 'name',
      header: 'Name',
      width: 220,
      render: (_value: unknown, row: Record<string, unknown>): ReactNode => (
        <span className="staff-person">
          <span className="staff-avatar" aria-hidden>{initials(String(row.name))}</span>
          {String(row.name)}
        </span>
      ),
    },
    { id: 'position', accessor: 'position', header: 'Position', width: 240 },
    {
      id: 'office',
      accessor: 'office',
      header: 'Office',
      width: 150,
      render: (value: unknown): ReactNode => (
        <span className="staff-pill" style={{ background: STAFF_OFFICE_COLOR[String(value)] ?? '#94a3b8' }}>
          {String(value)}
        </span>
      ),
    },
    {
      id: 'extension',
      accessor: 'extension',
      header: 'Extn.',
      width: 90,
      render: (value: unknown): ReactNode => <span className="staff-ext">{String(value)}</span>,
    },
    { id: 'startDate', accessor: 'startDate', header: 'Start date', width: 120 },
    {
      id: 'salary',
      accessor: 'salary',
      header: 'Salary',
      width: 120,
      render: (value: unknown): ReactNode => money(Number(value)),
    },
  ], []);
  const callouts = [
    t.home.staff.i18n,
    t.home.staff.renderers,
    t.home.staff.paging,
    t.home.staff.multiSort,
    t.home.staff.selection,
    t.home.staff.search,
  ];

  return (
    <div className={STAFF_HERO_CLASS}>
      <div className="staff-hero-lang">
        <span>{t.home.staff.language}</span>
        {STAFF_LOCALE_IDS.map((id) => (
          <button key={id} type="button" aria-pressed={locale === id} onClick={() => setLocale(id)}>
            {id}
          </button>
        ))}
      </div>
      <GridTable<StaffMember>
        data={STAFF_ROWS}
        columns={columns}
        themeMode="dark"
        enableRowSelection
        showGlobalFilter
        showColumnToggle
        enableColumnMenu
        showFilterChips
        locale={locale}
        sortConfig={{ multiSort: true }}
        paginationConfig={{ initialPageSize: STAFF_PAGE_SIZE, pageSizeOptions: [10, 25, 50] }}
      />
      <div className="staff-callouts">
        {callouts.map((label) => (
          <StaffCallout key={label} label={label} />
        ))}
      </div>
    </div>
  );
};
