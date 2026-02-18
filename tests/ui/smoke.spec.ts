import { test, expect } from '../../fixtures/pom/test-options';

test.describe('Smoke Tests', () => {
    test(
        '1. Home page loads successfully',
        { tag: ['@Smoke', '@E2E'] },
        async ({ homePage }) => {
            await test.step('Navigate to home page', async () => {
                await homePage.navigateToHomePageGuest();
            });
        }
    );

    test(
        '2. Products page loads successfully',
        { tag: ['@Smoke', '@E2E'] },
        async ({ homePage, navPage }) => {
            await test.step('Navigate to home and products page', async () => {
                await homePage.navigateToHomePageGuest();
                await navPage.navigateToProductsPage();
            });
        }
    );

    test(
        '3. Product search returns results',
        { tag: ['@Smoke', '@E2E'] },
        async ({ homePage, navPage, productsPage }) => {
            await test.step('Navigate to products and search', async () => {
                await homePage.navigateToHomePageGuest();
                await navPage.navigateToProductsPage();
                await productsPage.searchForProduct('Blue Top');
            });
            await test.step('Verify search results shown', async () => {
                await productsPage.verifySearchedProductsShown();
                await productsPage.verifyProductVisible('Blue Top');
            });
        }
    );

    test(
        '4. Cart page loads successfully',
        { tag: ['@Smoke', '@E2E'] },
        async ({ homePage, navPage }) => {
            await test.step('Navigate to cart page', async () => {
                await homePage.navigateToHomePageGuest();
                await navPage.navigateToCartPage();
            });
        }
    );

    test(
        '5. Login page loads successfully',
        { tag: ['@Smoke', '@E2E'] },
        async ({ navPage }) => {
            await test.step('Navigate to login page', async () => {
                await navPage.navigateToLoginPage();
            });
        }
    );
});
