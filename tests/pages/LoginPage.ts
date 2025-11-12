import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;
    readonly loginForm: Locator;
    readonly registerLink: Locator;
    readonly demoCredentials: Locator;

    constructor(page: Page) {
        super(page, '/login');
        this.emailInput = page.getByTestId('email-input');
        this.passwordInput = page.getByTestId('password-input');
        this.loginButton = page.getByTestId('login-button');
        this.errorMessage = page.getByTestId('error-message');
        this.loginForm = page.getByTestId('login-form');
        this.registerLink = page.getByRole('link', { name: 'Register here' });
        this.demoCredentials = page.locator('text=Demo Credentials');
    }

    async login(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async loginWithValidCredentials() {
        await this.login(process.env.TEST_USER_EMAIL || 'test@example.com',
            process.env.TEST_USER_PASSWORD || 'password123');
    }

    async loginWithInvalidCredentials() {
        await this.login('invalid@example.com', 'wrongpassword');
    }

    async verifyLoginForm() {
        return await this.loginForm.isVisible();
    }

    async verifyErrorMessage(expectedMessage?: string) {
        await this.errorMessage.waitFor();
        if (expectedMessage) {
            const actualMessage = await this.errorMessage.textContent();
            return actualMessage?.includes(expectedMessage);
        }
        return this.errorMessage.isVisible();
    }

    async verifyDemoCredentials() {
        return this.demoCredentials.isVisible();
    }

    async navigateToRegister() {
        await this.registerLink.click();
        await this.page.waitForURL('/register');
    }

    async waitForLoginSuccess() {
        // Wait for redirect to dashboard
        await this.page.waitForURL('/dashboard');
    }

    async fillEmailField(email: string) {
        await this.emailInput.fill(email);
    }

    async fillPasswordField(password: string) {
        await this.passwordInput.fill(password);
    }

    async submitForm() {
        await this.loginButton.click();
    }

    async isLoginButtonDisabled() {
        return await this.loginButton.isDisabled();
    }

    async getLoginButtonText() {
        return await this.loginButton.textContent();
    }
}
