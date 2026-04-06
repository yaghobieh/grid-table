import type { RowData } from '../types';
import { ONE } from '../constants';
import type { TableContextState, TableReducerAction } from './TableContext.types';
import { TABLE_ACTION } from './TableContext.constants';

export function tableReducer<T extends RowData>(
  state: TableContextState<T>,
  action: TableReducerAction<T>
): TableContextState<T> {
  switch (action.type) {
    case TABLE_ACTION.SET_DATA:
      return { ...state, data: action.payload, originalData: action.payload };
    case TABLE_ACTION.SET_LOADING:
      return { ...state, loading: action.payload };
    case TABLE_ACTION.SET_ERROR:
      return { ...state, error: action.payload };
    case TABLE_ACTION.SET_SORTING:
      return { ...state, sorting: action.payload };
    case TABLE_ACTION.SET_FILTERS:
      return { ...state, filters: action.payload };
    case TABLE_ACTION.SET_GLOBAL_FILTER:
      return { ...state, globalFilter: action.payload };
    case TABLE_ACTION.SET_PAGE:
      return { ...state, page: action.payload };
    case TABLE_ACTION.SET_PAGE_SIZE:
      return { ...state, pageSize: action.payload, page: ONE };
    case TABLE_ACTION.SET_SELECTED_IDS:
      return { ...state, selectedIds: action.payload };
    case TABLE_ACTION.SET_EXPANDED_IDS:
      return { ...state, expandedIds: action.payload };
    case TABLE_ACTION.SET_EXPANDED_CELL_IDS:
      return { ...state, expandedCellIds: action.payload };
    case TABLE_ACTION.SET_AUTO_SIZED_COLUMN_IDS:
      return { ...state, autoSizedColumnIds: action.payload };
    case TABLE_ACTION.SET_COLUMN_STATES:
      return { ...state, columnStates: action.payload };
    case TABLE_ACTION.SET_DRAGGING_COLUMN:
      return { ...state, draggingColumnId: action.payload };
    case TABLE_ACTION.SET_RESIZING_COLUMN:
      return { ...state, resizingColumnId: action.payload };
    case TABLE_ACTION.SET_ACTIVE_FILTER_COLUMN:
      return { ...state, activeFilterColumnId: action.payload };
    case TABLE_ACTION.SET_CURRENT_BREAKPOINT:
      return { ...state, currentBreakpoint: action.payload };
    case TABLE_ACTION.SET_MOBILE_DRAWER:
      return {
        ...state,
        showMobileDrawer: action.payload.show,
        mobileDrawerContent: action.payload.content,
      };
    case TABLE_ACTION.RESET:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
