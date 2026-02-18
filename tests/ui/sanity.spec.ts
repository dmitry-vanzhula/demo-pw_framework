import { test, expect } from '../../fixtures/pom/test-options';

test.describe('Sanity Tests', () => {
    test(
        '1. Add product to cart',
        { tag: ['@Sanity', '@E2E'] },
        async ({ navPage, productsPage }) => {
            await test.step('Navigate to products and add to cart', async () => {
                await navPage.navigateToProductsPage();
                await productsPage.searchForProduct('Blue Top');
                await productsPage.addToCart();
            });
            await test.step('Verify cart page loads', async () => {
                await navPage.navigateToCartPage();
            });
        }
    );

    test(
        '2. Verify product details in cart',
        { tag: ['@Sanity', '@E2E'] },
        async ({ navPage, productsPage, cartPage }) => {
            await test.step('Add product and navigate to cart', async () => {
                await navPage.navigateToProductsPage();
                await productsPage.searchForProduct('Blue Top');
                await productsPage.addToCart();
                await navPage.navigateToCartPage();
            });
            await test.step('Verify product details', async () => {
                await cartPage.verifyProductDetailsInCart(
                    'Blue Top',
                    'Women > Tops',
                    'Rs. 500'
                );
            });
        }
    );

    test(
        '3. Proceed to checkout',
        { tag: ['@Sanity', '@E2E'] },
        async ({ navPage, productsPage, cartPage, checkoutPage }) => {
            await test.step('Add product and go to cart', async () => {
                await navPage.navigateToProductsPage();
                await productsPage.searchForProduct('Blue Top');
                await productsPage.addToCart();
                await navPage.navigateToCartPage();
            });
            await test.step('Proceed to checkout', async () => {
                await cartPage.proceedToCheckout();
            });
            await test.step('Verify checkout page loaded', async () => {
                await checkoutPage.verifyCheckoutPageLoaded();
            });
        }
    );

    test(
        '4. Search by partial name returns results',
        { tag: ['@Sanity', '@E2E'] },
        async ({ homePage, navPage, productsPage }) => {
            await test.step('Navigate and search for Blue', async () => {
                await homePage.navigateToHomePageGuest();
                await navPage.navigateToProductsPage();
                await productsPage.searchForProduct('Blue');
            });
            await test.step('Verify results contain search term', async () => {
                await productsPage.verifySearchedProductsShown();
                await productsPage.verifySearchResultsContain('Blue');
            });
        }
    );

    test(
        '5. Verify cart total for single item',
        { tag: ['@Sanity', '@E2E'] },
        async ({ navPage, productsPage, cartPage }) => {
            await test.step('Add product and navigate to cart', async () => {
                await navPage.navigateToProductsPage();
                await productsPage.searchForProduct('Blue Top');
                await productsPage.addToCart();
                await navPage.navigateToCartPage();
            });
            await test.step('Verify cart total', async () => {
                await cartPage.verifyCartTotalForSingleItem('Rs. 500');
            });
        }
    );
});
