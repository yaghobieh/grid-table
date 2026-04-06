export type StockRow = {
  id: number;
  symbol: string;
  sector: string;
  price: number;
  [key: string]: unknown;
};
