import { test, expect } from '@playwright/test';


const BASE_URL = 'https://fr.bam-karaokebox.com/';


test.describe('Homepage', () => {

  test.beforeEach(async ({ page }) => {
    // load homepage before each test
    await page.goto(BASE_URL);
    // close modal if present
    const modalCloseButton = await page.$$('.modal-close');
    if (modalCloseButton) {
      await page.click('.modal-close');
    }
  });


  test('Visibilité du logo', async ({ page }) => {
    const imagelocator = page.locator(".header__brand");
    await expect(imagelocator).toBeVisible('http://www.w3.org/2000/svg');
  });

  test('Boutton Réserver en bordure ', async ({ page }) => {
    const ReserverBoutton = page.locator(".header__right");
    await expect(ReserverBoutton).toContainText('Réserver');
  });

  test('Click burger', async ({ page }) => {
    await page.click(".burger__wrap");
  });

  test('Check listed menu', async ({ page }) => {
    const Listlocator = page.locator('.header__content--wrap');
    await expect(Listlocator).toContainText(['Paris', 'Bordeaux', 'Madrid']);
    await expect(Listlocator).toContainText(['fr','en','es']);
  });

  test('About Bam KaraokeBox', async ({ page }) => {
    const AboutUsText = page.locator('#about .push__wrap');
    await expect(AboutUsText).toBeVisible();
    const AboutUsImage = page.locator('#about .push__image');
    await expect(AboutUsImage).toBeVisible();
  });

  test('Les différents lieux', async ({ page }) => {
    const placesText = page.locator('#places');
    await expect(placesText).toBeVisible();
  });

  test('Social Container', async ({ page }) => {
    const sociallocator = page.locator('#press');
    await expect(sociallocator).toBeVisible();
  });

  test('Instagram Container', async ({ page }) => {
    const instagramlocator = page.locator('#instagram');
    await expect(instagramlocator).toBeVisible();
  });

});
