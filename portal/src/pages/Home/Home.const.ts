import React from 'react';
import { BearIcons } from '@forgedevstack/bear';

// ── Feature icon mapping ─────────────────────────────
export const FEATURE_ICONS: Record<string, React.ReactNode> = {
  sort: React.createElement(BearIcons.ArrowUpIcon, { size: 'md', color: 'var(--grid-accent)' }),
  tree: React.createElement(BearIcons.GitBranchIcon, { size: 'md', color: 'var(--grid-accent)' }),
  filter: React.createElement(BearIcons.FilterIcon, { size: 'md', color: 'var(--grid-accent)' }),
  drag: React.createElement(BearIcons.MoveIcon, { size: 'md', color: 'var(--grid-accent)' }),
  theme: React.createElement(BearIcons.PaletteIcon, { size: 'md', color: 'var(--grid-accent)' }),
  responsive: React.createElement(BearIcons.SmartphoneIcon, { size: 'md', color: 'var(--grid-accent)' }),
  selection: React.createElement(BearIcons.ChecklistIcon, { size: 'md', color: 'var(--grid-accent)' }),
  pagination: React.createElement(BearIcons.ListIcon, { size: 'md', color: 'var(--grid-accent)' }),
  resize: React.createElement(BearIcons.MaximizeIcon, { size: 'md', color: 'var(--grid-accent)' }),
  expand: React.createElement(BearIcons.ChevronDownIcon, { size: 'md', color: 'var(--grid-accent)' }),
  skeleton: React.createElement(BearIcons.LoaderIcon, { size: 'md', color: 'var(--grid-accent)' }),
  typescript: React.createElement(BearIcons.CodeIcon, { size: 'md', color: 'var(--grid-accent)' }),
  keyboard: React.createElement(BearIcons.KeyboardIcon, { size: 'md', color: 'var(--grid-accent)' }),
  menu: React.createElement(BearIcons.MenuIcon, { size: 'md', color: 'var(--grid-accent)' }),
  export: React.createElement(BearIcons.DownloadIcon, { size: 'md', color: 'var(--grid-accent)' }),
  undo: React.createElement(BearIcons.UndoIcon, { size: 'md', color: 'var(--grid-accent)' }),
  pin: React.createElement(BearIcons.MapPinIcon, { size: 'md', color: 'var(--grid-accent)' }),
  reorder: React.createElement(BearIcons.MoveIcon, { size: 'md', color: 'var(--grid-accent)' }),
  print: React.createElement(BearIcons.PrinterIcon, { size: 'md', color: 'var(--grid-accent)' }),
  bar: React.createElement(BearIcons.BarChartIcon, { size: 'md', color: 'var(--grid-accent)' }),
};

// ── Demo icon mapping ────────────────────────────────
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

// ── Gradient colors ──────────────────────────────────
export const GRADIENT_PRIMARY: [string, string] = ['#22c55e', '#16a34a'];
export const GRADIENT_SECONDARY: [string, string] = ['#22c55e', '#4ade80'];

// ── Showcase cards (mesh of capabilities) ────────────
export interface ShowcaseCard {
  id: string;
  icon: React.ReactNode;
  gradient: string;
  highlight: string;
}

export const SHOWCASE_CARDS: ShowcaseCard[] = [
  {
    id: 'finance',
    icon: React.createElement(BearIcons.TrendingUpIcon, { size: 'lg', color: '#fff' }),
    gradient: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
    highlight: '#22c55e',
  },
  {
    id: 'hr',
    icon: React.createElement(BearIcons.UsersIcon, { size: 'lg', color: '#fff' }),
    gradient: 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)',
    highlight: '#4ade80',
  },
  {
    id: 'effects',
    icon: React.createElement(BearIcons.SparklesIcon, { size: 'lg', color: '#fff' }),
    gradient: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
    highlight: '#16a34a',
  },
  {
    id: 'lazyLoad',
    icon: React.createElement(BearIcons.LoaderIcon, { size: 'lg', color: '#fff' }),
    gradient: 'linear-gradient(135deg, #86efac 0%, #4ade80 100%)',
    highlight: '#86efac',
  },
];

// ── ForgeStack ecosystem packages for banner ─────────
export interface EcoPkg {
  name: string;
  icon: React.ReactNode;
}

export const ECO_PACKAGES: EcoPkg[] = [
  { name: 'Grid Table', icon: React.createElement(BearIcons.TableIcon, { size: 'xs', color: 'var(--grid-accent)' }) },
  { name: 'Bear UI', icon: React.createElement(BearIcons.BearPawIcon, { size: 'xs', color: 'var(--grid-accent)' }) },
  { name: 'Harbor', icon: React.createElement(BearIcons.AnchorIcon, { size: 'xs', color: 'var(--grid-accent)' }) },
  { name: 'Synapse', icon: React.createElement(BearIcons.ZapIcon, { size: 'xs', color: 'var(--grid-accent)' }) },
  { name: 'Compass', icon: React.createElement(BearIcons.CompassIcon, { size: 'xs', color: 'var(--grid-accent)' }) },
  { name: 'Crucible', icon: React.createElement(BearIcons.TargetIcon, { size: 'xs', color: 'var(--grid-accent)' }) },
  { name: 'Relay', icon: React.createElement(BearIcons.ActivityIcon, { size: 'xs', color: 'var(--grid-accent)' }) },
  { name: 'Forge CLI', icon: React.createElement(BearIcons.TerminalIcon, { size: 'xs', color: 'var(--grid-accent)' }) },
];
