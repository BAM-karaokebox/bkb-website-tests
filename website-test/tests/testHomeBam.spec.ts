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
    await expect(Listlocator).toContainText(['Paris', 'Bordeaux', 'Madrid','évènements entreprises']);
    await expect(Listlocator).toContainText(['La carte cadeau', 'K-POP NIGHTS', 'Le menu']);
    await expect(Listlocator).toContainText(['BAM online', 'Le Micro Karaoké']);
    await expect(Listlocator).toContainText(['Infos Covid-19', 'Espace Client','Contact Presse']);
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



test('Paris Richer', async ({ page }) => {
  await page.goto('https://fr.bam-karaokebox.com/etablissement/richer');
  const Presentationlocator = page.locator('.hero');
  await expect(Presentationlocator).toBeVisible();
  const Roomlocator = page.locator('.rooms');
  await expect(Roomlocator).toBeVisible();
  const Serviceslocator = page.locator('id=services-plus');
  await expect(Serviceslocator).toBeVisible();
  const Infoslocator = page.locator('id=practical-infos');
  await expect(Infoslocator).toBeVisible();
  const Presslocator = page.locator('id=press');
  await expect(Presslocator).toBeVisible(); 
  const Faqlocator = page.locator('id=faq');
  await expect(Faqlocator).toBeVisible();
});

test('Paris Sentier', async ({ page }) => {
  await page.goto('https://fr.bam-karaokebox.com/etablissement/sentier');
  const Presentationlocator = page.locator('.hero');
  await expect(Presentationlocator).toBeVisible();
  const Roomlocator = page.locator('.rooms');
  await expect(Roomlocator).toBeVisible();
  const Serviceslocator = page.locator('id=services-plus');
  await expect(Serviceslocator).toBeVisible();
  const Infoslocator = page.locator('id=practical-infos');
  await expect(Infoslocator).toBeVisible();
  const Presslocator = page.locator('id=press');
  await expect(Presslocator).toBeVisible(); 
  const Faqlocator = page.locator('id=faq');
  await expect(Faqlocator).toBeVisible();
});

test('Paris Parmentier', async ({ page }) => {
  await page.goto('https://fr.bam-karaokebox.com/etablissement/parmentier');
  const Presentationlocator = page.locator('.hero');
  await expect(Presentationlocator).toBeVisible();
  const Roomlocator = page.locator('.rooms');
  await expect(Roomlocator).toBeVisible();
  const Serviceslocator = page.locator('id=services-plus');
  await expect(Serviceslocator).toBeVisible();
  const Infoslocator = page.locator('id=practical-infos');
  await expect(Infoslocator).toBeVisible();
  const Presslocator = page.locator('id=press');
  await expect(Presslocator).toBeVisible(); 
  const Faqlocator = page.locator('id=faq');
  await expect(Faqlocator).toBeVisible();
});

test('Paris Madeleine', async ({ page }) => {
  await page.goto('https://fr.bam-karaokebox.com/etablissement/madeleine');
  const Presentationlocator = page.locator('.hero');
  await expect(Presentationlocator).toBeVisible();
  const Roomlocator = page.locator('.rooms');
  await expect(Roomlocator).toBeVisible();
  const Serviceslocator = page.locator('id=services-plus');
  await expect(Serviceslocator).toBeVisible();
  const Infoslocator = page.locator('id=practical-infos');
  await expect(Infoslocator).toBeVisible();
  const Presslocator = page.locator('id=press');
  await expect(Presslocator).toBeVisible(); 
  const Faqlocator = page.locator('id=faq');
  await expect(Faqlocator).toBeVisible();
});

test('Paris Etoile', async ({ page }) => {
  await page.goto('https://fr.bam-karaokebox.com/etablissement/etoile');
  const Presentationlocator = page.locator('.hero');
  await expect(Presentationlocator).toBeVisible();
  const Roomlocator = page.locator('.rooms');
  await expect(Roomlocator).toBeVisible();
  const Serviceslocator = page.locator('id=services-plus');
  await expect(Serviceslocator).toBeVisible();
  const Infoslocator = page.locator('id=practical-infos');
  await expect(Infoslocator).toBeVisible();
  const Presslocator = page.locator('id=press');
  await expect(Presslocator).toBeVisible(); 
  const Faqlocator = page.locator('id=faq');
  await expect(Faqlocator).toBeVisible();
});

test('Paris Chartrons', async ({ page }) => {
  await page.goto('https://fr.bam-karaokebox.com/etablissement/chartrons');
  const Presentationlocator = page.locator('.hero');
  await expect(Presentationlocator).toBeVisible();
  const Roomlocator = page.locator('.rooms');
  await expect(Roomlocator).toBeVisible();
  const Serviceslocator = page.locator('id=services-plus');
  await expect(Serviceslocator).toBeVisible();
  const Infoslocator = page.locator('id=practical-infos');
  await expect(Infoslocator).toBeVisible();
  const Presslocator = page.locator('id=press');
  await expect(Presslocator).toBeVisible(); 
  const Faqlocator = page.locator('id=faq');
  await expect(Faqlocator).toBeVisible();
});

test('Paris Recoletos', async ({ page }) => {
  await page.goto('https://fr.bam-karaokebox.com/etablissement/recoletos');
  const Presentationlocator = page.locator('.hero');
  await expect(Presentationlocator).toBeVisible();
  const Roomlocator = page.locator('.rooms');
  await expect(Roomlocator).toBeVisible();
  const Serviceslocator = page.locator('id=services-plus');
  await expect(Serviceslocator).toBeVisible();
  const Infoslocator = page.locator('id=practical-infos');
  await expect(Infoslocator).toBeVisible();
  const Presslocator = page.locator('id=press');
  await expect(Presslocator).toBeVisible(); 
  const Faqlocator = page.locator('id=faq');
  await expect(Faqlocator).toBeVisible();
});
