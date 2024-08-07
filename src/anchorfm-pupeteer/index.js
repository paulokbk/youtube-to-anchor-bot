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

async function clickButtonWithEncoreIdAndText(buttonId, buttonText, page) {
  
  const buttons = await page.$$(`button[data-encore-id="${buttonId}"]`);

  for (const button of buttons) {
    if ((await page.evaluate(el => el.textContent, button)).trim() == buttonText) {
      await button.click(); // Clica no botão encontrado.
      return true; // Retorna verdadeiro após o clique bem-sucedido.
    }
  }

  console.log(`Botão com ID [${buttonId}] e texto ["${buttonText}"] não encontrado.`);
  return false; // Retorna falso se o botão com o texto especificado não for encontrado.
}


async function clickTagText(tag, text, page) {
  const elements = await page.$$(tag);

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    const elementText = await element.evaluate(el => el.innerText);

    if (elementText === text || elementText === text.toUpperCase() || elementText === text.toLowerCase()) {
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle0' }), // Espera pela conclusão da navegação após o clique
        element.click(), // Clica no elemento
      ]);
      return true; // Retorna verdadeiro quando o clique foi realizado
    }
  }

  console.log(`Elemento com a tag "${tag}" e texto "${text}" não encontrado`);
  return false; // Retorna falso se não encontrar e não clicar no elemento
}

async function postEpisode(youtubeVideoInfo) {
  let browser;
  try {
    console.log('Iniciando puppeteer');
    browser = await puppeteer.launch({
      headless: true, devtools: false, useChrome: true, debug: false, args: [
        //'--start-maximized',
        //'--start-fullscreen',// you can also use
        '--js-flags="--max_old_space_size=80" --disable-web-security', '--no-sandbox', '--disable-web-security', '--aggressive-cache-discard', '--disable-cache', '--disable-application-cache', '--disable-offline-load-stale-cache', '--disk-cache-size=0', '--disable-background-networking', '--disable-default-apps', '--disable-extensions', '--disable-sync', '--disable-translate', '--hide-scrollbars', '--metrics-recording-only', '--mute-audio', '--no-first-run', '--safebrowsing-disable-auto-update', '--ignore-certificate-errors', '--ignore-ssl-errors', '--ignore-certificate-errors-spki-list']
    });
    const page = await browser.newPage();

    const navigationPromise = page.waitForNavigation();

    await page.goto('https://podcasters.spotify.com/pod/dashboard/episode/wizard', { waitUntil: 'networkidle2', language: 'en'});

    await navigationPromise;

    const wasClicked = await clickButtonWithEncoreIdAndText('buttonPrimary', 'Continue with Spotify', page);

    if (!wasClicked) {
      throw new Error('Continue with Spotify');
    }

    await page.waitForTimeout(2 * 1000)

    console.log('Tentando fazer login');

    await page.waitForSelector('input[id=login-username]', { visible: true });

    await page.type('input[id=login-username]', env.ANCHOR_EMAIL);
    await page.type('input[id=login-password]', env.ANCHOR_PASSWORD);

    await page.waitForTimeout(1 * 1000)
    await page.click('button[id=login-button]');

    console.log('Login feito com sucesso');

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

    await page.waitForTimeout(10 * 1000)

    console.log("Inserindo data da publicação")
    await click_father('label[for="publish-date-now"]', 'span', page)

    await page.waitForTimeout(2 * 1000)

    console.log("Inserindo tipo de conteudo")
    await click_father('label[for="no-explicit-content"]', 'span', page)

    await page.waitForTimeout(2 * 1000)

    console.log("Inserindo tipo de conteudo patrocinado")
    await click_father('label[for="no-sponsored-content"]', 'span', page)

    await page.waitForTimeout(10 * 1000)

    console.log("Clicando no botão next da primeira pagina")
    await page.click('button[type=submit]');
    await page.waitForTimeout(10 * 1000)

    console.log("Clicando no botão next da segunda pagina")
    await clickButtonWithEncoreIdAndText('buttonPrimary', 'Próximo', page)
    await page.waitForTimeout(10 * 1000)

    console.log("Clicando no botão Publish da terceiro pagina")
    const wasClickedPublish = await clickButtonWithEncoreIdAndText('buttonPrimary', 'Publicar', page);
    if (!wasClickedPublish) {
      throw new Error('Falha ao clicar no botão "Publish"');
    }

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
