import type { ReactNode, CSSProperties } from 'react';

export type DrawerContent = 'filter' | 'sort' | 'columns';

export interface MobileDrawerProps {
  isOpen: boolean;
  content: DrawerContent | null;
  onClose: () => void;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

export interface DrawerHeaderProps {
  title: string;
  onClose: () => void;
}

export interface DrawerFilterContentProps {
  onApply: () => void;
  onClear: () => void;
}

export interface DrawerSortContentProps {
  onApply: () => void;
  onClear: () => void;
}

export interface DrawerColumnsContentProps {
  onReset: () => void;
}

