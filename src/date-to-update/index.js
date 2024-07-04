const axios = require('axios');
const { getVideoInfo } = require('../youtube-yt-dlp');

const makeDate = (date, title) => {

    let formatedDate = ''

    const year = date.slice(0, 4)
    const month = date.slice(4, 6)
    const day = date.slice(6, 8)

    title = title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()

    if (title.includes("manha")) {

        formatedDate = `${year}-${month}-${day}T12:00:00.000Z`

    } else {

        formatedDate = `${year}-${month}-${day}T22:00:00.000Z`
    }


    return formatedDate
}

const ListEpisodes = async () => {

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://podcasters.spotify.com/pod/api/proxy/v3/stations/webStationId:a214b6c4/episodePage?isMumsCompatible=true&limit=15&orderBy=publishOn',
        headers: {
            'authority': 'podcasters.spotify.com',
            'accept': '*/*',
            'accept-language': 'en-US,en;q=0.9,pt;q=0.8',
            'cookie': 'sss=1; _gcl_au=1.1.1108345244.1717640084; _hjSessionUser_3893126=eyJpZCI6IjQ2MGM5NzM1LWE3ZmQtNWU4ZC04MzQyLTdlNWM1M2RjNDdlNCIsImNyZWF0ZWQiOjE3MTc2NDAwODQxMjYsImV4aXN0aW5nIjp0cnVlfQ==; __stripe_mid=be4b03b9-ed2c-478a-901a-91feda457153d06e1d; __pdst=2283e22bbfab463f805e1bf385acbe4b; _scid=dc2cf0d1-1d3d-44f6-bdb1-8fb2c99aa1b2; _tt_enable_cookie=1; _ttp=voaOt0YE92qS0fok8Nml8p4NviM; LPVID=U4NzYyZTdmN2JmYjQ4ZmI3; OptanonAlertBoxClosed=2024-06-06T02:15:22.526Z; sp_adid=7cfdbc57-4c79-42c2-a5c5-144c3a5798ac; ki_r=; sp_t=84918854f11c1799feebf91d3f15b780; _ga_ZWG1NSHWD8=GS1.1.1718810835.2.0.1718810835.0.0.0; _gid=GA1.2.1427767420.1719442017; _hjSession_3893126=eyJpZCI6IjIwYTVhMjI1LWYxNDEtNDA2Yy04YzIyLTk0MmJlODk3MTg4YiIsImMiOjE3MTk0NDIwMTY4ODAsInMiOjEsInIiOjEsInNiIjowLCJzciI6MCwic2UiOjAsImZzIjowLCJzcCI6MX0=; __stripe_sid=e39a5ef3-9627-4588-9573-59947053be39a59fb6; _fbp=fb.1.1719442022571.139551453470435387; reduxPersist%3AlocalStorage={%22lastPlayedSegment%22:{}}; _ScCbts=%5B%5D; reduxPersist%3Atutorial={%22dismissedBanners%22:{}%2C%22dismissedTutorialPopups%22:{}%2C%22isOptedOutOfDistribution%22:false%2C%22isShortMetadataFormModalShowing%22:false}; reduxPersist%3AvoiceMessageCreationModalScreen={%22voiceMessageRecording%22:null%2C%22isVoiceMessageRehydrating%22:false%2C%22isVoiceMessagePlaying%22:false%2C%22isShowingRecordAgainConfirmationOverlay%22:false%2C%22isShowingExitConfirmationOverlay%22:false%2C%22loginEmail%22:%22%22%2C%22loginPassword%22:%22%22%2C%22signupName%22:%22%22%2C%22signupEmail%22:%22%22%2C%22signupPassword%22:%22%22%2C%22currentUserEmail%22:null%2C%22captcha%22:null%2C%22email%22:%22%22%2C%22voiceMessageTitle%22:%22%22%2C%22isLoading%22:false%2C%22isNewUser%22:false%2C%22isError%22:false}; reduxPersistIndex=[%22reduxPersist:localStorage%22%2C%22reduxPersist:tutorial%22%2C%22reduxPersist:voiceMessageCreationModalScreen%22]; sss=1; LPSID-2422064=9noaW6MUT3OdBexguSq3PQ; anchorpw_s=s%3Aq27F0QJ5zMo_uutuG1Xm1m0B0PASpeNM.ntL%2BfQGothxmv%2BDrhB90skpP4TQ7BiogC%2Fo9rVRrWjw; sp_locale=pt-BR; sp_dc=AQDGC1FUXzQDU3saCN2WU6Gx8J0cTqP1v0QSjWOOtNBwswjLOyELUPv1BPA1_u3VmlKM7a-01PCNAG5AeqhypvSAt3y4WHcF9AC-Yht1jW-AYF5TBHH07eibA2ozxwTptdt1rDREseQJ7CMCrXN4Nut2YHxdjJ0; sp_key=3ad49508-78d8-4503-ac1b-8231c72dc85a; OptanonConsent=isGpcEnabled=0&datestamp=Wed+Jun+26+2024+21%3A07%3A54+GMT-0300+(Hora+padr%C3%A3o+de+Bras%C3%ADlia)&version=202405.2.0&browserGpcFlag=0&isIABGlobal=false&hosts=&landingPath=NotLandingPage&groups=s00%3A1%2Cf00%3A1%2Cm00%3A1%2Ct00%3A1%2Ci00%3A1%2Cf11%3A1%2Cm03%3A1&geolocation=BR%3BGO&AwaitingReconsent=false; _ga=GA1.2.199006995.1717640084; _rdt_uuid=1717640084290.5d387a37-5258-44d3-8816-0142b0145807; _scid_r=dc2cf0d1-1d3d-44f6-bdb1-8fb2c99aa1b2; ki_t=1717640084485%3B1719442028938%3B1719446876649%3B2%3B27; ab.storage.userId.91ac64b1-3e86-476a-9953-ccba0370c1d6=g%3A00f54e639c734cfeb0b43de0de0cc4c1dd75972fd0b3974518d4bb%7Ce%3Aundefined%7Cc%3A1719446876415%7Cl%3A1719446876417; ab.storage.deviceId.91ac64b1-3e86-476a-9953-ccba0370c1d6=g%3Ab7b7a17b-8cb5-bc06-d8da-f7c7a30ff9ee%7Ce%3Aundefined%7Cc%3A1719446876418%7Cl%3A1719446876418; ab.storage.sessionId.91ac64b1-3e86-476a-9953-ccba0370c1d6=g%3A4721795f-aef1-edd3-3252-49b73818db49%7Ce%3A1719448676419%7Cc%3A1719446876416%7Cl%3A1719446876419; _ga_BS28GFQSGL=GS1.1.1719442016.2.1.1719446917.0.0.0; anchorpw_s=s%3Aq27F0QJ5zMo_uutuG1Xm1m0B0PASpeNM.ntL%2BfQGothxmv%2BDrhB90skpP4TQ7BiogC%2Fo9rVRrWjw',
            'if-none-match': 'W/"2894-A/yKUVdTh4SWaAznJ7QUSGTB+b8"',
            'referer': 'https://podcasters.spotify.com/pod/dashboard/episodes',
            'sec-ch-ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
        }
    };

    const response = await axios(config)

    return response.data
}


