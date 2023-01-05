import { Page, Browser } from "@playwright/test";
import { acceptCookies } from "./cookies.utils";
import { goto } from "./navigation.utils";

const BASE_HOST = "bam-karaokebox.com";

export const loadHomePage = async (page: Page, browser: Browser, locale = "fr") => {
  // load homepage before each test
  // await setCookies(browser);
  await goto(page, `https://${locale}.${BASE_HOST}`);

  // close modal container
  try {
    await page
      .waitForSelector(".modal-content", { timeout: 3000 })
      .then(() => page.click(".modal-content .modal-close"));
  } catch (ignoredError) {
    /* no modal to bypass*/
  }
  await acceptCookies(page);
};
