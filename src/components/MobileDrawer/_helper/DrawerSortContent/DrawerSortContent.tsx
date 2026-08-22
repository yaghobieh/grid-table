import type { ReactNode } from 'react';
import { useCallback } from 'react';
import clsx from 'clsx';
import { Button } from '@forgedevstack/bear';
import { useTableContext } from '@/context';
import { DRAWER_FILTERS_ACTIVE_SUFFIX } from '../../MobileDrawer.const';
import { ZERO } from '@constants/numbers.const';

export function DrawerSortContent(): ReactNode {
  const { state, actions } = useTableContext();
  const { translations, columns, sorting } = state;

  const handleClearAll = useCallback(() => {
    actions.clearSorting();
  }, [actions]);

  return (
    <div className="drawer-sort-content">
      <div>
        <span className="text-sm text-theme-muted">
          {sorting.length} {translations.sort} {DRAWER_FILTERS_ACTIVE_SUFFIX}
        </span>
        {sorting.length > ZERO && (
          <Button onClick={handleClearAll} className="text-sm" variant="ghost" size="sm">
            {translations.clearAll}
          </Button>
        )}
      </div>

      <div className="space-y-2">
        {columns
          .filter((col) => col.sortable !== false)
          .map((col) => {
            const sortItem = sorting.find((sort) => sort.columnId === col.id);
            const headerText = typeof col.header === 'string' ? col.header : col.id;
            return (
              <Button
                key={col.id}
                onClick={() => actions.toggleSorting(col.id)}
                className={clsx('w-full px-3 py-2 rounded', sortItem && 'active')}
                variant="ghost"
                size="sm"
              >
                <span className="text-sm text-theme-primary">{headerText}</span>
                <span className="text-xs text-theme-muted">
                  {sortItem?.direction === 'asc'
                    ? translations.sortAsc
                    : sortItem?.direction === 'desc'
                      ? translations.sortDesc
                      : '-'}
                </span>
              </Button>
            );
          })}
      </div>
    </div>
  );
}
