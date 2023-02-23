let lastEpisodePublished = require("../../episode.json")
const axios = require("axios");
const fs = require("fs");

const CheckNewVideo = async () => {
    try{

        const youtubePage = await axios.get("https://www.youtube.com.br/@carlospovo/streams");
        const ytInitialData = youtubePage.data.trim().split("ytInitialData = ")[1];
        const ytInitialDataJson = JSON.parse(ytInitialData.split(";</script>")[0]);
        const lastVideoData = ytInitialDataJson.contents.twoColumnBrowseResultsRenderer.tabs[2].tabRenderer.content.richGridRenderer.contents[0].richItemRenderer.content.videoRenderer
        var newVideoID = lastVideoData.videoId
        console.log(">>> ID DO Ultimo Video no Spotify: " + lastEpisodePublished.ids[0])

        console.log(">>> ID DO Ultimo Video no Youtube: " + lastVideoData.videoId)

        if (lastVideoData.videoId !== lastEpisodePublished.ids[0] ){
            console.log("Ha um novo video publicado")
            return lastVideoData.videoId
        } else {
            return false
        }

    }catch(error){
        console.log(error)
    }
}

const UpdateJSON = async (newID) => {
    lastEpisodePublished.ids[0] = newID
    console.log("Insirindo novo ID no JSON")
    fs.writeFileSync("./episode.json", JSON.stringify(lastEpisodePublished, null, 2))
}

module.exports = { CheckNewVideo, UpdateJSON }

