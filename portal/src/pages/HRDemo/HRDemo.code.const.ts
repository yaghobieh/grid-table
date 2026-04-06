export const HR_DEMO_SOURCE = `import { GridTable } from '@forgedevstack/grid-table';
import type { ColumnDefinition } from '@forgedevstack/grid-table';

// This portal demo filters a flat employee list by expandedIds for custom org behaviour.
// For built-in nested rows, use treeData (see Features demo or /docs/tree-data).

type Employee = {
  id: number;
  name: string;
  title: string;
  department: string;
  salary: number;
  managerId: number | null;
  [key: string]: unknown;
};

const columns: ColumnDefinition<Employee>[] = [
  { id: 'name', accessor: 'name', header: 'Name', sortable: true, width: 200 },
  { id: 'title', accessor: 'title', header: 'Title', width: 200 },
  { id: 'salary', accessor: 'salary', header: 'Salary', sortable: true, align: 'right', render: (v: unknown) => \`$\${Number(v).toLocaleString()}\` },
];

export function HRTable({ visibleRows }: { visibleRows: Employee[] }) {
  return (
    <GridTable
      data={visibleRows}
      columns={columns}
      showPagination={false}
      showFilter
      showGlobalFilter
      stickyHeader
      themeMode="light"
      dimensions={{ maxHeight: 'calc(100vh - 260px)' }}
    />
  );
}`;
