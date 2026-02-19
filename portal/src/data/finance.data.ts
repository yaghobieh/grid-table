export interface FinanceRow {
  id: number;
  ticker: string;
  company: string;
  sector: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  pe: number;
  high52: number;
  low52: number;
  sparkline: number[];
  [key: string]: unknown;
}

const TICKERS = [
  { ticker: 'AAPL', company: 'Apple Inc.', sector: 'Technology', price: 227.63, pe: 37.2, high52: 260.10, low52: 164.08 },
  { ticker: 'MSFT', company: 'Microsoft Corp.', sector: 'Technology', price: 415.20, pe: 35.8, high52: 468.35, low52: 309.45 },
  { ticker: 'GOOGL', company: 'Alphabet Inc.', sector: 'Technology', price: 175.98, pe: 24.5, high52: 201.42, low52: 130.67 },
  { ticker: 'AMZN', company: 'Amazon.com Inc.', sector: 'Consumer', price: 205.74, pe: 62.1, high52: 242.52, low52: 144.05 },
  { ticker: 'NVDA', company: 'NVIDIA Corp.', sector: 'Technology', price: 875.28, pe: 65.3, high52: 974.94, low52: 473.20 },
  { ticker: 'META', company: 'Meta Platforms', sector: 'Technology', price: 512.60, pe: 28.6, high52: 602.95, low52: 341.71 },
  { ticker: 'TSLA', company: 'Tesla Inc.', sector: 'Automotive', price: 248.42, pe: 68.4, high52: 299.29, low52: 138.80 },
  { ticker: 'BRK.B', company: 'Berkshire Hathaway', sector: 'Finance', price: 458.91, pe: 9.2, high52: 491.67, low52: 344.16 },
  { ticker: 'JPM', company: 'JPMorgan Chase', sector: 'Finance', price: 218.83, pe: 12.1, high52: 234.78, low52: 164.39 },
  { ticker: 'V', company: 'Visa Inc.', sector: 'Finance', price: 290.45, pe: 31.5, high52: 315.24, low52: 252.70 },
  { ticker: 'JNJ', company: 'Johnson & Johnson', sector: 'Healthcare', price: 158.72, pe: 19.8, high52: 175.97, low52: 144.95 },
  { ticker: 'WMT', company: 'Walmart Inc.', sector: 'Consumer', price: 178.36, pe: 27.4, high52: 195.68, low52: 150.23 },
  { ticker: 'PG', company: 'Procter & Gamble', sector: 'Consumer', price: 170.14, pe: 26.2, high52: 182.43, low52: 147.88 },
  { ticker: 'MA', company: 'Mastercard Inc.', sector: 'Finance', price: 472.31, pe: 35.9, high52: 510.04, low52: 388.57 },
  { ticker: 'HD', company: 'Home Depot', sector: 'Consumer', price: 381.67, pe: 24.1, high52: 412.55, low52: 305.84 },
  { ticker: 'XOM', company: 'Exxon Mobil', sector: 'Energy', price: 115.28, pe: 13.7, high52: 126.34, low52: 95.77 },
  { ticker: 'DIS', company: 'Walt Disney', sector: 'Entertainment', price: 112.45, pe: 72.3, high52: 123.74, low52: 84.07 },
  { ticker: 'NFLX', company: 'Netflix Inc.', sector: 'Entertainment', price: 628.97, pe: 45.6, high52: 700.99, low52: 414.48 },
  { ticker: 'CRM', company: 'Salesforce Inc.', sector: 'Technology', price: 278.94, pe: 42.8, high52: 318.72, low52: 212.00 },
  { ticker: 'INTC', company: 'Intel Corp.', sector: 'Technology', price: 44.12, pe: 108.0, high52: 51.28, low52: 26.86 },
  { ticker: 'AMD', company: 'AMD Inc.', sector: 'Technology', price: 178.45, pe: 44.7, high52: 227.30, low52: 108.40 },
  { ticker: 'PYPL', company: 'PayPal Holdings', sector: 'Finance', price: 67.82, pe: 17.9, high52: 78.42, low52: 55.77 },
  { ticker: 'BABA', company: 'Alibaba Group', sector: 'Technology', price: 84.93, pe: 9.8, high52: 102.50, low52: 66.63 },
  { ticker: 'BA', company: 'Boeing Co.', sector: 'Industrial', price: 195.34, pe: -22.0, high52: 267.54, low52: 170.12 },
  { ticker: 'COST', company: 'Costco Wholesale', sector: 'Consumer', price: 738.52, pe: 48.6, high52: 787.08, low52: 560.16 },
  { ticker: 'NKE', company: 'Nike Inc.', sector: 'Consumer', price: 98.72, pe: 28.3, high52: 123.39, low52: 88.66 },
  { ticker: 'UBER', company: 'Uber Technologies', sector: 'Technology', price: 76.84, pe: 125.0, high52: 87.00, low52: 54.84 },
  { ticker: 'SQ', company: 'Block Inc.', sector: 'Finance', price: 82.45, pe: 53.4, high52: 92.72, low52: 55.43 },
  { ticker: 'SNAP', company: 'Snap Inc.', sector: 'Technology', price: 16.42, pe: -48.0, high52: 21.86, low52: 8.28 },
  { ticker: 'SHOP', company: 'Shopify Inc.', sector: 'Technology', price: 95.68, pe: 78.2, high52: 106.80, low52: 50.30 },
  { ticker: 'SPOT', company: 'Spotify Technology', sector: 'Entertainment', price: 295.42, pe: 92.0, high52: 340.00, low52: 173.50 },
  { ticker: 'PLTR', company: 'Palantir Technologies', sector: 'Technology', price: 24.76, pe: 210.0, high52: 27.50, low52: 13.68 },
  { ticker: 'COIN', company: 'Coinbase Global', sector: 'Finance', price: 178.34, pe: 28.0, high52: 283.48, low52: 114.51 },
  { ticker: 'ABNB', company: 'Airbnb Inc.', sector: 'Consumer', price: 158.92, pe: 19.5, high52: 170.00, low52: 113.01 },
  { ticker: 'ZM', company: 'Zoom Video', sector: 'Technology', price: 68.34, pe: 24.6, high52: 74.56, low52: 55.06 },
  { ticker: 'RIVN', company: 'Rivian Automotive', sector: 'Automotive', price: 18.56, pe: -5.2, high52: 28.06, low52: 8.26 },
  { ticker: 'LCID', company: 'Lucid Group', sector: 'Automotive', price: 4.82, pe: -2.8, high52: 8.37, low52: 2.29 },
  { ticker: 'SOFI', company: 'SoFi Technologies', sector: 'Finance', price: 9.74, pe: -42.0, high52: 11.51, low52: 6.01 },
  { ticker: 'RBLX', company: 'Roblox Corp.', sector: 'Entertainment', price: 42.86, pe: -32.0, high52: 50.34, low52: 25.01 },
  { ticker: 'NET', company: 'Cloudflare Inc.', sector: 'Technology', price: 92.18, pe: -250.0, high52: 120.17, low52: 58.89 },
  { ticker: 'DDOG', company: 'Datadog Inc.', sector: 'Technology', price: 128.73, pe: 290.0, high52: 142.41, low52: 92.49 },
  { ticker: 'SNOW', company: 'Snowflake Inc.', sector: 'Technology', price: 172.58, pe: -85.0, high52: 237.72, low52: 107.13 },
  { ticker: 'MDB', company: 'MongoDB Inc.', sector: 'Technology', price: 398.62, pe: -120.0, high52: 509.00, low52: 212.74 },
  { ticker: 'CRWD', company: 'CrowdStrike Holdings', sector: 'Technology', price: 312.45, pe: -380.0, high52: 366.00, low52: 200.81 },
  { ticker: 'PANW', company: 'Palo Alto Networks', sector: 'Technology', price: 318.94, pe: 48.0, high52: 380.84, low52: 235.56 },
  { ticker: 'ZS', company: 'Zscaler Inc.', sector: 'Technology', price: 232.78, pe: -290.0, high52: 271.28, low52: 155.42 },
  { ticker: 'OKTA', company: 'Okta Inc.', sector: 'Technology', price: 104.56, pe: -62.0, high52: 115.73, low52: 65.74 },
  { ticker: 'TTD', company: 'The Trade Desk', sector: 'Technology', price: 88.64, pe: 170.0, high52: 104.82, low52: 58.08 },
  { ticker: 'ROKU', company: 'Roku Inc.', sector: 'Entertainment', price: 72.38, pe: -28.0, high52: 107.81, low52: 44.33 },
  { ticker: 'SE', company: 'Sea Limited', sector: 'Technology', price: 42.65, pe: -18.0, high52: 58.30, low52: 33.50 },
];

