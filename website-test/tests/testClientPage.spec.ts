import { test, expect } from '@playwright/test';

test('Info client', async ({ page }) => {
  //Connection en tant que client
  await page.goto('https://fr.bam-karaokebox.com/client/');
  await page.type('input[name=email]', 'tomas.v@hotmail.fr');
  await page.type('input[name=password]','BAMbox8624');
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL('https://fr.bam-karaokebox.com/client/');

  //test(Menu client)
  const Clientlocator = page.locator('id=client');
  await expect(Clientlocator).toBeVisible();
  const Menulocator = page.locator('.client-menu');
  await expect(Menulocator).toBeVisible();

  //test(Page sessions)
  await page.click("text=Gérer mes sessions")
  await expect(page).toHaveURL('https://fr.bam-karaokebox.com/client/sessions');
  const ClientSessionlocator = page.locator('id=client');
  await expect(ClientSessionlocator).toBeVisible();
  
  //const Sessionlocator = page.locator('.alert alert--info mtlp');
  //await expect(Sessionlocator).toBeVisible();

  //test(Page points de fidélité)
  await page.click("text=Points de fidélité")
  await expect(page).toHaveURL('https://fr.bam-karaokebox.com/client/fidelite');
  const ClientFidelitelocator = page.locator('id=client');
  await expect(ClientFidelitelocator).toBeVisible();
  

  //test(Page playlist)
  await page.click("text=Créer ma playlist collaborative")
  await expect(page).toHaveURL('https://fr.bam-karaokebox.com/client/playlist');
  const ClientPlaylistlocator = page.locator('.flex-container');
  await expect(ClientPlaylistlocator).toBeVisible();
  page.goBack();

  //test(Page Photo/Video)
  await page.click("text=Mes photos et vidéos")
  await expect(page).toHaveURL('https://fr.bam-karaokebox.com/client/medias');
  const ClientMediaslocator = page.locator('id=client');
  await expect(ClientMediaslocator).toBeVisible();

  //test(Page Commander)
  await page.click("text=Commander à boire ou à manger")
  await expect(page).toHaveURL('https://fr.bam-karaokebox.com/client/eshop');
  const ClientEshoplocator = page.locator('id=client');
  await expect(ClientEshoplocator).toBeVisible();
  

});
