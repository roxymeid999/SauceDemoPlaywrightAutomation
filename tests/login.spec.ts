import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto("/");

  // Expect a title "Swag Labs" to be present on the page.
  await expect(page).toHaveTitle(/Swag Labs/);
});

