export type OrderLine = { sku: string; qty: number; price: number };

export type OrderRow = {
  id: number;
  customer: string;
  region: string;
  total: number;
  lines: OrderLine[];
  [key: string]: unknown;
};
