import { Page } from "@playwright/test";
import { TEST_MARKER_SUFFIX } from "./navigation.utils";

const BASE_URL = "https://fr.bam-karaokebox.com/client/";

export const login = async (page: Page) => {
  // Connection en tant que client
  await page.goto(`${BASE_URL}login?${TEST_MARKER_SUFFIX}`);
  await page.type("input[name=email]", process.env.AUTH_USER as string);
  await page.type("input[name=password]", process.env.AUTH_PASS as string);
  await page.keyboard.press("Enter").then(() => page.waitForNavigation());
};
