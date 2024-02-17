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
            'cookie': 'sp_m=us; sp_t=82f8f882-77c6-4e59-a6d6-0204d7409bae; sp_adid=d61843bb-dc54-4758-813c-e586918c9471; OptanonAlertBoxClosed=2023-11-13T22:00:53.193Z; __pdst=54d399af21d745e3b373b95beb8041dc; _scid=40d687e2-2810-4ae3-8b99-4eac23d5ffe7; _tt_enable_cookie=1; _ttp=0xEJ_zLak1xxFb7-y17KmyRlKgi; __stripe_mid=a3644900-81ab-480e-9bfd-b01cd939f15b0025e5; LPVID=FiZTU2YzhiYTBkNDk2ZWJi; _cs_c=0; _cs_id=0767fa63-4ec7-ad4f-edd5-2c3d42c3a9a9.1701276968.1.1701276968.1701276968.1.1735440968874; _ga_ZWRF3NLZJZ=GS1.1.1701276908.1.1.1701277170.0.0.0; _ga_S0T2DJJFZM=GS1.1.1701276968.1.0.1701277172.0.0.0; ki_r=; sp_dc=AQCrQ4NX9iGIOYb9o7H6Xy4jOakeGIBwiptZXhdygsQqDlPHrgMXU2gkmaXE2WgDh_TfBWBYHpNDvszzT_BqRp7IyJNE-EHGqrsoSHdXw0xe-D2psmFt76aPbdSTvOLwv7ka2QXyQmHSqJVtFW8VMvibsTKCGmXs; sp_key=6bc73820-8aef-40ef-9677-007b3701738e; sp_gaid=0088fc19b47e9b7f9cb9bde44cc362747b8d39f94b16a4279d0055; _ga_ZWG1NSHWD8=GS1.1.1707349024.10.0.1707349024.0.0.0; reduxPersist%3AlocalStorage={%22lastPlayedSegment%22:{}}; anchorpw_s=s%3AR_eC0TJTo5SL3XgQY2ASs54pGUJnFfa2.KEE%2FEsJKRKqtaauZfSFTkvYPRuQ%2BbDHL2SyWf7nL03A; reduxPersist%3Atutorial={%22dismissedBanners%22:{}%2C%22dismissedTutorialPopups%22:{}%2C%22isOptedOutOfDistribution%22:false%2C%22isShortMetadataFormModalShowing%22:false}; reduxPersist%3AvoiceMessageCreationModalScreen={%22voiceMessageRecording%22:null%2C%22isVoiceMessageRehydrating%22:false%2C%22isVoiceMessagePlaying%22:false%2C%22isShowingRecordAgainConfirmationOverlay%22:false%2C%22isShowingExitConfirmationOverlay%22:false%2C%22loginEmail%22:%22%22%2C%22loginPassword%22:%22%22%2C%22signupName%22:%22%22%2C%22signupEmail%22:%22%22%2C%22signupPassword%22:%22%22%2C%22currentUserEmail%22:null%2C%22captcha%22:null%2C%22email%22:%22%22%2C%22voiceMessageTitle%22:%22%22%2C%22isLoading%22:false%2C%22isNewUser%22:false%2C%22isError%22:false}; reduxPersistIndex=[%22reduxPersist:localStorage%22%2C%22reduxPersist:tutorial%22%2C%22reduxPersist:voiceMessageCreationModalScreen%22]; _gcl_au=1.1.1513683386.1707746222; _gid=GA1.2.610390432.1708210805; ab.storage.deviceId.91ac64b1-3e86-476a-9953-ccba0370c1d6=%7B%22g%22%3A%226ad6634d-9b30-3511-0091-f1e20069c937%22%2C%22c%22%3A1700454697891%2C%22l%22%3A1708210805456%7D; ab.storage.userId.91ac64b1-3e86-476a-9953-ccba0370c1d6=%7B%22g%22%3A%22bbb12fdb-c618-40b4-b8cd-69bf4b2b9eab%22%2C%22c%22%3A1707746574699%2C%22l%22%3A1708210805456%7D; __stripe_sid=11678856-f302-43cf-90b6-1c851ea914db98f368; LPSID-2422064=JAHmXVWxRHqNWPd2-FgVIg; _gat_UA-62744412-3=1; ki_t=1700454685941%3B1708210807850%3B1708213041215%3B6%3B59; ab.storage.sessionId.91ac64b1-3e86-476a-9953-ccba0370c1d6=%7B%22g%22%3A%22c8b17e4a-76c6-5150-a27a-b6383e024fd5%22%2C%22e%22%3A1708214865543%2C%22c%22%3A1708210805455%2C%22l%22%3A1708213065543%7D; _ga_BS28GFQSGL=GS1.1.1708210804.6.1.1708213092.0.0.0; _rdt_uuid=1700454682867.af312155-23ec-4fb1-9ee9-3eed147f01ed; OptanonConsent=isGpcEnabled=0&datestamp=Sat+Feb+17+2024+20%3A38%3A13+GMT-0300+(Hor%C3%A1rio+Padr%C3%A3o+de+Bras%C3%ADlia)&version=202309.1.0&browserGpcFlag=0&isIABGlobal=false&hosts=&landingPath=NotLandingPage&groups=s00%3A1%2Cf00%3A1%2Cm00%3A1%2Ct00%3A1%2Ci00%3A1%2Cf11%3A1%2Cm03%3A1&geolocation=BR%3BGO&AwaitingReconsent=false; _scid_r=40d687e2-2810-4ae3-8b99-4eac23d5ffe7; _ga=GA1.2.1368544455.1699912841; anchorpw_s=s%3AR_eC0TJTo5SL3XgQY2ASs54pGUJnFfa2.KEE%2FEsJKRKqtaauZfSFTkvYPRuQ%2BbDHL2SyWf7nL03A',
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
                'cookie': 'sp_m=us; sp_t=82f8f882-77c6-4e59-a6d6-0204d7409bae; sp_adid=d61843bb-dc54-4758-813c-e586918c9471; OptanonAlertBoxClosed=2023-11-13T22:00:53.193Z; __pdst=54d399af21d745e3b373b95beb8041dc; _scid=40d687e2-2810-4ae3-8b99-4eac23d5ffe7; _tt_enable_cookie=1; _ttp=0xEJ_zLak1xxFb7-y17KmyRlKgi; __stripe_mid=a3644900-81ab-480e-9bfd-b01cd939f15b0025e5; LPVID=FiZTU2YzhiYTBkNDk2ZWJi; _cs_c=0; _cs_id=0767fa63-4ec7-ad4f-edd5-2c3d42c3a9a9.1701276968.1.1701276968.1701276968.1.1735440968874; _ga_ZWRF3NLZJZ=GS1.1.1701276908.1.1.1701277170.0.0.0; _ga_S0T2DJJFZM=GS1.1.1701276968.1.0.1701277172.0.0.0; ki_r=; sp_dc=AQCrQ4NX9iGIOYb9o7H6Xy4jOakeGIBwiptZXhdygsQqDlPHrgMXU2gkmaXE2WgDh_TfBWBYHpNDvszzT_BqRp7IyJNE-EHGqrsoSHdXw0xe-D2psmFt76aPbdSTvOLwv7ka2QXyQmHSqJVtFW8VMvibsTKCGmXs; sp_key=6bc73820-8aef-40ef-9677-007b3701738e; sp_gaid=0088fc19b47e9b7f9cb9bde44cc362747b8d39f94b16a4279d0055; _ga_ZWG1NSHWD8=GS1.1.1707349024.10.0.1707349024.0.0.0; reduxPersist%3AlocalStorage={%22lastPlayedSegment%22:{}}; anchorpw_s=s%3AR_eC0TJTo5SL3XgQY2ASs54pGUJnFfa2.KEE%2FEsJKRKqtaauZfSFTkvYPRuQ%2BbDHL2SyWf7nL03A; reduxPersist%3Atutorial={%22dismissedBanners%22:{}%2C%22dismissedTutorialPopups%22:{}%2C%22isOptedOutOfDistribution%22:false%2C%22isShortMetadataFormModalShowing%22:false}; reduxPersist%3AvoiceMessageCreationModalScreen={%22voiceMessageRecording%22:null%2C%22isVoiceMessageRehydrating%22:false%2C%22isVoiceMessagePlaying%22:false%2C%22isShowingRecordAgainConfirmationOverlay%22:false%2C%22isShowingExitConfirmationOverlay%22:false%2C%22loginEmail%22:%22%22%2C%22loginPassword%22:%22%22%2C%22signupName%22:%22%22%2C%22signupEmail%22:%22%22%2C%22signupPassword%22:%22%22%2C%22currentUserEmail%22:null%2C%22captcha%22:null%2C%22email%22:%22%22%2C%22voiceMessageTitle%22:%22%22%2C%22isLoading%22:false%2C%22isNewUser%22:false%2C%22isError%22:false}; reduxPersistIndex=[%22reduxPersist:localStorage%22%2C%22reduxPersist:tutorial%22%2C%22reduxPersist:voiceMessageCreationModalScreen%22]; _gcl_au=1.1.1513683386.1707746222; _gid=GA1.2.610390432.1708210805; ab.storage.deviceId.91ac64b1-3e86-476a-9953-ccba0370c1d6=%7B%22g%22%3A%226ad6634d-9b30-3511-0091-f1e20069c937%22%2C%22c%22%3A1700454697891%2C%22l%22%3A1708210805456%7D; ab.storage.userId.91ac64b1-3e86-476a-9953-ccba0370c1d6=%7B%22g%22%3A%22bbb12fdb-c618-40b4-b8cd-69bf4b2b9eab%22%2C%22c%22%3A1707746574699%2C%22l%22%3A1708210805456%7D; __stripe_sid=11678856-f302-43cf-90b6-1c851ea914db98f368; LPSID-2422064=JAHmXVWxRHqNWPd2-FgVIg; OptanonConsent=isGpcEnabled=0&datestamp=Sat+Feb+17+2024+20%3A33%3A00+GMT-0300+(Hor%C3%A1rio+Padr%C3%A3o+de+Bras%C3%ADlia)&version=202309.1.0&browserGpcFlag=0&isIABGlobal=false&hosts=&landingPath=NotLandingPage&groups=s00%3A1%2Cf00%3A1%2Cm00%3A1%2Ct00%3A1%2Ci00%3A1%2Cf11%3A1%2Cm03%3A1&geolocation=BR%3BGO&AwaitingReconsent=false; _scid_r=40d687e2-2810-4ae3-8b99-4eac23d5ffe7; _ga=GA1.2.1368544455.1699912841; _rdt_uuid=1700454682867.af312155-23ec-4fb1-9ee9-3eed147f01ed; ki_t=1700454685941%3B1708210807850%3B1708212784252%3B6%3B56; ab.storage.sessionId.91ac64b1-3e86-476a-9953-ccba0370c1d6=%7B%22g%22%3A%22c8b17e4a-76c6-5150-a27a-b6383e024fd5%22%2C%22e%22%3A1708214604132%2C%22c%22%3A1708210805455%2C%22l%22%3A1708212804132%7D; _gat_UA-62744412-3=1; _ga_BS28GFQSGL=GS1.1.1708210804.6.1.1708212846.0.0.0; anchorpw_s=s%3AR_eC0TJTo5SL3XgQY2ASs54pGUJnFfa2.KEE%2FEsJKRKqtaauZfSFTkvYPRuQ%2BbDHL2SyWf7nL03A', 
                'origin': 'https://podcasters.spotify.com', 
                'referer': 'https://podcasters.spotify.com/pod/dashboard/episode/e2ftt1f/details', 
                'sec-ch-ua': '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"', 
                'sec-ch-ua-mobile': '?0', 
                'sec-ch-ua-platform': '"Windows"', 
                'sec-fetch-dest': 'empty', 
                'sec-fetch-mode': 'cors', 
                'sec-fetch-site': 'same-origin', 
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
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

