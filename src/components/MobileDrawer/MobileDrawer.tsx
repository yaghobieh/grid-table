import type { ReactNode } from 'react';
import { useEffect, useCallback } from 'react';
import type { MobileDrawerProps, DrawerContent } from './types';
import { useTableContext } from '../../context';
import { DRAWER_ANIMATION_DURATION, DRAWER_OVERLAY_OPACITY } from '../../constants';

function DrawerHeader({ title, onClose }: { title: string; onClose: () => void }): ReactNode {
  return (
    <div className="drawer-header flex items-center justify-between px-4 py-3 border-b border-theme-border">
      <h3 className="text-lg font-medium text-theme-primary">{title}</h3>
      <button
        onClick={onClose}
        className="p-2 rounded hover:bg-theme-hover text-theme-secondary"
        aria-label="Close"
      >
        X
      </button>
    </div>
  );
}

function FilterContent(): ReactNode {
  const { state, actions } = useTableContext();
  const { translations, columns, filters } = state;

  const handleClearAll = useCallback(() => {
    actions.clearFilters();
  }, [actions]);

  return (
    <div className="drawer-filter-content p-4 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-theme-muted">
          {filters.length} {translations.filter}(s) active
        </span>
        {filters.length > 0 && (
          <button
            onClick={handleClearAll}
            className="text-sm text-accent-primary hover:underline"
          >
            {translations.clearAll}
          </button>
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
                  value={existingFilter?.value as string ?? ''}
                  onChange={(e) => {
                    if (e.target.value) {
                      actions.setFilter(col.id, e.target.value);
                    } else {
                      actions.removeFilter(col.id);
                    }
                  }}
                  placeholder={`${translations.filter} ${headerText}...`}
                  className="w-full px-3 py-2 text-sm rounded border border-theme-border bg-theme-primary text-theme-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}

function SortContent(): ReactNode {
  const { state, actions } = useTableContext();
  const { translations, columns, sorting } = state;

  const handleClearAll = useCallback(() => {
    actions.clearSorting();
  }, [actions]);

  return (
    <div className="drawer-sort-content p-4 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-theme-muted">
          {sorting.length} {translations.sort}(s) active
        </span>
        {sorting.length > 0 && (
          <button
            onClick={handleClearAll}
            className="text-sm text-accent-primary hover:underline"
          >
            {translations.clearAll}
          </button>
        )}
      </div>

      <div className="space-y-2">
        {columns
          .filter((col) => col.sortable !== false)
          .map((col) => {
            const sortItem = sorting.find((s) => s.columnId === col.id);
            const headerText = typeof col.header === 'string' ? col.header : col.id;

            return (
              <button
                key={col.id}
                onClick={() => actions.toggleSorting(col.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded border transition-colors ${
                  sortItem
                    ? 'border-accent-primary bg-accent-primary/10'
                    : 'border-theme-border hover:bg-theme-hover'
                }`}
              >
                <span className="text-sm text-theme-primary">{headerText}</span>
                <span className="text-xs text-theme-muted">
                  {sortItem?.direction === 'asc'
                    ? translations.sortAsc
                    : sortItem?.direction === 'desc'
                    ? translations.sortDesc
                    : '-'}
                </span>
              </button>
            );
          })}
      </div>
    </div>
  );
}

function ColumnsContent(): ReactNode {
  const { state, actions } = useTableContext();
  const { translations, columns, columnStates } = state;

  return (
    <div className="drawer-columns-content p-4 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-theme-muted">{translations.showColumns}</span>
        <button
          onClick={actions.resetColumns}
          className="text-sm text-accent-primary hover:underline"
        >
          {translations.resetColumns}
        </button>
      </div>

      <div className="space-y-2">
        {columns.map((col) => {
          const colState = columnStates.find((cs) => cs.id === col.id);
          const isVisible = colState?.visible !== false;
          const headerText = typeof col.header === 'string' ? col.header : col.id;

          return (
            <label
              key={col.id}
              className="flex items-center gap-3 px-3 py-2 rounded hover:bg-theme-hover cursor-pointer"
            >
              <input
                type="checkbox"
                checked={isVisible}
                onChange={() => actions.toggleColumnVisibility(col.id)}
                className="w-4 h-4 rounded border-theme-border"
              />
              <span className="text-sm text-theme-primary">{headerText}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

const DRAWER_TITLES: Record<DrawerContent, string> = {
  filter: 'Filters',
  sort: 'Sort',
  columns: 'Columns',
};

export function MobileDrawer({
  isOpen,
  content,
  onClose,
  className = '',
  style,
}: MobileDrawerProps): ReactNode {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen || !content) {
    return null;
  }

  return (
    <div className={`mobile-drawer-container fixed inset-0 z-50 ${className}`} style={style}>
      <div
        className="mobile-drawer-overlay absolute inset-0 bg-black transition-opacity"
        style={{
          opacity: DRAWER_OVERLAY_OPACITY,
          transitionDuration: `${DRAWER_ANIMATION_DURATION}ms`,
        }}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className="mobile-drawer absolute bottom-0 left-0 right-0 bg-theme-primary rounded-t-2xl shadow-2xl max-h-[80vh] overflow-hidden flex flex-col"
        style={{
          transitionDuration: `${DRAWER_ANIMATION_DURATION}ms`,
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
      >
        <DrawerHeader title={DRAWER_TITLES[content]} onClose={onClose} />

        <div className="drawer-content flex-1 overflow-y-auto">
          {content === 'filter' && <FilterContent />}
          {content === 'sort' && <SortContent />}
          {content === 'columns' && <ColumnsContent />}
        </div>
      </div>
    </div>
  );
}

