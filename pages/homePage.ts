import { expect, Locator, Page } from '@playwright/test';

class HomePage {

    constructor(private page: Page) {
      
    }

    get homePageTitle(): Locator {
        return this.page.getByRole('heading', { name: 'Full-Fledged practice website' });
    }

    async navigateToHomePageGuest(): Promise<void> {
        await this.page.goto(process.env.URL as string);
        await expect(this.homePageTitle).toBeVisible();
    }
}

export default HomePage;