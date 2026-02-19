import { FC, useState, useEffect, useRef, useCallback } from 'react';
import { Link } from '@forgedevstack/forge-compass/react';
import {
  Button,
  Typography,
  Flex,
  Badge,
  BearIcons,
} from '@forgedevstack/bear';
import { GridTable } from '@forgedevstack/grid-table';
import type { ColumnDefinition } from '@forgedevstack/grid-table';
import { Layout } from '@/components/Layout';
import { Sparkline } from '@/components/Sparkline';
import { generateFinanceData, updateFinanceData } from '@/data/finance.data';
import type { FinanceRow } from '@/data/finance.data';
import { LIVE_UPDATE_INTERVAL_MS } from '@/constants/numbers.const';
import { useI18n } from '@/i18n';
import { SECTOR_BADGE_VARIANT, SECTOR_OPTIONS, VOLUME_MILLION, VOLUME_THOUSAND } from './FinanceDemo.const';

const PriceChange: FC<{ value: number; percent: number }> = ({ value, percent }) => {
  const isPositive = value >= 0;
  return (
    <Flex align="center" gap={1}>
      <span style={{ color: isPositive ? '#22c55e' : '#ef4444', fontWeight: 600 }}>
        {isPositive ? '+' : ''}{value.toFixed(2)}
      </span>
      <span style={{ color: isPositive ? '#22c55e' : '#ef4444', fontSize: 11 }}>
        ({isPositive ? '+' : ''}{percent.toFixed(2)}%)
      </span>
    </Flex>
  );
};

const SectorBadge: FC<{ sector: string }> = ({ sector }) => (
  <Badge variant={(SECTOR_BADGE_VARIANT[sector] || 'secondary') as 'info'} className="text-xs">
    {sector}
  </Badge>
);

const columns: ColumnDefinition<FinanceRow>[] = [
  {
    id: 'ticker', accessor: 'ticker', header: 'Ticker', sortable: true, filterable: true, width: 90, sticky: 'left',
    render: (val) => <span className="font-mono font-bold" style={{ color: 'var(--grid-accent)' }}>{String(val)}</span>,
  },
  { id: 'company', accessor: 'company', header: 'Company', sortable: true, filterable: true, width: 200 },
  {
    id: 'sector', accessor: 'sector', header: 'Sector', sortable: true, filterable: true,
    filterType: 'select', filterOptions: [...SECTOR_OPTIONS], width: 130,
    render: (val) => <SectorBadge sector={String(val)} />,
  },
  {
    id: 'price', accessor: 'price', header: 'Price', sortable: true, align: 'right', width: 110,
    render: (val) => <span className="font-mono font-semibold">${Number(val).toFixed(2)}</span>,
  },
  {
    id: 'change', accessor: 'change', header: 'Change', sortable: true, align: 'right', width: 160,
    render: (val, row) => <PriceChange value={Number(val)} percent={(row as FinanceRow).changePercent} />,
  },
  {
    id: 'sparkline', accessor: 'sparkline', header: 'Trend (20pts)', width: 120,
    render: (val) => <Sparkline data={val as number[]} width={100} height={28} />,
  },
  {
    id: 'volume', accessor: 'volume', header: 'Volume', sortable: true, align: 'right', width: 120,
    render: (val) => {
      const v = Number(val);
      if (v >= VOLUME_MILLION) return `${(v / VOLUME_MILLION).toFixed(1)}M`;
      if (v >= VOLUME_THOUSAND) return `${(v / VOLUME_THOUSAND).toFixed(0)}K`;
      return String(v);
    },
  },
  {
    id: 'pe', accessor: 'pe', header: 'P/E', sortable: true, align: 'right', width: 80,
    render: (val) => {
      const pe = Number(val);
      return <span style={{ color: pe < 0 ? '#ef4444' : pe > 50 ? '#eab308' : 'inherit' }}>{pe.toFixed(1)}</span>;
    },
  },
  { id: 'high52', accessor: 'high52', header: '52W High', sortable: true, align: 'right', width: 100, render: (val) => <span className="font-mono text-xs">${Number(val).toFixed(2)}</span> },
  { id: 'low52', accessor: 'low52', header: '52W Low', sortable: true, align: 'right', width: 100, render: (val) => <span className="font-mono text-xs">${Number(val).toFixed(2)}</span> },
];

export const FinanceDemo: FC = () => {
  const { t } = useI18n();
  const [data, setData] = useState<FinanceRow[]>(() => generateFinanceData());
  const [isLive, setIsLive] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startLive = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setData((prev) => updateFinanceData(prev));
    }, LIVE_UPDATE_INTERVAL_MS);
  }, []);

  useEffect(() => {
    if (isLive) startLive();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isLive, startLive]);

  return (
    <Layout>
      <div className="max-w-[1600px] mx-auto px-6 py-8">
        <Flex align="center" justify="between" className="mb-6">
          <div>
            <Flex align="center" gap={3} className="mb-2">
              <Link to="/demos">
                <Button variant="ghost" size="xs" leftIcon={<BearIcons.ArrowLeftIcon size="xs" />}>{t.common.demos}</Button>
              </Link>
              <Badge variant="success">{t.demos.finance.title}</Badge>
              {isLive && <Badge variant="error" className="animate-pulse text-xs">● {t.financeDemo.live}</Badge>}
            </Flex>
            <Typography variant="h2" className="text-2xl font-bold">{t.financeDemo.title}</Typography>
            <Typography variant="body2" className="opacity-50">{t.financeDemo.description}</Typography>
          </div>
          <Flex gap={3}>
            <Button
              variant={isLive ? 'error' : 'grid'}
              size="sm"
              onClick={() => setIsLive((v) => !v)}
              leftIcon={isLive ? <BearIcons.PauseIcon size="xs" /> : <BearIcons.PlayIcon size="xs" />}
            >
              {isLive ? t.financeDemo.pause : t.financeDemo.resume}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setData(generateFinanceData())} leftIcon={<BearIcons.RefreshIcon size="xs" />}>
              {t.financeDemo.refresh}
            </Button>
          </Flex>
        </Flex>

        <div className="dark">
          <GridTable
            data={data}
            columns={columns}
            enableRowSelection
            enableDragDrop
            enableColumnResize
            showPagination
            showFilter
            showGlobalFilter
            stickyHeader
            tableEffects={{ hover: true, sort: true, row: true }}
            themeMode="dark"
            paginationConfig={{ initialPageSize: 20, pageSizeOptions: [10, 20, 50] }}
            dimensions={{ maxHeight: 'calc(100vh - 260px)' }}
          />
        </div>
      </div>
    </Layout>
  );
};
