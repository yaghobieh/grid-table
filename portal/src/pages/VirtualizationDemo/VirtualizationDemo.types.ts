export type LogRow = {
  id: number;
  level: string;
  message: string;
  ms: number;
  [key: string]: unknown;
};
