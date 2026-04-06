export type GroupedMetricRow = {
  id: number;
  product: string;
  channel: string;
  revenue: number;
  growth: number;
  [key: string]: unknown;
};
