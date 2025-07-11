import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { InventoryPage } from '../src/pages/InventoryPage';
import { CartPage } from '../src/pages/CartPage';
import { CheckoutPage } from '../src/pages/CheckoutPage';
import { MenuPage } from '../src/pages/MenuPage';
import { inventoryTestData } from '../src/constants/inventoryTestData';

const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';

test.describe('SauceDemo Inventory/Cart/Checkout Scenarios', () => {
  for (const data of inventoryTestData) {
    test(data.description, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const inventoryPage = new InventoryPage(page);
      const cartPage = new CartPage(page);
      const checkoutPage = new CheckoutPage(page);
      const menuPage = new MenuPage(page);

      await loginPage.goto();
      await loginPage.login(USERNAME, PASSWORD);

      // Add items to cart
      if (data.itemsToAdd) {
        for (const item of data.itemsToAdd) {
          await inventoryPage.addItem(item);
        }
      }
      // Remove items from cart
      if (data.itemsToRemove) {
        for (const item of data.itemsToRemove) {
          await inventoryPage.removeItem(item);
        }
      }
      // Check cart count
      if (typeof data.expectedCartCount === 'number') {
        expect(await inventoryPage.getCartCount()).toBe(data.expectedCartCount);
      }
      // Checkout happy path
      if (data.checkoutInfo && data.shouldComplete) {
        await page.locator('.shopping_cart_link').click();
        await cartPage.proceedToCheckout();
        await checkoutPage.fillInfo(
          data.checkoutInfo.firstName,
          data.checkoutInfo.lastName,
          data.checkoutInfo.postalCode
        );
        await checkoutPage.finishCheckout();
        expect(await checkoutPage.getConfirmation()).toContain(data.expectedConfirmation);
      }
      // Checkout missing info
      if (data.checkoutInfo && data.shouldComplete === false) {
        await page.locator('.shopping_cart_link').click();
        await cartPage.proceedToCheckout();
        await checkoutPage.fillInfo(
          data.checkoutInfo.firstName,
          data.checkoutInfo.lastName,
          data.checkoutInfo.postalCode
        );
        expect(await checkoutPage.getErrorMessage()).toContain(data.expectedError);
      }
      // Sort products
      if (data.sortOption) {
        await inventoryPage.sortBy(data.sortOption);
        expect(await inventoryPage.getFirstProductName()).toContain(data.expectedFirstItem);
      }
      // Reset app state
      if (data.resetApp) {
        const beforeReset = await inventoryPage.getCartCount();
        expect(beforeReset).toBeGreaterThan(0);
        await menuPage.resetAppState();
        expect(await inventoryPage.getCartCount()).toBe(data.expectedCartCount);
      }
    });
  }
}); 