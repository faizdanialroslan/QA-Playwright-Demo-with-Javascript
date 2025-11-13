# Environment Configuration Guide

This guide explains how to configure different environments for testing with Playwright.

## Overview

The project supports multiple environment configurations:
- **Development (DEV)**: Local testing with `localhost:3000`
- **Production (PROD)**: Testing against the live deployed website

## Environment Files

### Available Environment Files

1. **`.env.development`** - Development environment settings
2. **`.env.production`** - Production environment settings  
3. **`.env.example`** - Template file with all available variables

### Environment Variables

| Variable | Description | Dev Default | Prod Default |
|----------|-------------|-------------|--------------|
| `BASE_URL` | Application base URL | `http://localhost:3000` | `https://faizdanialroslan.github.io/QA-Playwright-Demo-with-Javascript` |
| `NODE_ENV` | Node environment | `development` | `production` |
| `TEST_USER_EMAIL` | Test user email | `test@example.com` | `test@example.com` |
| `TEST_USER_PASSWORD` | Test user password | `password123` | `password123` |
| `MAILINATOR_API_TOKEN` | Mailinator API token | `demo-token` | `demo-token` |
| `MAILINATOR_DOMAIN` | Mailinator domain | `mailinator.com` | `mailinator.com` |
| `HEADLESS` | Run browser in headless mode | `true` | `true` |
| `WORKERS` | Number of parallel workers | `2` | `2` |
| `SLOW_MO` | Slow down operations (ms) | `0` | `0` |
| `TIMEOUT` | Global test timeout (ms) | `30000` | `30000` |
| `VIDEO_MODE` | Video recording mode | `retain-on-failure` | `retain-on-failure` |
| `SCREENSHOT_MODE` | Screenshot capture mode | `only-on-failure` | `only-on-failure` |
| `RETRIES` | Number of test retries | `2` | `2` |

### Video Mode Options
- `on` - Record video for all tests
- `off` - Don't record videos
- `retain-on-failure` - Only keep videos for failed tests (recommended)
- `on-first-retry` - Record on first retry

### Screenshot Mode Options
- `on` - Take screenshots of all tests
- `off` - Don't take screenshots
- `only-on-failure` - Only capture screenshots on failure (recommended)

## Setup Instructions

### For Development Testing

1. **Use the default development configuration:**
   ```bash
   npm run test:dev
   ```
   This automatically uses `.env.development` settings.

2. **Or create your own `.env` file:**
   ```bash
   cp .env.example .env
   # Edit .env with your local settings
   npm test
   ```

### For Production Testing

1. **Test against live production site:**
   ```bash
   npm run test:prod
   ```
   This automatically uses `.env.production` settings.

2. **Or customize production settings:**
   - Edit `.env.production` file with your production URL
   - Run `npm run test:prod`

### For CI/CD Testing

In GitHub Actions or other CI environments, the configurations automatically:
- Use CI-specific settings (retries, workers)
- Read environment variables from repository secrets
- Generate test reports and artifacts

## Playwright Configuration Files

### playwright.config.ts (Development)
- Used for: `npm test` or `npm run test:dev`
- Reads from: `.env.development` or `.env`
- Starts local dev server automatically
- Optimized for local development workflow

### playwright.config.prod.ts (Production)
- Used for: `npm run test:prod`
- Reads from: `.env.production`
- Tests against remote production URL
- No local server startup
- Additional production-specific settings (HTTPS handling, longer timeouts)

## Common Scenarios

### Scenario 1: Local Development Testing
```bash
# Start dev server and run tests against localhost:3000
npm run test:dev
```

### Scenario 2: Production Smoke Tests
```bash
# Run tests against live production site
npm run test:prod
```

### Scenario 3: Custom Environment Testing
```bash
# Create custom environment file
cp .env.example .env.staging

# Edit .env.staging with staging URL
# BASE_URL=https://staging.example.com

# Run tests with custom config
BASE_URL=https://staging.example.com npm test
```

### Scenario 4: Debugging Tests
```bash
# Run with headed browser and slow motion
HEADLESS=false SLOW_MO=100 npm run test:dev
```

### Scenario 5: Quick Visual Testing
```bash
# Capture all screenshots and videos
VIDEO_MODE=on SCREENSHOT_MODE=on npm test
```

## Security Best Practices

1. **Never commit sensitive credentials** to `.env` files
2. **Use `.env.local`** for local overrides with real credentials
3. **Store production secrets** in CI/CD secret management (GitHub Secrets)
4. **The `.env.example`** file should only contain placeholder values

## Troubleshooting

### Issue: Tests fail with "Cannot connect to baseURL"

**Solution:** 
- For dev tests: Ensure dev server is running (`npm run dev`)
- For prod tests: Check if production URL is accessible
- Verify `BASE_URL` in your environment file

### Issue: Environment variables not loading

**Solution:**
1. Check file name is correct (`.env.development` or `.env.production`)
2. Ensure no extra spaces in variable definitions
3. Restart your terminal/IDE after changes
4. Run `npm test` with explicit config: `npm run test:dev` or `npm run test:prod`

### Issue: Tests running too slow

**Solution:**
- Reduce `WORKERS` to 1 if resource constrained
- Set `SLOW_MO=0` to disable slow motion
- Set `VIDEO_MODE=off` to disable video recording
- Set `SCREENSHOT_MODE=off` to disable screenshots

### Issue: Want to see browser during testing

**Solution:**
```bash
HEADLESS=false npm run test:dev
```

## Environment File Precedence

When using `playwright.config.ts`:
1. `.env.development` (if exists)
2. `.env` (fallback)
3. Default values in config

When using `playwright.config.prod.ts`:
1. `.env.production`
2. Default values in config

## Additional Resources

- [Playwright Configuration Documentation](https://playwright.dev/docs/test-configuration)
- [Environment Variables in Node.js](https://nodejs.org/en/learn/command-line/how-to-read-environment-variables-from-nodejs)
- [Dotenv Package Documentation](https://github.com/motdotla/dotenv)
