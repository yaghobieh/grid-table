import { useEffect } from 'react';
import type { MobileDrawerProps } from './MobileDrawer.types';
import {
  DRAWER_BODY_OVERFLOW_DEFAULT,
  DRAWER_BODY_OVERFLOW_LOCK,
  DRAWER_ESCAPE_KEY,
} from './MobileDrawer.const';

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
      document.body.style.overflow = DRAWER_BODY_OVERFLOW_DEFAULT;
    }
    return () => {
      document.body.style.overflow = DRAWER_BODY_OVERFLOW_DEFAULT;
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === DRAWER_ESCAPE_KEY && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);
}
