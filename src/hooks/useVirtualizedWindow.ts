import { useCallback, useEffect, useMemo, useState } from 'react';
import { DEFAULT_VIRTUALIZE_OVERSCAN, DEFAULT_VIRTUALIZE_ROW_HEIGHT, ONE, ZERO } from '@constants/numbers.const';
import { VIRTUALIZED_PASSIVE_LISTENER, VIRTUALIZED_SCROLL_EVENT } from './useVirtualizedWindow.const';
import type { UseVirtualizedWindowParams, UseVirtualizedWindowReturn } from './useVirtualizedWindow.types';

export function useVirtualizedWindow(params: UseVirtualizedWindowParams): UseVirtualizedWindowReturn {
  const {
    itemCount,
    enabled,
    rowHeight = DEFAULT_VIRTUALIZE_ROW_HEIGHT,
    overscan = DEFAULT_VIRTUALIZE_OVERSCAN,
  } = params;

  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [scrollTop, setScrollTop] = useState(ZERO);

  const scrollRef = useCallback((node: HTMLDivElement | null) => {
    setContainer(node);
  }, []);

  const onScroll = useCallback(() => {
    if (!container) return;
    setScrollTop(container.scrollTop);
  }, [container]);

  useEffect(() => {
    if (!container || !enabled) return;
    container.addEventListener(VIRTUALIZED_SCROLL_EVENT, onScroll, VIRTUALIZED_PASSIVE_LISTENER);
    return () => container.removeEventListener(VIRTUALIZED_SCROLL_EVENT, onScroll);
  }, [container, enabled, onScroll]);

  return useMemo(() => {
    const lastIndex = Math.max(itemCount - ONE, ZERO);

    if (!enabled || itemCount === ZERO) {
      return {
        scrollRef,
        startIndex: ZERO,
        endIndex: lastIndex,
        totalHeight: itemCount * rowHeight,
        offsetY: ZERO,
        onScroll,
      };
    }

    const viewport = container?.clientHeight ?? ZERO;
    const start = Math.max(ZERO, Math.floor(scrollTop / rowHeight) - overscan);
    const visibleCount = Math.ceil(viewport / rowHeight) + overscan * 2;
    const end = Math.min(lastIndex, start + visibleCount);

    return {
      scrollRef,
      startIndex: start,
      endIndex: end,
      totalHeight: itemCount * rowHeight,
      offsetY: start * rowHeight,
      onScroll,
    };
  }, [enabled, itemCount, rowHeight, overscan, scrollTop, container, scrollRef, onScroll]);
}
