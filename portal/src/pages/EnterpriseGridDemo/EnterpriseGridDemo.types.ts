export type ExportScopeOption = 'all' | 'filtered' | 'sorted' | 'selected';

export interface EnterpriseRow {
  id: number;
  sku: string;
  region: string;
  status: string;
  qty: number;
  shipDate: string;
  notes: string;
  [key: string]: unknown;
}
