import { test, expect, Locator, Page } from "@playwright/test";
import dotenv from "dotenv";
import { login } from "./utils/auth.utils";
import { acceptCookies } from "./utils/cookies.utils";
import { goto } from "./utils/navigation.utils";

dotenv.config();

const BASE_URL = "https://fr.bam-karaokebox.com/client/";

test.describe.parallel("BKB > My Account", () => {
  const locateElementWithSelectorAndCheckElementIsVisible = async (page: Page, selector: string) => {
    const locator: Locator = page.locator(selector);
    await expect(locator).toBeVisible();
    return locator;
  };

  const loadPage = async (page: Page, subpath: string) => {
    await goto(page, `${BASE_URL}${subpath}`);
  };

  test.beforeEach(async ({ page }) => {
    await login(page);
    await acceptCookies(page);
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test("Page Information", async ({ page }) => {
    await locateElementWithSelectorAndCheckElementIsVisible(page, "#client");
    await locateElementWithSelectorAndCheckElementIsVisible(page, ".client-menu");
    await locateElementWithSelectorAndCheckElementIsVisible(page, ".progress__steps");
  });

  test("Page Authentification", async ({ page }) => {
    await loadPage(page, "informations-personnelles");
    await locateElementWithSelectorAndCheckElementIsVisible(page, ".auth");
    await locateElementWithSelectorAndCheckElementIsVisible(page, ".client-menu");
  });

  test("Page Sessions", async ({ page }) => {
    await loadPage(page, "sessions");
    await locateElementWithSelectorAndCheckElementIsVisible(page, "#client");
    await locateElementWithSelectorAndCheckElementIsVisible(page, ".alert");
    await locateElementWithSelectorAndCheckElementIsVisible(page, ".client-menu");
  });

  test("Page Fidélité", async ({ page }) => {
    await loadPage(page, "fidelite");
    await locateElementWithSelectorAndCheckElementIsVisible(page, "#client");
    await locateElementWithSelectorAndCheckElementIsVisible(page, ".client-menu");
  });

  test("Page playlist", async ({ page }) => {
    await loadPage(page, "playlist");
    await locateElementWithSelectorAndCheckElementIsVisible(page, ".VueCarousel");
    await locateElementWithSelectorAndCheckElementIsVisible(page, ".catalog__search input[type=search]");
    await page.type(".catalog__search input[type=search]", "test");
    await page.click("button.catalog__search-submit");
    await locateElementWithSelectorAndCheckElementIsVisible(page, ".catalog__songs.js-playlist-songs");
    await locateElementWithSelectorAndCheckElementIsVisible(page, ".my-playlist");
  });

  test("Page Médias", async ({ page }) => {
    await loadPage(page, "medias");
    await locateElementWithSelectorAndCheckElementIsVisible(page, "#client");
    await locateElementWithSelectorAndCheckElementIsVisible(page, ".alert");
    await locateElementWithSelectorAndCheckElementIsVisible(page, ".client-menu");
  });
});
