const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  outputDir: './tests/screenshots/results',
  snapshotPathTemplate: '{testDir}/screenshots/baseline/{projectName}/{arg}{ext}',
  fullyParallel: true,
  timeout: 60000,
  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.01,
    },
  },
  use: {
    baseURL: 'http://localhost:4000/portfolio/',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium', viewport: { width: 1280, height: 720 } },
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox', viewport: { width: 1280, height: 720 } },
    },
    {
      name: 'webkit',
      use: { browserName: 'webkit', viewport: { width: 1280, height: 720 } },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
  webServer: {
    command: 'npm run build:css && bundle exec jekyll serve',
    url: 'http://localhost:4000/portfolio/',
    reuseExistingServer: true,
    timeout: 60000,
  },
});
