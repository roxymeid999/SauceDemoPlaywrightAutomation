import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

//let LoginPage: LoginPage;
test.describe("Login Tests", () => {
  
  test.beforeEach("Navigate to page URL", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto("/");

    // Expect a title "Swag Labs" to be present on the page.
    await expect(page).toHaveTitle(/Swag Labs/);
  });

  test("successful Login", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login("standard_user", "secret_sauce");
    await expect(page).toHaveURL(/inventory/);
  });

  test("Unsuccessful Login", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login("standard", "secret_sauce");
    await expect(loginPage.errorMessage).toHaveText(
      "Epic sadface: Username and password do not match any user in this service",
    );
  });
});
