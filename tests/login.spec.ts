import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { loginTestData } from '../src/constants/loginTestData';

test.describe('SauceDemo Login - Data Driven', () => {
  for (const data of loginTestData) {
    test(`should ${data.shouldSucceed ? 'login successfully' : 'show error'} with ${data.description}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.login(data.username, data.password);
      if (data.expectedUrl) {
        await expect(page).toHaveURL(data.expectedUrl);
      }
      if (data.expectedError) {
        await expect(await loginPage.getErrorMessage()).toContain(data.expectedError);
      }
    });
  }
}); 