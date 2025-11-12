import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class RegisterPage extends BasePage {
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly confirmPasswordInput: Locator;
    readonly registerButton: Locator;
    readonly generateEmailButton: Locator;
    readonly errorMessage: Locator;
    readonly successMessage: Locator;
    readonly registerForm: Locator;
    readonly loginLink: Locator;
    readonly emailVerificationInfo: Locator;

    constructor(page: Page) {
        super(page, '/register');
        this.nameInput = page.getByTestId('name-input');
        this.emailInput = page.getByTestId('email-input');
        this.passwordInput = page.getByTestId('password-input');
        this.confirmPasswordInput = page.getByTestId('confirm-password-input');
        this.registerButton = page.getByTestId('register-button');
        this.generateEmailButton = page.getByTestId('generate-email-btn');
        this.errorMessage = page.getByTestId('error-message');
        this.successMessage = page.getByTestId('success-message');
        this.registerForm = page.getByTestId('register-form');
        this.loginLink = page.getByRole('link', { name: 'Login here' });
        this.emailVerificationInfo = page.locator('text=Email Verification Demo');
    }

    async register(name: string, email: string, password: string, confirmPassword?: string) {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.confirmPasswordInput.fill(confirmPassword || password);
        await this.registerButton.click();
    }

    async generateTestEmail() {
        await this.generateEmailButton.click();
        return await this.emailInput.inputValue();
    }

    async registerWithMailinatorEmail() {
        const testEmail = await this.generateTestEmail();
        await this.register('Test User', testEmail, 'password123');
        return testEmail;
    }

    async registerWithMismatchedPasswords() {
        await this.register('Test User', 'test@example.com', 'password123', 'differentpassword');
    }

    async registerWithShortPassword() {
        await this.register('Test User', 'test@example.com', '123');
    }

    async verifyRegistrationForm() {
        return await this.registerForm.isVisible();
    }

    async verifyErrorMessage(expectedMessage?: string) {
        await this.errorMessage.waitFor();
        if (expectedMessage) {
            const actualMessage = await this.errorMessage.textContent();
            return actualMessage?.includes(expectedMessage);
        }
        return this.errorMessage.isVisible();
    }

    async verifySuccessMessage(expectedMessage?: string) {
        await this.successMessage.waitFor({ timeout: 10000 });
        if (expectedMessage) {
            const actualMessage = await this.successMessage.textContent();
            return actualMessage?.includes(expectedMessage);
        }
        return this.successMessage.isVisible();
    }

    async verifyEmailVerificationInfo() {
        return this.emailVerificationInfo.isVisible();
    }

    async navigateToLogin() {
        await this.loginLink.click();
        await this.page.waitForURL('/login');
    }

    async fillRegistrationForm(name: string, email: string, password: string, confirmPassword?: string) {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.confirmPasswordInput.fill(confirmPassword || password);
    }

    async submitForm() {
        await this.registerButton.click();
    }

    async isRegisterButtonDisabled() {
        return await this.registerButton.isDisabled();
    }

    async getRegisteredEmail() {
        return await this.emailInput.inputValue();
    }
}
