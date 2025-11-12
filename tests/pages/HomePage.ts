import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
    readonly welcomeHeading: Locator;
    readonly portfolioFeatures: Locator;
    readonly todoAppLink: Locator;
    readonly loginLink: Locator;
    readonly registerLink: Locator;
    readonly techStackSection: Locator;

    constructor(page: Page) {
        super(page, '/');
        this.welcomeHeading = page.getByRole('heading', { name: 'QA Playwright Test Automation Portfolio' });
        this.portfolioFeatures = page.locator('.card');
        this.todoAppLink = page.getByRole('link', { name: 'Try Todo App' });
        this.loginLink = page.getByRole('link', { name: 'Try Login' });
        this.registerLink = page.getByRole('link', { name: 'Try Registration' });
        this.techStackSection = page.locator('text=Tech Stack:');
    }

    async verifyHomePage() {
        await this.welcomeHeading.waitFor();
        return this.welcomeHeading.isVisible();
    }

    async verifyPortfolioFeatures() {
        const features = await this.portfolioFeatures.count();
        return features >= 4; // Should have at least 4 feature cards
    }

    async navigateToTodos() {
        await this.todoAppLink.click();
        await this.page.waitForURL('/todos');
    }

    async navigateToLogin() {
        await this.loginLink.click();
        await this.page.waitForURL('/login');
    }

    async navigateToRegister() {
        await this.registerLink.click();
        await this.page.waitForURL('/register');
    }

    async verifyTechStack() {
        return this.techStackSection.isVisible();
    }

    async getFeatureTexts() {
        return await this.portfolioFeatures.allTextContents();
    }
}
