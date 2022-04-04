import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = 'https://backend.bam-karaokebox.com/index.php/login_backend';

const VENUES = [
  'richer',
  'sentier',
  'parmentier',
  'chartrons',
  'recoletos',
  'madeleine',
  'etoile',
];

const ID_VENUES = [
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
];

const NumberPage = [
    '0',
    '0',
    '2',
    '2',
    '0',
    '1',
    '1', 
]

const PriceVenues = [
  '5',
  '5',
  '5',
  '3',
  '4',
  '5',
  '5', 
]

const checkPriceforeachVenues = async (page, venuePath) => {
  await page.goto(BASE_URL);
  await page.type('input[name=_username]', process.env.AUTH_USER_BACK );
  await page.type('input[name=_password]', process.env.AUTH_PASS_BACK );
  await page.keyboard.press('Enter');

  await page.locator('select[name="calendar_place"]').selectOption(venuePath);

  {test.setTimeout(180000); }

  const Erreur=[]
  // browse the calendar
  for (let d = 0; d < 2; d++) {

    // browse reservation page from the left to the right
    for (let p = 0; p < parseInt(NumberPage[venuePath - 2],10) + 1; p++) {

      await page.waitForSelector('.booking .calendar .screen');

      // Create a list compose of the name of room and date of each available slot
      const RoomSlot = await page.evaluate(() => {
        const ListeSalle = [];
        const NumberRoom = document.querySelectorAll('.screen').length;
        for (let j = 0; j < NumberRoom; j++) {
            const NumberSlot = document.querySelectorAll('div.places')[j].querySelectorAll('div.available').length;
            if (NumberSlot !== 0) {
                for (let i = 0; i < NumberSlot; i++) {
                    ListeSalle.push( document.querySelector('div.slot.available input').dataset.bookingDate + ' '
                    + document.querySelectorAll('div.capacity')[j].childNodes[0].nodeValue);
                }
            }
        }
        return  ListeSalle;
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
        for (let i = 0; i < NumberSlot ; i++) {
          Prix.push(document.querySelectorAll('div.slot.available')[i].childNodes[2].nodeValue);
        }
        return Prix;
      });

      // Create a list compose of price per person of each available slot
      const PrixPerson = await page.evaluate(() => {
        const Prix = [];
        const NumberSlot = document.querySelectorAll('div.slot.available').length;
        for (let i = 0; i < NumberSlot; i++) {
          Prix.push(document.querySelectorAll('div.slot.available')[i].childNodes[4].nodeValue);
        }
        return Prix;
      });

      // Verify the price by person after 14 hours and create the list Erreur
      for (let i = 0; i < PrixPerson.length; i++) {
        const Result = [RoomSlot, Creneau , PrixSalle , PrixPerson];
        if (parseInt(PrixPerson[i], 10) < parseInt(PriceVenues[venuePath - 2]) && parseInt(Creneau[i][0] + Creneau[i][1], 10) >= 14 ) {
          VENUES[venuePath - 2] + ' ' + Result[0][i] + Result[1][i] + ' ' + Result[2][i] + Result[3][i],
          Erreur.push(VENUES[venuePath - 2]  + ' ' + Result[0][i] + Result[1][i] + ' ' + Result[2][i] + Result[3][i] + '\n'+ '\n')
          }
        }

      // Until we are at the last page, we click on next buton
      if (p < parseInt(NumberPage[venuePath - 2],10)) {
        await page.click('.btn-next-room');
      }

      // Allows to know that we are on the last page and to go on the next day on the calendar
      if (p === parseInt(NumberPage[venuePath - 2],10)) {
        await page.click('.col-md-5 .btn-next');

        // Allows to go to the first page of reservation before to start again the verification of price
        for (let l = 0; l < parseInt(NumberPage[venuePath - 2],10) + 1; l++) {

          await page.waitForSelector('.booking .calendar .screen');

          // Until we are not on the first page, we click on the prev buton
          if (l < parseInt(NumberPage[venuePath - 2],10)) {
            await page.click('.btn-prev-room');
          }
        }
      }
    }
    if (Erreur.length !==0){
      throw new Error(
        Erreur
      )
    }
  }
};

ID_VENUES.forEach(venueName => {
  test(`Venue: ${venueName}`, async ({ page }) => checkPriceforeachVenues(page, `${venueName}`));
});