import { Page } from "@playwright/test";

export const TEST_MARKER_SUFFIX = "utm_source=bkb-website-tests&utm_medium=qa-bot&utm_campaign=monitoring";

export const goto = async (page: Page, url: string) => {
  await page.goto(url.indexOf("?") !== -1 ? `${url}?${TEST_MARKER_SUFFIX}` : `${url}&${TEST_MARKER_SUFFIX}`);
};
