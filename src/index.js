const fs = require("fs");
const { exit, title } = require("process");

const env = require("./environment-variables");
const {
  getVideoInfo,
  downloadThumbnail,
  downloadAudio,
} = require("./youtube-yt-dlp");
const { postEpisode } = require("./anchorfm-pupeteer");
const { CheckNewVideo, UpdateJSON } = require("./youtube-new-video");
const { updateDate } = require("./date-to-update");

function validateYoutubeVideoIds(ids) {
  if (!Array.isArray(ids) || ids.length === 0) {
    throw new Error("A lista de IDs está vazia ou não é um array");
  }

  for (const id of ids) {
    if (id === undefined || id === null || typeof id !== "string") {
      throw new Error("Há um ID inválido na lista");
    }
  }
}

function getYoutubeVideoIds() {
  try {
    const json = JSON.parse(fs.readFileSync(env.EPISODE_PATH, "utf-8"));
    validateYoutubeVideoIds(json.ids);
    return json.ids;
  } catch (err) {
    throw new Error(`Não foi possível obter a lista de IDs: ${err}`);
  }
}

async function main() {

  // const newVideo = await CheckNewVideo();

  const newVideo = true

  if (newVideo) {

    // UpdateJSON(newVideo);

    const youtubeVideoIds = getYoutubeVideoIds();

    for (const youtubeVideoId of youtubeVideoIds) {
      const youtubeVideoInfo = await getVideoInfo(youtubeVideoId);
      const { title, description, uploadDate } = youtubeVideoInfo;
      console.log(`Titulo: ${title}`);
      console.log(`Descrição: ${description}`);
      console.log(`Data de Upload: ${JSON.stringify(uploadDate)}`);



      await Promise.all([
        downloadThumbnail(youtubeVideoId),
        downloadAudio(youtubeVideoId),
      ]);

      console.log(`Postando Episodio ${youtubeVideoId} no AnchorFM`);

      await postEpisode(youtubeVideoInfo);

      console.log(`>>>>> Episodio ${title} postado com sucesso <<<<<`);

      // console.log("Atualizando data do episodio")

      // await new Promise((resolve) => setTimeout(resolve, 10000));

      // const updateDateAnchor = await updateDate(youtubeVideoId)

      // console.log("🚀 ~ main ~ updateDateAnchor:", updateDateAnchor)


      // if (updateDateAnchor.type) {

      //   console.log(">>>>> Data do episodio atualizada com sucesso <<<<<", updateDateAnchor.response)

      // } else {

      //   console.log(">>>>> Erro ao atualizar data do episodio <<<<<", updateDateAnchor.response)

      // }

    }
  } else {

    console.log("Nao ha novos videos")

  }
}

main()
  .then(() => {
    console.log(" >>> Processo finalizado com sucesso <<<");
  })
  .catch((err) => {
    console.error(err);
    exit(1);
  });