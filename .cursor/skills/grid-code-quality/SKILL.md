---
name: grid-code-quality
description: Grid Table code quality — types in type files, constants in const files, logic-first checks.
---

# Grid Table Code Quality

## Types

- All interfaces and type aliases in `*.types.ts`
- Use `import type` for type-only imports
- No `any` — use `unknown` when needed
- Component props live in the component `*.types.ts`, not inline in the TSX

## Constants

- Magic numbers → `numbers.const.ts` or feature `*.const.ts`
- Magic strings → `strings.const.ts` or feature `*.const.ts`
- BEM / class strings → component `*.const.ts`
- Shared empty / separators / glyphs → `strings.const.ts` (`EMPTY_STRING`, `VALUE_SEPARATOR`, `LIST_SEPARATOR`, `VERTICAL_MENU_GLYPH`)
- Shared counts → `numbers.const.ts` (`ZERO`, `ONE`, `TWO`, …)
- Do **not** add a const of a const (`export const X = EXISTING_CONST`). Use `FILTER_TREE_OP_AND`, `FILTER_OP_CONTAINS`, `KEY_ENTER`, `EMPTY_STRING`, `ZERO` directly

## Logic

- Prefer logic-first checks over unnecessary `useMemo` / `useCallback`
- Keep `TableContext` computed pipeline pure in `useMemo`
- Export utilities in `src/utils/` — one concern per file
- Function signature takes `props` (`function X(props: Props)`), then read fields from `props` or destructure inside
- Do not alias a derived value used only once — inline it
- No if/else trees in JSX — use a keymap or a helper function
- Split heavy commit / parse / width logic into small utils; compose with HOFs from hooks

## Components

- **One component per `.tsx` file**
- Extra UI pieces go under the component folder: `helpers/Name.tsx` + `helpers/index.ts`
- Fragments (`<>`) are not allowed for layout — use a real `div` with a class
- Prefer Bear primitives: `Button`, `Chip`, `Input`, `Select`, `Skeleton`, `BearIcons`
- No raw `×` / glyph buttons when a Bear icon or Chip `onDelete` exists

## Hooks

- When a component has several `useState` / `useEffect` / `useCallback` values, extract `hooks/useX.ts` under that component folder
- Hook files include JSDoc on the exported hook
- Barrel: `hooks/index.ts`

## Imports

- Library: `@/`, `@constants/`, `@hooks/`, `@utils/`, `@context/`, `@components/`
- No `../../` relative imports — use the alias
- Portal: `@/`, `@components/`, `@constants/`, `@hooks/`, `@i18n/`

## Portal

- No hardcoded UI strings in TSX — `useI18n()` only
- Demo data in `*.const.ts` or `portal/src/data/`
- Code samples in `*.code.const.ts`

## Local package link

- Portal depends on `@forgedevstack/grid-table` via `file:..`
- Do **not** alias the package to `../src` in Vite — that breaks the CSS subpath
- After library changes, `npm run build` so portal reads `dist/`
