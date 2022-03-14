import { test, expect } from '@playwright/test';

test('Visibilité du logo', async ({ page }) => {
  await page.goto('https://fr.bam-karaokebox.com/');
  const imagelocator = page.locator(".header__brand");
  await expect(imagelocator).toBeVisible('http://www.w3.org/2000/svg');
});

test('Boutton Réserver en bordure ', async ({ page }) => {
  await page.goto('https://fr.bam-karaokebox.com/');
  const ReserverBoutton = page.locator(".header__right");
  await expect(ReserverBoutton).toContainText('Réserver');
});

test('Visibilité boutton central', async ({ page }) => {
  await page.goto('https://fr.bam-karaokebox.com/');
  const BouttonCentral = page.locator('.hero__booking');
  await expect(BouttonCentral).toBeVisible();
});

test('Click burger', async ({ page }) => {
    await page.goto('https://fr.bam-karaokebox.com/');
    await page.click(".burger__wrap");
});

test('Check listed menu', async ({ page }) => {
    await page.goto('https://fr.bam-karaokebox.com/');
    const Listlocator = page.locator('.header__content--wrap');
    await expect(Listlocator).toContainText(['Paris', 'Bordeaux', 'Madrid']);
    await expect(Listlocator).toContainText(['fr','en','es']);
});

test('About Bam KaraokeBox', async ({ page }) => {
  await page.goto('https://fr.bam-karaokebox.com/');
  const AboutUsText = page.locator('.push__wrap');
  await expect(AboutUsText).toBeVisible();
  const AboutUsImage = page.locator('.push__image');
  await expect(AboutUsImage).toBeVisible();
});

test('Les différents lieux', async ({ page }) => {
  await page.goto('https://fr.bam-karaokebox.com/');
  const AboutUsText = page.locator('id=places');
  await expect(AboutUsText).toBeVisible();
});

test('Social Container', async ({ page }) => {
    await page.goto('https://fr.bam-karaokebox.com/');
    const sociallocator = page.locator('id=press');
    await expect(sociallocator).toBeVisible();
  });

test('Instagram Container', async ({ page }) => {
    await page.goto('https://fr.bam-karaokebox.com/');
    const instagramlocator = page.locator('id=instagram');
    await expect(instagramlocator).toBeVisible();
});
