import React from 'react';
import { BearIcons } from '@forgedevstack/bear';

// ── Icon map for doc sidebar ─────────────────────────
export const DOC_ICON_MAP: Record<string, React.ReactNode> = {
  RocketIcon: React.createElement(BearIcons.ZapIcon, { size: 'xs', color: 'var(--grid-accent)' }),
  DownloadIcon: React.createElement(BearIcons.DownloadIcon, { size: 'xs', color: 'var(--grid-accent)' }),
  ColumnsIcon: React.createElement(BearIcons.GridIcon, { size: 'xs', color: 'var(--grid-accent)' }),
  GridIcon: React.createElement(BearIcons.GridIcon, { size: 'xs', color: 'var(--grid-accent)' }),
  ArrowUpIcon: React.createElement(BearIcons.ArrowUpIcon, { size: 'xs', color: 'var(--grid-accent)' }),
  FilterIcon: React.createElement(BearIcons.FilterIcon, { size: 'xs', color: 'var(--grid-accent)' }),
  ListIcon: React.createElement(BearIcons.ListIcon, { size: 'xs', color: 'var(--grid-accent)' }),
  CheckSquareIcon: React.createElement(BearIcons.ChecklistIcon, { size: 'xs', color: 'var(--grid-accent)' }),
  MoveIcon: React.createElement(BearIcons.MoveIcon, { size: 'xs', color: 'var(--grid-accent)' }),
  PaletteIcon: React.createElement(BearIcons.PaletteIcon, { size: 'xs', color: 'var(--grid-accent)' }),
  GitBranchIcon: React.createElement(BearIcons.GitBranchIcon, { size: 'xs', color: 'var(--grid-accent)' }),
  SaveIcon: React.createElement(BearIcons.SaveIcon, { size: 'xs', color: 'var(--grid-accent)' }),
  LoaderIcon: React.createElement(BearIcons.LoaderIcon, { size: 'xs', color: 'var(--grid-accent)' }),
  LayersIcon: React.createElement(BearIcons.LayersIcon, { size: 'xs', color: 'var(--grid-accent)' }),
  CodeIcon: React.createElement(BearIcons.CodeIcon, { size: 'xs', color: 'var(--grid-accent)' }),
};
