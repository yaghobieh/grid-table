import type { ReactNode } from 'react';
import { Button } from '@forgedevstack/bear';
import { useTableContext } from '@/context';

export function DrawerColumnsContent(): ReactNode {
  const { state, actions } = useTableContext();
  const { translations, columns, columnStates } = state;

  return (
    <div className="drawer-columns-content">
      <div>
        <span className="text-sm text-theme-muted">{translations.showColumns}</span>
        <Button onClick={actions.resetColumns} className="text-sm" variant="ghost" size="sm">
          {translations.resetColumns}
        </Button>
      </div>

      <div className="space-y-2">
        {columns.map((col) => {
          const colState = columnStates.find((columnState) => columnState.id === col.id);
          const isVisible = colState?.visible !== false;
          const headerText = typeof col.header === 'string' ? col.header : col.id;

          return (
            <label key={col.id} className="px-3 py-2 rounded cursor-pointer">
              <input
                type="checkbox"
                checked={isVisible}
                onChange={() => actions.toggleColumnVisibility(col.id)}
                className="w-4 h-4 rounded"
              />
              <span className="text-sm text-theme-primary">{headerText}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
