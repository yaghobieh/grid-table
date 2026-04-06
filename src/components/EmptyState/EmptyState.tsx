import type { ReactNode } from 'react';
import { Typography, Flex } from '@forgedevstack/bear';
import type { EmptyStateProps } from './types';
import { useTableContext } from '../../context';

export function EmptyState(props: EmptyStateProps): ReactNode {
  const { title, description, icon, action, className = '', style } = props;
  const { state } = useTableContext();
  const { translations } = state;

  const displayTitle = title ?? translations.empty;
  const displayDescription = description ?? translations.noResults;

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      className={`grid-empty-state ${className}`}
      style={style}
      role="status"
    >
      {icon && (
        <div className="grid-empty-icon">{icon}</div>
      )}

      {!icon && (
        <div className="grid-empty-icon">
          <svg
            className="icon-lg"
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

      <Typography variant="h4" className="grid-empty-title">
        {displayTitle}
      </Typography>

      {displayDescription && (
        <Typography variant="body2" className="grid-empty-description">
          {displayDescription}
        </Typography>
      )}

      {action && <div className="grid-empty-action">{action}</div>}
    </Flex>
  );
}
