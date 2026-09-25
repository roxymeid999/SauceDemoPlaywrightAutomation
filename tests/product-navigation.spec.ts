import { test, expect } from '@playwright/test';
import { ProductPage } from './pages/product.page';
import { login } from './helpers/auth';

test('catalog click navigates to correct detail page', async ({ page }) => {
  await login(page);
  const products = new ProductPage(page);

  const { title, price } = await products.firstProductInfo();
  await products.openFirstProduct();

  await expect(page).toHaveURL(/inventory-item.html\?id=\d+/);
  await expect(page.locator('.inventory_details_name')).toHaveText(title);
  await expect(page.locator('.inventory_details_price')).toHaveText(price);
});
