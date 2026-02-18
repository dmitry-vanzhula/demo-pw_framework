import { test as base } from '@playwright/test';
import NavPage from '../../pages/navPage';
import HomePage from '../../pages/homePage';
import ProductsPage from '../../pages/productsPage';
import CartPage from '../../pages/cartPage';
import CheckoutPage from '../../pages/checkoutPage';

export type FrameworkFixture = {
    navPage: NavPage;
    homePage: HomePage;
    productsPage: ProductsPage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
}

const test = base.extend<FrameworkFixture>({
    navPage: async ({ page }, use) => {
        await use(new NavPage(page));
    },

    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },

    productsPage: async ({ page }, use) => {
        await use(new ProductsPage(page));
    },

    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },

    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page));
    },
});

export { test };
export { expect } from '@playwright/test';