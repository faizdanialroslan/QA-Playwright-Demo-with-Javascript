# Environment Configuration Comparison

## Quick Reference

| Configuration | File | Use Case | Command |
|--------------|------|----------|---------|
| **Development** | `.env.development` | Local testing with dev server | `npm run test:dev` |
| **Production** | `.env.production` | Testing against live site | `npm run test:prod` |
| **Custom** | `.env` | Your custom overrides | `npm test` |

## Environment Comparison

### Development Environment (.env.development)

```bash
BASE_URL=http://localhost:3000
NODE_ENV=development
TEST_USER_EMAIL=test@example.com
TEST_USER_PASSWORD=password123
MAILINATOR_API_TOKEN=demo-token
MAILINATOR_DOMAIN=mailinator.com
HEADLESS=true
WORKERS=2
SLOW_MO=0
TIMEOUT=30000
VIDEO_MODE=retain-on-failure
SCREENSHOT_MODE=only-on-failure
RETRIES=2
```

**Features:**
- ✅ Automatically starts local dev server
- ✅ Fast test execution with hot reload
- ✅ Ideal for development and debugging
- ✅ Full access to dev tools and React DevTools
- ✅ Tests run against `localhost:3000`

**Best for:**
- Writing new tests
- Debugging failing tests
- Local development
- Feature testing before deployment

### Production Environment (.env.production)

```bash
BASE_URL=https://faizdanialroslan.github.io/QA-Playwright-Demo-with-Javascript
NODE_ENV=production
TEST_USER_EMAIL=test@example.com
TEST_USER_PASSWORD=password123
MAILINATOR_API_TOKEN=demo-token
MAILINATOR_DOMAIN=mailinator.com
HEADLESS=true
WORKERS=2
SLOW_MO=0
TIMEOUT=30000
VIDEO_MODE=retain-on-failure
SCREENSHOT_MODE=only-on-failure
RETRIES=2
VITE_APP_TITLE=QA Playwright Portfolio
VITE_APP_VERSION=20251112_2144
```

**Features:**
- ✅ Tests against live production site
- ✅ No local server needed
- ✅ Validates real-world deployment
- ✅ Catches production-only issues
- ✅ HTTPS handling enabled

**Best for:**
- Smoke testing after deployment
- Validating production releases
- End-to-end integration testing
- Performance benchmarking
- Production monitoring

## Configuration Variables Explained

### Core Settings

| Variable | Description | Dev Value | Prod Value |
|----------|-------------|-----------|------------|
| `BASE_URL` | Application URL | `http://localhost:3000` | `https://faizdanialroslan.github.io/...` |
| `NODE_ENV` | Environment mode | `development` | `production` |

### Test Configuration

| Variable | Description | Default | Options |
|----------|-------------|---------|---------|
| `WORKERS` | Parallel test workers | `2` | `1-8` |
| `TIMEOUT` | Test timeout (ms) | `30000` | Any positive number |
| `RETRIES` | Failed test retries | `2` | `0-3` |
| `HEADLESS` | Run without UI | `true` | `true/false` |
| `SLOW_MO` | Slow down (ms) | `0` | `0-1000` |

### Recording Settings

| Variable | Description | Default | Options |
|----------|-------------|---------|---------|
| `VIDEO_MODE` | Video recording | `retain-on-failure` | `on`, `off`, `retain-on-failure`, `on-first-retry` |
| `SCREENSHOT_MODE` | Screenshot capture | `only-on-failure` | `on`, `off`, `only-on-failure` |

### Test Credentials

| Variable | Description | Value |
|----------|-------------|-------|
| `TEST_USER_EMAIL` | Test account email | `test@example.com` |
| `TEST_USER_PASSWORD` | Test account password | `password123` |
| `MAILINATOR_API_TOKEN` | Email testing API key | `demo-token` |
| `MAILINATOR_DOMAIN` | Email domain | `mailinator.com` |

## Usage Examples

### Running Development Tests

```bash
# Run all tests with dev config
npm run test:dev

# Run specific test file
npx playwright test --config=playwright.config.ts tests/01-basic-ui-tests.spec.ts

# Run with headed browser
HEADLESS=false npm run test:dev

# Run with slow motion for debugging
SLOW_MO=100 npm run test:dev

# Run with all screenshots and videos
VIDEO_MODE=on SCREENSHOT_MODE=on npm run test:dev
```

### Running Production Tests

```bash
# Run all tests against production
npm run test:prod

# Run specific test suite
npx playwright test --config=playwright.config.prod.ts tests/01-basic-ui-tests.spec.ts

# Run with custom workers
WORKERS=4 npm run test:prod

# Run with increased timeout
TIMEOUT=60000 npm run test:prod
```

### Custom Environment

```bash
# Create custom .env file
cp .env.example .env

# Edit .env with your settings
# BASE_URL=https://staging.example.com
# WORKERS=4
# TIMEOUT=60000

# Run with custom config
npm test
```

## Playwright Configuration Files

### playwright.config.ts (Development)
- **Loads:** `.env.development` then `.env`
- **Server:** Starts local Vite dev server
- **URL:** `http://localhost:3000`
- **Purpose:** Local development and testing

### playwright.config.prod.ts (Production)
- **Loads:** `.env.production`
- **Server:** No local server (tests remote URL)
- **URL:** `https://faizdanialroslan.github.io/QA-Playwright-Demo-with-Javascript`
- **Purpose:** Production validation and monitoring

## Troubleshooting

### Dev server won't start
```bash
# Check if port 3000 is in use
lsof -i :3000

# Kill process using port
kill -9 <PID>

# Or use different port
BASE_URL=http://localhost:3001 npm run dev
```

### Tests fail with timeout
```bash
# Increase timeout
TIMEOUT=60000 npm run test:dev

# Or reduce workers
WORKERS=1 npm run test:dev
```

### Want to see browser during tests
```bash
HEADLESS=false npm run test:dev
```

### Need slower execution for debugging
```bash
SLOW_MO=500 npm run test:dev
```

## CI/CD Integration

In GitHub Actions, environment variables are set differently:

```yaml
- name: Run Tests
  env:
    BASE_URL: ${{ secrets.BASE_URL }}
    MAILINATOR_API_TOKEN: ${{ secrets.MAILINATOR_TOKEN }}
  run: npm test
```

The configs automatically detect CI environment and adjust settings accordingly.

## Security Notes

- ✅ `.env.development` and `.env.production` are committed (safe, use demo values)
- ✅ `.env.example` is committed as a template
- ❌ `.env` is gitignored (for local secrets)
- ❌ `.env.local` is gitignored (for local overrides)
- ❌ Never commit real API keys or passwords

## Additional Resources

- [Complete Environment Guide](./ENVIRONMENT.md)
- [Playwright Documentation](https://playwright.dev)
- [Repository README](./README.md)
