import { Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(username = 'standard_user', password = 'secret_sauce') {
    await this.page.fill('input[data-test="username"]', username);
    await this.page.fill('input[data-test="password"]', password);
    await this.page.click('input[data-test="login-button"]');
  }
}
