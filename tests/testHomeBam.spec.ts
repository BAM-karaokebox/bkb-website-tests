import { test, expect } from '@playwright/test';

const BASE_URL = 'https://fr.bam-karaokebox.com?utm_source=bkb-website-tests&utm_medium=qa-bot&utm_campaign=monitoring';

test.describe.parallel('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    // load homepage before each test
    await page.goto(BASE_URL);
    // close modal container
    try {
      await page.waitForSelector('.modal-content').then((btn) => page.click('.modal-content .modal-close'));
    } catch (ignoredError) {
      /* no modal to bypass*/
    }
  });

  test('Visibilité du logo', async ({ page }) => {
    const imagelocator = page.locator('.header__brand');
    await expect(imagelocator).toBeVisible('http://www.w3.org/2000/svg');
  });

  test('Boutton Réserver en bordure ', async ({ page }) => {
    const ReserverBoutton = page.locator('.header__right');
    await expect(ReserverBoutton).toContainText('Réserver');
  });

  test('Click burger', async ({ page, context }) => {
    await page.click('.burger__wrap');
  });

  test('Check listed menu', async ({ page }) => {
    const Listlocator = page.locator('.header__content--wrap *');
    await expect(Listlocator).toContainText(['Paris', 'Bordeaux', 'Madrid']);
    await expect(Listlocator).toContainText(['fr', 'en', 'es']);
  });

  test('About Bam KaraokeBox', async ({ page }) => {
    const AboutUsText = page.locator('.push__text');
    await expect(AboutUsText).toBeVisible();
    const AboutUsImage = page.locator('.push__image');
    await expect(AboutUsImage).toBeVisible();
  });

  test('Les différents lieux', async ({ page }) => {
    const AboutUsText = page.locator('#places .places__items');
    await expect(AboutUsText).toBeVisible();
  });

  test('Social Container', async ({ page, context }) => {
    const sociallocator = page.locator('#press');
    await expect(sociallocator).toBeVisible();
  });
});
