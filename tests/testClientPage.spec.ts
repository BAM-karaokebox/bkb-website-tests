import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = 'https://fr.bam-karaokebox.com/client/';

test.describe.parallel('Page Client', () => {
  const locateElementWithSelectorAndCheckElementIsVisible = async (page, selector) => {
    const locator = page.locator(selector);
    await expect(locator).toBeVisible();
    return locator;
  };

  test.beforeEach(async ({ page }) => {
    // Connection en tant que client
    await page.goto(BASE_URL + 'login?utm_source=bkb-website-tests&utm_medium=qa-bot&utm_campaign=monitoring');
    await page.type('input[name=email]', process.env.AUTH_USER);
    await page.type('input[name=password]', process.env.AUTH_PASS);
    await page.keyboard.press('Enter').then(() => page.waitForNavigation());
  });

  test.afterEach(async ({ page }) => {
    page.close();
  });

  test('Page Information', async ({ page }) => {
    await locateElementWithSelectorAndCheckElementIsVisible(page, '#client');
    await locateElementWithSelectorAndCheckElementIsVisible(page, '.client-menu');
    await locateElementWithSelectorAndCheckElementIsVisible(page, '.progress__steps');
  });

  test('Page Authentification', async ({ page }) => {
    await page.goto(BASE_URL + 'informations-personnelles');
    await locateElementWithSelectorAndCheckElementIsVisible(page, '.auth');
    await locateElementWithSelectorAndCheckElementIsVisible(page, '.client-menu');
  });

  test('Page Sessions', async ({ page }) => {
    await page.goto(BASE_URL + 'sessions');
    await locateElementWithSelectorAndCheckElementIsVisible(page, '#client');
    await locateElementWithSelectorAndCheckElementIsVisible(page, '.alert');
    await locateElementWithSelectorAndCheckElementIsVisible(page, '.client-menu');
  });

  test('Page Fidélité', async ({ page }) => {
    await page.goto(BASE_URL + 'fidelite');
    await locateElementWithSelectorAndCheckElementIsVisible(page, '#client');
    await locateElementWithSelectorAndCheckElementIsVisible(page, '.client-menu');
  });

  test('Page playlist', async ({ page }) => {
    await page.goto(BASE_URL + 'playlist');
    await locateElementWithSelectorAndCheckElementIsVisible(page, '.VueCarousel');
    await locateElementWithSelectorAndCheckElementIsVisible(page, '.catalog__search');
    await locateElementWithSelectorAndCheckElementIsVisible(page, '.js-playlist-songs');
    await locateElementWithSelectorAndCheckElementIsVisible(page, '.my-playlist');
  });

  test('Page Médias', async ({ page }) => {
    await page.goto(BASE_URL + 'medias');
    await locateElementWithSelectorAndCheckElementIsVisible(page, '#client');
    await locateElementWithSelectorAndCheckElementIsVisible(page, '.alert');
    await locateElementWithSelectorAndCheckElementIsVisible(page, '.client-menu');
  });
});
