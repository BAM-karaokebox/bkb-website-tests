import { test, expect } from '@playwright/test';


test('Visibilité du container de la Playlist', async ({ page }) => {
    await page.goto('https://fr.bam-karaokebox.com')
    const modalCloseButton = await page.$$('.modal-close');
    if (modalCloseButton) {
      await page.click('.modal-close');
    }
    const PlaylistContainer = page.locator(".catalog__thumbs");
    await expect(PlaylistContainer).toBeVisible();

    const SearchContainer = page.locator(".catalog__search");
    await expect(SearchContainer).toBeVisible();

    await page.fill('[type="search"]', "Au DD")
    await page.keyboard.press("Enter");
    const SongContainer = page.locator(".catalog__songs--home");
    await expect(SongContainer).toBeVisible();

    await page.click('.song__controls')
    const ButtonReset = page.locator(".button-reset");
    await expect(ButtonReset).toBeVisible();
    await page.click('.button-reset')
});