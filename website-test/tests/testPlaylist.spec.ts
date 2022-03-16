import { test, expect } from '@playwright/test';


test('Visibilité/Fonctionnement du container Playlist', async ({ page }) => {
    await page.goto('https://fr.bam-karaokebox.com')
    const modalCloseButton = await page.$$('.modal-close');
    if (modalCloseButton) {
      await page.click('.modal-close');
    }

    //Visibilité des differents playlist
    const PlaylistContainer = page.locator('.catalog__thumbs');
    await expect(PlaylistContainer).toBeVisible();

    //Visibilité/Fonctionnement de la barre de recherche
    const SearchContainer = page.locator('.catalog__search');
    await expect(SearchContainer).toBeVisible();
    await page.fill('[type="search"]', 'Au DD')
    await page.keyboard.press('Enter');

    //Visibilité du contenu des playlists ou de la recherche
    const SongContainer = page.locator('.catalog__songs--home');
    await expect(SongContainer).toBeVisible();

    //Visibilité du contenu de la playlist personnalisé
    const SongClient = page.locator('.catalog__songs--client');
    await expect(SongClient).toBeVisible();    
    await page.click('.song__controls')

    //Visibilité/Fonctionnement du boutton reset
    const ButtonReset = page.locator('.u-txt-right .button-reset');
    await expect(ButtonReset).toBeVisible();
    await page.click('.u-txt-right .button-reset')
});