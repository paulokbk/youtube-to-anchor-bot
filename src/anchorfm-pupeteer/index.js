const puppeteer = require('puppeteer');
const env = require('../environment-variables');

function addUrlToDescription(youtubeVideoInfo) {
  return env.URL_IN_DESCRIPTION
    ? `${youtubeVideoInfo.description}\n${youtubeVideoInfo.url}`
    : youtubeVideoInfo.description;
}

async function click_father(label, element, page) {
  const l = await page.$(label);
  const e = await l.$(element);
  if (e) {
    await e.click();
    await page.waitForTimeout(2 * 1000);

  } else {
    console.log('Elemento não encontrado');
  }
}

async function clickTagText(tag, text, page) {
  const elements = await page.$$(tag);

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    const elementText = await element.evaluate(el => el.innerText);

    if (elementText.includes(text)) {
      await element.click();
      return; // Encerra a função após clicar no elemento
    }
  }

  console.log(`Elemento com a tag "${tag}" e texto "${text}" não encontrado`);

}

async function postEpisode(youtubeVideoInfo) {
  let browser;
  try {
    console.log('Iniciando puppeteer');
    browser = await puppeteer.launch({
      headless: false,
    });

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

    await page.goto("https://podcasters.spotify.com/pod/dashboard/episode/wizard")

    await navigationPromise;

    await page.waitForTimeout(20 * 1000)

    const inputFile = await page.$('input[type=file]')

    await inputFile.uploadFile(env.AUDIO_FILE);


    console.log('Esperando upload do arquivo terminar');

    await page.waitForTimeout(20 * 1000)


    console.log('Adicionando titulo');
    await page.waitForSelector('#title-input', { visible: true });
    await page.waitForTimeout(2 * 1000);
    await page.type('#title-input', youtubeVideoInfo.title);
    await page.waitForTimeout(1000);

    console.log('Adicionando descrição');
    await page.waitForSelector('div[role="textbox"]', { visible: true });
    const finalDescription = addUrlToDescription(youtubeVideoInfo);
    await page.type('div[role="textbox"]', `${finalDescription}  🙏`);
    await page.waitForTimeout(1000);

    console.log("Aceitando Cookies")
    const closeButton = await page.$('.onetrust-close-btn-handler.onetrust-close-btn-ui.banner-close-button.ot-close-icon');
    if (closeButton) {
      await closeButton.click();
    } else {
      console.log('Botão de fechar não encontrado');
    }

    await page.waitForTimeout(5 * 1000)

    console.log("Inserindo data da publicação")
    await click_father('label[for="publish-date-now"]', 'span', page)

    await page.waitForTimeout(5 * 1000)

    console.log("Inserindo tipo de conteudo")
    await click_father('label[for="explicit-content"]', 'span', page)

    await page.waitForTimeout(5 * 1000)

    console.log("Clicando no botão next da primeira pagina")
    await page.click('button[type=submit]');
    await page.waitForTimeout(20 * 1000)

    console.log("Clicando no botão next da segunda pagina")
    await clickTagText('span', 'Next', page);
    await page.waitForTimeout(20 * 1000)

    console.log("Clicando no botão Publish da terceiro pagina")
    await clickTagText('span', 'Publish', page);

    await page.waitForTimeout(20 * 1000)

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
