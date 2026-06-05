export interface UseVirtualizedWindowParams {
  itemCount: number;
  enabled: boolean;
  rowHeight?: number;
  overscan?: number;
}

export interface UseVirtualizedWindowReturn {
  scrollRef: (node: HTMLDivElement | null) => void;
  startIndex: number;
  endIndex: number;
  totalHeight: number;
  offsetY: number;
  onScroll: () => void;
}
