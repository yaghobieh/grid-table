export const BASIC_DEMO_SOURCE = `import { GridTable } from '@forgedevstack/grid-table';
import type { ColumnDefinition } from '@forgedevstack/grid-table';

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  department: string;
  joinDate: string;
  salary: number;
  [key: string]: unknown;
};

const columns: ColumnDefinition<User>[] = [
  { id: 'name', accessor: 'name', header: 'Name', sortable: true, filterable: true, width: 180, sticky: 'left' },
  { id: 'email', accessor: 'email', header: 'Email', sortable: true, filterable: true, width: 240 },
  { id: 'salary', accessor: 'salary', header: 'Salary', sortable: true, align: 'right', width: 120, render: (v: unknown) => \`$\${Number(v).toLocaleString()}\` },
];

export function BasicTable({ data }: { data: User[] }) {
  return (
    <GridTable
      data={data}
      columns={columns}
      enableRowSelection
      enableMultiSelect
      showPagination
      showFilter
      showGlobalFilter
      enableExport="csv"
      contextMenu={{ enabled: true }}
      statusBar={{ enabled: true, showRowCount: true, showSelectedCount: true }}
      paginationConfig={{ initialPageSize: 5, pageSizeOptions: [5, 10, 20] }}
      tableEffects={{ hover: true, sort: true, row: true }}
      themeMode="light"
      mobileBreakpoint="tablet"
      mobileLayout="stacked"
      stickyHeader
    />
  );
}`;
