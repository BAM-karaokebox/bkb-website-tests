import { test, expect, Page } from "@playwright/test";
import { loadHomePage } from "./utils/home.utils";

const SONG_QUERY_VALID = "Au dd";
const SONG_QUERY_INVALID = "cjebnvjiznevpizenbvipjzbnpizebnpi";

test.describe.parallel("BKB > Homepage / Catalog & Playlist", () => {
  const searchForSong = async (page: Page, song: string) => {
    await page.fill('.catalog [type="search"]', song);
    await page.keyboard.press("Enter");
  };

  const checkCurrentPersonalizedPlaylistIsClear = async (page: Page) => {
    await page.waitForSelector(".catalog__songs--client", { timeout: 30000 });
    const songs = page.locator(".catalog__songs--client .song");
    await expect(songs).toBeHidden();
  };

  test.beforeEach(async ({ page, browser }) => loadHomePage(page, browser));

  test("As a web user browsing the homepage, I can see the default playlists", async ({ page }) => {
    const PlaylistContainer = page.locator(".catalog__thumbs");
    await expect(PlaylistContainer).toBeVisible();
  });

  test("As a web user browsing the homepage, I can search for an existing song", async ({ page }) => {
    await searchForSong(page, SONG_QUERY_VALID);

    // Check we found at least some matching songs
    const songs = page.locator(".catalog__songs .song");
    await expect(songs).toBeVisible();
    const songCount = await songs.count();
    expect(songCount).not.toBe(0);
  });

  test("As a web user browsing the homepage, I can search for a non-existing song", async ({ page }) => {
    await searchForSong(page, SONG_QUERY_INVALID);

    // Check we couldn't find this invalid song
    await page.waitForSelector(".catalog__songs", { timeout: 30000 });
    const songs = page.locator(".catalog__songs .song");
    const songCount = await songs.count();
    expect(songCount).toBe(0);
  });

  test("As a web user, I can see the catalog search area", async ({ page }) => {
    const SearchContainer = page.locator(".catalog__search");
    await expect(SearchContainer).toBeVisible();
  });

  test("As a web user, I can add songs to the session's personalized playlist", async ({ page }) => {
    await searchForSong(page, SONG_QUERY_VALID);

    // check playlist is clear again
    await checkCurrentPersonalizedPlaylistIsClear(page);

    // add song to playlist
    await page.click(".song__controls .u-px");

    // check that a song was added to the personalized playlist
    const songs = page.locator(".catalog__songs--client .song");
    await expect(songs).toBeVisible();
    const songCount = await songs.count();
    expect(songCount).not.toBe(0);
  });

  test("As a web user, I can clear the session's personalized playlist", async ({ page }) => {
    await searchForSong(page, SONG_QUERY_VALID);

    // check playlist is clear at beginning
    await checkCurrentPersonalizedPlaylistIsClear(page);

    // add song to playlist
    const addToPlaylistButton = page.locator(".song__controls .u-px");
    await addToPlaylistButton.click();

    // reset playlist
    const resetButton = page.locator(".my-playlist__wrap .u-txt-right .button-reset");
    await expect(resetButton).toBeVisible();
    await resetButton.click();

    // check playlist is clear again
    await expect(page.locator(".my-playlist__wrap .u-txt-right .button-reset")).toBeHidden();
    await checkCurrentPersonalizedPlaylistIsClear(page);
  });
});
