import { expect, Locator, Page } from '@playwright/test';

class CheckoutPage {
    constructor(private page: Page) {}

    get deliveryAddressSection(): Locator {
        return this.page.locator('#address_delivery');
    }

    get billingAddressSection(): Locator {
        return this.page.locator('#address_invoice');
    }

    get orderReviewHeading(): Locator {
        return this.page.getByRole('heading', { name: 'Review Your Order' });
    }

    get placeOrderButton(): Locator {
        return this.page.locator('a.check_out[href="/payment"]');
    }

    get checkoutBreadcrumb(): Locator {
        return this.page.locator('.breadcrumb .active').filter({ hasText: 'Checkout' });
    }

    async verifyCheckoutPageLoaded(): Promise<void> {
        await expect(this.checkoutBreadcrumb).toBeVisible();
    }

    async verifyDeliveryAddressVisible(): Promise<void> {
        await expect(this.deliveryAddressSection).toBeVisible();
        await expect(this.deliveryAddressSection.getByText('Your delivery address')).toBeVisible();
    }

    async verifyBillingAddressVisible(): Promise<void> {
        await expect(this.billingAddressSection).toBeVisible();
        await expect(this.billingAddressSection.getByText('Your billing address')).toBeVisible();
    }

    async verifyOrderReviewVisible(): Promise<void> {
        await expect(this.orderReviewHeading).toBeVisible();
        await expect(this.page.locator('#cart_info')).toBeVisible();
    }

    async placeOrder(): Promise<void> {
        await this.placeOrderButton.click();
        await this.page.waitForURL(/\/payment/, { timeout: 10000 });
    }

    async verifyPaymentPageLoaded(): Promise<void> {
        await expect(this.page).toHaveURL(/\/payment/);
    }
}

export default CheckoutPage;
