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
            'cookie': 'sp_m=us; sp_t=0b0e71b6-bdd1-40ee-967c-e2752a76ddc0; _gcl_au=1.1.1757012820.1691686970; sp_adid=d879638c-bf38-402e-b3cc-03da168c890f; OptanonAlertBoxClosed=2023-08-10T17:03:01.615Z; sp_gaid=0088fc19b47e9b7f9cb9bde44cc362747b8d39f94b16a4279d0055; reduxPersist%3AlocalStorage={%22lastPlayedSegment%22:{}%2C%22playbackSpeed%22:1}; __pdst=f13294c5bc33485da70f58705a1f0058; _rdt_uuid=1692192367945.f3d4ec43-174a-40cc-8a0e-b9fdc551d92c; _scid=f28bff10-3cc4-4df5-b3b5-d12804b92877; _gid=GA1.2.1780909414.1692192368; _tt_enable_cookie=1; _ttp=md_TLMgVaT26AqimGV9Gjv69Tuo; reduxPersist%3Atutorial={%22dismissedBanners%22:{}%2C%22dismissedTutorialPopups%22:{}%2C%22isOptedOutOfDistribution%22:false%2C%22isShortMetadataFormModalShowing%22:false}; reduxPersist%3AvoiceMessageCreationModalScreen={%22voiceMessageRecording%22:null%2C%22isVoiceMessageRehydrating%22:false%2C%22isVoiceMessagePlaying%22:false%2C%22isShowingRecordAgainConfirmationOverlay%22:false%2C%22isShowingExitConfirmationOverlay%22:false%2C%22loginEmail%22:%22%22%2C%22loginPassword%22:%22%22%2C%22signupName%22:%22%22%2C%22signupEmail%22:%22%22%2C%22signupPassword%22:%22%22%2C%22currentUserEmail%22:null%2C%22captcha%22:null%2C%22email%22:%22%22%2C%22voiceMessageTitle%22:%22%22%2C%22isLoading%22:false%2C%22isNewUser%22:false%2C%22isError%22:false}; reduxPersistIndex=[%22reduxPersist:localStorage%22%2C%22reduxPersist:tutorial%22%2C%22reduxPersist:voiceMessageCreationModalScreen%22]; anchorpw_s=s%3AYRZCBKsLMrXoUIqhAS6669Hbkf02JGYY.9A8OAnKLB9K2eKet5l85FPzcUsrsnSLSoF%2BHSUS6%2BPE; ki_r=; __stripe_mid=1b212991-7f4c-47a5-a91b-c6de4e7acb043b8f99; LPVID=E4ODUyOTU3YjFjMWUzOWE4; sp_landing=https%3A%2F%2Fwww.spotify.com%2Fus%2Flogin%2F; sp_dc=AQBxhjm1RCNJ9PTO1UolkRnDcAvSdT0E5s5LZ9xLvTvxegKeYI14rZwWtBB3QoqeHUvW9QTNrmgV5aPW4y-gfnpTcQU45Z1Z8kJoBx2-9UqyYz2bgD163qkBP-15hDQiyvZ9XHtdrgrk1g5Vgbfcm2wzGawPVbCPMkkAXz4jvO2aQp8zDkA6xd9P9Z8yHcJusKvJ2vJJJlX4QifKXh3_LrZb-5g; sp_key=db21a381-e186-4edf-94c1-6d0e473e2463; _ga_ZWG1NSHWD8=GS1.1.1692273269.5.1.1692273577.0.0.0; _ga_ZWRF3NLZJZ=GS1.1.1692273398.1.1.1692273589.0.0.0; ab.storage.deviceId.91ac64b1-3e86-476a-9953-ccba0370c1d6=%7B%22g%22%3A%22d36c23be-cb45-9629-af21-ff6e77b3d427%22%2C%22c%22%3A1692192803696%2C%22l%22%3A1692300059485%7D; ab.storage.userId.91ac64b1-3e86-476a-9953-ccba0370c1d6=%7B%22g%22%3A%22bbb12fdb-c618-40b4-b8cd-69bf4b2b9eab%22%2C%22c%22%3A1692194150836%2C%22l%22%3A1692300059486%7D; __stripe_sid=636eaec2-cea8-4f85-bf64-d4f1bf9b95dce8e7f0; LPSID-2422064=FfMdQZ8qQ3-lcuPDTp0dEg; ki_t=1692192371969%3B1692273301315%3B1692300479321%3B2%3B13; ab.storage.sessionId.91ac64b1-3e86-476a-9953-ccba0370c1d6=%7B%22g%22%3A%22c650c783-be19-e376-dc98-1349bab48db0%22%2C%22e%22%3A1692302363685%2C%22c%22%3A1692300059485%2C%22l%22%3A1692300563685%7D; _gat_UA-62744412-3=1; _ga_BS28GFQSGL=GS1.1.1692300059.3.1.1692300715.0.0.0; OptanonConsent=isIABGlobal=false&datestamp=Thu+Aug+17+2023+16%3A31%3A55+GMT-0300+(Brasilia+Standard+Time)&version=6.26.0&hosts=&landingPath=NotLandingPage&groups=s00%3A1%2Cf00%3A1%2Cm00%3A1%2Ct00%3A1%2Ci00%3A1%2Cf11%3A1&geolocation=BR%3BGO&AwaitingReconsent=false; _scid_r=f28bff10-3cc4-4df5-b3b5-d12804b92877; _ga=GA1.2.1236716508.1691686972; anchorpw_s=s%3AYRZCBKsLMrXoUIqhAS6669Hbkf02JGYY.9A8OAnKLB9K2eKet5l85FPzcUsrsnSLSoF%2BHSUS6%2BPE',
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
                'authority': 'podcasters.spotify.com',
                'accept': '*/*',
                'accept-language': 'en-US,en;q=0.9,pt;q=0.8',
                'content-type': 'application/json',
                'cookie': 'sss=1; sp_m=us; sp_t=82f8f882-77c6-4e59-a6d6-0204d7409bae; _gcl_au=1.1.501609249.1699912841; sp_adid=d61843bb-dc54-4758-813c-e586918c9471; OptanonAlertBoxClosed=2023-11-13T22:00:53.193Z; sp_gaid=0088fc19b47e9b7f9cb9bde44cc362747b8d39f94b16a4279d0055; _ga_ZWG1NSHWD8=GS1.1.1700099344.3.0.1700099344.0.0.0; _rdt_uuid=1700454682867.af312155-23ec-4fb1-9ee9-3eed147f01ed; __pdst=54d399af21d745e3b373b95beb8041dc; _scid=40d687e2-2810-4ae3-8b99-4eac23d5ffe7; _tt_enable_cookie=1; _ttp=0xEJ_zLak1xxFb7-y17KmyRlKgi; __stripe_mid=a3644900-81ab-480e-9bfd-b01cd939f15b0025e5; LPVID=FiZTU2YzhiYTBkNDk2ZWJi; reduxPersist%3AlocalStorage={%22lastPlayedSegment%22:{}}; reduxPersist%3Atutorial={%22dismissedBanners%22:{}%2C%22dismissedTutorialPopups%22:{}%2C%22isOptedOutOfDistribution%22:false%2C%22isShortMetadataFormModalShowing%22:false}; reduxPersist%3AvoiceMessageCreationModalScreen={%22voiceMessageRecording%22:null%2C%22isVoiceMessageRehydrating%22:false%2C%22isVoiceMessagePlaying%22:false%2C%22isShowingRecordAgainConfirmationOverlay%22:false%2C%22isShowingExitConfirmationOverlay%22:false%2C%22loginEmail%22:%22%22%2C%22loginPassword%22:%22%22%2C%22signupName%22:%22%22%2C%22signupEmail%22:%22%22%2C%22signupPassword%22:%22%22%2C%22currentUserEmail%22:null%2C%22captcha%22:null%2C%22email%22:%22%22%2C%22voiceMessageTitle%22:%22%22%2C%22isLoading%22:false%2C%22isNewUser%22:false%2C%22isError%22:false}; reduxPersistIndex=[%22reduxPersist:localStorage%22%2C%22reduxPersist:tutorial%22%2C%22reduxPersist:voiceMessageCreationModalScreen%22]; _cs_c=0; _cs_id=0767fa63-4ec7-ad4f-edd5-2c3d42c3a9a9.1701276968.1.1701276968.1701276968.1.1735440968874; _ga_ZWRF3NLZJZ=GS1.1.1701276908.1.1.1701277170.0.0.0; _ga_S0T2DJJFZM=GS1.1.1701276968.1.0.1701277172.0.0.0; ki_r=; sp_landing=https%3A%2F%2Fwww.spotify.com%2Fus%2Flogin%2F; _gid=GA1.2.682864784.1701397927; __stripe_sid=a2bd0db2-19d1-4780-a05b-3a5849c7359bdec76d; sss=1; LPSID-2422064=fM6HjXsLRESbmsTmNIMV9g; ab.storage.deviceId.91ac64b1-3e86-476a-9953-ccba0370c1d6=%7B%22g%22%3A%226ad6634d-9b30-3511-0091-f1e20069c937%22%2C%22c%22%3A1700454697891%2C%22l%22%3A1701399630481%7D; ab.storage.userId.91ac64b1-3e86-476a-9953-ccba0370c1d6=%7B%22g%22%3A%22bbb12fdb-c618-40b4-b8cd-69bf4b2b9eab%22%2C%22c%22%3A1701276110863%2C%22l%22%3A1701399630482%7D; anchorpw_s=s%3AmtIghM-jPMzGXyNRTaeYFfcFdKUjU8lf.U56M2nSrwu7xQHZdzVr572aIw2TsR6TVphvWvu32P%2FY; OptanonConsent=isGpcEnabled=0&datestamp=Fri+Dec+01+2023+01%3A18%3A18+GMT-0300+(Hor%C3%A1rio+Padr%C3%A3o+de+Bras%C3%ADlia)&version=202309.1.0&browserGpcFlag=0&isIABGlobal=false&hosts=&landingPath=NotLandingPage&groups=s00%3A1%2Cf00%3A1%2Cm00%3A1%2Ct00%3A1%2Ci00%3A1%2Cf11%3A1%2Cm03%3A1&geolocation=BR%3BGO&AwaitingReconsent=false; _ga=GA1.2.1368544455.1699912841; _scid_r=40d687e2-2810-4ae3-8b99-4eac23d5ffe7; ki_t=1700454685941%3B1701397935035%3B1701404298357%3B3%3B38; ab.storage.sessionId.91ac64b1-3e86-476a-9953-ccba0370c1d6=%7B%22g%22%3A%22e8b6a1ef-23bd-88a5-7bd4-d51f4c565028%22%2C%22e%22%3A1701406099023%2C%22c%22%3A1701399630480%2C%22l%22%3A1701404299023%7D; _gat_UA-62744412-3=1; _ga_BS28GFQSGL=GS1.1.1701397932.3.1.1701404343.0.0.0; anchorpw_s=s%3AR4C8XzVZ0u9gT5QG4_VoDbKDJViUo8U5.sCyxP9hT9OG06hncqbh3XZqSM4kdunqREKzX8iipQE0',
                'origin': 'https://podcasters.spotify.com',
                'referer': 'https://podcasters.spotify.com/pod/dashboard/episode/e2cljat/details',
                'sec-ch-ua': '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
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

