import { FC, useState } from 'react';
import { useNavigate } from '@forgedevstack/forge-compass/react';
import {
  Button,
  Typography,
  Flex,
  Badge,
  BearIcons,
} from '@forgedevstack/bear';
import { GridTable } from '@forgedevstack/grid-table';
import type { ColumnDefinition } from '@forgedevstack/grid-table';
import { Layout } from '@/components/Layout';
import { BASIC_DEMO_ROWS, DEMO_PAGE_SIZE, DEMO_PAGE_SIZES } from '@/constants/numbers.const';
import { useI18n } from '@/i18n';
import { ROLE_VARIANT, STATUS_COLORS, ROLE_OPTIONS, LOADING_SIMULATION_MS } from './BasicDemo.const';
import type { BasicUser } from './BasicDemo.types';

const TOTAL_ROW: BasicUser = {
  id: 999,
  name: 'TOTAL',
  email: '',
  role: 'admin',
  status: 'active',
  department: '',
  joinDate: '',
  salary: 0,
};

// ── Data ─────────────────────────────────────────────
const BASIC_DATA: BasicUser[] = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'admin', status: 'active', department: 'Engineering', joinDate: '2021-01-15', salary: 85000 },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'user', status: 'active', department: 'Design', joinDate: '2021-03-22', salary: 72000 },
  { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com', role: 'user', status: 'inactive', department: 'Marketing', joinDate: '2020-11-08', salary: 65000 },
  { id: 4, name: 'Alice Brown', email: 'alice.brown@example.com', role: 'admin', status: 'active', department: 'Engineering', joinDate: '2019-06-01', salary: 95000 },
  { id: 5, name: 'Charlie Wilson', email: 'charlie.wilson@example.com', role: 'guest', status: 'active', department: 'Sales', joinDate: '2022-02-14', salary: 55000 },
  { id: 6, name: 'Diana Miller', email: 'diana.miller@example.com', role: 'user', status: 'active', department: 'HR', joinDate: '2021-07-30', salary: 62000 },
  { id: 7, name: 'Edward Davis', email: 'edward.davis@example.com', role: 'user', status: 'inactive', department: 'Engineering', joinDate: '2020-04-12', salary: 78000 },
  { id: 8, name: 'Fiona Garcia', email: 'fiona.garcia@example.com', role: 'admin', status: 'active', department: 'Finance', joinDate: '2018-09-25', salary: 88000 },
  { id: 9, name: 'George Martinez', email: 'george.martinez@example.com', role: 'user', status: 'active', department: 'Engineering', joinDate: '2022-01-10', salary: 71000 },
  { id: 10, name: 'Hannah Lee', email: 'hannah.lee@example.com', role: 'user', status: 'active', department: 'Design', joinDate: '2021-11-05', salary: 69000 },
  { id: 11, name: 'Ivan Patel', email: 'ivan.patel@example.com', role: 'guest', status: 'inactive', department: 'Marketing', joinDate: '2023-03-18', salary: 52000 },
  { id: 12, name: 'Julia Chen', email: 'julia.chen@example.com', role: 'user', status: 'active', department: 'Engineering', joinDate: '2020-08-22', salary: 82000 },
];

// ── Render helpers ───────────────────────────────────
const RoleBadge: FC<{ role: string }> = ({ role }) => (
  <Badge variant={(ROLE_VARIANT[role] ?? 'secondary') as 'info'} className="text-xs">
    {role.toUpperCase()}
  </Badge>
);

const StatusDot: FC<{ status: string }> = ({ status }) => (
  <Flex align="center" gap={2}>
    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: STATUS_COLORS[status] ?? '#64748b' }} />
    <span>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
  </Flex>
);

