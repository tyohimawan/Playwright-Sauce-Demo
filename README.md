# Playwright-Sauce-Demo

This project demonstrates end-to-end automation testing for [saucedemo.com](https://www.saucedemo.com/) using Playwright, TypeScript, and the Page Object Model (POM) pattern.

## Features
- Playwright with TypeScript
- Page Object Model structure
- Cypress-style fixtures for test data
- Selectors separated for maintainability
- Sample login, cart, checkout, sort, reset, and logout tests
- Ready for integration with Microsoft Cloud Playwright (MCP / Model Context Protocol)

## Project Structure
```
Playwright-Sauce-Demo/
├── src/
│   ├── constants/      # Test data fixtures (loginTestData, inventoryTestData, etc)
│   ├── pages/          # Page Object Model classes (LoginPage, InventoryPage, etc)
│   ├── utils/          # Selector constants for each page (loginSelectors, cartSelectors, etc)
├── tests/              # Playwright test files
├── playwright.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

### Folder Purpose
- **src/constants/**: Test data and fixtures for data-driven tests
- **src/pages/**: Page Object Model classes encapsulating UI actions
- **src/utils/**: Selector constants for each page, imported by POM classes
- **tests/**: All Playwright test files

## Installation
1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd Playwright-Sauce-Demo
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Install Playwright browsers:
   ```sh
   npx playwright install
   ```

## Running Tests
To run all tests locally:
```sh
npx playwright test
```
To view the HTML report after tests:
```sh
npx playwright show-report
```

## MCP (Model Context Protocol) Integration
This project supports running Playwright tests on MCP (Microsoft Cloud Playwright / Model Context Protocol).

### Steps:
1. **Obtain your MCP WebSocket endpoint** from your MCP provider or Azure portal.
2. **Set the environment variable** before running tests:
   - On Windows (PowerShell):
     ```sh
     $env:MCP_WS_ENDPOINT="wss://<your-mcp-endpoint>"
     npx playwright test --project=mcp
     ```
   - On macOS/Linux:
     ```sh
     MCP_WS_ENDPOINT="wss://<your-mcp-endpoint>" npx playwright test --project=mcp
     ```
3. The `mcp` project will only be available if the `MCP_WS_ENDPOINT` environment variable is set.

#### Example config snippet (see `playwright.config.ts`):
```ts
...(process.env.MCP_WS_ENDPOINT ? [{
  name: 'mcp',
  use: {
    ...devices['Desktop Chrome'],
    connectOptions: {
      wsEndpoint: process.env.MCP_WS_ENDPOINT,
    },
  },
}] : []),
```

### Resources
- [Playwright Docs](https://playwright.dev/docs/intro)
- [SauceDemo](https://www.saucedemo.com/)
- [Microsoft Cloud Playwright (MCP)](https://learn.microsoft.com/en-us/azure/developer/devcenter/test-base/playwright/overview)

## Customization
- Add more Page Objects in the `src/pages/` directory.
- Add more selectors in the `src/utils/` directory.
- Add more test data in the `src/constants/` directory.
- Add more tests in the `tests/` directory.