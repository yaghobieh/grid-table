# Publishing Guide

This guide explains how to publish `@forgestack/grid-table` to npm using GitHub Actions.

## Prerequisites

1. **NPM Token**: You need an npm access token with publish permissions for the `@forgestack` scope.
   - **For Organization/Team**: If you're using an npm organization, create a token from your organization's settings
     - Go to: https://www.npmjs.com/settings/YOUR_ORG/tokens
     - Create an "Automation" token (recommended for CI/CD)
   - **For Personal Account**: Create a token at: https://www.npmjs.com/settings/YOUR_USERNAME/tokens
   - Make sure it has "Automation" or "Publish" permissions
   - Add it as a GitHub secret named `NPM_TOKEN` in your repository settings

2. **Package Access**: The package is configured to publish as **public** (free). 
   - If you want to publish as **private** (requires paid npm plan), you can modify the workflow to use `--access restricted` instead of `--access public`
   - Public packages are free and can be installed by anyone
   - Private packages require users to authenticate and have access to your organization

3. **GitHub Repository**: Make sure your repository is connected to GitHub and the workflow file is committed.

## Publishing Methods

### Method 1: Using Git Tags (Recommended)

This is the recommended approach as it automatically creates GitHub releases.

1. **Update the version in `package.json`**:
   ```bash
   npm version patch   # for 0.1.0 -> 0.1.1
   # or
   npm version minor   # for 0.1.0 -> 0.2.0
   # or
   npm version major   # for 0.1.0 -> 1.0.0
   ```

2. **Update CHANGELOG.md** with the changes for this version.

3. **Commit and push the changes**:
   ```bash
   git add package.json package-lock.json CHANGELOG.md
   git commit -m "chore: bump version to X.Y.Z"
   git push
   ```

4. **Create and push a version tag**:
   ```bash
   git tag vX.Y.Z
   git push origin vX.Y.Z
   ```

5. **GitHub Actions will automatically**:
   - Build the package
   - Run type checks
   - Publish to npm
   - Create a GitHub release

### Method 2: Manual Workflow Dispatch

You can also trigger the workflow manually from GitHub Actions:

1. Go to the "Actions" tab in your GitHub repository
2. Select the "Publish to npm" workflow
3. Click "Run workflow"
4. Choose the version type (patch, minor, or major)
5. Click "Run workflow"

**Note**: This method will bump the version automatically but won't create a git tag. You'll need to manually tag and create a release if desired.

## Workflow Steps

The GitHub Actions workflow performs the following steps:

1. ✅ Checks out the code
2. ✅ Sets up Node.js 20
3. ✅ Installs dependencies (`npm ci`)
4. ✅ Runs type checking (`npm run typecheck`)
5. ✅ Runs linting (`npm run lint`) - non-blocking
6. ✅ Builds the package (`npm run build`)
7. ✅ Verifies version matches tag (if tag triggered)
8. ✅ Publishes to npm (`npm publish --access public`)
9. ✅ Creates GitHub release (if tag triggered)

## Troubleshooting

### "Package version doesn't match tag version"

This error occurs when you push a tag but the `package.json` version doesn't match. Make sure to:
1. Update `package.json` version first
2. Commit the change
3. Then create and push the tag

### "NPM_TOKEN not found"

Make sure you've added the `NPM_TOKEN` secret in your GitHub repository:
1. Go to Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Name: `NPM_TOKEN`
4. Value: Your npm access token

### Publishing fails with authentication error

- Verify your npm token has the correct permissions
- Make sure the token is for the correct npm account/organization
- For scoped packages (`@forgestack/grid-table`), ensure you have access to publish under that scope
- If using an organization token, make sure you're a member with publish permissions

### "402 Payment Required" error

This error occurs when trying to publish a scoped package as private without a paid npm plan. The workflow is configured to publish as **public** (free). If you see this error:

- Make sure you're using `--access public` when publishing locally
- The GitHub Actions workflow already includes `--access public`
- If you want private packages, you need a paid npm plan and should use `--access restricted` instead

## Local Publishing (Testing)

To test publishing locally before using GitHub Actions:

```bash
# Build the package
npm run build

# Publish (dry-run first to test)
npm publish --dry-run --access public

# If everything looks good, publish for real
npm publish --access public
```

## Version Management

The package uses semantic versioning (semver):
- **Patch** (0.1.0 → 0.1.1): Bug fixes
- **Minor** (0.1.0 → 0.2.0): New features (backward compatible)
- **Major** (0.1.0 → 1.0.0): Breaking changes

Always update `CHANGELOG.md` when publishing a new version.

