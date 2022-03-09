import { test, expect } from '@playwright/test';


//test('Vérification de la visibilité du logo', async ({ page }) => {
 // await page.goto('https://fr.bam-karaokebox.com/');
  //const imagelocator = page.locator(".header__brand");
  //await expect(imagelocator).toBeVisible('http://www.w3.org/2000/svg');
//});

//test('Photo carousel presente', async ({ page }) => {
    //await page.goto('https://fr.bam-karaokebox.com/');
    //const carousellocator = page.locator("carousel__item");
    //await expect(carousellocator).toHaveAttribute('src','/uploads/carousel/2/8349383c-1a23-4bfd-8a82-94e68124eeec/bar_mobile.jpg');
    //await expect(carousellocator).toHaveAttribute('src','/uploads/carousel/2/8349383c-1a23-4bfd-8a82-94e68124eeec/velvet_mobile.jpg');
    //await expect(carousellocator).toHaveAttribute('src','/uploads/carousel/2/8349383c-1a23-4bfd-8a82-94e68124eeec/bam-madeleine-mobile-9eme.png');
    //await expect(carousellocator).toHaveAttribute('img src','/uploads/carousel/2/8349383c-1a23-4bfd-8a82-94e68124eeec/bar à gins mobile.png');
  //});
  test('Vérification du bouton Réserver', async ({ page }) => {
    await page.goto('https://fr.bam-karaokebox.com/');
    const ReserverBoutton = page.locator(".header__right");
    await expect(ReserverBoutton).toContainText('Réserver');
  });
  
  test('Click burger', async ({ page }) => {
      await page.goto('https://fr.bam-karaokebox.com/');
      await page.click(".burger__wrap");
    });
  
  test('Check listed menu', async ({ page }) => {
      await page.goto('https://fr.bam-karaokebox.com/');
      const villelocator = page.locator('.header__content--wrap');
      await expect(villelocator).toContainText(['Paris', 'Bordeaux', 'Madrid']);
    });
  /*
  test('Click Paris / Check URL Paris', async ({ page }) => {
      await page.click('text=Paris');
      await expect(page).toHaveURL('https://fr.bam-karaokebox.com/ville/paris');
    });
  */
  test('Check Social Container', async ({ page }) => {
      await page.goto('https://fr.bam-karaokebox.com/');
      const sociallocator = page.locator('id=press');
      await expect(sociallocator).toBeVisible();
    });
  
  test('Check Instagram Container', async ({ page }) => {
      await page.goto('https://fr.bam-karaokebox.com/');
      const instagramlocator = page.locator('.instagram');
      await expect(instagramlocator).toBeVisible();
});