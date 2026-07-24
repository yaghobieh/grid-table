import { useCallback, useRef, useState } from 'react';
import type { TouchGesturesConfig, TouchSwipeAction, RowData } from '@/types';
import {
  TOUCH_LONG_PRESS_MS,
  TOUCH_POINTER_TYPE_TOUCH,
  TOUCH_SWIPE_MAX_VERTICAL_PX,
  TOUCH_SWIPE_THRESHOLD_PX,
  TOUCH_SWIPE_ACTION_COPY_ID,
  TOUCH_SWIPE_ACTION_COPY_LABEL,
  TOUCH_SWIPE_ACTION_DELETE_ID,
  TOUCH_SWIPE_ACTION_DELETE_LABEL,
} from '@constants/touchGestures.const';
import { ZERO } from '@constants/numbers.const';

export interface TouchGestureHandlers {
  onPointerDown: (event: React.PointerEvent) => void;
  onPointerMove: (event: React.PointerEvent) => void;
  onPointerUp: (event: React.PointerEvent) => void;
  onPointerCancel: () => void;
}

export interface UseTouchGesturesReturn<T extends RowData = RowData> {
  offsetX: number;
  isOpen: boolean;
  isTracking: boolean;
  actions: TouchSwipeAction<T>[];
  handlers: TouchGestureHandlers;
  close: () => void;
}

function resolveDefaultActions<T extends RowData>(): TouchSwipeAction<T>[] {
  return [
    {
      id: TOUCH_SWIPE_ACTION_COPY_ID,
      label: TOUCH_SWIPE_ACTION_COPY_LABEL,
      onAction: (row) => {
        const text = JSON.stringify(row);
        void navigator.clipboard?.writeText(text);
      },
    },
    {
      id: TOUCH_SWIPE_ACTION_DELETE_ID,
      label: TOUCH_SWIPE_ACTION_DELETE_LABEL,
      danger: true,
      onAction: () => {},
    },
  ];
}

export function useTouchGestures<T extends RowData>(
  config: TouchGesturesConfig<T> | undefined,
  row: T,
  rowIndex: number,
  onLongPress?: (clientX: number, clientY: number) => void,
): UseTouchGesturesReturn<T> {
  const enabled = config?.enabled === true;
  const swipeEnabled = enabled && config?.swipeActions === true;
  const longPressEnabled = enabled && config?.longPressContextMenu === true;
  const threshold = config?.swipeThresholdPx ?? TOUCH_SWIPE_THRESHOLD_PX;
  const longPressMs = config?.longPressMs ?? TOUCH_LONG_PRESS_MS;
  const actions = config?.swipeActionItems?.length ? config.swipeActionItems : resolveDefaultActions<T>();

  const [offsetX, setOffsetX] = useState(ZERO);
  const [isOpen, setIsOpen] = useState(false);
  const [isTracking, setIsTracking] = useState(false);

  const startX = useRef(ZERO);
  const startY = useRef(ZERO);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const didLongPress = useRef(false);
  const pointerId = useRef<number | null>(null);

  const clearLongPress = useCallback(() => {
    if (longPressTimer.current != null) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  }, []);

  const close = useCallback(() => {
    setOffsetX(ZERO);
    setIsOpen(false);
    setIsTracking(false);
  }, []);

  const onPointerDown = useCallback(
    (event: React.PointerEvent) => {
      if (!enabled) return;
      if (event.pointerType !== TOUCH_POINTER_TYPE_TOUCH && event.pointerType !== 'pen') return;
      pointerId.current = event.pointerId;
      startX.current = event.clientX;
      startY.current = event.clientY;
      didLongPress.current = false;
      setIsTracking(true);

      if (longPressEnabled) {
        clearLongPress();
        longPressTimer.current = setTimeout(() => {
          didLongPress.current = true;
          onLongPress?.(event.clientX, event.clientY);
          setIsTracking(false);
        }, longPressMs);
      }
    },
    [enabled, longPressEnabled, longPressMs, onLongPress, clearLongPress],
  );

  const onPointerMove = useCallback(
    (event: React.PointerEvent) => {
      if (!enabled || !isTracking || pointerId.current !== event.pointerId) return;
      const dx = event.clientX - startX.current;
      const dy = Math.abs(event.clientY - startY.current);

      if (Math.abs(dx) > 8 || dy > 8) {
        clearLongPress();
      }

      if (!swipeEnabled) return;
      if (dy > TOUCH_SWIPE_MAX_VERTICAL_PX) return;

      if (dx < ZERO) {
        const next = Math.max(dx, -threshold);
        setOffsetX(next);
      } else if (isOpen) {
        const next = Math.min(ZERO, -threshold + dx);
        setOffsetX(next);
      }
    },
    [enabled, isTracking, swipeEnabled, threshold, isOpen, clearLongPress],
  );

  const onPointerUp = useCallback(
    (event: React.PointerEvent) => {
      if (pointerId.current !== event.pointerId) return;
      clearLongPress();
      setIsTracking(false);
      pointerId.current = null;

      if (didLongPress.current) {
        didLongPress.current = false;
        return;
      }

      if (!swipeEnabled) {
        setOffsetX(ZERO);
        return;
      }

      if (offsetX <= -threshold / 2) {
        setOffsetX(-threshold);
        setIsOpen(true);
      } else {
        setOffsetX(ZERO);
        setIsOpen(false);
      }
    },
    [clearLongPress, swipeEnabled, offsetX, threshold],
  );

  const onPointerCancel = useCallback(() => {
    clearLongPress();
    pointerId.current = null;
    setIsTracking(false);
    if (!isOpen) setOffsetX(ZERO);
  }, [clearLongPress, isOpen]);

  return {
    offsetX,
    isOpen,
    isTracking,
    actions: swipeEnabled ? actions : [],
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel,
    },
    close,
  };
}

export function invokeSwipeAction<T extends RowData>(
  action: TouchSwipeAction<T>,
  row: T,
  rowIndex: number,
): void {
  action.onAction(row, rowIndex);
}
