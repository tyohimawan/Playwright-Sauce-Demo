import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { MenuPage } from '../src/pages/MenuPage';
import { logoutTestData } from '../src/constants/logoutTestData';

test.describe('SauceDemo Logout Scenario', () => {
  for (const data of logoutTestData) {
    test(data.description, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const menuPage = new MenuPage(page);
      await loginPage.goto();
      await loginPage.login(data.username, data.password);
      await menuPage.logout();
      await expect(page).toHaveURL(data.expectedUrl);
    });
  }
}); 