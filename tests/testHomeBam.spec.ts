import { test, expect } from '@playwright/test';

const BASE_URL = 'https://fr.bam-karaokebox.com/';

test.describe('Homepage', () => {

  test.beforeEach(async ({ page }) => {
    // load homepage before each test
    await page.goto(BASE_URL);
    // trigger a "useless" click to close temporary modals we may have
    // at the moment on our website
    // (e.g. special events like K-Pop nights)
    await page.click('body');
  });

  test('Visibilité du logo', async ({ page }) => {
    const imagelocator = page.locator('.header__brand');
    await expect(imagelocator).toBeVisible('http://www.w3.org/2000/svg');
  });

  test('Boutton Réserver en bordure ', async ({ page }) => {
    const ReserverBoutton = page.locator('.header__right');
    await expect(ReserverBoutton).toContainText('Réserver');
  });

  test('Click burger', async ({ page }) => {
    await page.click('.burger__wrap');
  });

  test('Check listed menu', async ({ page }) => {
    const Listlocator = page.locator('.header__content--wrap');
    await expect(Listlocator).toContainText(['Paris', 'Bordeaux', 'Madrid']);
    await expect(Listlocator).toContainText(['fr', 'en', 'es']);
  });

  test('About Bam KaraokeBox', async ({ page }) => {
    const AboutUsText = page.locator('.push__wrap');
    await expect(AboutUsText).toBeVisible();
    const AboutUsImage = page.locator('.push__image');
    await expect(AboutUsImage).toBeVisible();
  });

  test('Les différents lieux', async ({ page }) => {
    const AboutUsText = page.locator('id=places');
    await expect(AboutUsText).toBeVisible();
  });

  test('Social Container', async ({ page }) => {
    const sociallocator = page.locator('id=press');
    await expect(sociallocator).toBeVisible();
  });

  test('Instagram Container', async ({ page }) => {
    const instagramlocator = page.locator('id=instagram');
    await expect(instagramlocator).toBeVisible();
  });

});
