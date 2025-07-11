import { Page, Locator } from '@playwright/test';
import { FIRST_NAME_INPUT, LAST_NAME_INPUT, POSTAL_CODE_INPUT, CONTINUE_BUTTON, FINISH_BUTTON, ERROR_MESSAGE, CONFIRMATION } from '../utils/checkoutSelectors';

export class CheckoutPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly errorMessage: Locator;
  readonly confirmation: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator(FIRST_NAME_INPUT);
    this.lastNameInput = page.locator(LAST_NAME_INPUT);
    this.postalCodeInput = page.locator(POSTAL_CODE_INPUT);
    this.continueButton = page.locator(CONTINUE_BUTTON);
    this.finishButton = page.locator(FINISH_BUTTON);
    this.errorMessage = page.locator(ERROR_MESSAGE);
    this.confirmation = page.locator(CONFIRMATION);
  }

  async fillInfo(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }

  async finishCheckout() {
    await this.finishButton.click();
  }

  async getErrorMessage() {
    return this.errorMessage.textContent();
  }

  async getConfirmation() {
    return this.confirmation.textContent();
  }
} 