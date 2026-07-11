---
name: grid-table-code-review
description: Structured code review for Grid Table — hooks, context, portal demos, file layout. Use when the user says /grid-table-code-review.
---

# Grid Table Code Review

## When to use

- User invokes `/grid-table-code-review`
- Reviewing a component or demo before merge
- Refactoring legacy Grid Table code

## File layout

| Concern | Location |
|---------|----------|
| Props & interfaces | `Name.types.ts` |
| Constants | `Name.const.ts` |
| Utilities | `Name.utils.ts` |
| Main render | `Name.tsx` |
| Barrel | `index.ts` |

Portal demo pages: `DemoName.tsx`, `DemoName.const.ts`, `DemoName.types.ts`, optional `DemoName.code.const.ts`.

## Component signature

Prefer a single `props` parameter — destructure inside the body.

## Hooks rules

- Never call hooks conditionally
- Extract multi-hook logic into `use{Name}.ts`
- `GridTableContent` must run the same hooks before loading/error early returns

## Code quality gates

| Gate | Rule |
|------|------|
| G1 | No magic strings/numbers — use `*.const.ts` |
| G2 | No inline demo arrays in portal TSX — use `*.const.ts` |
| G3 | All portal UI copy via i18n (`useI18n`) |
| G4 | One component per `.tsx` |
| G5 | `clsx` for conditional classes |
| G6 | Path aliases (`@/`, `@constants/`) — no deep `../../` |
| G7 | Portal demos use real `GridTable` APIs |
| G8 | Types in `*.types.ts`, never inline interfaces in logic files |
| G9 | Barrel `index.ts` in every folder |
| G10 | Build gates: `typecheck`, `build`, portal sanity |

## Review levels

1. **Must fix** — hooks violations, broken a11y, G1/G7/G8 failures
2. **Should fix** — file layout, i18n gaps, G2/G4/G6
3. **Nice to have** — naming, minor extraction

After listing issues, apply fixes unless the user asked for review-only.
