import { test, expect, Page, Locator } from "@playwright/test";
import { acceptCookies } from "./utils/cookies.utils";
import { goto } from "./utils/navigation.utils";

const BASE_URL = "https://fr.bam-karaokebox.com";

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
  await goto(page, `${BASE_URL}/etablissement/${venue.name}`);

  venue.elements.forEach((selector) => {
    void checkForVisibleElement(page, selector);
  });
};

test.describe.parallel("BKB > Venues", () => {
  test.beforeEach(async ({ page }) => await acceptCookies(page));

  VENUES.forEach((venue: Venue) => {
    test(`Venue: ${venue.name}`, async ({ page }) => checkVenuePageLayout(page, venue));
  });
});
