import type { ReactNode, CSSProperties } from 'react';

export interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

