import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

// Read environment variables from .env.development or .env file
dotenv.config({ path: '.env.development' });
dotenv.config(); // Fallback to .env if .env.development doesn't exist

/**
 * Development Playwright Configuration
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only or use RETRIES from env */
  retries: process.env.CI ? 2 : parseInt(process.env.RETRIES || '0'),
  /* Opt out of parallel tests on CI - use sharding instead for better resource management */
  workers: process.env.CI ? 2 : parseInt(process.env.WORKERS || '2'),
  /* Global timeout for tests */
  timeout: parseInt(process.env.TIMEOUT || '30000'),
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['github']
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: process.env.BASE_URL || 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    video: (process.env.VIDEO_MODE as 'on' | 'off' | 'retain-on-failure' | 'on-first-retry') || 'retain-on-failure',
    screenshot: (process.env.SCREENSHOT_MODE as 'on' | 'off' | 'only-on-failure') || 'only-on-failure',

    /* Accept downloads and enable cookies */
    acceptDownloads: true,
    storageState: undefined, // Don't inherit storage state between tests
    
    /* Slow down operations by specified milliseconds */
    launchOptions: {
      slowMo: parseInt(process.env.SLOW_MO || '0'),
      headless: process.env.HEADLESS === 'true',
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
