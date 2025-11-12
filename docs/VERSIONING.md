# Automated Versioning System

## Overview
This QA Playwright portfolio uses an automated versioning system that generates version numbers based on the actual deployment date and time.

## Version Format
- **Format**: `YYYYMMDD_HHMM`
- **Example**: `20251211_1954`
- **Meaning**: 
  - `20251211` = December 11, 2025 (YYYY-MM-DD)
  - `1954` = 19:54 (7:54 PM in 24-hour format)

## How It Works

### 1. Local Development
```bash
# Manually update version
npm run version:update

# Build with automatic version update
npm run build
```

### 2. CI/CD Deployment
The GitHub Actions workflow automatically:
1. Generates version based on UTC deployment time
2. Updates `package.json` version field
3. Builds the application with the new version
4. Displays version on all pages

### 3. Version Display
- **Location**: Bottom-right corner of every page
- **Format**: `v20251211_1954`
- **Style**: Small, unobtrusive gray box

## Files Involved

### Core Files
- `src/utils/version.ts` - Version generation utility
- `src/components/Version.tsx` - Version display component
- `scripts/update-version.sh` - Version update script

### Integration Files
- `package.json` - Contains prebuild script
- `.github/workflows/playwright.yml` - CI/CD version automation
- All page components - Include `<Version />` component

## Benefits
- ✅ **Automatic**: No manual version management required
- ✅ **Accurate**: Shows exact deployment time
- ✅ **Consistent**: Same version across all pages
- ✅ **Traceable**: Easy to identify specific deployments
- ✅ **Professional**: Shows attention to deployment tracking

## Usage Examples

### Current Version Check
Every page displays the current version in the bottom-right corner.

### Build Process
```bash
# The version is automatically updated during build
npm run build

# Example output:
# Generating build version: 20251112.2002
# Build version updated to: 20251112.2002
```

### CI/CD Process
When deployed via GitHub Actions, the version reflects the exact UTC time of deployment, making it easy to correlate issues with specific releases.
