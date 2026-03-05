import React from 'react';
import { BearIcons } from '@forgedevstack/bear';

// ── Demo icon mapping ────────────────────────────────
export const DEMO_ICONS: Record<string, React.ReactNode> = {
  TrendingUpIcon: React.createElement(BearIcons.TrendingUpIcon, { size: 'lg', color: 'var(--grid-accent)' }),
  UsersIcon: React.createElement(BearIcons.UsersIcon, { size: 'lg', color: 'var(--grid-accent)' }),
  TableIcon: React.createElement(BearIcons.TableIcon, { size: 'lg', color: 'var(--grid-accent)' }),
  PaletteIcon: React.createElement(BearIcons.PaletteIcon, { size: 'lg', color: 'var(--grid-accent)' }),
  SparklesIcon: React.createElement(BearIcons.SparklesIcon, { size: 'lg', color: 'var(--grid-accent)' }),
  CodeIcon: React.createElement(BearIcons.CodeIcon, { size: 'lg', color: 'var(--grid-accent)' }),
};

// ── Tag badge variant map ────────────────────────────
export const TAG_VARIANT: Record<string, string> = {
  Popular: 'success',
  New: 'info',
  Interactive: 'warning',
};

// ── v1.0.7 highlights shown on demos page ────────────
export const V107_HIGHLIGHTS: string[] = [
  'Context Menu — right-click for copy, filter, pin, hide',
  'Status Bar — row count, aggregations (sum, avg, min, max)',
  'Tree Data — hierarchical rows with expand/collapse',
  'Row Reorder — drag-and-drop with visual handle',
  'Keyboard Navigation — arrow keys, Enter, Escape, Tab',
  'Undo/Redo — Ctrl+Z/Y for cell edits',
  'Multi-Export — CSV, JSON, Excel, PDF',
  'Frozen Rows — pin rows to top or bottom',
  'Print Mode — styled printable view',
  'Copy to Clipboard — tab-separated values',
  'Column Pinning — runtime pin/unpin via API',
];

// ── Gradient colors ──────────────────────────────────
export const GRADIENT_PRIMARY: [string, string] = ['#22c55e', '#16a34a'];
