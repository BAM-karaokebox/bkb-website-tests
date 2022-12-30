import { test, expect, Page } from "@playwright/test";

const BASE_URL = "https://fr.bam-karaokebox.com";
const TEST_MARKER_SUFFIX = "?utm_source=bkb-website-tests&utm_medium=qa-bot&utm_campaign=monitoring";

const VENUES = ["richer", "sentier", "parmentier", "madeleine", "etoile", "chartrons", "recoletos", "luchana"];

const checkVenuePageLayout = async (page: Page, venuePath: string) => {
  await page.goto(BASE_URL + venuePath + TEST_MARKER_SUFFIX);
  const Presentationlocator = page.locator(".hero");
  await expect(Presentationlocator).toBeVisible();
  const Roomlocator = page.locator(".rooms");
  await expect(Roomlocator).toBeVisible();
  const Serviceslocator = page.locator("id=services-plus");
  await expect(Serviceslocator).toBeVisible();
  const Infoslocator = page.locator("id=practical-infos");
  await expect(Infoslocator).toBeVisible();
  const Presslocator = page.locator("id=press");
  await expect(Presslocator).toBeVisible();
  const Faqlocator = page.locator("id=faq");
  await expect(Faqlocator).toBeVisible();
};

test.describe.parallel("testVenues", () => {
  VENUES.forEach((venueName) => {
    test(`Venue: ${venueName}`, async ({ page }) => checkVenuePageLayout(page, `/etablissement/${venueName}`));
  });
});
