import { test, expect } from '../../fixtures/pom/test-options';

test.describe('Regression Tests', () => {
    test(
        '1. Full checkout flow to payment page',
        { tag: ['@Regression', '@E2E'] },
        async ({ navPage, productsPage, cartPage, checkoutPage }) => {
            await test.step('Add product and navigate to cart', async () => {
                await navPage.navigateToProductsPage();
                await productsPage.searchForProduct('Blue Top');
                await productsPage.addToCart();
                await navPage.navigateToCartPage();
            });
            await test.step('Proceed to checkout and place order', async () => {
                await cartPage.proceedToCheckout();
                await checkoutPage.placeOrder();
            });
            await test.step('Verify payment page loaded', async () => {
                await checkoutPage.verifyPaymentPageLoaded();
            });
        }
    );

    test(
        '2. Search non-existent product returns no results',
        { tag: ['@Regression', '@E2E'] },
        async ({ navPage, productsPage }) => {
            await test.step('Navigate to products page', async () => {
                await navPage.navigateToProductsPage();
            });
            await test.step('Search for non-existent product', async () => {
                await productsPage.searchForProduct('xyz123');
            });
            await test.step('Verify no search results', async () => {
                await productsPage.verifyNoSearchResults();
            });
        }
    );

    test(
        '3. Delete item from cart shows empty cart',
        { tag: ['@Regression', '@E2E'] },
        async ({ navPage, productsPage, cartPage }) => {
            await test.step('Add product and navigate to cart', async () => {
                await navPage.navigateToProductsPage();
                await productsPage.searchForProduct('Blue Top');
                await productsPage.addToCart();
                await navPage.navigateToCartPage();
            });
            await test.step('Delete item from cart', async () => {
                await cartPage.deleteFirstItem();
            });
            await test.step('Verify cart is empty', async () => {
                await cartPage.verifyCartEmpty();
            });
        }
    );

    test(
        '4. Multiple products in cart',
        { tag: ['@Regression', '@E2E'] },
        async ({ navPage, productsPage, cartPage }) => {
            await test.step('Add first product to cart', async () => {
                await navPage.navigateToProductsPage();
                await productsPage.searchForProduct('Blue Top');
                await productsPage.addToCart();
            });
            await test.step('Add second product to cart', async () => {
                await productsPage.searchForProduct('Men Tshirt');
                await productsPage.addToCart('Men Tshirt');
                await navPage.navigateToCartPage();
            });
            await test.step('Verify both products in cart', async () => {
                await cartPage.verifyCartTotalForMultipleItems(2);
            });
        }
    );

    test(
        '5. Checkout order review shows product and addresses',
        { tag: ['@Regression', '@E2E'] },
        async ({ navPage, productsPage, cartPage, checkoutPage }) => {
            await test.step('Add product and proceed to checkout', async () => {
                await navPage.navigateToProductsPage();
                await productsPage.searchForProduct('Blue Top');
                await productsPage.addToCart();
                await navPage.navigateToCartPage();
                await cartPage.proceedToCheckout();
            });
            await test.step('Verify order review and addresses visible', async () => {
                await checkoutPage.verifyOrderReviewVisible();
                await checkoutPage.verifyDeliveryAddressVisible();
                await checkoutPage.verifyBillingAddressVisible();
            });
        }
    );
});
