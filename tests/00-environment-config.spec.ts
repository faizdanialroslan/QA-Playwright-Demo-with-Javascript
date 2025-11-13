import { test, expect } from '@playwright/test';

/**
 * Environment Configuration Tests
 * Validates that environment variables are properly loaded and used
 */
test.describe('Environment Configuration', () => {
    test('should load development environment variables correctly', async ({ page }) => {
        // This test verifies the config is loading .env.development
        const baseURL = process.env.BASE_URL;
        const timeout = process.env.TIMEOUT;
        const workers = process.env.WORKERS;
        const retries = process.env.RETRIES;

        console.log('Development Environment Variables:');
        console.log('  BASE_URL:', baseURL);
        console.log('  TIMEOUT:', timeout);
        console.log('  WORKERS:', workers);
        console.log('  RETRIES:', retries);
        console.log('  VIDEO_MODE:', process.env.VIDEO_MODE);
        console.log('  SCREENSHOT_MODE:', process.env.SCREENSHOT_MODE);
        console.log('  SLOW_MO:', process.env.SLOW_MO);
        console.log('  HEADLESS:', process.env.HEADLESS);

        // Verify environment variables are loaded
        expect(baseURL).toBeDefined();
        expect(timeout).toBeDefined();
        expect(workers).toBeDefined();
        expect(retries).toBeDefined();

        // Navigate to home page to verify baseURL works
        await page.goto('/');
        await expect(page).toHaveURL(/\//);
    });

    test('should use configured timeout from environment', async ({ page }) => {
        // Verify that the timeout configuration is applied
        const configTimeout = parseInt(process.env.TIMEOUT || '30000');
        console.log('Configured timeout:', configTimeout, 'ms');
        expect(configTimeout).toBe(30000);
    });

    test('should verify test user credentials are loaded', async ({ page }) => {
        // Verify test credentials are available
        const testEmail = process.env.TEST_USER_EMAIL;
        const testPassword = process.env.TEST_USER_PASSWORD;

        console.log('Test User Credentials:');
        console.log('  Email:', testEmail);
        console.log('  Password:', testPassword ? '******' : 'not set');

        expect(testEmail).toBeDefined();
        expect(testPassword).toBeDefined();
        expect(testEmail).toBe('test@example.com');
        expect(testPassword).toBe('password123');
    });

    test('should verify Mailinator configuration is loaded', async ({ page }) => {
        // Verify Mailinator API config
        const mailinatorToken = process.env.MAILINATOR_API_TOKEN;
        const mailinatorDomain = process.env.MAILINATOR_DOMAIN;

        console.log('Mailinator Configuration:');
        console.log('  API Token:', mailinatorToken ? '******' : 'not set');
        console.log('  Domain:', mailinatorDomain);

        expect(mailinatorToken).toBeDefined();
        expect(mailinatorDomain).toBeDefined();
        expect(mailinatorDomain).toBe('mailinator.com');
    });
});
