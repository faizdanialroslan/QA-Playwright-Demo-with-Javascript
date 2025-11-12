import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

// Read environment variables from .env.production file
dotenv.config({ path: '.env.production' });

/**
 * Production Playwright Configuration
 * Used for testing against live production environment
 */
export default defineConfig({
    testDir: './tests',
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 1,
    /* Opt out of parallel tests on CI - use sharding instead for better resource management */
    workers: process.env.CI ? 2 : 1,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: [
        ['html', { outputFolder: 'test-results/prod-html' }],
        ['json', { outputFile: 'test-results/prod-results.json' }],
        ['junit', { outputFile: 'test-results/prod-junit.xml' }],
        ['github'] // For GitHub Actions
    ],

    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Base URL to use in actions like `await page.goto('/')`. */
        baseURL: process.env.BASE_URL || 'https://faizdanialroslan.github.io/QA-Playwright-Demo-with-Javascript',

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'on-first-retry',

        /* Capture screenshot on failure */
        screenshot: 'only-on-failure',

        /* Capture video on failure */
        video: 'retain-on-failure',

        /* Production-specific settings */
        ignoreHTTPSErrors: true,
        actionTimeout: 10000,
        navigationTimeout: 30000
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
        }
    ],

    /* Run your local dev server before starting the tests - disabled for production */
    // webServer: undefined
});
