import { test, expect } from '@playwright/test';
require('dotenv').config();

test.describe('Page Client', () => {

  test.beforeEach(async ({ page }) => {
    //Connection en tant que client
    await page.goto('https://fr.bam-karaokebox.com/client/login');
    await page.type('input[name=email]', process.env.AUTH_USER);
    await page.type('input[name=password]',process.env.AUTH_PASS);
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL('https://fr.bam-karaokebox.com/client/')
  });

  test.afterEach(async ({ page }) => {
    page.close()
  });

  test('Page Information', async ({ page }) => {
    const Clientlocator = page.locator('id=client');
    await expect(Clientlocator).toBeVisible();
    const Menulocator = page.locator('.client-menu');
    await expect(Menulocator).toBeVisible();
    const ProgressSteplocator = page.locator('.progress__steps');
    await expect(ProgressSteplocator).toBeVisible();
  });

  test('Page Authentification', async ({ page }) => {
    //Vérification(Page Authentification)
    await page.goto('https://fr.bam-karaokebox.com/client/informations-personnelles');
    const Authlocator = page.locator('.auth');
    await expect(Authlocator).toBeVisible();
    const Menulocator = page.locator('.client-menu');
    await expect(Menulocator).toBeVisible();
  });

  test('Page Sessions', async ({ page }) => {
    //Vérification(Page sessions)
    await page.goto('https://fr.bam-karaokebox.com/client/sessions');
    const ClientSessionlocator = page.locator('id=client');
    await expect(ClientSessionlocator).toBeVisible();
    const Sessionlocator = page.locator('.alert');
    await expect(Sessionlocator).toBeVisible();
    const Menulocator = page.locator('.client-menu');
    await expect(Menulocator).toBeVisible();
  });

  test('Page Fidélité', async ({ page }) => {
    //Vérification(Page points de fidélité)
    await page.goto('https://fr.bam-karaokebox.com/client/fidelite');
    const ClientFidelitelocator = page.locator('id=client');
    await expect(ClientFidelitelocator).toBeVisible();
    const Menulocator = page.locator('.client-menu');
    await expect(Menulocator).toBeVisible();
  });

  test('Page playlist', async ({ page }) => {
    //Vérification(Page playlist)
    await page.goto('https://fr.bam-karaokebox.com/client/playlist');
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
    //Vérification(Page Photo/Video)
    await page.goto('https://fr.bam-karaokebox.com/client/medias');
    const ClientMediaslocator = page.locator('id=client');
    await expect(ClientMediaslocator).toBeVisible();
    const Photolocator = page.locator('.alert');
    await expect(Photolocator).toBeVisible();
    const Menulocator = page.locator('.client-menu');
    await expect(Menulocator).toBeVisible();
  });
});
