import { test, expect, Page, Locator } from "@playwright/test";

const BASE_URL = "https://fr.bam-karaokebox.com";
const TEST_MARKER_SUFFIX = "?utm_source=bkb-website-tests&utm_medium=qa-bot&utm_campaign=monitoring";

interface Venue {
  name: string;
  elements: string[];
}

const VENUES: Venue[] = [
  {
    name: "richer",
    elements: [".hero", ".rooms", "id=services-plus", "id=practical-infos", "id=press", "id=faq"],
  },
  {
    name: "sentier",
    elements: [".hero", ".rooms", "id=services-plus", "id=practical-infos", "id=press", "id=faq"],
  },
  {
    name: "parmentier",
    elements: [".hero", ".rooms", "id=services-plus", "id=practical-infos", "id=press", "id=faq"],
  },
  {
    name: "madeleine",
    elements: [".hero", ".rooms", "id=services-plus", "id=practical-infos", "id=press", "id=faq"],
  },
  {
    name: "etoile",
    elements: [".hero", ".rooms", "id=services-plus", "id=practical-infos", "id=press", "id=faq"],
  },
  {
    name: "chartrons",
    elements: [".hero", ".rooms", "id=services-plus", "id=practical-infos", "id=press", "id=faq"],
  },
  {
    name: "recoletos",
    elements: [".hero", ".rooms", "id=services-plus", "id=practical-infos", "id=press", "id=faq"],
  },
  {
    name: "luchana",
    elements: [".hero", ".rooms", "id=services-plus", "id=practical-infos", "id=faq"],
  },
];

const checkForVisibleElement = async (page: Page, locator: string) => {
  const elementLocator: Locator = page.locator(locator);
  await expect(elementLocator).toBeVisible();
};

const checkVenuePageLayout = async (page: Page, venue: Venue) => {
  await page.goto(BASE_URL + `/etablissement/${venue.name}` + TEST_MARKER_SUFFIX);

  venue.elements.forEach((selector) => {
    void checkForVisibleElement(page, selector);
  });
};

test.describe.parallel("testVenues", () => {
  VENUES.forEach((venue: Venue) => {
    test(`Venue: ${venue.name}`, async ({ page }) => checkVenuePageLayout(page, venue));
  });
});
