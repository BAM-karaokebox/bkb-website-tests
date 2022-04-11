import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = 'https://backend.bam-karaokebox.com/index.php/login_backend';

const VENUES = [{
  name: 'Richer',
  id: 2,
  floorPrice: 5,
}, {
  name: 'Sentier',
  id: 3,
  floorPrice: 5,
}, {
  name: 'Parmentier',
  id: 4,
  floorPrice: 5,
}, {
  name: 'Chartrons',
  id: 5,
  floorPrice: 3,
}, {
  name: 'Recoletos',
  id: 6,
  floorPrice: 4,
}, {
  name: 'Madeleine',
  id: 7,
  floorPrice: 5,
},
{
  name: 'Etoile',
  id: 8,
  floorPrice: 5,
}];

const Erreur = [];

const checkPrice = async (page, venuePath) => {

  await page.waitForSelector('.booking .calendar .screen');

  // Create a list compose of the "name" of room and date of each available slot
  const RoomSlot = await page.evaluate(() => {
    const ListeSalle = [];
    const NumberRoom = document.querySelectorAll('.screen').length;
    for (let j = 0; j < NumberRoom; j++) {
      const NumberSlot = document.querySelectorAll('div.places')[j].querySelectorAll('div.available').length;
      if (NumberSlot !== 0) {
        for (let i = 0; i < NumberSlot; i++) {
          ListeSalle.push(document.querySelectorAll('div.capacity')[j].childNodes[0].nodeValue
            + document.querySelectorAll('div.slot input')[0].dataset.bookingDate );
        }
      }
    }
    return ListeSalle;
  });

  // Create a list compose of hours of each available slot
  const Creneau = await page.evaluate(() => {
    const ListeSeance = [];
    const NumberSlot = document.querySelectorAll('div.slot.available').length;
    for (let i = 0; i < NumberSlot; i++) {
      ListeSeance.push(document.querySelectorAll('div.slot.available')[i].childNodes[0].nodeValue);
    }
    return ListeSeance;
  });

  // Create a list compose of price of each available slot
  const PrixSalle = await page.evaluate(() => {
    const Prix = [];
    const NumberSlot = document.querySelectorAll('div.slot.available').length;
    for (let i = 0; i < NumberSlot; i++) {
      Prix.push(document.querySelectorAll('div.slot.available')[i].childNodes[2].nodeValue);
    }
    return Prix;
  });

  // Create a list compose of price per person of each available slot
  const PrixPerson = await page.evaluate(() => {
    const PrixPerPerson = [];
    const NumberSlot = document.querySelectorAll('div.slot.available').length;
    for (let i = 0; i < NumberSlot; i++) {
      PrixPerPerson.push(document.querySelectorAll('div.slot.available')[i].childNodes[4].nodeValue);
    }
    return PrixPerPerson;
  });

  // Verify the price by person between 14 hours and 3 hours then it create the list Erreur
  for (let i = 0; i < PrixPerson.length; i++) {
    const Result = [RoomSlot, Creneau, PrixSalle, PrixPerson];
    if (parseInt(PrixPerson[i], 10) < parseInt(venuePath.floorPrice, 10) &&
    (parseInt(Creneau[i][0] + Creneau[i][1], 10) >= 14 || parseInt(Creneau[i][0] + Creneau[i][1], 10) <= 3 )) {
      Erreur.push('Error detected at ' + venuePath.name + ':' + ' ' + Result[0][i] + ' ' + Result[1][i] + ' for ' + Result[2][i] +
      'and ' + Result[3][i] + ',' + '\n' + ' we expect to have a price superior at ' + parseInt(venuePath.floorPrice, 10) + '€ per person' + '\n' + '\n');
    }
  }
};

const checkPriceforeachVenues = async (page, venuePath) => {
    { test.setTimeout(180000); }

    await page.locator('select[name="calendar_place"]').selectOption(JSON.stringify(venuePath.id));
    await page.waitForSelector('.booking .calendar .screen');

    let day = 0;
    // browse the calendar
    while (day < 28) {
      await page.waitForSelector('.booking .calendar .screen');

      // dedicated to site where there only one page of reservation
      if (await page.isHidden('.btn-prev-room', {strict: true}) && await page.isHidden('.btn-next-room', {strict: true})) {
        checkPrice(page, venuePath);
        await page.click('.col-md-5 .btn-next');
      }

      // browse reservation page from the left to the right
      if (await page.isVisible('.btn-next-room', {strict: true})) {
        while (await page.isVisible('.btn-next-room', {strict: true})) {

          checkPrice(page, venuePath);

          await page.click('.btn-next-room');
          await page.waitForSelector('.booking .calendar .screen');
        }
      }

      // browse reservation page from the right to the left and change the day
      if (await page.isVisible('.btn-prev-room', {strict: true})) {

        checkPrice(page, venuePath);

        await page.click('.col-md-5 .btn-next');

        while (await page.isVisible('.btn-prev-room', {strict: true})) {
          await page.click('.btn-prev-room');
          await page.waitForSelector('.booking .calendar .screen');
        }
      }
      day++;
    }
    if (Erreur.length !== 0) {
      throw new Error(
        Erreur,
      );
    }
};

VENUES.forEach(venue => {
  test(`Venue: ${venue.name}`, async ({ page }) => checkPriceforeachVenues(page, venue));
});

test.beforeEach(async ({ page }) => {
  await page.goto(BASE_URL);
  await page.type('input[name=_username]', process.env.AUTH_USER_BACK);
  await page.type('input[name=_password]', process.env.AUTH_PASS_BACK);
  await page.keyboard.press('Enter');
});