const updateDate = async (videoId) => {

    try {


        const videoInfo = await getVideoInfo(videoId)
        const listEpisodesAnchor = await ListEpisodes()
        const webEpisodeId = listEpisodesAnchor.items[0].webEpisodeId
        const publishOn = videoInfo.uploadDate

        const uploadDate = makeDate(publishOn, videoInfo.title)
        
        console.log("🚀 ~ file: index.js:71 ~ updateDate ~ uploadDate:", uploadDate)



        let data = JSON.stringify({
            "userId": 27042928,
            "publishOn": uploadDate
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `https://podcasters.spotify.com/pod/api/proxy/v3/episodes/webEpisodeId:${webEpisodeId}/update?isMumsCompatible=true`,
            headers: { 
                'accept': '*/*', 
                'accept-language': 'en-US,en;q=0.9,pt;q=0.8', 
                'content-type': 'application/json', 
                'cookie': 'sss=1; _gcl_au=1.1.1108345244.1717640084; _hjSessionUser_3893126=eyJpZCI6IjQ2MGM5NzM1LWE3ZmQtNWU4ZC04MzQyLTdlNWM1M2RjNDdlNCIsImNyZWF0ZWQiOjE3MTc2NDAwODQxMjYsImV4aXN0aW5nIjp0cnVlfQ==; __stripe_mid=be4b03b9-ed2c-478a-901a-91feda457153d06e1d; __pdst=2283e22bbfab463f805e1bf385acbe4b; _scid=dc2cf0d1-1d3d-44f6-bdb1-8fb2c99aa1b2; _tt_enable_cookie=1; _ttp=voaOt0YE92qS0fok8Nml8p4NviM; LPVID=U4NzYyZTdmN2JmYjQ4ZmI3; OptanonAlertBoxClosed=2024-06-06T02:15:22.526Z; sp_adid=7cfdbc57-4c79-42c2-a5c5-144c3a5798ac; ki_r=; sp_t=84918854f11c1799feebf91d3f15b780; _ga_ZWG1NSHWD8=GS1.1.1718810835.2.0.1718810835.0.0.0; _gid=GA1.2.1427767420.1719442017; _hjSession_3893126=eyJpZCI6IjIwYTVhMjI1LWYxNDEtNDA2Yy04YzIyLTk0MmJlODk3MTg4YiIsImMiOjE3MTk0NDIwMTY4ODAsInMiOjEsInIiOjEsInNiIjowLCJzciI6MCwic2UiOjAsImZzIjowLCJzcCI6MX0=; __stripe_sid=e39a5ef3-9627-4588-9573-59947053be39a59fb6; _fbp=fb.1.1719442022571.139551453470435387; reduxPersist%3AlocalStorage={%22lastPlayedSegment%22:{}}; _ScCbts=%5B%5D; reduxPersist%3Atutorial={%22dismissedBanners%22:{}%2C%22dismissedTutorialPopups%22:{}%2C%22isOptedOutOfDistribution%22:false%2C%22isShortMetadataFormModalShowing%22:false}; reduxPersist%3AvoiceMessageCreationModalScreen={%22voiceMessageRecording%22:null%2C%22isVoiceMessageRehydrating%22:false%2C%22isVoiceMessagePlaying%22:false%2C%22isShowingRecordAgainConfirmationOverlay%22:false%2C%22isShowingExitConfirmationOverlay%22:false%2C%22loginEmail%22:%22%22%2C%22loginPassword%22:%22%22%2C%22signupName%22:%22%22%2C%22signupEmail%22:%22%22%2C%22signupPassword%22:%22%22%2C%22currentUserEmail%22:null%2C%22captcha%22:null%2C%22email%22:%22%22%2C%22voiceMessageTitle%22:%22%22%2C%22isLoading%22:false%2C%22isNewUser%22:false%2C%22isError%22:false}; reduxPersistIndex=[%22reduxPersist:localStorage%22%2C%22reduxPersist:tutorial%22%2C%22reduxPersist:voiceMessageCreationModalScreen%22]; sss=1; LPSID-2422064=9noaW6MUT3OdBexguSq3PQ; anchorpw_s=s%3Aq27F0QJ5zMo_uutuG1Xm1m0B0PASpeNM.ntL%2BfQGothxmv%2BDrhB90skpP4TQ7BiogC%2Fo9rVRrWjw; sp_locale=pt-BR; sp_dc=AQDGC1FUXzQDU3saCN2WU6Gx8J0cTqP1v0QSjWOOtNBwswjLOyELUPv1BPA1_u3VmlKM7a-01PCNAG5AeqhypvSAt3y4WHcF9AC-Yht1jW-AYF5TBHH07eibA2ozxwTptdt1rDREseQJ7CMCrXN4Nut2YHxdjJ0; sp_key=3ad49508-78d8-4503-ac1b-8231c72dc85a; OptanonConsent=isGpcEnabled=0&datestamp=Wed+Jun+26+2024+21%3A07%3A54+GMT-0300+(Hora+padr%C3%A3o+de+Bras%C3%ADlia)&version=202405.2.0&browserGpcFlag=0&isIABGlobal=false&hosts=&landingPath=NotLandingPage&groups=s00%3A1%2Cf00%3A1%2Cm00%3A1%2Ct00%3A1%2Ci00%3A1%2Cf11%3A1%2Cm03%3A1&geolocation=BR%3BGO&AwaitingReconsent=false; _ga=GA1.2.199006995.1717640084; _rdt_uuid=1717640084290.5d387a37-5258-44d3-8816-0142b0145807; _scid_r=dc2cf0d1-1d3d-44f6-bdb1-8fb2c99aa1b2; ki_t=1717640084485%3B1719442028938%3B1719446876649%3B2%3B27; ab.storage.userId.91ac64b1-3e86-476a-9953-ccba0370c1d6=g%3A00f54e639c734cfeb0b43de0de0cc4c1dd75972fd0b3974518d4bb%7Ce%3Aundefined%7Cc%3A1719446876415%7Cl%3A1719446876417; ab.storage.deviceId.91ac64b1-3e86-476a-9953-ccba0370c1d6=g%3Ab7b7a17b-8cb5-bc06-d8da-f7c7a30ff9ee%7Ce%3Aundefined%7Cc%3A1719446876418%7Cl%3A1719446876418; ab.storage.sessionId.91ac64b1-3e86-476a-9953-ccba0370c1d6=g%3A4721795f-aef1-edd3-3252-49b73818db49%7Ce%3A1719448676419%7Cc%3A1719446876416%7Cl%3A1719446876419; _ga_BS28GFQSGL=GS1.1.1719442016.2.1.1719446917.0.0.0', 
                'origin': 'https://podcasters.spotify.com', 
                'priority': 'u=1, i', 
                'referer': 'https://podcasters.spotify.com/pod/dashboard/episode/e2lbqdm/details', 
                'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"', 
                'sec-ch-ua-mobile': '?0', 
                'sec-ch-ua-platform': '"Windows"', 
                'sec-fetch-dest': 'empty', 
                'sec-fetch-mode': 'cors', 
                'sec-fetch-site': 'same-origin', 
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
              },
              data : data
    };

    const response = await axios(config)


    return {
        response: response.data,
        type: response.data.didChangePublishState
    }

} catch (error) {

    return {
        type: false,
        response: error
    }
}


}

module.exports = { updateDate }

