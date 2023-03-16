const puppeteer = require('puppeteer');
const env = require('../environment-variables');

function addUrlToDescription(youtubeVideoInfo) {
  return env.URL_IN_DESCRIPTION
    ? `${youtubeVideoInfo.description}\n${youtubeVideoInfo.url}`
    : youtubeVideoInfo.description;
}

// async function setPublishDate(page, navigationPromise, date) {
//   console.log('-- Setting publish date');
//   const publishDateButtonSelector = '//span[contains(text(),"Publish date:")]/following-sibling::button';
//   const [publishDateButton] = await page.$x(publishDateButtonSelector);
//   await publishDateButton.click();
//   await navigationPromise;

//   await resetDatePickerToSelectYears(page, navigationPromise);
//   await selectYearInDatePicker(page, navigationPromise, date.year);
//   await selectMonthInDatePicker(page, navigationPromise, date.month);
//   await selectDayInDatePicker(page, navigationPromise, date.day);

//   const confirmButtonSelector = '//span[contains(text(),"Confirm")]/parent::button';
//   const [confirmButton] = await page.$x(confirmButtonSelector);
//   await confirmButton.click();
//   await navigationPromise;
// }

// async function resetDatePickerToSelectYears(page, navigationPromise) {
//   for (let i = 0; i < 2; i += 1) {
//     const datePickerSwitchButtonSelector = 'th[class="rdtSwitch"]';
//     const datePickerSwitchButton = await page.$(datePickerSwitchButtonSelector);
//     await datePickerSwitchButton.click();
//     await navigationPromise;
//   }
// }

// async function selectYearInDatePicker(page, navigationPromise, year) {
//   const rdtPrev = await page.$('th[class="rdtPrev"]');
//   let currentLowestYear = await page.$eval('tbody > tr:first-child > td:first-child', (e) =>
//     e.getAttribute('data-value')
//   );
//   while (parseInt(currentLowestYear, 10) > parseInt(year, 10)) {
//     await rdtPrev.click();
//     await navigationPromise;

//     currentLowestYear = await page.$eval('tbody > tr:first-child > td:first-child', (e) =>
//       e.getAttribute('data-value')
//     );
//   }

//   const rdtNext = await page.$('th[class="rdtNext"]');
//   let currentHighestYear = await page.$eval('tbody > tr:last-child > td:last-child', (e) =>
//     e.getAttribute('data-value')
//   );
//   while (parseInt(currentHighestYear, 10) < parseInt(year, 10)) {
//     await rdtNext.click();
//     await navigationPromise;

//     currentHighestYear = await page.$eval('tbody > tr:last-child > td:last-child', (e) => e.getAttribute('data-value'));
//   }

//   const tdYear = await page.$(`tbody > tr > td[data-value="${year}"]`);
//   await tdYear.click();
//   await navigationPromise;
// }

// async function selectMonthInDatePicker(page, navigationPromise, month) {
//   const [tdMonth] = await page.$x(`//tbody/tr/td[contains(text(),"${month}")]`);
//   await tdMonth.click();
//   await navigationPromise;
// }

// async function selectDayInDatePicker(page, navigationPromise, day) {
//   const dayWithRemovedZeroPad = parseInt(day, 10);
//   const tdDay = await page.$(
//     `tbody > tr > td[data-value="${dayWithRemovedZeroPad}"][class*="rdtDay"]:not([class*="rdtOld"]:not([class*="rtdNew"])`
//   );
//   await tdDay.click();
//   await navigationPromise;
// }

async function postEpisode(youtubeVideoInfo) {
  let browser;
  try {
    console.log('Iniciando puppeteer');
    
    browser = await puppeteer.launch();
    
    const page = await browser.newPage();

    const navigationPromise = page.waitForNavigation();

    const url = 'https://podcasters.spotify.com/pod/login'

    await page.goto(url);

    await page.setViewport({ width: 1600, height: 789 });

    await navigationPromise;

    console.log('Tentando fazer login');
    await page.waitForSelector('input[id=email]', { visible: true });

    await page.type('input[id=email]', env.ANCHOR_EMAIL);
    await page.type('input[id=password]', env.ANCHOR_PASSWORD);
    await page.click('button[type=submit]');
    await page.click('button[type=submit]');

    console.log('Login feito com sucesso');

    await navigationPromise;
    console.log('Clicando em Novo episodio')

    await page.waitForSelector('button[class="Button-sc-y0gtbx-0 drkKrt"]', { visible: true });


    await page.click('button[class="Button-sc-y0gtbx-0 drkKrt"]')


    console.log('Fazendo upload do arquivo')

    await page.waitForTimeout(3 * 1000)

    const inputFile = await page.$('input[type=file]')

    await inputFile.uploadFile(env.AUDIO_FILE);
    

    console.log('Esperando upload do arquivo terminar');
    await page.waitForTimeout(30 * 1000)


    console.log('Adicionando titulo');
    await page.waitForSelector('#title', { visible: true });
    await page.waitForTimeout(2* 1000);
    await page.type('#title', youtubeVideoInfo.title);
    await page.waitForTimeout(1000);

    console.log('Adicionando descrição');
    await page.waitForSelector('div[role="textbox"]', { visible: true });
    const finalDescription = addUrlToDescription(youtubeVideoInfo);
    await page.type('div[role="textbox"]', `${finalDescription}  🙏`);
    await page.waitForTimeout(1000);

    // if (env.SET_PUBLISH_DATE) {
    //   await setPublishDate(page, navigationPromise, youtubeVideoInfo.uploadDate);
    // }

    console.log('Esperando processamento do audio')
    await page.waitForTimeout(30 * 1000)

    await page.click('button[class="Button-sc-qlcn5g-0 loElEN"]')
    await navigationPromise;

    // const saveDraftOrPublishOrScheduleButtonDescription = getSaveDraftOrPublishOrScheduleButtonDescription();
    // console.log(`-- ${saveDraftOrPublishOrScheduleButtonDescription.message}`);

    // const [saveDraftOrPublishOrScheduleButton] = await page.$x(saveDraftOrPublishOrScheduleButtonDescription.xpath);
    // await saveDraftOrPublishOrScheduleButton.click();
    // await navigationPromise;


  } catch (err) {
    throw new Error(`Não foi possivel postar o podcast: ${err}`)
  } finally {
    if (browser !== undefined) {
      await browser.close()
    }
  }
}

function getSaveDraftOrPublishOrScheduleButtonDescription() {
  if (env.SAVE_AS_DRAFT) {
    return {
      xpath: '//button[text()="Save as draft"]',
      message: 'Saving draft',
    };
  }

  if (env.SET_PUBLISH_DATE) {
    return {
      xpath: '//span[text()="Schedule episode"]/parent::button',
      message: 'Scheduling',
    };
  }

  return {
    xpath: '//span[text()="Publish now"]/parent::button',
    message: 'Publishing',
  };
}

module.exports = {
  postEpisode,
};
