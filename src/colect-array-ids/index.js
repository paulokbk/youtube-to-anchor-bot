const axios = require("axios");

const GetIds = async () => {

let data = JSON.stringify({
  "context": {
    "client": {
      "hl": "pt",
      "gl": "BR",
      "remoteHost": "189.38.42.11",
      "deviceMake": "",
      "deviceModel": "",
      "visitorData": "CgtUZ3p0OGsyZVFjMCjfyfynBjIICgJCUhICGgA%3D",
      "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36,gzip(gfe)",
      "clientName": "WEB",
      "clientVersion": "2.20230831.09.00",
      "osName": "Windows",
      "osVersion": "10.0",
      "originalUrl": "https://www.youtube.com/watch?v=AkAfrbK7YWA",
      "platform": "DESKTOP",
      "clientFormFactor": "UNKNOWN_FORM_FACTOR",
      "configInfo": {
        "appInstallData": "CN_J_KcGENbqrwUQ-r6vBRC4i64FEOuTrgUQ6-j-EhCj3q8FEMfmrwUQrLevBRDnuq8FEJfn_hIQzN-uBRC05q8FEMyu_hIQhIWvBRDks_4SEKfq_hIQvMz-EhCBpa8FEInorgUQ6sOvBRDZya8FEL22rgUQ0-GvBRDc468FEOPmrwUQt--vBRC36v4SENShrwUQj9ivBRDbr68FEPOorwUQpuz-EhD65P4SEOzYrwUQlNn-EhClwv4SENvrrwUQ1umvBRCXz68FELHGrwUQxN2vBRDi1K4FEN3o_hIQ1eWvBRDuoq8FELTJrwUQjMuvBRCD368FEN3rrwUQiNivBRC1pq8FEIjjrwUQp-KvBRCs2a8F"
      },
      "userInterfaceTheme": "USER_INTERFACE_THEME_DARK",
      "timeZone": "America/Sao_Paulo",
      "browserName": "Chrome",
      "browserVersion": "116.0.0.0",
      "acceptHeader": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "deviceExperimentId": "ChxOekkzTnpVM05qQTJOREV5TWprM05UZzBPQT09EN_J_KcGGN_J_KcG",
      "screenWidthPoints": 1270,
      "screenHeightPoints": 1001,
      "screenPixelDensity": 1,
      "screenDensityFloat": 1,
      "utcOffsetMinutes": -180,
      "connectionType": "CONN_CELLULAR_4G",
      "memoryTotalKbytes": "8000000",
      "mainAppWebInfo": {
        "graftUrl": "https://www.youtube.com/@carlospovo/streams",
        "pwaInstallabilityStatus": "PWA_INSTALLABILITY_STATUS_UNKNOWN",
        "webDisplayMode": "WEB_DISPLAY_MODE_BROWSER",
        "isWebNativeShareAvailable": true
      }
    },
    "user": {
      "lockedSafetyMode": false
    },
    "request": {
      "useSsl": true,
      "consistencyTokenJars": [
        {
          "encryptedTokenJarContents": "AKreu9uN6C_1loT-mMD26jTQx0b3vTqQ5gac0O0Wj4vw4e6StK_l7W6yM4ygAzHINijKv0D9vvzzP8v_69wh-zNJC-x5not37qUzKs_VPmUokec8jx1QEFuItwJFdGqNZeT8m9noqqaNVxrkuGghOxno"
        }
      ],
      "internalExperimentFlags": [
        {
          "key": "force_enter_once_in_webview",
          "value": "true"
        }
      ]
    },
    "clickTracking": {
      "clickTrackingParams": "CAAQhGciEwjS27666aKBAxWpsJUCHdocD8E="
    },
    "adSignalsInfo": {
      "params": [
        {
          "key": "dt",
          "value": "1694442719811"
        },
        {
          "key": "flash",
          "value": "0"
        },
        {
          "key": "frm",
          "value": "0"
        },
        {
          "key": "u_tz",
          "value": "-180"
        },
        {
          "key": "u_his",
          "value": "4"
        },
        {
          "key": "u_h",
          "value": "1080"
        },
        {
          "key": "u_w",
          "value": "2560"
        },
        {
          "key": "u_ah",
          "value": "1080"
        },
        {
          "key": "u_aw",
          "value": "2560"
        },
        {
          "key": "u_cd",
          "value": "24"
        },
        {
          "key": "bc",
          "value": "31"
        },
        {
          "key": "bih",
          "value": "1001"
        },
        {
          "key": "biw",
          "value": "1253"
        },
        {
          "key": "brdim",
          "value": "0,0,0,0,2560,0,2560,1080,1270,1001"
        },
        {
          "key": "vis",
          "value": "1"
        },
        {
          "key": "wgl",
          "value": "true"
        },
        {
          "key": "ca_type",
          "value": "image"
        }
      ]
    }
  },
  "continuation": "4qmFsgKpCxIYVUM0aFR5Y2ZHbm5ORWYwa1FjM1h4ZVZnGowLOGdhbENCcWlDSEtmQ0FxYUNBcnhCd0VwWDN1MHgydDNncXU1OS1vN2NaUnRsZ2J5aDBKTHFkcHpZcVItcDJaUm1Wb2V1ZktGM1Etck1Jb0l6LUYzWFdRdFQtRFVHNVpTNkNLMTVZOHRpb1MxaDNsOW1MYlF4S1FLVUdjSEk0aUswVURKRWdMOWtUV0NSMGZJV2VXVXVXTF9MbFV1N2hSLUxHWWxQa195MngtTmNsM2d1bWJ5ck5WY3JrRzJXYndCcng0N3o1a216YmFralFCVDJyVUZxOUZBZml3YnVNR2FtNUIyT29PWTR6dXdTZm1rY1RnUVI4TG1WVHpnc28yRGpwS0ZCZXJfUFNwQjYzVmhOUnRleUg1X3ZJeUhhOWlGdVpZQ1FXdWRoSTFSTGF2UDJDcGpRQWMwd3RISFJ5eU1sMFh0NHVGRWplUXFMUXU1X0ZmdXoxeThxVnlmZUZlbTZMNF9WTWgyZEx1WU5FUHRYSzNvOTZ6QktMd1NUeDJPSGRnWFN1ZjQ0X050NGJLOXh4TVM4TmxJS3gyeUdTQ044UWRpWm1kOEIzSHFCUHN5YTljUDBrdXJSM25yeE83a0FaRWU1S28zZWNuelMxa19oUFpMTGVSdW9idEh5THByV2wwSk13MFNVbWwtV2ozcXVhMjlvUl8zQndCTDJyUTNZMWd0OG02OS1Cekp6Y05lSHRpS0cwMVZ1MXd5dE0xaUZaNjFWNHUxSzZMNTJzSmxvYU1JcXo4XzYtd2VnSWYyZ2pTZDlhZy13b3JSa2l4SDZlSHp2cFBSZlZ6RlFERHpRemRGYUlGRzZYNXljN1ZJdGx0WXM1YUU0RmI2NnN1dDZscXJ5NEhyTzNENjYzcWFET3IzTy1WRm91cU9oRzdXZ0E1UUw2STJDMlBsd0ZKZjIxSms4dDR5c0hta2tDWHF5N1hTZS01SHdYVm9ZYTBLRU5IdXBBWnRYQ19pN0RZVjJMMWlhdGxuU1ZwMElRZDI4NTA5WVBIcnVWY3oxTFN4LXVkZlRSZTRqa1JhWDFqdk1tZUMxOW8wZnl3WEFWYVhtUGdOMk5rWEN2MUVOUXZXRmdMN3dDakxFcGRXNWZBUkE5QUpTVjJVdW1mR2pSQUVLNmJDSF9FV1JwWDlNQm94SzFTRWhiUy14X19COXBESkNteExXQXdVSGU2LU5CN0hkSmlNeUZNQ1pZZ2h3X3Z1Sks1RXhrWEh3ZDhIbXB2b3dOakZIMUFRRkJhQkNUOEgzaW1DNUlNeEJoR2VLN2x3c3ZWRjhFVHdRajduTEFTTjBoUHhwZERnb2d0MmhhTjNpN2Q2anNaYmxQX0FuY3EtcjVKUG1oOFhqNkxNS0Z4UFNZMkV0bW5GMGtsUGtFM0duaTNyUk15Q2ZLNV9NcWFyRzdodkUtY3hsekFEM0VSNTdzZ0JSUnhNTEYyczFRczNJT3lBVUducVg0NlVsbmNBeERMMEQ2NnRyc2ROUHFleHRqYnZjLWg0QUk3c2o4NDJ3bXRzeUZwRElCZVhXdEZKb2U5OTdJekZPMjlDdFVmQURLTUtHaS00MUoxZDV6TWM0U1FOVERLZk15T19ta0dLOXplMzVMVzNxZEY3RmlsUjdQdEM5WXpjZm5aeE9wWEJGbUtzUk5SSGZQd3Q3ZTc3VF9RZ0l1Q19IRFBZVFlrQnllR092NG8yc0QwTDh4WGszcUUxcmI0X3FJOWJEWktjWVhHeHNobzE3NTNPRUdBS1A5Yk40X3poekZVb1kzRWNqTlpWellRM0xueEk3STAxaHBUcE5zLUVER3pBSFVjN3RvSG5neUlTSkRZMU1tWmtOVEk0TFRBd01EQXRNbU5qT0MwNE4yWTVMVFU0TWpReU9XRm1ZMlE1TkJnRQ%3D%3D"
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://www.youtube.com/youtubei/v1/browse?key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8&prettyPrint=false',
  headers: { 
    'authority': 'www.youtube.com', 
    'accept': '*/*', 
    'accept-language': 'en-US,en;q=0.9,pt;q=0.8', 
    'authorization': 'SAPISIDHASH 1694444450_d519068d1aa4e1cda02daf18849622134e7fbe23', 
    'content-type': 'application/json', 
    'cookie': 'VISITOR_INFO1_LIVE=Tgzt8k2eQc0; LOGIN_INFO=AFmmF2swRAIgZB12My5FVsQRgyGRNNGvEKIBu8SnM1YXXExnGLVY5KgCIGISa1eBcDPQgLgHFJj8saTFQEl2J3Nt46RobI5WUPRY:QUQ3MjNmd2FXR3Z2UDNXaVM4M1c4ZDJYZGFfODFjbnE3R19BQml4ekMwd1I3clFLaFp1bEZta2lPT1VYWEU3Q1hQa09WREpzZnVuRjNWOVZZY3ZVRk4tMUc0X1pIckFfZUI4ZVpmQVFSMFU1aDkxSGw2ZHRjNTdQZy14eU4wTzZYTm5BQTRsTzFZcHNNYng1aWZaLWN3c1EtdVlOOVFFZVlR; PREF=f6=40000000&tz=America.Sao_Paulo&f5=30000&f7=100; VISITOR_PRIVACY_METADATA=CgJCUhICGgA%3D; SID=aAjDZcpzMisalUMV1651sbQTUMrS-ux4fPTwrnqC1Eexz4Z17x5gSw9tWXuNCmd_wC0zkQ.; __Secure-1PSID=aAjDZcpzMisalUMV1651sbQTUMrS-ux4fPTwrnqC1Eexz4Z1IYKMe0ZbeRr_kiFk_NO3Xw.; __Secure-3PSID=aAjDZcpzMisalUMV1651sbQTUMrS-ux4fPTwrnqC1Eexz4Z1YxJdS0xXKTHvfb8BBK9JPg.; HSID=A7zP5EqJX5gspbzpL; SSID=AHRkKfbkpCaoP6APn; APISID=45bfIa6cglPI_7dQ/AC3Ny33uvWuQ2woPr; SAPISID=y_s8ElQm6GGJ5zNe/Aulz_mbjqMPp_3qmL; __Secure-1PAPISID=y_s8ElQm6GGJ5zNe/Aulz_mbjqMPp_3qmL; __Secure-3PAPISID=y_s8ElQm6GGJ5zNe/Aulz_mbjqMPp_3qmL; YSC=Qrs34xq1v5E; __Secure-1PSIDTS=sidts-CjIBSAxbGQ94FkUhkMnVkEQPbToGkXTZdx1DC2zo7de3T5sJHAkyqePw0KsGH6CgmZ2U-RAA; __Secure-3PSIDTS=sidts-CjIBSAxbGQ94FkUhkMnVkEQPbToGkXTZdx1DC2zo7de3T5sJHAkyqePw0KsGH6CgmZ2U-RAA; SIDCC=APoG2W8WlOl3sIH3KbHvlJ5ZOlrtJwjWibQYQ_On_dYpfit8rsuWbKZt7EjS4GrpeacmquoNsqs; __Secure-1PSIDCC=APoG2W9_vyYSE-s89vbEMR6fYx_QrSnXfHW62sVYwv5AeuddPqNSlwup7Onxh2WzKdpq08iv4G0; __Secure-3PSIDCC=APoG2W9-jr5rZ7foVQEWfEbAYI59x73nnfJuOR5gJqhoE_KTvX3iFYBa3VsK7W0uTDf5yr-eo_mu; GPS=1; SIDCC=APoG2W_h8AgLI7UpvUQxNMeq9C4uWrdsB7Eafs94fsBz0_Oo9p7Fkp8yFIoR0Gcsf_odzQWhzAg; VISITOR_INFO1_LIVE=zSwpEAuwBAY; VISITOR_PRIVACY_METADATA=CgJCUhICGgA%3D; YSC=yTPLu-IzmLw; __Secure-1PSIDCC=APoG2W-kzYDs1YQUzlOlWgfComKpq2abneo0a19KCPkJ75bwzlnYd-dr4z817k5HNIXPrSj-m18; __Secure-3PSIDCC=APoG2W-OL3hOSEJ0XcnlpxsdH2Cnl97WokL8cIOjRaKiEFlc0lNQSBfQM8jgV7l95Zk4KvGHQH7K', 
    'origin': 'https://www.youtube.com', 
    'referer': 'https://www.youtube.com/@carlospovo/streams', 
    'sec-ch-ua': '"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"', 
    'sec-ch-ua-arch': '"x86"', 
    'sec-ch-ua-bitness': '"64"', 
    'sec-ch-ua-full-version': '"116.0.5845.180"', 
    'sec-ch-ua-full-version-list': '"Chromium";v="116.0.5845.180", "Not)A;Brand";v="24.0.0.0", "Google Chrome";v="116.0.5845.180"', 
    'sec-ch-ua-mobile': '?0', 
    'sec-ch-ua-model': '""', 
    'sec-ch-ua-platform': '"Windows"', 
    'sec-ch-ua-platform-version': '"15.0.0"', 
    'sec-ch-ua-wow64': '?0', 
    'sec-fetch-dest': 'empty', 
    'sec-fetch-mode': 'same-origin', 
    'sec-fetch-site': 'same-origin', 
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36', 
    'x-client-data': 'CI62yQEIo7bJAQipncoBCIraygEIkqHLAQiFoM0BCOmxzQEI3L3NAQjgxM0BCOjFzQEIucrNAQjzys0BCLjNzQEIk8/NAQjU0M0BCL7RzQEYwcvMAQ==', 
    'x-goog-authuser': '0', 
    'x-goog-visitor-id': 'CgtUZ3p0OGsyZVFjMCjfyfynBjIICgJCUhICGgA%3D', 
    'x-origin': 'https://www.youtube.com', 
    'x-youtube-bootstrap-logged-in': 'true', 
    'x-youtube-client-name': '1', 
    'x-youtube-client-version': '2.20230831.09.00'
  },
  data : data
}

let ids = []

const response = await axios(config)

ids = response.data.onResponseReceivedActions[0].appendContinuationItemsAction.continuationItems.map((item) => {
    return item.richItemRenderer?.content.videoRenderer.videoId

})
return ids

}

module.exports = { GetIds }

