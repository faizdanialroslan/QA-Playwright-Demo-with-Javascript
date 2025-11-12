import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class VerifyEmailPage extends BasePage {
    readonly verifyingStatus: Locator;
    readonly successStatus: Locator;
    readonly errorStatus: Locator;
    readonly demoTokenInfo: Locator;

    constructor(page: Page) {
        super(page, '/verify-email');
        this.verifyingStatus = page.getByTestId('verifying-status');
        this.successStatus = page.getByTestId('success-status');
        this.errorStatus = page.getByTestId('error-status');
        this.demoTokenInfo = page.locator('text=For Demo Purposes');
    }

    async verifyEmailWithToken(token: string) {
        await this.page.goto(`/verify-email?token=${token}`);
    }

    async verifyEmailWithValidToken() {
        await this.verifyEmailWithToken('valid-token');
    }

    async verifyEmailWithInvalidToken() {
        await this.verifyEmailWithToken('invalid-token');
    }

    async isVerifying() {
        return await this.verifyingStatus.isVisible();
    }

    async isVerificationSuccessful() {
        await this.successStatus.waitFor({ timeout: 10000 });
        return await this.successStatus.isVisible();
    }

    async isVerificationFailed() {
        await this.errorStatus.waitFor({ timeout: 10000 });
        return await this.errorStatus.isVisible();
    }

    async getSuccessMessage() {
        return await this.successStatus.textContent();
    }

    async getErrorMessage() {
        return await this.errorStatus.textContent();
    }

    async verifyDemoTokenInfo() {
        return await this.demoTokenInfo.isVisible();
    }

    async waitForRedirectToLogin() {
        await this.page.waitForURL('/login', { timeout: 5000 });
    }
}
