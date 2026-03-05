import { useState, useCallback, useRef } from 'react';
import type { RowData } from '../types';

export interface UseRowReorderReturn<T extends RowData> {
  draggingRowId: string | number | null;
  dragOverRowId: string | number | null;
  getRowDragProps: (rowId: string | number) => {
    draggable: boolean;
    onDragStart: () => void;
    onDragOver: (e: React.DragEvent) => void;
    onDragEnd: () => void;
    onDrop: (e: React.DragEvent) => void;
  };
}

export function useRowReorder<T extends RowData>(
  data: T[],
  getRowId: (row: T) => string | number,
  onReorder?: (reordered: T[]) => void,
): UseRowReorderReturn<T> {
  const [draggingRowId, setDraggingRowId] = useState<string | number | null>(null);
  const [dragOverRowId, setDragOverRowId] = useState<string | number | null>(null);

  const draggingRef = useRef<string | number | null>(null);
  const dragOverRef = useRef<string | number | null>(null);
  const dataRef = useRef<T[]>(data);
  dataRef.current = data;

  const onReorderRef = useRef(onReorder);
  onReorderRef.current = onReorder;

  const getRowIdRef = useRef(getRowId);
  getRowIdRef.current = getRowId;

  const getRowDragProps = useCallback((rowId: string | number) => ({
    draggable: true as const,

    onDragStart: () => {
      draggingRef.current = rowId;
      setDraggingRowId(rowId);
    },

    onDragOver: (e: React.DragEvent) => {
      e.preventDefault();
      if (dragOverRef.current !== rowId) {
        dragOverRef.current = rowId;
        setDragOverRowId(rowId);
      }
    },

    onDrop: (e: React.DragEvent) => {
      e.preventDefault();
      const fromId = draggingRef.current;
      const toId = dragOverRef.current;
      if (fromId == null || toId == null || fromId === toId) return;

      const currentData = dataRef.current;
      const getId = getRowIdRef.current;
      const fromIdx = currentData.findIndex(r => getId(r) === fromId);
      const toIdx = currentData.findIndex(r => getId(r) === toId);
      if (fromIdx < 0 || toIdx < 0) return;

      const result = [...currentData];
      const [moved] = result.splice(fromIdx, 1);
      result.splice(toIdx, 0, moved);
      onReorderRef.current?.(result);
    },

    onDragEnd: () => {
      draggingRef.current = null;
      dragOverRef.current = null;
      setDraggingRowId(null);
      setDragOverRowId(null);
    },
  }), []);

  return { draggingRowId, dragOverRowId, getRowDragProps };
}
