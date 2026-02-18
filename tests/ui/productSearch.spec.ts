import { test, expect } from '../../fixtures/pom/test-options';

test.describe('Product Search', () => {
    test.beforeEach(async ({ homePage, navPage }) => {
        await homePage.navigateToHomePageGuest();
        await navPage.navigateToProductsPage();
    });

    test(
        '1. Search by exact product name',
        { tag: ['@Search', '@E2E'] },
        async ({ productsPage }) => {
            await test.step('Search for Blue Top', async () => {
                await productsPage.searchForProduct('Blue Top');
            });
            await test.step('Verify search results', async () => {
                await productsPage.verifySearchedProductsShown();
                await productsPage.verifyProductVisible('Blue Top');
                await productsPage.verifyProductCount(1);
            });
        }
    );

    test(
        '2. Search by partial name',
        { tag: ['@Search', '@E2E'] },
        async ({ productsPage }) => {
            await test.step('Search for Blue', async () => {
                await productsPage.searchForProduct('Blue');
            });
            await test.step('Verify results contain Blue', async () => {
                await productsPage.verifySearchedProductsShown();
                await productsPage.verifySearchResultsContain('Blue');
            });
        }
    );

    test(
        '3. Search non-existent product',
        { tag: ['@Search', '@E2E'] },
        async ({ productsPage }) => {
            await test.step('Search for xyz123', async () => {
                await productsPage.searchForProduct('xyz123');
            });
            await test.step('Verify no search results', async () => {
                await productsPage.verifyNoSearchResults();
            });
        }
    );

    test(
        '4. Search with empty input',
        { tag: ['@Search', '@E2E'] },
        async ({ productsPage }) => {
            await test.step('Search with empty input', async () => {
                await productsPage.searchForProduct('');
            });
            await test.step('Verify all products shown', async () => {
                await productsPage.verifyAllProductsShown();
            });
        }
    );

    test(
        '5. Search case sensitivity',
        { tag: ['@Search', '@E2E'] },
        async ({ productsPage }) => {
            await test.step('Search for blue top (lowercase)', async () => {
                await productsPage.searchForProduct('blue top');
            });
            await test.step('Verify Blue Top found', async () => {
                await productsPage.verifySearchedProductsShown();
                await productsPage.verifyProductVisible('Blue Top');
            });
        }
    );

    test(
        '6. Search special characters',
        { tag: ['@Search', '@E2E'] },
        async ({ productsPage }) => {
            await test.step('Search for T-Shirt', async () => {
                await productsPage.searchForProduct('T-Shirt');
            });
            await test.step('Verify results contain T-Shirt', async () => {
                await productsPage.verifySearchedProductsShown();
                await productsPage.verifySearchResultsContain('T-Shirt');
            });
        }
    );

    test(
        '7. Search with leading and trailing spaces',
        { tag: ['@Search', '@E2E'] },
        async ({ productsPage }) => {
            await test.step('Search with spaces around Blue Top', async () => {
                await productsPage.searchForProduct('  Blue Top  ');
            });
            await test.step('Verify Blue Top found', async () => {
                await productsPage.verifySearchedProductsShown();
                await productsPage.verifyProductVisible('Blue Top');
            });
        }
    );

    test(
        '8. Search clears previous results',
        { tag: ['@Search', '@E2E'] },
        async ({ productsPage }) => {
            await test.step('Search for Blue Top and verify', async () => {
                await productsPage.searchForProduct('Blue Top');
                await productsPage.verifyProductVisible('Blue Top');
            });
            await test.step('Search for Men Tshirt and verify previous cleared', async () => {
                await productsPage.searchForProduct('Men Tshirt');
                await productsPage.verifyProductVisible('Men Tshirt');
                await productsPage.verifyProductNotVisibleInResults('Blue Top');
            });
        }
    );
});
