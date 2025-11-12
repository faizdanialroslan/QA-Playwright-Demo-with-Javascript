import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
    readonly welcomeMessage: Locator;
    readonly accountStatus: Locator;
    readonly dashboardCards: Locator;
    readonly gotoTodosButton: Locator;
    readonly mailinatorButton: Locator;
    readonly logoutButton: Locator;
    readonly sessionInfo: Locator;
    readonly securityFeatures: Locator;

    constructor(page: Page) {
        super(page, '/dashboard');
        this.welcomeMessage = page.locator('.dashboard-header h1');
        this.accountStatus = page.locator('text=Account Status');
        this.dashboardCards = page.locator('.dashboard-card');
        this.gotoTodosButton = page.getByTestId('goto-todos-btn');
        this.mailinatorButton = page.getByTestId('mailinator-btn');
        this.logoutButton = page.getByTestId('logout-btn');
        this.sessionInfo = page.locator('text=Session Information');
        this.securityFeatures = page.locator('text=Security Features Tested');
    }

    async verifyDashboard() {
        return await this.welcomeMessage.isVisible();
    }

    async verifyWelcomeMessage(expectedUser?: string) {
        const message = await this.welcomeMessage.textContent();
        return expectedUser ? message?.includes(expectedUser) : message?.includes('Welcome back');
    }

    async verifyAccountStatus() {
        return await this.accountStatus.isVisible();
    }

    async getDashboardCardCount() {
        return await this.dashboardCards.count();
    }

    async navigateToTodos() {
        await this.gotoTodosButton.click();
        await this.page.waitForURL('/todos');
    }

    async openMailinator() {
        // Note: This will open in a new tab, but we won't follow it in tests
        await this.mailinatorButton.click();
    }

    async logout() {
        await this.logoutButton.click();
        await this.page.waitForURL('/');
    }

    async verifySessionInfo() {
        return await this.sessionInfo.isVisible();
    }

    async verifySecurityFeatures() {
        return await this.securityFeatures.isVisible();
    }

    async getCardTitles() {
        const cards = this.dashboardCards;
        const titles: string[] = [];
        const count = await cards.count();

        for (let i = 0; i < count; i++) {
            const card = cards.nth(i);
            const title = await card.locator('h3').textContent();
            if (title) titles.push(title);
        }

        return titles;
    }

    async verifyUserInfo(email: string) {
        const accountCard = this.dashboardCards.filter({ hasText: 'Account Status' });
        const cardText = await accountCard.textContent();
        return cardText?.includes(email);
    }

    async isUserVerified() {
        const accountCard = this.dashboardCards.filter({ hasText: 'Account Status' });
        const cardText = await accountCard.textContent();
        return cardText?.includes('✅ Verified');
    }
}
