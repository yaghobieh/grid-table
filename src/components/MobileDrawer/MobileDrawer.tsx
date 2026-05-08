import type { ReactNode } from 'react';
import clsx from 'clsx';
import { Button, Typography, BearIcons } from '@forgedevstack/bear';
import type { MobileDrawerProps } from './MobileDrawer.types';
import { DRAWER_CLOSE_ARIA, DRAWER_TITLES } from './MobileDrawer.const';
import { DRAWER_ANIMATION_DURATION, DRAWER_OVERLAY_OPACITY } from '@constants/index';
import { DrawerFilterContent } from './_helper/DrawerFilterContent';
import { DrawerSortContent } from './_helper/DrawerSortContent';
import { DrawerColumnsContent } from './_helper/DrawerColumnsContent';
import { useMobileDrawerEffects } from './useMobileDrawerEffects';

export function MobileDrawer({
  isOpen,
  content,
  onClose,
  className = '',
  style,
}: MobileDrawerProps): ReactNode {
  useMobileDrawerEffects(isOpen, onClose);

  if (!isOpen || !content) {
    return null;
  }

  return (
    <div className={clsx('mobile-drawer-container', className)} style={style}>
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
        <div className="drawer-header">
          <Typography variant="h6">{DRAWER_TITLES[content]}</Typography>
          <Button
            onClick={onClose}
            className="p-2 rounded"
            aria-label={DRAWER_CLOSE_ARIA}
            variant="ghost"
            size="sm"
            icon={<BearIcons.CloseIcon size="xs" />}
          />
        </div>

        <div className="drawer-content">
          {content === 'filter' && <DrawerFilterContent />}
          {content === 'sort' && <DrawerSortContent />}
          {content === 'columns' && <DrawerColumnsContent />}
        </div>
      </div>
    </div>
  );
}

