import { Page, Locator } from '@playwright/test';
import { CHECKOUT_BUTTON, CART_ITEM_NAME } from '../utils/cartSelectors';

export class CartPage {
  readonly page: Page;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.locator(CHECKOUT_BUTTON);
  }

  async getCartItems() {
    return this.page.locator(CART_ITEM_NAME).allTextContents();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
} 