import { Page, Locator } from "@playwright/test";

export class CheckoutCompletePage {
  readonly confirmationHeader: Locator;

  constructor(page: Page) {
    this.confirmationHeader = page.locator('[data-test="complete-header"]');
  }
}