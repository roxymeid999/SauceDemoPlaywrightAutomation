import { Page, Locator } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly productCard: Locator;
  readonly productTitle: Locator;
  readonly productPrice: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productCard = page.locator('.inventory_item');
    this.productTitle = this.productCard.locator('.inventory_item_name');
    this.productPrice = this.productCard.locator('.inventory_item_price');
  }

  async openFirstProduct() {
    const first = this.productCard.first();
    await first.locator('a[id$="_title_link"], .inventory_item_img img').first().click();
  }

  async firstProductInfo() {
    const first = this.productCard.first();
    const title = await first.locator('.inventory_item_name').innerText();
    const price = await first.locator('.inventory_item_price').innerText();
    return { title, price };
  }

  async getCatalogItemInfoByName(name: string) {
    const card = this.page.locator('.inventory_item').filter({ has: this.page.locator('.inventory_item_name', { hasText: name }) }).first();
    const title = await card.locator('.inventory_item_name').innerText();
    const price = await card.locator('.inventory_item_price').innerText();
    const img = await card.locator('.inventory_item_img img').getAttribute('src');
    return { title, price, img };
  }

  async openProductByName(name: string) {
    const card = this.page.locator('.inventory_item').filter({ has: this.page.locator('.inventory_item_name', { hasText: name }) }).first();
    await card.locator('a[id$="_title_link"], .inventory_item_img img').first().click();
  }

  async getDetailInfo() {
    await this.page.waitForSelector('.inventory_details');
    const title = await this.page.locator('.inventory_details_name').innerText();
    const price = await this.page.locator('.inventory_details_price').innerText();
    const descLocator = this.page.locator('.inventory_details_desc');
    const description = (await descLocator.count()) ? await descLocator.innerText() : '';
    const imgLocator = this.page.locator('.inventory_details img');
    const img = (await imgLocator.count()) ? await imgLocator.first().getAttribute('src') : '';
    return { title, price, description, img };
  }

  async backToProducts() {
    const back = this.page.locator('button[data-test="back-to-products"], button:has-text("Back to products")').first();
    await back.click();
  }
}
