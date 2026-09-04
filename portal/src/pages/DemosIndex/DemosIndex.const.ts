import React from 'react';
import { BearIcons } from '@forgedevstack/bear';

export const DEMO_ICONS: Record<string, React.ReactNode> = {
  TrendingUpIcon: React.createElement(BearIcons.TrendingUpIcon, { size: 'lg', color: 'var(--grid-accent)' }),
  UsersIcon: React.createElement(BearIcons.UsersIcon, { size: 'lg', color: 'var(--grid-accent)' }),
  TableIcon: React.createElement(BearIcons.TableIcon, { size: 'lg', color: 'var(--grid-accent)' }),
  PaletteIcon: React.createElement(BearIcons.PaletteIcon, { size: 'lg', color: 'var(--grid-accent)' }),
  SparklesIcon: React.createElement(BearIcons.SparklesIcon, { size: 'lg', color: 'var(--grid-accent)' }),
  CodeIcon: React.createElement(BearIcons.CodeIcon, { size: 'lg', color: 'var(--grid-accent)' }),
  KeyboardIcon: React.createElement(BearIcons.KeyboardIcon, { size: 'lg', color: 'var(--grid-accent)' }),
  LayersIcon: React.createElement(BearIcons.LayersIcon, { size: 'lg', color: 'var(--grid-accent)' }),
  SaveIcon: React.createElement(BearIcons.SaveIcon, { size: 'lg', color: 'var(--grid-accent)' }),
  ServerIcon: React.createElement(BearIcons.ServerIcon, { size: 'lg', color: 'var(--grid-accent)' }),
  GridIcon: React.createElement(BearIcons.GridIcon, { size: 'lg', color: 'var(--grid-accent)' }),
  LoaderIcon: React.createElement(BearIcons.LoaderIcon, { size: 'lg', color: 'var(--grid-accent)' }),
};

export const TAG_VARIANT: Record<string, string> = {
  Popular: 'success',
  New: 'info',
  Interactive: 'warning',
  Guide: 'info',
  Pattern: 'secondary',
};
