import { test, expect } from '@playwright/test';
require('dotenv').config();

const BASE_URL = 'https://fr.bam-karaokebox.com/client/';

test.describe('Page Client', () => {

  test.beforeEach(async ({ page }) => {
    // Connection en tant que client
    await page.goto( BASE_URL + 'login');
    await page.type('input[name=email]', process.env.AUTH_USER);
    await page.type('input[name=password]', process.env.AUTH_PASS);
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(BASE_URL);
  });

  test.afterEach(async ({ page }) => {
    page.close();
  });

  test('Page Information', async ({ page }) => {
    const Clientlocator = page.locator('#client');
    await expect(Clientlocator).toBeVisible();
    const Menulocator = page.locator('.client-menu');
    await expect(Menulocator).toBeVisible();
    const ProgressSteplocator = page.locator('.progress__steps');
    await expect(ProgressSteplocator).toBeVisible();
  });

  test('Page Authentification', async ({ page }) => {
    await page.goto( BASE_URL + 'informations-personnelles');
    const Authlocator = page.locator('.auth');
    await expect(Authlocator).toBeVisible();
    const Menulocator = page.locator('.client-menu');
    await expect(Menulocator).toBeVisible();
  });

  test('Page Sessions', async ({ page }) => {
    await page.goto( BASE_URL + 'sessions');
    const ClientSessionlocator = page.locator('#client');
    await expect(ClientSessionlocator).toBeVisible();
    const Sessionlocator = page.locator('.alert');
    await expect(Sessionlocator).toBeVisible();
    const Menulocator = page.locator('.client-menu');
    await expect(Menulocator).toBeVisible();
  });

  test('Page Fidélité', async ({ page }) => {
    await page.goto( BASE_URL + 'fidelite');
    const ClientFidelitelocator = page.locator('#client');
    await expect(ClientFidelitelocator).toBeVisible();
    const Menulocator = page.locator('.client-menu');
    await expect(Menulocator).toBeVisible();
  });

  test('Page playlist', async ({ page }) => {
    await page.goto( BASE_URL + 'playlist');
    const Carousellocator = page.locator('.VueCarousel');
    await expect(Carousellocator).toBeVisible();
    const CatalogSearchlocator = page.locator('.catalog__search');
    await expect(CatalogSearchlocator).toBeVisible();
    const CatalogSonglocator = page.locator('.js-playlist-songs');
    await expect(CatalogSonglocator).toBeVisible();
    const Playlistlocator = page.locator('.my-playlist');
    await expect(Playlistlocator).toBeVisible();
  });

  test('Page Médias', async ({ page }) => {
    await page.goto( BASE_URL + 'medias');
    const ClientMediaslocator = page.locator('#client');
    await expect(ClientMediaslocator).toBeVisible();
    const Photolocator = page.locator('.alert');
    await expect(Photolocator).toBeVisible();
    const Menulocator = page.locator('.client-menu');
    await expect(Menulocator).toBeVisible();
  });
});
