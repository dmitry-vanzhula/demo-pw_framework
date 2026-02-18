import { test, expect } from '../../fixtures/pom/test-options';

test.describe('Cart Page - Logged In User', () => {
    test.beforeEach(async ({ navPage, productsPage }) => {
        await navPage.navigateToProductsPage();
        await productsPage.searchForProduct('Blue Top');
        await productsPage.addToCart();
        await navPage.navigateToCartPage();
    });

    test(
        '1. Proceed to Checkout navigates to checkout page',
        { tag: ['@Cart', '@Checkout', '@E2E'] },
        async ({ cartPage, checkoutPage }) => {
            await test.step('Proceed to checkout', async () => {
                await cartPage.proceedToCheckout();
            });
            await test.step('Verify checkout page loaded', async () => {
                await checkoutPage.verifyCheckoutPageLoaded();
            });
        }
    );

    test(
        '2. Checkout shows delivery address',
        { tag: ['@Cart', '@Checkout', '@E2E'] },
        async ({ cartPage, checkoutPage }) => {
            await test.step('Proceed to checkout', async () => {
                await cartPage.proceedToCheckout();
            });
            await test.step('Verify delivery address visible', async () => {
                await checkoutPage.verifyDeliveryAddressVisible();
            });
        }
    );

    test(
        '3. Checkout shows billing address',
        { tag: ['@Cart', '@Checkout', '@E2E'] },
        async ({ cartPage, checkoutPage }) => {
            await test.step('Proceed to checkout', async () => {
                await cartPage.proceedToCheckout();
            });
            await test.step('Verify billing address visible', async () => {
                await checkoutPage.verifyBillingAddressVisible();
            });
        }
    );

    test(
        '4. Checkout shows order review',
        { tag: ['@Cart', '@Checkout', '@E2E'] },
        async ({ cartPage, checkoutPage }) => {
            await test.step('Proceed to checkout', async () => {
                await cartPage.proceedToCheckout();
            });
            await test.step('Verify order review visible', async () => {
                await checkoutPage.verifyOrderReviewVisible();
            });
        }
    );

    test(
        '5. Place Order navigates to payment',
        { tag: ['@Cart', '@Checkout', '@E2E'] },
        async ({ cartPage, checkoutPage }) => {
            await test.step('Proceed to checkout', async () => {
                await cartPage.proceedToCheckout();
            });
            await test.step('Place order', async () => {
                await checkoutPage.placeOrder();
            });
            await test.step('Verify payment page loaded', async () => {
                await checkoutPage.verifyPaymentPageLoaded();
            });
        }
    );

    test(
        '6. Verify product details in cart',
        { tag: ['@Cart', '@E2E'] },
        async ({ cartPage }) => {
            await test.step('Verify product details in cart', async () => {
                await cartPage.verifyProductDetailsInCart(
                    'Blue Top',
                    'Women > Tops',
                    'Rs. 500'
                );
            });
        }
    );

    test(
        '7. Verify cart total for single item',
        { tag: ['@Cart', '@E2E'] },
        async ({ cartPage }) => {
            await test.step('Verify cart total for single item', async () => {
                await cartPage.verifyCartTotalForSingleItem('Rs. 500');
            });
        }
    );

    test(
        '8. Verify cart total for multiple items',
        { tag: ['@Cart', '@E2E'] },
        async ({ navPage, productsPage, cartPage }) => {
            await test.step('Add second product to cart', async () => {
                await navPage.navigateToProductsPage();
                await productsPage.searchForProduct('Men Tshirt');
                await productsPage.addToCart('Men Tshirt');
                await navPage.navigateToCartPage();
            });
            await test.step('Verify cart total for multiple items', async () => {
                await cartPage.verifyCartTotalForMultipleItems(2);
            });
        }
    );
});
