import { useCallback, useRef, useState, useMemo } from 'react';
import { useTableContext } from '../context';
import type { ColumnReorderEvent } from '../types';
import { DRAG_THRESHOLD } from '../constants';

export interface UseDragDropReturn {
  isDragging: boolean;
  draggingColumnId: string | null;
  dragOverColumnId: string | null;
  handleDragStart: (columnId: string) => (event: React.DragEvent) => void;
  handleDragOver: (columnId: string) => (event: React.DragEvent) => void;
  handleDragEnd: () => void;
  handleDrop: (targetColumnId: string) => (event: React.DragEvent) => void;
  handleDragLeave: () => void;
  getDragHandleProps: (columnId: string) => DragHandleProps;
  getDropTargetProps: (columnId: string) => DropTargetProps;
}

export interface DragHandleProps {
  draggable: boolean;
  onDragStart: (event: React.DragEvent) => void;
  onDragEnd: () => void;
}

export interface DropTargetProps {
  onDragOver: (event: React.DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (event: React.DragEvent) => void;
}

export interface UseDragDropOptions {
  onReorder?: (event: ColumnReorderEvent) => void;
  enabled?: boolean;
}

export function useDragDrop(options: UseDragDropOptions = {}): UseDragDropReturn {
  const { onReorder, enabled = true } = options;
  const { state, actions } = useTableContext();
  const [dragOverColumnId, setDragOverColumnId] = useState<string | null>(null);
  const dragStartPosition = useRef<{ x: number; y: number } | null>(null);
  const isDragValid = useRef(false);

  const handleDragStart = useCallback(
    (columnId: string) => (event: React.DragEvent) => {
      if (!enabled) {
        event.preventDefault();
        return;
      }

      dragStartPosition.current = { x: event.clientX, y: event.clientY };
      isDragValid.current = false;

      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', columnId);

      requestAnimationFrame(() => {
        actions.setDraggingColumn(columnId);
      });
    },
    [enabled, actions]
  );

  const handleDragOver = useCallback(
    (columnId: string) => (event: React.DragEvent) => {
      if (!enabled || !state.draggingColumnId) return;

      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';

      if (dragStartPosition.current) {
        const dx = Math.abs(event.clientX - dragStartPosition.current.x);
        const dy = Math.abs(event.clientY - dragStartPosition.current.y);
        if (dx > DRAG_THRESHOLD || dy > DRAG_THRESHOLD) {
          isDragValid.current = true;
        }
      }

      if (columnId !== state.draggingColumnId && columnId !== dragOverColumnId) {
        setDragOverColumnId(columnId);
      }
    },
    [enabled, state.draggingColumnId, dragOverColumnId]
  );

  const handleDragLeave = useCallback(() => {
    setDragOverColumnId(null);
  }, []);

  const handleDrop = useCallback(
    (targetColumnId: string) => (event: React.DragEvent) => {
      event.preventDefault();

      if (!enabled || !state.draggingColumnId || !isDragValid.current) return;
      if (state.draggingColumnId === targetColumnId) return;

      const sourceIndex = state.columnStates.findIndex((c) => c.id === state.draggingColumnId);
      const targetIndex = state.columnStates.findIndex((c) => c.id === targetColumnId);

      if (sourceIndex !== -1 && targetIndex !== -1) {
        actions.reorderColumn(state.draggingColumnId, targetColumnId);

        onReorder?.({
          sourceId: state.draggingColumnId,
          targetId: targetColumnId,
          sourceIndex,
          targetIndex,
        });
      }

      setDragOverColumnId(null);
    },
    [enabled, state.draggingColumnId, state.columnStates, actions, onReorder]
  );

  const handleDragEnd = useCallback(() => {
    actions.setDraggingColumn(null);
    setDragOverColumnId(null);
    dragStartPosition.current = null;
    isDragValid.current = false;
  }, [actions]);

  const getDragHandleProps = useCallback(
    (columnId: string): DragHandleProps => ({
      draggable: enabled,
      onDragStart: handleDragStart(columnId),
      onDragEnd: handleDragEnd,
    }),
    [enabled, handleDragStart, handleDragEnd]
  );

  const getDropTargetProps = useCallback(
    (columnId: string): DropTargetProps => ({
      onDragOver: handleDragOver(columnId),
      onDragLeave: handleDragLeave,
      onDrop: handleDrop(columnId),
    }),
    [handleDragOver, handleDragLeave, handleDrop]
  );

  return useMemo(
    () => ({
      isDragging: !!state.draggingColumnId,
      draggingColumnId: state.draggingColumnId,
      dragOverColumnId,
      handleDragStart,
      handleDragOver,
      handleDragEnd,
      handleDrop,
      handleDragLeave,
      getDragHandleProps,
      getDropTargetProps,
    }),
    [
      state.draggingColumnId,
      dragOverColumnId,
      handleDragStart,
      handleDragOver,
      handleDragEnd,
      handleDrop,
      handleDragLeave,
      getDragHandleProps,
      getDropTargetProps,
    ]
  );
}

