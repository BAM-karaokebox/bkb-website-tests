const playwright = require ('@playwright/test');
const expect = require('expect.js');


(async() =>{

    const browser = await playwright['chromium'].launch({
        headless: false
    });

    const context = await browser.newContext();

    const page = await context.newPage();

    await page.goto("https://www.instagram.com/accounts/login/");

    await page.click("text= Autoriser les cookies essentiels et optionnels");

    await page.waitForSelector('[type=submit]', {
        state: 'visible',
      });
  
      await page.type('[name=username]', '0677477409'); // -> Entrez votre username
      await page.type('[type="password"]', 'raptosor8624'); //-> Entrez votre mot de passe

      await page.click('[type=submit]');
      await page.click("text=Plus tard");

      await page.type('[placeholder=Rechercher]', 'bamkaraokebox');
      await page.click('text=bamkaraokebox')
})()