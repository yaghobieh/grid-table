import React from 'react';
import { BearIcons } from '@forgedevstack/bear';

// ── Demo icon mapping ────────────────────────────────
export const DEMO_ICONS: Record<string, React.ReactNode> = {
  TrendingUpIcon: React.createElement(BearIcons.TrendingUpIcon, { size: 'lg', color: 'var(--grid-accent)' }),
  UsersIcon: React.createElement(BearIcons.UsersIcon, { size: 'lg', color: 'var(--grid-accent)' }),
  TableIcon: React.createElement(BearIcons.TableIcon, { size: 'lg', color: 'var(--grid-accent)' }),
  PaletteIcon: React.createElement(BearIcons.PaletteIcon, { size: 'lg', color: 'var(--grid-accent)' }),
};

// ── Tag badge variant map ────────────────────────────
export const TAG_VARIANT: Record<string, string> = {
  Popular: 'success',
  New: 'info',
  Interactive: 'warning',
};

// ── Gradient colors ──────────────────────────────────
export const GRADIENT_PRIMARY: [string, string] = ['#22c55e', '#16a34a'];
