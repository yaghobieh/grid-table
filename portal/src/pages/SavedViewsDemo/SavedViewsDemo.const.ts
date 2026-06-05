import type { SavedViewDefinition } from '@forgedevstack/grid-table';
import { EMPTY_STRING } from '@/constants/strings.const';

export const SAVED_VIEWS_ACTIVE_VIEW_ID = 'all';

export const SAVED_VIEWS_DEMO_DATA = [
  { id: 1, name: 'Acme Inc', status: 'Active', priority: 'High', owner: 'Alice' },
  { id: 2, name: 'Blue Labs', status: 'Pending', priority: 'Medium', owner: 'Bob' },
  { id: 3, name: 'Core Media', status: 'Active', priority: 'Low', owner: 'Diana' },
  { id: 4, name: 'Delta Ads', status: 'Paused', priority: 'High', owner: 'Eli' },
];

export const SAVED_VIEWS_DEMO_COLUMNS = [
  { id: 'name', accessor: 'name', header: 'Account', sortable: true },
  { id: 'status', accessor: 'status', header: 'Status', sortable: true, filterable: true },
  { id: 'priority', accessor: 'priority', header: 'Priority', sortable: true, filterable: true },
  { id: 'owner', accessor: 'owner', header: 'Owner', sortable: true, filterable: true },
];

export const SAVED_VIEWS_DEMO_VIEWS: SavedViewDefinition[] = [
  {
    id: 'all',
    label: 'All',
    snapshot: {
      sorting: [],
      filters: [],
      globalFilter: EMPTY_STRING,
      hiddenColumnIds: [],
      columnWidths: {},
      page: 1,
      pageSize: 10,
      density: 'comfortable',
      advancedFilter: null,
    },
  },
  {
    id: 'active',
    label: 'Active View',
    snapshot: {
      sorting: [{ columnId: 'status', direction: 'asc' }],
      filters: [{ columnId: 'status', value: 'Active', operator: 'equals' }],
      globalFilter: EMPTY_STRING,
      hiddenColumnIds: [],
      columnWidths: {},
      page: 1,
      pageSize: 10,
      density: 'comfortable',
      advancedFilter: null,
    },
  },
  {
    id: 'priority-high',
    label: 'High Priority',
    snapshot: {
      sorting: [{ columnId: 'priority', direction: 'desc' }],
      filters: [{ columnId: 'priority', value: 'High', operator: 'equals' }],
      globalFilter: EMPTY_STRING,
      hiddenColumnIds: ['owner'],
      columnWidths: {},
      page: 1,
      pageSize: 10,
      density: 'compact',
      advancedFilter: null,
    },
  },
];
