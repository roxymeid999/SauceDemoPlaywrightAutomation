import { test, expect } from "@playwright/test";
import { CartPage } from "../pages/CartPage";
import { CheckoutCompletePage } from "../pages/CheckoutCompletePage";
import { CheckoutInformationPage } from "../pages/CheckoutInformationPage";
import { CheckoutOverviewPage } from "../pages/CheckoutOverviewPage";
import { InventoryPage } from "../pages/InventoryPage";
import { LoginPage } from "../pages/LoginPage";

test("Ticket 4: completes checkout with valid information", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutInformationPage = new CheckoutInformationPage(page);
  const checkoutOverviewPage = new CheckoutOverviewPage(page);
  const checkoutCompletePage = new CheckoutCompletePage(page);

  await page.goto("/");
  await loginPage.login("standard_user", "secret_sauce");

  await inventoryPage.addBackpackToCart();
  await inventoryPage.openCart();

  await expect(page).toHaveURL(/cart\.html/);
  await expect(cartPage.itemName).toHaveText("Sauce Labs Backpack");
  await expect(cartPage.itemPrice).toHaveText("$29.99");

  await cartPage.startCheckout();
  await checkoutInformationPage.fillInformation("John", "Doe", "97330");
  await checkoutInformationPage.continueToOverview();

  await expect(page).toHaveURL(/checkout-step-two\.html/);
  await expect(checkoutOverviewPage.itemName).toHaveText("Sauce Labs Backpack");
  await expect(checkoutOverviewPage.subtotalLabel).toHaveText(
    "Item total: $29.99",
  );
  await expect(checkoutOverviewPage.taxLabel).toHaveText("Tax: $2.40");
  await expect(checkoutOverviewPage.totalLabel).toHaveText(
    "Total: $32.39",
  );

  await checkoutOverviewPage.finishOrder();

  await expect(page).toHaveURL(/checkout-complete\.html/);
  await expect(checkoutCompletePage.confirmationHeader).toHaveText(
    "Thank you for your order!",
  );
});
