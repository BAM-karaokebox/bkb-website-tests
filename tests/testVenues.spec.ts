import { test, expect } from '@playwright/test';



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
  