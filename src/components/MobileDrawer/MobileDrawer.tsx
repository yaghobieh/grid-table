import type { ReactNode } from 'react';
import { useEffect, useCallback } from 'react';
import type { MobileDrawerProps, DrawerContent } from './types';
import { useTableContext } from '../../context';
import { DRAWER_ANIMATION_DURATION, DRAWER_OVERLAY_OPACITY } from '../../constants';

function DrawerHeader({ title, onClose }: { title: string; onClose: () => void }): ReactNode {
  return (
    <div className="drawer-header">
      <h3>{title}</h3>
      <button
        onClick={onClose}
        className="p-2 rounded"
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
    <div className="drawer-filter-content">
      <div>
        <span className="text-sm text-theme-muted">
          {filters.length} {translations.filter}(s) active
        </span>
        {filters.length > 0 && (
          <button
            onClick={handleClearAll}
            className="text-sm"
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
                  className="w-full px-3 py-2 text-sm rounded"
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
    <div className="drawer-sort-content">
      <div>
        <span className="text-sm text-theme-muted">
          {sorting.length} {translations.sort}(s) active
        </span>
        {sorting.length > 0 && (
          <button
            onClick={handleClearAll}
            className="text-sm"
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
                className={`w-full px-3 py-2 rounded ${sortItem ? 'active' : ''}`}
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
    <div className="drawer-columns-content">
      <div>
        <span className="text-sm text-theme-muted">{translations.showColumns}</span>
        <button
          onClick={actions.resetColumns}
          className="text-sm"
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
              className="px-3 py-2 rounded cursor-pointer"
            >
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
    <div className={`mobile-drawer-container ${className}`} style={style}>
      <div
        className="mobile-drawer-overlay"
        style={{
          opacity: DRAWER_OVERLAY_OPACITY,
          transitionDuration: `${DRAWER_ANIMATION_DURATION}ms`,
        }}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className="mobile-drawer"
        style={{
          transitionDuration: `${DRAWER_ANIMATION_DURATION}ms`,
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
      >
        <DrawerHeader title={DRAWER_TITLES[content]} onClose={onClose} />

        <div className="drawer-content">
          {content === 'filter' && <FilterContent />}
          {content === 'sort' && <SortContent />}
          {content === 'columns' && <ColumnsContent />}
        </div>
      </div>
    </div>
  );
}

