# Grid Table — ForgeStack Data Grid

**@forgedevstack/grid-table** is a feature-rich React data grid: cell editing, multi-format export, keyboard navigation, context menu, tree data, row reordering, frozen rows, undo/redo, saved views, virtualization, range selection, infinite scroll, column groups, and more. Zero-config SCSS styling. Part of [ForgeStack](https://forgedevstack.com).

- **Live site:** [grid-table.com](https://grid-table.com/)
- **npm:** `@forgedevstack/grid-table` · **Version:** 1.1.4
- **License:** MIT
- **Repo:** [yaghobieh/grid-table](https://github.com/yaghobieh/grid-table)

---

## Table of Contents

1. [What We Have](#what-we-have)
2. [New in 1.1.4](#new-in-114)
3. [Highlights by release](#highlights-by-release)
4. [Quick Start](#quick-start)
5. [Links & Resources](#links--resources)

---

## What We Have

### Core

| Feature | Description |
|--------|-------------|
| **Cell editing** | Inline edit with validation; Tab commits & moves; select-on-focus. |
| **Filtering** | Column + global filters; `filterType` text/number/date/select/**set**. |
| **Sorting / pagination** | Client or manual (server) modes. |
| **Selection / expansion** | Row selection, expansion, master-detail panels. |
| **Drag & drop** | Column reorder, row reorder, column resize, double-click divider autosize. |

### Enterprise / 1.1.x

| Feature | Description |
|--------|-------------|
| **Range selection** | Drag-select; paste; **copy** (Ctrl/Cmd+C); fill handle; Shift+Arrows; Escape clear. |
| **exportScope** | `all` \| `filtered` \| `sorted` \| `selected` for export/copy/print. Empty selected = no-op. |
| **Infinite scroll** | SSRM-style `onLoadBlock` / `blockSize` / `totalRowCount`. |
| **Column groups** | `columnGroups` + `alignColumnGroups` real colspan headers. |
| **Column pin** | Header pin control + sticky edge shadows; context menu pin. |
| **Touch gestures** | Swipe actions + long-press context menu. |
| **Saved views / formulas / row groups** | Named presets, computed columns, pinned group footers. |
| **Virtualize / lazyLoad** | Window virtualization (sliced body rows) or in-memory batch reveal. |

---

## New in 1.1.4

Release: **2026-08-22**.

- Double-click the column resize divider to fit max header/cell string width
- Fix fill handle with virtualize: absolute indexes + pointer retarget after scroll

## New in 1.1.3

Release: **2026-08-08**.

- Fix: `virtualize` renders sliced `bodyRows` (not full `displayData`) with absolute row index offset
- Range copy (Ctrl/Cmd+C) + context menu; Shift+Arrows extend range; Escape clears
- Tab commit/move for cell editing; Enter/F2 select-on-focus
- Export respects column order / hidden columns; empty selected scope is a no-op
- Header pin affordance + pin-edge sticky shadows

---

## Highlights by release

| Version | Focus |
|---------|--------|
| **1.1.3** | Virtualize fix, range copy/keyboard, edit Tab UX, export + pin polish |
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

<GridTable
  data={rows}
  columns={columns}
  virtualize
  rangeSelection={{ enabled: true, enablePaste: true, enableCopy: true, fillHandle: true }}
  enableCellEdit
  keyboardNavigation={{ enabled: true }}
  exportScope="sorted"
/>
```

---

## Links & Resources

- Portal demos: `/demos/enterprise-grid`, `/demos/virtualization`, `/demos/infinite-scroll`
- API reference on the portal `/api`
- Changelog: root `CHANGELOG.md` and portal `/changelog`
