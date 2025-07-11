import { Page, Locator } from '@playwright/test';
import { SORT_DROPDOWN, CART_BADGE, INVENTORY_ITEM, INVENTORY_ITEM_NAME, ADD_REMOVE_BUTTON } from '../utils/inventorySelectors';

export class InventoryPage {
  readonly page: Page;
  readonly sortDropdown: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sortDropdown = page.locator(SORT_DROPDOWN);
    this.cartBadge = page.locator(CART_BADGE);
  }

  async addItem(itemName: string) {
    await this.page.locator(`${INVENTORY_ITEM}:has-text("${itemName}") ${ADD_REMOVE_BUTTON}`).click();
  }

  async removeItem(itemName: string) {
    await this.page.locator(`${INVENTORY_ITEM}:has-text("${itemName}") ${ADD_REMOVE_BUTTON}:has-text('Remove')`).click();
  }

  async getCartCount() {
    const badgeCount = await this.cartBadge.count();
    if (badgeCount > 0) {
      return parseInt(await this.cartBadge.textContent() || '0', 10);
    }
    return 0;
  }

  async sortBy(option: string) {
    await this.sortDropdown.selectOption({ label: option });
  }

  async getFirstProductName() {
    return this.page.locator(INVENTORY_ITEM_NAME).first().textContent();
  }
} 