function generateSparkline(basePrice: number): number[] {
  const points: number[] = [];
  let p = basePrice;
  for (let i = 0; i < 20; i++) {
    p += (Math.random() - 0.5) * basePrice * 0.02;
    points.push(Number(p.toFixed(2)));
  }
  return points;
}

export function generateFinanceData(): FinanceRow[] {
  return TICKERS.map((t, index) => {
    const change = (Math.random() - 0.45) * t.price * 0.04;
    const vol = Math.floor(Math.random() * 80_000_000) + 1_000_000;
    return {
      id: index + 1,
      ticker: t.ticker,
      company: t.company,
      sector: t.sector,
      price: Number((t.price + change).toFixed(2)),
      change: Number(change.toFixed(2)),
      changePercent: Number(((change / t.price) * 100).toFixed(2)),
      volume: vol,
      marketCap: Number((t.price * vol * (Math.random() * 20 + 5)).toFixed(0)),
      pe: t.pe,
      high52: t.high52,
      low52: t.low52,
      sparkline: generateSparkline(t.price),
    };
  });
}

/** Mutate a subset of rows to simulate live updates */
export function updateFinanceData(data: FinanceRow[]): FinanceRow[] {
  return data.map((row) => {
    if (Math.random() > 0.35) return row;
    const delta = (Math.random() - 0.48) * row.price * 0.015;
    const newPrice = Number((row.price + delta).toFixed(2));
    const newSparkline = [...row.sparkline.slice(1), newPrice];
    return {
      ...row,
      price: newPrice,
      change: Number(delta.toFixed(2)),
      changePercent: Number(((delta / row.price) * 100).toFixed(2)),
      volume: row.volume + Math.floor(Math.random() * 500_000),
      sparkline: newSparkline,
    };
  });
}
