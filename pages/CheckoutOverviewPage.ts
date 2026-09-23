import { Page, Locator } from "@playwright/test";

export class CheckoutOverviewPage {
  readonly itemName: Locator;
  readonly subtotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;
  readonly finishButton: Locator;

  constructor(page: Page) {
    this.itemName = page.locator(
      '.cart_item [data-test="inventory-item-name"]',
    );
    this.subtotalLabel = page.locator('[data-test="subtotal-label"]');
    this.taxLabel = page.locator('[data-test="tax-label"]');
    this.totalLabel = page.locator('[data-test="total-label"]');
    this.finishButton = page.locator('[data-test="finish"]');
  }

  async finishOrder() {
    await this.finishButton.click();
  }
}