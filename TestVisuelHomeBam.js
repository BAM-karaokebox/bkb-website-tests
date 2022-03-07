const playwright = require ('@playwright/test');
//const expect = require('expect.js');
;


(async() =>{

    const browser = await playwright['chromium'].launch({
        headless: false
    });

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://fr.bam-karaokebox.com/");

    await page.click(".burger__wrap");

    await page.click('text=Paris');
})()