import { useCallback, useEffect, useRef, useState } from 'react';
import type { RowData } from '@/types';
import type { InfiniteScrollConfig } from '@/types/features.types';
import { DEFAULT_INFINITE_BLOCK_SIZE, INFINITE_SCROLL_THRESHOLD_PX } from '@constants/infiniteScroll.const';
import { ZERO } from '@constants/numbers.const';

export interface UseInfiniteScrollReturn<T extends RowData> {
  rows: T[];
  loading: boolean;
  hasMore: boolean;
  handleScroll: (scrollTop: number, scrollHeight: number, clientHeight: number) => void;
  reset: () => void;
}

export function useInfiniteScroll<T extends RowData>(
  config: InfiniteScrollConfig<T> | undefined,
  initialRows: T[],
): UseInfiniteScrollReturn<T> {
  const [rows, setRows] = useState<T[]>(initialRows);
  const [loading, setLoading] = useState(false);
  const [loadedCount, setLoadedCount] = useState(initialRows.length);
  const loadingRef = useRef(false);

  const blockSize = config?.blockSize ?? DEFAULT_INFINITE_BLOCK_SIZE;
  const total = config?.totalRowCount ?? initialRows.length;
  const enabled = config?.enabled ?? false;
  const hasMore = enabled && loadedCount < total;

  const loadNextBlock = useCallback(async () => {
    if (!enabled || !config?.onLoadBlock || loadingRef.current || loadedCount >= total) return;
    loadingRef.current = true;
    setLoading(true);
    try {
      const start = loadedCount;
      const end = Math.min(start + blockSize, total);
      const block = await config.onLoadBlock(start, end);
      setRows((prev) => [...prev, ...block]);
      setLoadedCount(end);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, [enabled, config, loadedCount, total, blockSize]);

  const handleScroll = useCallback(
    (scrollTop: number, scrollHeight: number, clientHeight: number) => {
      if (!enabled) return;
      const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);
      if (distanceFromBottom <= INFINITE_SCROLL_THRESHOLD_PX) {
        void loadNextBlock();
      }
    },
    [enabled, loadNextBlock],
  );

  const reset = useCallback(() => {
    setRows(initialRows);
    setLoadedCount(initialRows.length);
    loadingRef.current = false;
    setLoading(false);
  }, [initialRows]);

  useEffect(() => {
    if (!enabled) {
      setRows(initialRows);
      setLoadedCount(initialRows.length);
    }
  }, [enabled, initialRows]);

  return { rows, loading, hasMore, handleScroll, reset };
}
