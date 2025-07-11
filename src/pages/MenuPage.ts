import { Page, Locator } from '@playwright/test';
import { MENU_BUTTON, LOGOUT_BUTTON, RESET_BUTTON } from '../utils/menuSelectors';

export class MenuPage {
  readonly page: Page;
  readonly menuButton: Locator;
  readonly logoutButton: Locator;
  readonly resetButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menuButton = page.locator(MENU_BUTTON);
    this.logoutButton = page.locator(LOGOUT_BUTTON);
    this.resetButton = page.locator(RESET_BUTTON);
  }

  async openMenu() {
    await this.menuButton.click();
  }

  async logout() {
    await this.openMenu();
    await this.logoutButton.click();
  }

  async resetAppState() {
    await this.openMenu();
    await this.resetButton.click();
  }
} 