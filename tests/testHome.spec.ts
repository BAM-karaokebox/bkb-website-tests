import { test, expect } from "@playwright/test";
import { loadHomePage } from "./utils/home.utils";

test.describe.parallel("BKB > Homepage", () => {
  test.beforeEach(async ({ page, browser }) => loadHomePage(page, browser));

  test("Visibilité du logo", async ({ page }) => {
    const imagelocator = page.locator(".header__brand");
    await expect(imagelocator).toBeVisible();
  });

  test("Boutton Réserver en bordure ", async ({ page }) => {
    const ReserverBoutton = page.locator(".header__right");
    await expect(ReserverBoutton).toContainText("Réserver");
  });

  test("Click burger", async ({ page }) => {
    await page.click(".burger__wrap");
  });

  test("Check listed menu", async ({ page }) => {
    const Listlocator = page.locator(".header__content--wrap *");
    await expect(Listlocator).toContainText(["Paris", "Bordeaux", "Madrid"]);
    await expect(Listlocator).toContainText(["fr", "en", "es"]);
  });

  test("About Bam KaraokeBox", async ({ page }) => {
    const AboutUsText = page.locator(".push__text");
    await expect(AboutUsText).toBeVisible();
    const AboutUsImage = page.locator(".push__image");
    await expect(AboutUsImage).toBeVisible();
  });

  test("Les différents lieux", async ({ page }) => {
    const AboutUsText = page.locator("#places .places__items");
    await expect(AboutUsText).toBeVisible();
  });

  test("Social Container", async ({ page }) => {
    const sociallocator = page.locator("#press");
    await expect(sociallocator).toBeVisible();
  });
});
