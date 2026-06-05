import type { TableViewSnapshot } from '@/types';
import type { ColumnState } from '@/types/column.types';
import type { FilterValue } from '@/types/filter.types';
import type { SortValue } from '@/types/sort.types';

export interface CaptureTableViewSnapshotParams {
  sorting: SortValue[];
  filters: FilterValue[];
  globalFilter: string;
  columnStates: ColumnState[];
  page: number;
  pageSize: number;
  density?: TableViewSnapshot['density'];
  advancedFilter?: TableViewSnapshot['advancedFilter'];
}
