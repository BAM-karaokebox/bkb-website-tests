# BAM KARAOKEBOX website-tests

Inside that directory, you can run several commands:

  npx playwright test
    Runs the end-to-end tests.

  npx playwright test --project=chromium
    Runs the tests only on Desktop Chrome.

  npx playwright test tests\example.spec.ts
    Runs the tests of a specific file.

  npx playwright test --debug
    Runs the tests in debug mode.

We suggest that you begin by typing:

  cd website-tests
  npx playwright test

And check out the following files:
  - ./website-tests/tests\example.spec.ts - Example end-to-end test
  - ./website-tests/playwright.config.ts - Playwright Test configuration
