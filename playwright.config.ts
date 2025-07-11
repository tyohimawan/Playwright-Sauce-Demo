import { defineConfig, devices } from '@playwright/test';

const projects = [
  {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'] },
  },
  {
    name: 'firefox',
    use: { ...devices['Desktop Firefox'] },
  },
  {
    name: 'webkit',
    use: { ...devices['Desktop Safari'] },
  },
  // MCP integration example
  ...(process.env.MCP_WS_ENDPOINT ? [
    {
      name: 'mcp',
      use: {
        ...devices['Desktop Chrome'],
        connectOptions: {
          wsEndpoint: process.env.MCP_WS_ENDPOINT,
        },
      },
    },
  ] : []),
];

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
    baseURL: 'https://www.saucedemo.com/',
  },
  projects,
}); 