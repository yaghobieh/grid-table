import type { ReactNode } from 'react';
import { Typography, Flex } from '@forgedevstack/bear';
import type { EmptyStateProps } from './EmptyState.types';
import { useTableContext } from '@/context';
import { ONE } from '@constants/numbers.const';
import { EMPTY_STRING } from '@constants/strings.const';
import { EMPTY_STATE_ICON_PATH, EMPTY_STATE_ICON_VIEWBOX } from '@constants/images.const';

export function EmptyState(props: EmptyStateProps): ReactNode {
  const { title, description, icon, action, className = EMPTY_STRING, style } = props;
  const { state } = useTableContext();

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
              strokeWidth={ONE}
              d={EMPTY_STATE_ICON_PATH}
            />
          </svg>
        </div>
      )}

      <Typography variant="h4" className="grid-empty-title">
        {title ?? state.translations.empty}
      </Typography>

      {(description ?? state.translations.noResults) && (
        <Typography variant="body2" className="grid-empty-description">
          {description ?? state.translations.noResults}
        </Typography>
      )}

      {action && <div className="grid-empty-action">{action}</div>}
    </Flex>
  );
}
