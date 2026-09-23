import { Page, Locator } from "@playwright/test";

export class CartPage {
  readonly itemName: Locator;
  readonly itemPrice: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.itemName = page.locator(
      '.cart_item [data-test="inventory-item-name"]',
    );
    this.itemPrice = page.locator(
      '.cart_item [data-test="inventory-item-price"]',
    );
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async startCheckout() {
    await this.checkoutButton.click();
  }
}