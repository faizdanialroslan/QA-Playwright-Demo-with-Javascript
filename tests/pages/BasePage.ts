import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
    readonly page: Page;
    readonly url: string;

    constructor(page: Page, url: string = '') {
        this.page = page;
        this.url = url;
    }

    async goto() {
        try {
            await this.page.goto(this.url, { waitUntil: 'domcontentloaded', timeout: 10000 });
        } catch (error) {
            // Handle navigation interruption gracefully
            if (error.message.includes('interrupted')) {
                await this.page.waitForLoadState('domcontentloaded');
            } else {
                throw error;
            }
        }
    }

    async waitForLoadState() {
        await this.page.waitForLoadState('networkidle');
    }

    async getTitle() {
        return await this.page.title();
    }

    async waitForSelector(selector: string, timeout = 10000) {
        return await this.page.waitForSelector(selector, { timeout });
    }

    async screenshot(name: string) {
        await this.page.screenshot({ path: `test-results/screenshots/${name}.png` });
    }

    async isVisible(selector: string) {
        return await this.page.isVisible(selector);
    }

    async getText(selector: string) {
        return await this.page.textContent(selector);
    }

    async click(selector: string) {
        await this.page.click(selector);
    }

    async fill(selector: string, text: string) {
        await this.page.fill(selector, text);
    }

    async selectOption(selector: string, value: string) {
        await this.page.selectOption(selector, value);
    }

    async hover(selector: string) {
        await this.page.hover(selector);
    }

    async waitForURL(url: string | RegExp) {
        await this.page.waitForURL(url);
    }
}
