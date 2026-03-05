import { useEffect, useCallback, useRef, type ReactNode } from 'react';
import type { ContextMenuAction, ContextMenuContext } from '../../types/features.types';
import type { RowData } from '../../types';

export interface ContextMenuProps<T extends RowData = RowData> {
  visible: boolean;
  x: number;
  y: number;
  context: ContextMenuContext<T> | null;
  actions: ContextMenuAction<T>[];
  onClose: () => void;
}

export function ContextMenu<T extends RowData>({
  visible,
  x,
  y,
  context,
  actions,
  onClose,
}: ContextMenuProps<T>): ReactNode {
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (visible) {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('contextmenu', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('contextmenu', handleClickOutside);
    };
  }, [visible, handleClickOutside]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (visible) window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [visible, onClose]);

  if (!visible || !context) return null;

  const visibleActions = actions.filter(a => !a.hidden);

  return (
    <div
      ref={menuRef}
      className="gt-context-menu"
      style={{
        position: 'fixed',
        left: x,
        top: y,
        zIndex: 9999,
        minWidth: 180,
        background: 'var(--gt-bg-primary, #fff)',
        border: '1px solid var(--gt-border-color, #e0e0e0)',
        borderRadius: 6,
        boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
        padding: '4px 0',
      }}
    >
      {visibleActions.map((action) => {
        if (action.divider) {
          return <div key={action.id} className="gt-context-menu-divider" style={{ height: 1, background: 'var(--gt-border-color, #e0e0e0)', margin: '4px 8px' }} />;
        }

        return (
          <button
            key={action.id}
            className="gt-context-menu-item"
            disabled={action.disabled}
            onClick={() => {
              action.onClick(context);
              onClose();
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              padding: '6px 12px',
              border: 'none',
              background: 'none',
              cursor: action.disabled ? 'default' : 'pointer',
              opacity: action.disabled ? 0.5 : 1,
              fontSize: '0.8rem',
              color: 'var(--gt-text-primary, #333)',
              textAlign: 'left',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {action.icon && <span className="gt-cm-icon">{action.icon}</span>}
              <span>{action.label}</span>
            </span>
            {action.shortcut && (
              <span style={{ fontSize: '0.7rem', color: 'var(--gt-text-muted, #999)' }}>{action.shortcut}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default ContextMenu;
