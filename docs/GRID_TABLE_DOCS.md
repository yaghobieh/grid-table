# Grid Table — ForgeStack Data Grid

**@forgedevstack/grid-table** is a feature-rich React data grid: cell editing, multi-format export, keyboard navigation, context menu, tree data, row reordering, frozen rows, undo/redo, saved views, virtualization, range selection, infinite scroll, column groups, and more. Zero-config SCSS styling. Part of [ForgeStack](https://forgedevstack.com).

- **Live site:** [grid-table.com](https://grid-table.com/)
- **npm:** `@forgedevstack/grid-table` · **Version:** 1.1.2
- **License:** MIT
- **Repo:** [yaghobieh/grid-table](https://github.com/yaghobieh/grid-table)

---

## Table of Contents

1. [What We Have](#what-we-have)
2. [New in 1.1.2](#new-in-112)
3. [Highlights by release](#highlights-by-release)
4. [Quick Start](#quick-start)
5. [Links & Resources](#links--resources)

---

## What We Have

### Core

| Feature | Description |
|--------|-------------|
| **Cell editing** | Inline edit with validation (text, number, select, date, boolean). |
| **Filtering** | Column + global filters; `filterType` text/number/date/select/**set**. |
| **Sorting / pagination** | Client or manual (server) modes. |
| **Selection / expansion** | Row selection, expansion, master-detail panels. |
| **Drag & drop** | Column reorder, row reorder, column resize, auto-fit. |

### Enterprise / 1.1.x

| Feature | Description |
|--------|-------------|
| **Range selection** | Drag-select cells; paste; **fill handle** / Ctrl+D fill-down. |
| **exportScope** | `all` \| `filtered` \| `sorted` \| `selected` for export/copy/print. |
| **Infinite scroll** | SSRM-style `onLoadBlock` / `blockSize` / `totalRowCount`. |
| **Column groups** | `columnGroups` + `alignColumnGroups` real colspan headers. |
| **Touch gestures** | Swipe actions + long-press context menu. |
| **Saved views / formulas / row groups** | Named presets, computed columns, pinned group footers. |
| **Virtualize / lazyLoad** | Window virtualization or in-memory batch reveal. |

---

## New in 1.1.2

Release: **2026-07-24**.

- Fill handle + Ctrl/Cmd+D fill-down on range selection (with `enableCellEdit`)
- Touch `swipeActions` and `longPressContextMenu` implemented (not CSS-only)
- Range drag wired to cells end-to-end
- Portal: `/demos/enterprise-grid`, `/demos/infinite-scroll`; column grouping uses real colspan
- API reference + Playwright interaction smoke

---

## Highlights by release

| Version | Focus |
|---------|--------|
| **1.1.2** | Fill handle, touch gestures runtime, enterprise/infinite demos |
| **1.1.1** | exportScope, set/date filters, range paste, infinite scroll, colspan groups, flash cells |
| **1.1.0** | Saved views, filter builder, row groups, formulas, virtualize |
| **1.0.9** | mobileLayout scroll/stacked, manualPagination |
| **1.0.7** | Keyboard nav, context menu, tree, status bar, export suite, pin, print |

---

## Quick Start

```bash
npm install @forgedevstack/grid-table
```

```tsx
import { GridTable } from '@forgedevstack/grid-table';
import '@forgedevstack/grid-table/grid-table.css';

<GridTable data={rows} columns={columns} showPagination />
```

---

## Links & Resources

- Portal demos: [grid-table.com/demos](https://grid-table.com/demos)
- npm: [npmjs.com/package/@forgedevstack/grid-table](https://www.npmjs.com/package/@forgedevstack/grid-table)
- Changelog: see repo `CHANGELOG.md`
- Open roadmap: GitHub milestones / issues
