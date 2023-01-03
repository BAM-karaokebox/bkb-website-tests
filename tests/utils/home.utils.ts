import { Page, Browser } from "@playwright/test";
import { acceptCookies } from "./cookies.utils";

const BASE_HOST = "bam-karaokebox.com";
const QS_ANALYTICS_MARKER = "?utm_source=bkb-website-tests&utm_medium=qa-bot&utm_campaign=monitoring";

export const loadHomePage = async (page: Page, browser: Browser, locale = "fr") => {
  // load homepage before each test
  // await setCookies(browser);
  await page.goto(`https://${locale}.${BASE_HOST}${QS_ANALYTICS_MARKER}`);

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
