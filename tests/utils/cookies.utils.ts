import { Page } from "@playwright/test";

export const openCookiesBanner = async (page: Page) => {
  const axeptioWidget = page.locator("id=axeptio_widget");
  if (!(await axeptioWidget.isVisible())) {
    await page.locator("id=axeptio_main_button").click();
  }
};

export const acceptCookies = async (page: Page) => {
  try {
    const acceptCookiesButton = page.locator("id=axeptio_btn_acceptAll");

    if (!(await acceptCookiesButton.isVisible())) {
      await openCookiesBanner(page);
    }
    await acceptCookiesButton.click();
  } catch (ignoredError) {
    /* no modal to bypass*/
  }
};
