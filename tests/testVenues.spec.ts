import { test, expect } from '@playwright/test';

const BASE_URL = 'https://fr.bam-karaokebox.com';

const VENUES = [
  'richer',
  'sentier',
  'parmentier',
  'madeleine',
  'etoile',
  'chartrons',
  'recoletos',
];

const checkVenuePageLayout = async (page, venuePath) => {
  await page.goto(BASE_URL + venuePath);
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
};

VENUES.forEach(venueName => {
  test(`Venue: ${venueName}`, async ({ page }) => checkVenuePageLayout(page, `/etablissement/${venueName}`));
});
