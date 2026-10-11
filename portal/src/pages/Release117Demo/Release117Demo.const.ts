export const RELEASE_117_PAGE_SIZES = [10, 25, 50] as const;

export const RELEASE_117_DEMO_SOURCE = `import { GridTable } from '@forgedevstack/grid-table';
import type { GridFeature } from '@forgedevstack/grid-table';

const selectedSalary: GridFeature<Staff> = {
  id: 'selected-salary',
  toolbar: ({ selectedRows }) => (
    <span>
      Selected salary{' '}
      {selectedRows.reduce((sum, row) => sum + row.salary, 0).toLocaleString()}
    </span>
  ),
};

<GridTable
  data={staff}
  columns={columns}
  locale="en"
  enableRowSelection
  showGlobalFilter
  enableColumnMenu
  columnToolPanel
  sortConfig={{ multiSort: true }}
  paginationConfig={{ initialPageSize: 10, pageSizeOptions: [10, 25, 50] }}
  features={[selectedSalary]}
  statusBar={{
    enabled: true,
    aggregations: [{ columnId: 'salary', type: 'sum', scope: 'selected', label: 'Selected salary' }],
  }}
/>`;
