import { useEffect } from 'react';
import type { MobileDrawerProps } from './MobileDrawer.types';
import { EMPTY_STRING } from '@/constants';
import { KEY_ESCAPE } from '@constants/keyboard.const';
import { DRAWER_BODY_OVERFLOW_LOCK } from './MobileDrawer.const';

/**
 * Handles body scroll locking and Escape-close behavior for the mobile drawer.
 */
export function useMobileDrawerEffects(
  isOpen: MobileDrawerProps['isOpen'],
  onClose: MobileDrawerProps['onClose'],
): void {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = DRAWER_BODY_OVERFLOW_LOCK;
    } else {
      document.body.style.overflow = EMPTY_STRING;
    }
    return () => {
      document.body.style.overflow = EMPTY_STRING;
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === KEY_ESCAPE && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);
}
