import { useEffect, type RefObject } from 'react';
import { KEY_ESCAPE } from '@constants/keyboard.const';

/**
 * Registers outside-click and escape handlers for filter popup dismissal.
 */
export function useFilterPopupDismiss(
  popupRef: RefObject<HTMLDivElement | null>,
  onClose: () => void,
): void {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === KEY_ESCAPE) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [popupRef, onClose]);
}
