const fs = require('fs');
const { exit, title } = require('process');

const env = require('./environment-variables');
const { getVideoInfo, downloadThumbnail, downloadAudio } = require('./youtube-yt-dlp');
const { postEpisode } = require('./anchorfm-pupeteer');

function validateYoutubeVideoIds(ids) {
  if (!Array.isArray(ids) || ids.length === 0) {
    throw new Error('A lista de IDs está vazia ou não é um array');
  }

  for (const id of ids) {
    if (id === undefined || id === null || typeof id !== 'string') {
      throw new Error('Há um ID inválido na lista');
    }
  }
}


function getYoutubeVideoIds() {
  try {
    const json = JSON.parse(fs.readFileSync(env.EPISODE_PATH, 'utf-8'));
    validateYoutubeVideoIds(json.ids);
    return json.ids;
  } catch (err) {
    throw new Error(`Não foi possível obter a lista de IDs: ${err}`);
  }
}


async function main() {
  const youtubeVideoIds = getYoutubeVideoIds();

  for (const youtubeVideoId of youtubeVideoIds) {
    const youtubeVideoInfo = await getVideoInfo(youtubeVideoId);
    const { title, description, uploadDate } = youtubeVideoInfo;
    console.log(`Titulo: ${title}`);
    console.log(`Descrição: ${description}`);
    console.log(`Data de Upload: ${JSON.stringify(uploadDate)}`);

    await Promise.all([downloadThumbnail(youtubeVideoId), downloadAudio(youtubeVideoId)]);

    console.log(`Postando Episodio ${youtubeVideoId} no AnchorFM`);
    await postEpisode(youtubeVideoInfo);

    console.log(`>>>>> Episodio ${title} postado com sucesso <<<<<`);
  }
}

main()
  .then(() => {
    console.log(' >>> Processo finalizado com sucesso <<<');
  })
  .catch((err) => {
    console.error(err);
    exit(1);
  });

