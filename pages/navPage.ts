import { expect, Locator, Page } from '@playwright/test';

class NavPage {

    constructor(private page: Page) {
      
    }

    get cartPageTitle(): Locator {
        return this.page.locator('#cart_items .breadcrumbs li').nth(1);
    }

    get productsPageTitle(): Locator {
        return this.page.getByRole('heading', { name: 'Products' });
    }

    get homePageTitle(): Locator {
        return this.page.getByRole('heading', { name: 'Full-Fledged practice website' });
    }

    get loginPageTitle(): Locator {
        return this.page.getByRole('heading', { name: 'Login to your account' });
    }

    get emailInput(): Locator {
        return this.page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address');
    }

    get passwordInput(): Locator {
        return this.page.getByRole('textbox', { name: 'Password' });
    }

    get loginButton(): Locator {
        return this.page.getByRole('button', { name: 'Login' });
    }

    get logoutButton(): Locator {
        return this.page.getByRole('listitem').filter({ hasText: 'Logout' });
    }

    get loggedInUser(): Locator {
        return this.page.getByText(`Logged in as ${process.env.EMAIL!.slice(0,4)}`);
    }


    async navigateToLoginPage(): Promise<void> {
        await this.page.goto(process.env.URL as string + '/login');
        await expect(this.loginPageTitle).toBeVisible();
    }

    async login(email: string, password: string): Promise<void> {
        await this.navigateToLoginPage();
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        await expect(this.loggedInUser).toBeVisible();

    }

    async logout(): Promise<void> {
        await this.page.getByRole('listitem').filter({ hasText: 'Logout' }).isVisible();
        await expect(this.homePageTitle).toBeVisible();
    }

    async navigateToProductsPage(): Promise<void> {
        await this.page.goto(process.env.URL as string + '/products');
        await expect(this.productsPageTitle).toBeVisible();
    }

    async navigateToCartPage(): Promise<void> {
        await this.page.goto(process.env.URL as string + '/view_cart');
        await expect(this.cartPageTitle).toHaveText('Shopping Cart');
    }

    get contactPageTitle(): Locator {
        return this.page.getByRole('heading', { name: 'Contact Us' });
    }

    async navigateToContactUsPage(): Promise<void> {
        await this.page.goto(process.env.URL as string + '/contact_us');
        await expect(this.contactPageTitle).toBeVisible();
    }
}

export default NavPage;