import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const LOG_URL = 'https://backend.bam-karaokebox.com/index.php/login_backend';

test.describe('Vérification des prix', () => {

    test.beforeEach(async ({ page }) => {
      // Connection en tant que client
      await page.goto( LOG_URL);
      await page.type('input[name=_username]', process.env.AUTH_USER_BACK );
      await page.type('input[name=_password]', process.env.AUTH_PASS_BACK );
      await page.keyboard.press('Enter');
      await expect(page).toHaveURL('https://backend.bam-karaokebox.com/index.php/_backend/calendar');
    });

    test('Parmentier', async ({ page }) => {

      await page.locator('select[name="calendar_place"]').selectOption('4');

      {test.setTimeout(180000); }

      // Parcours le calendrier
      for (let d = 0; d < 2; d++) {

        // Parcous les pages de réservation de gauche à droite
        for (let p = 0; p < 3; p++) {

          await page.waitForSelector('.booking .calendar .screen');

          // Créer une liste composée des noms des salles
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

          // Créer une liste composée des horraires des séances
          const Creneau = await page.evaluate(() => {
            const ListeSeance = [];
            const NumberSlot = document.querySelectorAll('div.slot.available').length;
            for (let i = 0; i < NumberSlot; i++) {
              ListeSeance.push(document.querySelectorAll('div.slot.available')[i].childNodes[0].nodeValue);
            }
            return ListeSeance;
          });

          // Créer une liste composée des prix des créneaux
          const PrixSalle = await page.evaluate(() => {
            const Prix = [];
            const NumberSlot = document.querySelectorAll('div.slot.available').length;
            for (let i = 0; i < NumberSlot ; i++) {
              Prix.push(document.querySelectorAll('div.slot.available')[i].childNodes[2].nodeValue);
            }
            return Prix;
          });

          // Créer une liste composé des prix par personne des créneaux
          const PrixPerson = await page.evaluate(() => {
            const Prix = [];
            const NumberSlot = document.querySelectorAll('div.slot.available').length;
            for (let i = 0; i < NumberSlot; i++) {
              Prix.push(document.querySelectorAll('div.slot.available')[i].childNodes[4].nodeValue);
            }
            return Prix;
          });

          // Vérification des prix par personne à partir de 14h
          for (let i = 0; i < PrixPerson.length; i++) {
            const Result = [RoomSlot, Creneau , PrixSalle , PrixPerson];
            if (parseInt(PrixPerson[i], 10) < 5 && parseInt(Creneau[i][0] + Creneau[i][1], 10) >= 14 ) {
              throw new Error(
                'Parmentier ' + Result[0][i] + Result[1][i] + Result[2][i] + Result[3][i],
              );
            }
          }

          // Tant qu'on est pas à la dernier page on clique sur le bouton next room
          if (p < 2) {
            await page.click('.btn-next-room');
          }

          // Permet de savoir que l'on est à la derniere page afin de changer de jour
          if (p === 2) {
            await page.click('.col-md-5 .btn-next');

            // Parcous les pages de reservation de droite à gauche afin de retourner à la premiere page
            for (let l = 0; l < 3; l++) {

              await page.waitForSelector('.booking .calendar .screen');

              // Tant qu'on est pas à la premiere page on clique sur le bouton prev room
              if (l < 2) {
                await page.click('.btn-prev-room');
              }
            }
          }
        }
      }
  });

    test('Chartrons', async ({ page }) => {

    await page.locator('select[name="calendar_place"]').selectOption('5');

    {test.setTimeout(180000); }

    for (let d = 0; d < 2; d++) {

      for (let p = 0; p < 3; p++) {

        await page.waitForSelector('.booking .calendar .screen');

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

        const Creneau = await page.evaluate(() => {
          const ListeSeance = [];
          const NumberSlot = document.querySelectorAll('div.slot.available').length;
          for (let i = 0; i < NumberSlot; i++) {
            ListeSeance.push(document.querySelectorAll('div.slot.available')[i].childNodes[0].nodeValue);
          }
          return ListeSeance;
        });

        const PrixSalle = await page.evaluate(() => {
          const Prix = [];
          const NumberSlot = document.querySelectorAll('div.slot.available').length;
          for (let i = 0; i < NumberSlot ; i++) {
            Prix.push(document.querySelectorAll('div.slot.available')[i].childNodes[2].nodeValue);
          }
          return Prix;
        });

        const PrixPerson = await page.evaluate(() => {
          const Prix = [];
          const NumberSlot = document.querySelectorAll('div.slot.available').length;
          for (let i = 0; i < NumberSlot; i++) {
            Prix.push(document.querySelectorAll('div.slot.available')[i].childNodes[4].nodeValue);
          }
          return Prix;
        });

        for (let i = 0; i < PrixPerson.length; i++) {
          const Result = [RoomSlot, Creneau , PrixSalle , PrixPerson];
          if (parseInt(PrixPerson[i], 10) < 3 && parseInt(Creneau[i][0] + Creneau[i][1], 10) >= 14 ) {
            throw new Error(
              'Chartrons ' + Result[0][i] + Result[1][i] + Result[2][i] + Result[3][i],
            );
          }
        }

        if (p < 2) {
          await page.click('.btn-next-room');
        }

        if (p === 2) {
          await page.click('.col-md-5 .btn-next');

          for (let l = 0; l < 3; l++) {

            await page.waitForSelector('.booking .calendar .screen');

            if (l < 2) {
              await page.click('.btn-prev-room');
            }
          }
        }
      }
    }
  });

    test('Sentier', async ({ page }) => {

    await page.locator('select[name="calendar_place"]').selectOption('3');

    {test.setTimeout(180000); }

    for (let d = 0; d < 2; d++) {

      await page.waitForSelector('.booking .calendar .screen');

      const RoomSlot = await page.evaluate(() => {
        const ListeSalle = [];
        const nbssalle = document.querySelectorAll('.screen').length;
        for (let j = 0; j < nbssalle; j++) {
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

      const Creneau = await page.evaluate(() => {
        const ListeSeance = [];
        const NumberSlot = document.querySelectorAll('div.slot.available').length;
        for (let i = 0; i < NumberSlot; i++) {
          ListeSeance.push(document.querySelectorAll('div.slot.available')[i].childNodes[0].nodeValue);
        }
        return ListeSeance;
      });

      const PrixSalle = await page.evaluate(() => {
        const Prix = [];
        const NumberSlot = document.querySelectorAll('div.slot.available').length;
        for (let i = 0; i < NumberSlot ; i++) {
          Prix.push(document.querySelectorAll('div.slot.available')[i].childNodes[2].nodeValue);
        }
        return Prix;
      });

      const PrixPerson = await page.evaluate(() => {
        const Prix = [];
        const NumberSlot = document.querySelectorAll('div.slot.available').length;
        for (let i = 0; i < NumberSlot; i++) {
          Prix.push(document.querySelectorAll('div.slot.available')[i].childNodes[4].nodeValue);
        }
        return Prix;
      });

      for (let i = 0; i < PrixPerson.length; i++) {
        const Result = [RoomSlot, Creneau , PrixSalle , PrixPerson];
        if (parseInt(PrixPerson[i], 10) < 5 && parseInt(Creneau[i][0] + Creneau[i][1], 10) >= 14 ) {
          throw new Error(
            'Sentier ' + Result[0][i] + Result[1][i] + Result[2][i] + Result[3][i],
          );
        }
      }
      await page.click('.col-md-5 .btn-next');
    }
  });

    test('Richer', async ({ page }) => {

    await page.locator('select[name="calendar_place"]').selectOption('2');

    {test.setTimeout(180000); }

    for (let d = 0; d < 3; d++) {

      await page.waitForSelector('.booking .calendar .screen');

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

      const Creneau = await page.evaluate(() => {
        const ListeSeance = [];
        const NumberSlot = document.querySelectorAll('div.slot.available').length;
        for (let i = 0; i < NumberSlot; i++) {
          ListeSeance.push(document.querySelectorAll('div.slot.available')[i].childNodes[0].nodeValue);
        }
        return ListeSeance;
      });

      const PrixSalle = await page.evaluate(() => {
        const Prix = [];
        const NumberSlot = document.querySelectorAll('div.slot.available').length;
        for (let i = 0; i < NumberSlot ; i++) {
          Prix.push(document.querySelectorAll('div.slot.available')[i].childNodes[2].nodeValue);
        }
        return Prix;
      });

      const PrixPerson = await page.evaluate(() => {
        const Prix = [];
        const NumberSlot = document.querySelectorAll('div.slot.available').length;
        for (let i = 0; i < NumberSlot; i++) {
          Prix.push(document.querySelectorAll('div.slot.available')[i].childNodes[4].nodeValue);
        }
        return Prix;
      });

      for (let i = 0; i < PrixPerson.length; i++) {
        const Result = [RoomSlot, Creneau , PrixSalle , PrixPerson];
        if (parseInt(PrixPerson[i], 10) < 5 && parseInt(Creneau[i][0] + Creneau[i][1], 10) >= 14 ) {
          throw new Error(
            'Richer ' + Result[0][i] + Result[1][i] + Result[2][i] + Result[3][i],
          );
        }
      }
      await page.click('.col-md-5 .btn-next');
    }
  });

    test('Etoile', async ({ page }) => {

      await page.locator('select[name="calendar_place"]').selectOption('8');

      {test.setTimeout(180000); }

      for (let d = 0; d < 2; d++) {

        for (let p = 0; p < 2; p++) {

          await page.waitForSelector('.booking .calendar .screen');

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

          const Creneau = await page.evaluate(() => {
            const ListeSeance = [];
            const NumberSlot = document.querySelectorAll('div.slot.available').length;
            for (let i = 0; i < NumberSlot; i++) {
              ListeSeance.push(document.querySelectorAll('div.slot.available')[i].childNodes[0].nodeValue);
            }
            return ListeSeance;
          });

          const PrixSalle = await page.evaluate(() => {
            const Prix = [];
            const NumberSlot = document.querySelectorAll('div.slot.available').length;
            for (let i = 0; i < NumberSlot ; i++) {
              Prix.push(document.querySelectorAll('div.slot.available')[i].childNodes[2].nodeValue);
            }
            return Prix;
          });

          const PrixPerson = await page.evaluate(() => {
            const Prix = [];
            const NumberSlot = document.querySelectorAll('div.slot.available').length;
            for (let i = 0; i < NumberSlot; i++) {
              Prix.push(document.querySelectorAll('div.slot.available')[i].childNodes[4].nodeValue);
            }
            return Prix;
          });

          for (let i = 0; i < PrixPerson.length; i++) {
            const Result = [RoomSlot, Creneau , PrixSalle , PrixPerson];
            if (parseInt(PrixPerson[i], 10) < 5 && parseInt(Creneau[i][0] + Creneau[i][1], 10) >= 14 ) {
              throw new Error(
                'Etoile ' + Result[0][i] + Result[1][i] + Result[2][i] + Result[3][i],
              );
            }
          }

          if (p < 1) {
            await page.click('.btn-next-room');
          }

          if (p === 1) {
            await page.click('.col-md-5 .btn-next');

            for (let l = 0; l < 2; l++) {

              await page.waitForSelector('.booking .calendar .screen');

              if (l < 1) {
                await page.click('.btn-prev-room');
              }
            }
          }
        }
      }
    });

    test('Madeleine', async ({ page }) => {

      await page.locator('select[name="calendar_place"]').selectOption('7');

      {test.setTimeout(180000); }

      for (let d = 0; d < 2; d++) {

        for (let p = 0; p < 2; p++) {

          await page.waitForSelector('.booking .calendar .screen');

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

          const Creneau = await page.evaluate(() => {
            const ListeSeance = [];
            const NumberSlot = document.querySelectorAll('div.slot.available').length;
            for (let i = 0; i < NumberSlot; i++) {
              ListeSeance.push(document.querySelectorAll('div.slot.available')[i].childNodes[0].nodeValue);
            }
            return ListeSeance;
          });

          const PrixSalle = await page.evaluate(() => {
            const Prix = [];
            const NumberSlot = document.querySelectorAll('div.slot.available').length;
            for (let i = 0; i < NumberSlot ; i++) {
              Prix.push(document.querySelectorAll('div.slot.available')[i].childNodes[2].nodeValue);
            }
            return Prix;
          });

          const PrixPerson = await page.evaluate(() => {
            const Prix = [];
            const NumberSlot = document.querySelectorAll('div.slot.available').length;
            for (let i = 0; i < NumberSlot; i++) {
              Prix.push(document.querySelectorAll('div.slot.available')[i].childNodes[4].nodeValue);
            }
            return Prix;
          });

          for (let i = 0; i < PrixPerson.length; i++) {
            const Result = [RoomSlot, Creneau , PrixSalle , PrixPerson];
            if (parseInt(PrixPerson[i], 10) < 5 && parseInt(Creneau[i][0] + Creneau[i][1], 10) >= 14 ) {
              throw new Error(
                'Madeleine ' + Result[0][i] + Result[1][i] + Result[2][i] + Result[3][i],
              );
            }
          }

          if (p < 1) {
            await page.click('.btn-next-room');
          }

          if (p === 1) {
            await page.click('.col-md-5 .btn-next');

            for (let l = 0; l < 2; l++) {

              await page.waitForSelector('.booking .calendar .screen');

              if (l < 1) {
                await page.click('.btn-prev-room');
              }
            }
          }
        }
      }
    });

    test('Recoletos', async ({ page, context }) => {

      await page.locator('select[name="calendar_place"]').selectOption('6');

      {test.setTimeout(180000); }

      for (let d = 0; d < 2; d++) {

        await page.waitForSelector('.booking .calendar .screen');

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

        const Creneau = await page.evaluate(() => {
          const ListeSeance = [];
          const NumberSlot = document.querySelectorAll('div.slot.available').length;
          for (let i = 0; i < NumberSlot; i++) {
            ListeSeance.push(document.querySelectorAll('div.slot.available')[i].childNodes[0].nodeValue);
          }
          return ListeSeance;
        });

        const PrixSalle = await page.evaluate(() => {
          const Prix = [];
          const NumberSlot = document.querySelectorAll('div.slot.available').length;
          for (let i = 0; i < NumberSlot ; i++) {
            Prix.push(document.querySelectorAll('div.slot.available')[i].childNodes[2].nodeValue);
          }
          return Prix;
        });

        const PrixPerson = await page.evaluate(() => {
          const Prix = [];
          const NumberSlot = document.querySelectorAll('div.slot.available').length;
          for (let i = 0; i < NumberSlot; i++) {
            Prix.push(document.querySelectorAll('div.slot.available')[i].childNodes[4].nodeValue);
          }
          return Prix;
        });

        for (let i = 0; i < PrixPerson.length; i++) {
          const Result = [RoomSlot, Creneau , PrixSalle , PrixPerson];
          if (parseInt(PrixPerson[i], 10) < 4 && parseInt(Creneau[i][0] + Creneau[i][1], 10) >= 14 ) {
            throw new Error(
              'Recoletos ' + Result[0][i] + Result[1][i] + Result[2][i] + Result[3][i],
            );
          }
        }
        await page.click('.col-md-5 .btn-next');
      }
    });
});
