import type { ReactNode } from 'react';
import type { EmptyStateProps } from './types';
import { useTableContext } from '../../context';

export function EmptyState({
  title,
  description,
  icon,
  action,
  className = '',
  style,
}: EmptyStateProps): ReactNode {
  const { state } = useTableContext();
  const { translations } = state;

  const displayTitle = title ?? translations.empty;
  const displayDescription = description ?? translations.noResults;

  return (
    <div
      className={`grid-empty-state flex flex-col items-center justify-center py-16 px-8 text-center ${className}`}
      style={style}
      role="status"
    >
      {icon && (
        <div className="grid-empty-icon mb-4 text-theme-muted text-4xl">{icon}</div>
      )}

      {!icon && (
        <div className="grid-empty-icon mb-4 text-theme-muted">
          <svg
            className="w-16 h-16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
        </div>
      )}

      <h3 className="grid-empty-title text-lg font-medium text-theme-primary mb-2">
        {displayTitle}
      </h3>

      {displayDescription && (
        <p className="grid-empty-description text-sm text-theme-muted max-w-sm mb-4">
          {displayDescription}
        </p>
      )}

      {action && <div className="grid-empty-action">{action}</div>}
    </div>
  );
}