// ── Columns ──────────────────────────────────────────
const columns: ColumnDefinition<BasicUser>[] = [
  { id: 'name', accessor: 'name', header: 'Name', sortable: true, filterable: true, width: 180, sticky: 'left' },
  { id: 'email', accessor: 'email', header: 'Email', sortable: true, filterable: true, width: 240 },
  { id: 'role', accessor: 'role', header: 'Role', sortable: true, filterable: true, filterType: 'select', filterOptions: [...ROLE_OPTIONS], width: 100, render: (val) => <RoleBadge role={String(val)} /> },
  { id: 'status', accessor: 'status', header: 'Status', sortable: true, filterable: true, width: 120, render: (val) => <StatusDot status={String(val)} /> },
  { id: 'department', accessor: 'department', header: 'Department', sortable: true, filterable: true, width: 130 },
  { id: 'joinDate', accessor: 'joinDate', header: 'Join Date', sortable: true, width: 120, render: (val) => new Date(String(val)).toLocaleDateString() },
  { id: 'salary', accessor: 'salary', header: 'Salary', sortable: true, align: 'right', width: 120, render: (val) => `$${Number(val).toLocaleString()}` },
];

export const BasicDemo: FC = () => {
  const { t } = useI18n();
  const { navigate } = useNavigate();
  const [loading, setLoading] = useState(false);

  const simulateLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), LOADING_SIMULATION_MS);
  };

  return (
    <Layout>
      <div className="max-w-[1600px] mx-auto px-6 py-8">
        <Flex align="center" justify="between" className="mb-6">
          <div>
            <Flex align="center" gap={3} className="mb-2">
              <Button variant="ghost" size="xs" leftIcon={<BearIcons.ArrowLeftIcon size="xs" />} onClick={() => navigate('/demos')}>{t.common.demos}</Button>
              <Badge variant="secondary">{t.demos.basic.title}</Badge>
              <Badge variant="secondary" className="text-xs">{BASIC_DEMO_ROWS} {t.basicDemo.rows}</Badge>
            </Flex>
            <Typography variant="h2" className="text-2xl font-bold">{t.basicDemo.title}</Typography>
            <Typography variant="body2" className="opacity-50">{t.basicDemo.description}</Typography>
          </div>
          <Flex gap={3}>
            <Button variant="gridGhost" size="sm" onClick={simulateLoading} leftIcon={<BearIcons.LoaderIcon size="xs" />}>{t.basicDemo.testLoading}</Button>
          </Flex>
        </Flex>

        <div className="dark">
          <GridTable
            data={BASIC_DATA}
            columns={columns}
            loading={loading}
            enableRowSelection enableDragDrop enableColumnResize
            showPagination showFilter showGlobalFilter stickyHeader
            tableEffects={{ hover: true, sort: true, row: true }}
            lazyLoad={{ enabled: true, initialRows: 10, batchSize: 5 }}
            themeMode="dark"
            paginationConfig={{ initialPageSize: DEMO_PAGE_SIZE, pageSizeOptions: [...DEMO_PAGE_SIZES] }}
            dimensions={{ maxHeight: 'calc(100vh - 260px)' }}
            onRowClick={(row, index) => console.log('Row clicked:', { row, index })}
            onRowSelect={(rows) => console.log('Selected:', rows)}
            enableExport={['csv', 'json', 'excel', 'pdf']}
            enableCopy
            enableCellEdit
            contextMenu={{ enabled: true, showCopy: true, showFilter: true, showPin: true, showHide: true }}
            statusBar={{
              enabled: true,
              showRowCount: true,
              showSelectedCount: true,
              showFilteredCount: true,
              aggregations: [
                { columnId: 'salary', type: 'sum', label: 'Total Salary', format: (v) => `$${v.toLocaleString()}` },
                { columnId: 'salary', type: 'avg', label: 'Avg Salary', format: (v) => `$${Math.round(v).toLocaleString()}` },
              ],
            }}
            keyboardNavigation={{ enabled: true, enableEditOnEnter: true }}
            undoRedo={{ enabled: true, maxHistory: 50 }}
            printConfig={{ enabled: true, title: 'Basic Demo Report' }}
            frozenRows={{ bottom: [{ ...TOTAL_ROW, salary: BASIC_DATA.reduce((s, r) => s + r.salary, 0) }] }}
          />
        </div>
      </div>
    </Layout>
  );
};
