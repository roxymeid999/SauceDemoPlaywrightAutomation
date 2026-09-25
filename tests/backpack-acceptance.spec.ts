import { test, expect } from '@playwright/test';
import { login } from './helpers/auth';
import { ProductPage } from './pages/product.page';

test('Backpack acceptance: navigate to details and back', async ({ page }) => {
  await login(page);
  const products = new ProductPage(page);

  await page.waitForSelector('.inventory_item');
  const catalog = await products.getCatalogItemInfoByName('Sauce Labs Backpack');
  await products.openProductByName('Sauce Labs Backpack');

  await expect(page).toHaveURL(/inventory-item.html\?id=\d+/);

  const detail = await products.getDetailInfo();

  await expect(detail.title).toBe(catalog.title);
  await expect(detail.price).toBe(catalog.price);

  // Image comparison: if catalog image path contains a filename, compare by filename,
  // otherwise assert the detail image src is non-empty (data URIs or transformed images).
  if (catalog.img) {
    const parts = catalog.img.split('/');
    const filename = parts[parts.length - 1];
    if (detail.img && detail.img.startsWith('data:')) {
      // Detail image is embedded as data URI; assert any image under .inventory_details exists or data uri is present
      const imgEl = page.locator('.inventory_details img');
      if (await imgEl.count()) {
        await expect(imgEl.first()).toBeVisible();
      } else {
        await expect(detail.img).toBeTruthy();
      }
    } else if (filename) {
      await expect(detail.img || '').toContain(filename);
    } else {
      // either the detail page has an <img> or detail.img contains a src
      const imgEl = page.locator('.inventory_details img');
      if (await imgEl.count()) {
        await expect(imgEl.first()).toBeVisible();
      } else {
        await expect(detail.img).toBeTruthy();
      }
    }
  } else {
    await expect(detail.img).toBeTruthy();
  }

  await expect(detail.description.length).toBeGreaterThan(10);

  await products.backToProducts();
  await expect(page).toHaveURL(/inventory.html/);
  await expect(page.locator('.inventory_item_name', { hasText: 'Sauce Labs Backpack' })).toBeVisible();
});
