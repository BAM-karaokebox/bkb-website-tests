import { test, expect, errors } from '@playwright/test';

const BASE_URL = 'https://fr.bam-karaokebox.comhttps://fr.bam-karaokebox.com?utm_source=bkb-website-tests&utm_medium=qa-bot&utm_campaign=monitoring';

test.describe('Visibilité/Fonctionnement de la Playlist', () => {

  test.beforeEach(async ({ page }) => {
    // load homepage before each test
    await page.goto(BASE_URL);
    // close modal container
    try {
      await page.waitForSelector('.modal-close').then((btn) => page.click('.modal-close'));
    } catch (ignoredError) {
      /* no modal to bypass */
    }
  });

  test('Visibilité des playlist existante', async ({ page }) => {
    const PlaylistContainer = page.locator('.catalog__thumbs');
    await expect(PlaylistContainer).toBeVisible();
  });

  test("Visibilité/Fonctionnement de la barre de recherche lors d'une saisie valide", async ({ page }) => {
    const SearchContainer = page.locator('.catalog__search');
    await expect(SearchContainer).toBeVisible();

    // Saisie de la chanson souhaité
    await page.fill('[type="search"]', 'Au dd');
    await page.keyboard.press('Enter');

    // Identification de la balise contenant les musiques
    await page.waitForSelector('.catalog__songs .song', {timeout: 30000});
    const song = page.locator('.catalog__songs .song');

    // Compte le nombre de musique correspondant à la recherche
    const Numbersong = await song.count();
    console.log('Nombre de musique correspondant a la recherche');
    console.log(Numbersong);
    if (Numbersong === 0) {
      return ErrorEvent;
    }
  });

  test("Vérification des éléments affichés lors d'une saisie erronée", async ({ page }) => {
    // Saisie d'un nom invalide
    await page.fill('[type="search"]', 'cjebnvjiznevpizenbvipjzbnpizebnpi');
    await page.keyboard.press('Enter');

    await page.waitForSelector('.catalog__songs', {timeout: 30000});
    const song = page.locator('.catalog__songs .song');

    // Compte le nombre de musique correspondant à la recherche
    const Numbersong = await song.count();
    console.log('Nombre de musique correspondant a la recherche erroné');
    console.log(Numbersong);
    if (Numbersong !== 0) {
      return ErrorEvent;
    }
  });

  test('Visibilité du contenu de la playlist / de la recherche', async ({ page }) => {
    await page.fill('[type="search"]', 'Au dd');
    await page.keyboard.press('Enter');

    const SongContainer = page.locator('.catalog__songs--home');
    await expect(SongContainer).toBeVisible();
  });

  test('Visibilité du contenu de la playlist personnalisé', async ({ page }) => {
    await page.fill('[type="search"]', 'Au dd');
    await page.keyboard.press('Enter');

    const SongClient = page.locator('.catalog__songs--client');
    await expect(SongClient).toBeVisible();

    // Ajout de la musique
    await page.click('.song__controls');

    // Verification que la musique soit ajouté a la playlist personnalisé
    await page.waitForSelector('.catalog__songs--client', {timeout: 30000});
    const song = page.locator('.catalog__songs--client .song');
    const NumberSongPlaylist = await song.count();
    console.log('Musique dans la playlist après ajout');
    console.log(NumberSongPlaylist);
    if ( NumberSongPlaylist === 0 ) {
      return ErrorEvent;
    }
  });

  test('Visibilité/Fonctionnement du boutton reset', async ({ page }) => {
    await page.fill('[type="search"]', 'Au dd');
    await page.keyboard.press('Enter');

    await page.click('.song__controls');

    const ButtonReset = page.locator('#catalog .my-playlist__wrap .u-txt-right .button-reset');
    await expect(ButtonReset).toBeVisible();
    await page.click('#catalog .my-playlist__wrap .u-txt-right .button-reset');

    await page.waitForTimeout(5000);

    // Vérification que la playlist soit vidé
    await page.waitForSelector('#catalog .my-playlist__wrap .catalog__songs--client', {timeout: 20000});
    const song = page.locator('.my-playlist__wrap .catalog__songs--client .flip-list .song');
    const NumberSongPlaylist = await song.count();
    console.log("Nombre de musique dans la playlist après l'avoir vidé");
    console.log(NumberSongPlaylist);
    if ( NumberSongPlaylist !== 0 ) {
      return ErrorEvent;
    }
  });
});
