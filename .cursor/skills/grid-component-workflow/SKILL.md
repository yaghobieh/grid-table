---
name: grid-component-workflow
description: Workflow for adding or changing Grid Table components and portal demos.
---

# Grid Table Component Workflow

## Library component

1. Create folder: `src/components/Name/`
2. Add `Name.types.ts`, `Name.const.ts`, `Name.tsx`, `index.ts`
3. Export from `src/components/index.ts` and `src/index.ts`
4. Add SCSS in `src/styles/components/_name.scss` if needed
5. Run `npm run typecheck && npm run build`

## Portal demo page

1. Create `portal/src/pages/DemoName/` with `DemoName.tsx`, `DemoName.const.ts`, `index.ts`
2. Add route in `portal/src/App.tsx`
3. Add entry in `portal/src/constants/content.const.ts` (`DEMOS`)
4. Add i18n keys in `en.ts`, `es.ts`, `he.ts`
5. Use `Layout`, `useGridTableThemeMode`, `useI18n`, `DemoCodeSection` for copyable code
6. Wire demo to **real** library props — no fake APIs

## Portal docs page

1. Add markdown block in `portal/src/constants/docs.const.ts`
2. Register in `DOC_CONTENT_MAP` and `DOC_SECTIONS` in `content.const.ts`
3. Link to live demo from doc body

## Changelog

1. Update root `CHANGELOG.md`
2. Add version to `portal/src/constants/content.const.ts` (`VERSIONS`)
3. Add i18n highlights in `changelog.versions` for en/es/he
4. Bump `CURRENT_VERSION` in `numbers.const.ts`

## One component per `.tsx`

Extract sub-components to their own folder when reused or when the parent file exceeds ~150 lines.
