import type { ReactNode } from 'react';
import { Typography, Flex } from '@forgedevstack/bear';
import type { EmptyStateProps } from './EmptyState.types';
import { useTableContext } from '@/context';
import { EMPTY_STATE_STROKE_WIDTH } from './EmptyState.const';
import { EMPTY_STATE_ICON_PATH, EMPTY_STATE_ICON_VIEWBOX } from '@constants/images.const';

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
            viewBox={EMPTY_STATE_ICON_VIEWBOX}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={EMPTY_STATE_STROKE_WIDTH}
              d={EMPTY_STATE_ICON_PATH}
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
