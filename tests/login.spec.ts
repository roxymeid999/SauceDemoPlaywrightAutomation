import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

test.describe("Login Tests", () => {
  //Define loginPage in the outer scope since multiple tests use the same object
  let loginPage: LoginPage;

  test.beforeEach("Navigate to page URL", async ({ page }) => {
    //Page Object: Create page object and connect it to the browser (page)
    loginPage = new LoginPage(page);

    await page.goto("/");
    // Expect a title "Swag Labs" to be present on the page.
    await expect(page).toHaveTitle(/Swag Labs/);
  });

  test("successful Login", async ({ page }) => {
    //Call the login method
    await loginPage.login("standard_user", "secret_sauce");

    //Check that the current URL contains the text inventory - Reg Ex
    await expect(page).toHaveURL(/inventory/);
  });

  test("Unsuccessful Login", async ({ page }) => {
    
    await loginPage.login("standard", "secret_sauce");

    //Asserting against error Locator from the LoginPage
    await expect(loginPage.errorMessage).toHaveText(
      "Epic sadface: Username and password do not match any user in this service",
    );
  });
});
