import { Page, Locator } from "@playwright/test";

export class InventoryPage {
  readonly addBackpackButton: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.addBackpackButton = page.locator(
      '[data-test="add-to-cart-sauce-labs-backpack"]',
    );
    this.cartLink = page.locator(".shopping_cart_link");
  }

  async addBackpackToCart() {
    await this.addBackpackButton.click();
  }

  async openCart() {
    await this.cartLink.click();
  }
}