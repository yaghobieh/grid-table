import type { ColumnDefinition } from '@forgedevstack/grid-table';
import type { DemoUser } from './AccessibilityDemo.types';

export const ACCESSIBILITY_DEMO_DATA: DemoUser[] = [
  { id: 1, name: 'Ada Lovelace', email: 'ada@example.com', role: 'Analyst' },
  { id: 2, name: 'Alan Turing', email: 'alan@example.com', role: 'Engineer' },
  { id: 3, name: 'Grace Hopper', email: 'grace@example.com', role: 'Lead' },
];

export const ACCESSIBILITY_DEMO_COLUMNS: ColumnDefinition<DemoUser>[] = [
  { id: 'name', accessor: 'name', header: 'Name', sortable: true, width: 160 },
  { id: 'email', accessor: 'email', header: 'Email', sortable: true, width: 220 },
  { id: 'role', accessor: 'role', header: 'Role', width: 120 },
];

export const ACCESSIBILITY_DEMO_SOURCE = `import { GridTable } from '@forgedevstack/grid-table';
import type { ColumnDefinition } from '@forgedevstack/grid-table';

type User = { id: number; name: string; email: string; role: string; [key: string]: unknown };

const columns: ColumnDefinition<User>[] = [
  { id: 'name', accessor: 'name', header: 'Name', sortable: true, width: 160 },
  { id: 'email', accessor: 'email', header: 'Email', sortable: true, width: 220 },
  { id: 'role', accessor: 'role', header: 'Role', width: 120 },
];

const data: User[] = [
  { id: 1, name: 'Ada Lovelace', email: 'ada@example.com', role: 'Analyst' },
];

export function AccessibleGrid() {
  return (
    <GridTable
      data={data}
      columns={columns}
      themeMode="light"
      stickyHeader
      showPagination={false}
      keyboardNavigation={{ enabled: true, enableEditOnEnter: true }}
      enableCellEdit
      onCellEdit={(rowId, columnId, value) => {
        console.info('cell save', rowId, columnId, value);
      }}
    />
  );
}`;
