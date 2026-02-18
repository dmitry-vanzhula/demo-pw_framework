import { expect, Locator, Page } from '@playwright/test';

class CartPage {
    constructor(private page: Page) {
    }


    get cartItemDescription(): Locator {
        return this.page.locator('.cart_description');
    }

    get cartTotal(): Locator {
        return this.page.locator('#product-1').getByRole('button');

    }

    async verifyCartItemDescription(product: string): Promise<void> {
        await expect(this.cartItemDescription).toContainText(product);
    }

    async verifyCartTotal(total: string): Promise<void> {
        await expect(this.cartTotal).toContainText(total);
    }

    get deleteItemButton(): Locator {
        return this.page.locator('.cart_quantity_delete').first();
    }

    async deleteFirstItem(): Promise<void> {
        await this.deleteItemButton.click();
    }

    async verifyCartEmpty(): Promise<void> {
        await expect(this.page.getByText('Cart is empty!')).toBeVisible();
    }

    get proceedToCheckoutButton(): Locator {
        return this.page.locator('a.check_out');
    }

    async proceedToCheckout(): Promise<void> {
        await this.proceedToCheckoutButton.click();
        await this.page.waitForURL(/\/checkout/, { timeout: 10000 });
    }

    get cartTotalPrice(): Locator {
        return this.page.locator('.cart_total_price').first();
    }

    async verifyProductDetailsInCart(productName: string, category: string, price: string): Promise<void> {
        await expect(this.cartItemDescription.first()).toContainText(productName);
        await expect(this.cartItemDescription.first()).toContainText(category);
        await expect(this.page.locator('.cart_price').first()).toContainText(price);
    }

    async verifyCartTotalForSingleItem(price: string): Promise<void> {
        await expect(this.cartTotalPrice).toContainText(price);
    }

    async verifyCartTotalForMultipleItems(expectedItemCount: number): Promise<void> {
        const rows = this.page.locator('tr[id^="product-"]');
        await expect(rows).toHaveCount(expectedItemCount);
    }

    get productRows(): Locator {
        return this.page.locator('tr[id^="product-"]');
    }
}

export default CartPage;