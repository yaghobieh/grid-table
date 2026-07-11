#!/usr/bin/env bash
set -e

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PORTAL="$ROOT/portal"

echo ""
echo "╔══════════════════════════════════════════╗"
echo "║   Grid Table Pre-Commit Quality Check    ║"
echo "╚══════════════════════════════════════════╝"
echo ""

TYPECHECK_EXIT=0
BUILD_EXIT=0
PORTAL_TC_EXIT=0
E2E_EXIT=0

echo "► Step 1/4 — Library TypeScript"
TYPECHECK_OUTPUT=$(cd "$ROOT" && npm run typecheck 2>&1) || TYPECHECK_EXIT=$?
if [ $TYPECHECK_EXIT -ne 0 ]; then
  echo "  ✗ Library typecheck failed"
  echo "$TYPECHECK_OUTPUT" | tail -15
else
  echo "  ✓ Library typecheck passed"
fi

TC_LIB_ESCAPED=$(echo "$TYPECHECK_OUTPUT" | head -20 | sed 's/"/\\"/g')
TC_LIB_JSON='{"exitCode":'"$TYPECHECK_EXIT"',"output":"'"$TC_LIB_ESCAPED"'"}'

echo ""
echo "► Step 2/4 — Library build"
BUILD_OUTPUT=$(cd "$ROOT" && npm run build 2>&1) || BUILD_EXIT=$?
if [ $BUILD_EXIT -ne 0 ]; then
  echo "  ✗ Build failed"
  echo "$BUILD_OUTPUT" | tail -15
else
  echo "  ✓ Build passed"
fi

BUILD_ESCAPED=$(echo "$BUILD_OUTPUT" | tail -5 | sed 's/"/\\"/g')
BUILD_JSON='{"exitCode":'"$BUILD_EXIT"',"output":"'"$BUILD_ESCAPED"'"}'

echo ""
echo "► Step 3/4 — Portal TypeScript"
PORTAL_TC_OUTPUT=$(cd "$PORTAL" && npx tsc --noEmit 2>&1) || PORTAL_TC_EXIT=$?
if [ $PORTAL_TC_EXIT -ne 0 ]; then
  echo "  ✗ Portal typecheck failed"
  echo "$PORTAL_TC_OUTPUT" | tail -15
else
  echo "  ✓ Portal typecheck passed"
fi

TC_PORTAL_ESCAPED=$(echo "$PORTAL_TC_OUTPUT" | head -20 | sed 's/"/\\"/g')
TC_PORTAL_JSON='{"exitCode":'"$PORTAL_TC_EXIT"',"output":"'"$TC_PORTAL_ESCAPED"'"}'

echo ""
echo "► Step 4/4 — Playwright portal sanity"
E2E_OUTPUT=$(cd "$PORTAL" && npx playwright test --config=e2e/playwright.config.cjs 2>&1) || E2E_EXIT=$?
if [ $E2E_EXIT -ne 0 ]; then
  echo "  ✗ Playwright tests failed"
  echo "$E2E_OUTPUT" | tail -20
else
  echo "  ✓ Playwright tests passed"
fi

echo ""
echo "► Generating Sanity report..."
node "$PORTAL/e2e/scripts/generate-report.mjs" \
  --typecheck "$TC_LIB_JSON" \
  --build "$BUILD_JSON" \
  --portaltypecheck "$TC_PORTAL_JSON" || true

echo ""
echo "╔══════════════════════════════════════════╗"
echo "║              Summary                     ║"
echo "╚══════════════════════════════════════════╝"
[ $TYPECHECK_EXIT -eq 0 ]   && echo "  ✓ Library TypeScript" || echo "  ✗ Library TypeScript"
[ $BUILD_EXIT -eq 0 ]        && echo "  ✓ Library Build"      || echo "  ✗ Library Build"
[ $PORTAL_TC_EXIT -eq 0 ]    && echo "  ✓ Portal TypeScript"  || echo "  ✗ Portal TypeScript"
[ $E2E_EXIT -eq 0 ]          && echo "  ✓ Playwright E2E"     || echo "  ✗ Playwright E2E"
echo ""

TOTAL_EXIT=$(( TYPECHECK_EXIT + BUILD_EXIT + PORTAL_TC_EXIT + E2E_EXIT ))
if [ $TOTAL_EXIT -ne 0 ]; then
  echo "  ❌ Pre-commit checks FAILED. Fix the issues above before committing."
  echo ""
  exit 1
fi

echo "  ✅ All checks passed. Proceeding with commit."
echo ""
