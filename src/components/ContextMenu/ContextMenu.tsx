import { useEffect, useCallback, useRef, type ReactNode } from 'react';
import type { ContextMenuProps } from './ContextMenu.types';
import type { RowData } from '../../types';

export function ContextMenu<T extends RowData>(props: ContextMenuProps<T>): ReactNode {
  const { visible, x, y, context, actions, onClose } = props;
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
      style={{ left: x, top: y }}
    >
      {visibleActions.map((action) => {
        if (action.divider) {
          return <div key={action.id} className="gt-context-menu-divider" />;
        }

        return (
          <button
            key={action.id}
            type="button"
            className="gt-context-menu-item"
            disabled={action.disabled}
            onClick={() => {
              action.onClick(context);
              onClose();
            }}
          >
            <span className="gt-context-menu-item-label">
              {action.icon && <span className="gt-cm-icon">{action.icon}</span>}
              <span>{action.label}</span>
            </span>
            {action.shortcut && (
              <span className="gt-context-menu-shortcut">{action.shortcut}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default ContextMenu;
