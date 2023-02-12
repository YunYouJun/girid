import axios from 'axios'

export const bangumiApiUrl = 'https://api.bgm.tv'
export const bangumiAxios = axios.create({
  baseURL: bangumiApiUrl,
})
