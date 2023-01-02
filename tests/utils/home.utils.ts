import { Page } from "@playwright/test";

const BASE_HOST = "bam-karaokebox.com";
const QS_ANALYTICS_MARKER = "?utm_source=bkb-website-tests&utm_medium=qa-bot&utm_campaign=monitoring";

export const loadHomePage = async (page: Page, locale = "fr") => {
  // load homepage before each test
  await page.goto(`https://${locale}.${BASE_HOST}${QS_ANALYTICS_MARKER}`);

  // close modal container
  try {
    await page.waitForSelector(".modal-content").then(() => page.click(".modal-content .modal-close"));
  } catch (ignoredError) {
    /* no modal to bypass*/
  }
};
