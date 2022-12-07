const fs = require('fs');
const { exit, title } = require('process');

const env = require('./environment-variables');
const { getVideoInfo, downloadThumbnail, downloadAudio } = require('./youtube-yt-dlp');
const { postEpisode } = require('./anchorfm-pupeteer');

function validateYoutubeVideoId(json) {
  if (json.id === undefined || json.id === null || typeof json.id !== 'string') {
    throw new Error('Id not present in JSON');
  }
}

function getYoutubeVideoId() {
  try {
    const json = JSON.parse(fs.readFileSync(env.EPISODE_PATH, 'utf-8'));
    validateYoutubeVideoId(json);
    return json.id;
  } catch (err) {
    throw new Error(`Unable to get youtube video id: ${err}`);
  }
}

async function main() {
  const youtubeVideoId = getYoutubeVideoId();

  const youtubeVideoInfo = await getVideoInfo(youtubeVideoId);
  const { title, description, uploadDate } = youtubeVideoInfo;
  console.log(`title: ${title}`);
  console.log(`description: ${description}`);
  console.log(`Upload date: ${JSON.stringify(uploadDate)}`);

  await Promise.all([downloadThumbnail(youtubeVideoId), downloadAudio(youtubeVideoId)]);

  console.log('Postando Episodio no AnchorFM');
  await postEpisode(youtubeVideoInfo);
}

main()
  .then(() => console.log(`${title} -  Postado com Sucesso`))
  .catch((err) => {
    console.error(err);
    exit(1);
  });

