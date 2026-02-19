import React from 'react';
import { BearIcons } from '@forgedevstack/bear';

// ── Icon map for footer links ────────────────────────
export const FOOTER_LINK_ICONS: Record<string, React.ReactNode> = {
  npm: React.createElement(BearIcons.PackageIcon, { size: 'xs' }),
  ForgeStack: React.createElement(BearIcons.ZapIcon, { size: 'xs' }),
  'Bear UI': React.createElement(BearIcons.TableIcon, { size: 'xs' }),
  Harbor: React.createElement(BearIcons.SettingsIcon, { size: 'xs' }),
};
