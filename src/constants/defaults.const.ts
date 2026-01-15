import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZES, DEFAULT_COLUMN_WIDTH } from './numbers.const';
import { DEFAULT_MOBILE_BREAKPOINT } from './breakpoints.const';

export const DEFAULT_TRANSLATIONS = {
  empty: 'No data available',
  loading: 'Loading...',
  search: 'Search...',
  filter: 'Filter',
  sort: 'Sort',
  sortAsc: 'Sort ascending',
  sortDesc: 'Sort descending',
  clearSort: 'Clear sort',
  clearFilter: 'Clear filter',
  clearAll: 'Clear all',
  apply: 'Apply',
  cancel: 'Cancel',
  columns: 'Columns',
  showColumns: 'Show columns',
  hideColumn: 'Hide column',
  resetColumns: 'Reset columns',
  rowsPerPage: 'Rows per page',
  of: 'of',
  page: 'Page',
  first: 'First',
  previous: 'Previous',
  next: 'Next',
  last: 'Last',
  selected: 'selected',
  dragToReorder: 'Drag to reorder',
  noResults: 'No results found',
  errorLoading: 'Error loading data',
  retry: 'Retry',
} as const;

export const DEFAULT_THEME = {
  mode: 'dark' as const,
  colors: {
    background: {
      primary: '#1e1e1e',
      secondary: '#2b2b2b',
      tertiary: '#3c3c3c',
      hover: '#4e4e4e',
    },
    text: {
      primary: '#a9b7c6',
      secondary: '#808080',
      muted: '#606060',
    },
    border: {
      default: 'rgba(255, 255, 255, 0.08)',
      hover: 'rgba(255, 255, 255, 0.15)',
    },
    accent: {
      primary: '#1890ff',
      success: '#52c41a',
      warning: '#faad14',
      error: '#ff4d4f',
    },
  },
};

export const DEFAULT_LIGHT_THEME = {
  mode: 'light' as const,
  colors: {
    background: {
      primary: '#ffffff',
      secondary: '#f5f5f5',
      tertiary: '#ebebeb',
      hover: '#e0e0e0',
    },
    text: {
      primary: '#262626',
      secondary: '#595959',
      muted: '#8c8c8c',
    },
    border: {
      default: 'rgba(0, 0, 0, 0.06)',
      hover: 'rgba(0, 0, 0, 0.1)',
    },
    accent: {
      primary: '#1890ff',
      success: '#52c41a',
      warning: '#faad14',
      error: '#ff4d4f',
    },
  },
};

export const DEFAULT_TABLE_CONFIG = {
  pageSize: DEFAULT_PAGE_SIZE,
  pageSizes: DEFAULT_PAGE_SIZES,
  columnWidth: DEFAULT_COLUMN_WIDTH,
  mobileBreakpoint: DEFAULT_MOBILE_BREAKPOINT,
  stickyHeader: true,
  showPagination: true,
  showFilter: true,
  showSort: true,
  enableDragDrop: true,
  enableColumnResize: true,
  enableRowSelection: false,
  enableMultiSelect: false,
  showColumnToggle: true,
  showEmptyState: true,
  showSkeleton: true,
  skeletonRows: 5,
  virtualize: false,
  virtualizeThreshold: 100,
} as const;

