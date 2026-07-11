---
name: grid-code-quality
description: Grid Table code quality — types in type files, constants in const files, logic-first checks.
---

# Grid Table Code Quality

## Types

- All interfaces and type aliases in `*.types.ts`
- Use `import type` for type-only imports
- No `any` — use `unknown` when needed

## Constants

- Magic numbers → `numbers.const.ts` or feature `*.const.ts`
- Magic strings → `strings.const.ts` or feature `*.const.ts`
- BEM / class strings → component `*.const.ts`

## Logic

- Prefer logic-first checks over unnecessary `useMemo` / `useCallback`
- Keep `TableContext` computed pipeline pure in `useMemo`
- Export utilities in `src/utils/` — one concern per file

## Portal

- No hardcoded UI strings in TSX — `useI18n()` only
- Demo data in `*.const.ts` or `portal/src/data/`
- Code samples in `*.code.const.ts`

## Imports

- Library: `@/`, `@constants/`, `@hooks/`, `@utils/`
- Portal: `@/`, `@components/`, `@constants/`, `@hooks/`, `@i18n/`
