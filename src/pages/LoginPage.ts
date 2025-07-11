import { Page, Locator } from '@playwright/test';
import { USERNAME_INPUT, PASSWORD_INPUT, LOGIN_BUTTON, ERROR_MESSAGE } from '../utils/loginSelectors';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator(USERNAME_INPUT);
    this.passwordInput = page.locator(PASSWORD_INPUT);
    this.loginButton = page.locator(LOGIN_BUTTON);
    this.errorMessage = page.locator(ERROR_MESSAGE);
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getErrorMessage() {
    return this.errorMessage.textContent();
  }
} 