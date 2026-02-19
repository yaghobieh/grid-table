export interface PlaygroundRow {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  status: string;
  salary: number;
  [key: string]: unknown;
}

export interface PlaygroundConfig {
  enableRowSelection: boolean;
  enableDragDrop: boolean;
  enableColumnResize: boolean;
  showPagination: boolean;
  showFilter: boolean;
  showGlobalFilter: boolean;
  stickyHeader: boolean;
  enableExport: boolean;
  enableCellEdit: boolean;
  themeMode: 'dark' | 'light';
  effects: {
    hover: boolean;
    sort: boolean;
    row: boolean;
  };
}
