import { Page } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

export async function login(page: Page, username = 'standard_user', password = 'secret_sauce') {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(username, password);
}
