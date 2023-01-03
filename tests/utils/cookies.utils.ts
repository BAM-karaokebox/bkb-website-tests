import { Browser } from "@playwright/test";

export const setCookies = async (browser: Browser) => {
  const browserContext = await browser.newContext();
  await browserContext.addCookies([
    {
      name: "axeptio_cookies",
      value: JSON.stringify({
        $$token: "hp783i1j78thjricl2l4xc",
        $$date: new Date().toISOString(),
        facebook_pixel: true,
        google_analytics: true,
        $$completed: true,
      }),
      path: "/",
      domain: "bam-karaokebox.com",
    },
  ]);
};
