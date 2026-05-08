import type { ReactNode } from 'react';
import { useCallback } from 'react';
import { Button } from '@forgedevstack/bear';
import { useTableContext } from '@/context';
import { DRAWER_FILTERS_ACTIVE_SUFFIX, DRAWER_ZERO } from '../../MobileDrawer.const';
import { EMPTY_STRING } from '@/constants';

export function DrawerFilterContent(): ReactNode {
  const { state, actions } = useTableContext();
  const { translations, columns, filters } = state;

  const handleClearAll = useCallback(() => {
    actions.clearFilters();
  }, [actions]);

  return (
    <div className="drawer-filter-content">
      <div>
        <span className="text-sm text-theme-muted">
          {filters.length} {translations.filter} {DRAWER_FILTERS_ACTIVE_SUFFIX}
        </span>
        {filters.length > DRAWER_ZERO && (
          <Button onClick={handleClearAll} className="text-sm" variant="ghost" size="sm">
            {translations.clearAll}
          </Button>
        )}
      </div>

      <div className="space-y-3">
        {columns
          .filter((col) => col.filterable !== false)
          .map((col) => {
            const existingFilter = filters.find((f) => f.columnId === col.id);
            const headerText = typeof col.header === 'string' ? col.header : col.id;
            return (
              <div key={col.id} className="filter-item">
                <label className="block text-sm font-medium text-theme-secondary mb-1">
                  {headerText}
                </label>
                <input
                  type="text"
                  value={(existingFilter?.value as string) ?? EMPTY_STRING}
                  onChange={(event) => {
                    if (event.target.value) {
                      actions.setFilter(col.id, event.target.value);
                    } else {
                      actions.removeFilter(col.id);
                    }
                  }}
                  placeholder={`${translations.filter} ${headerText}...`}
                  className="w-full px-3 py-2 text-sm rounded"
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}
