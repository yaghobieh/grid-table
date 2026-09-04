import { useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import type { RowHeightConfig } from '@/types/features.types';
import { clampRowHeight, resolveDefaultRowHeight } from '@/utils/rowHeight.utils';

export interface UseRowHeightResizeReturn {
  height: number;
  onHandlePointerDown: (event: ReactPointerEvent<HTMLButtonElement>) => void;
}

/**
 * Tracks a resizable row height and returns a pointer-down handler for the row edge.
 */
export function useRowHeightResize(config?: RowHeightConfig): UseRowHeightResizeReturn {
  const [height, setHeight] = useState(() => resolveDefaultRowHeight(config));

  const onHandlePointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const startY = event.clientY;
    const startHeight = height;
    const handleMove = (moveEvent: PointerEvent) => {
      setHeight(clampRowHeight(startHeight + (moveEvent.clientY - startY), config));
    };
    const handleUp = () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
    };
    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', handleUp);
  };

  return { height, onHandlePointerDown };
}
