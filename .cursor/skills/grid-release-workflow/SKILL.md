---
name: grid-release-workflow
description: Grid Table release workflow — version bump, CHANGELOG, build, portal, sanity, publish.
---

# Grid Table Release Workflow

## Pre-release

1. Run `npm run sanity` — must pass (typecheck, build, portal Playwright)
2. Review `Sanity/sanity-release-{version}.md`
3. Update `CHANGELOG.md` with Added/Changed/Fixed/Portal sections
4. Bump version in `package.json` and `portal/package.json` if needed
5. Update `portal/src/constants/numbers.const.ts` (`CURRENT_VERSION`)
6. Update portal changelog i18n (en, es, he)

## Build

```bash
npm run build
npm run portal:build
```

## Publish (only when user approves)

```bash
npm publish --access public
```

ForgeStack CI auto-bumps patch on push to `main` if using the standard publish workflow.

## Portal deploy

Portal builds via `vercel-build` script. Verify demos and docs routes after deploy.

## Do not

- Commit or push without explicit user approval
- Skip sanity report generation
