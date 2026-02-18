import { expect, Locator, Page } from '@playwright/test';

class ProductsPage {

    constructor(private page: Page) {
      
    }

    getProductCard(productName: string): Locator {
        return this.page.locator('.single-products, .productinfo')
            .filter({ hasText: productName }).first();
    }

    get productCard(): Locator {
        return this.getProductCard('Blue Top');
    }

    getAddToCartButton(productName: string): Locator {
        return this.getProductCard(productName).locator('.add-to-cart').first();
    }

    get addToCartButton(): Locator {
        return this.productCard.locator('.add-to-cart').first();
    }

    get continueShoppingButton(): Locator {
        return this.page.getByRole('button', { name: 'Continue Shopping' }).or(
            this.page.getByRole('link', { name: 'Continue Shopping' })
        );
    }

    get productsPageTitle(): Locator {
        return this.page.getByRole('heading', { name: 'Products' });
    }

    get searchedProductsHeading(): Locator {
        return this.page.getByRole('heading', { name: 'Searched Products' });
    }

    get allProductsHeading(): Locator {
        return this.page.getByRole('heading', { name: 'All Products' });
    }

    get productCards(): Locator {
        return this.page.locator('.single-products');
    }

    get searchProductInput(): Locator {
        return this.page.getByRole('textbox', { name: 'Search Product' });
    }

    get submitSearchButton(): Locator {
        return this.page.locator('#submit_search');
    }

    async searchForProduct(product: string): Promise<void> {
        await this.searchProductInput.fill(product.trim());
        await this.submitSearchButton.click();
    }

    async submitSearch(): Promise<void> {
        await this.submitSearchButton.click();
    }

    async verifyProductVisible(productName: string): Promise<void> {
        await expect(this.page.getByText(productName).first()).toBeVisible();
    }

    async verifyProductNotVisibleInResults(productName: string): Promise<void> {
        const resultsArea = this.page.locator('.features_items');
        await expect(resultsArea.getByText(productName)).not.toBeVisible();
    }

    async verifyProductCount(count: number): Promise<void> {
        await expect(this.productCards).toHaveCount(count);
    }

    async verifyNoSearchResults(): Promise<void> {
        await expect(this.searchedProductsHeading).toBeVisible();
        await expect(this.productCards).toHaveCount(0);
    }

    async verifyAllProductsShown(): Promise<void> {
        await expect(this.allProductsHeading).toBeVisible();
        await expect(this.productCards.first()).toBeVisible();
    }

    async verifySearchedProductsShown(): Promise<void> {
        await expect(this.searchedProductsHeading).toBeVisible();
    }

    async verifySearchResultsContain(searchTerm: string): Promise<void> {
        const cards = this.productCards;
        const count = await cards.count();
        for (let i = 0; i < count; i++) {
            await expect(cards.nth(i)).toContainText(searchTerm, { ignoreCase: true });
        }
    }

    async addToCart(productName?: string): Promise<void> {
        const name = productName ?? 'Blue Top';
        const card = this.getProductCard(name);
        await card.scrollIntoViewIfNeeded();
        await card.hover();
        await this.getAddToCartButton(name).click();
        await this.continueShoppingButton.click();
    }
}

export default ProductsPage;