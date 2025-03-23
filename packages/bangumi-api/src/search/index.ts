import type { SearchParams, Subject } from '../types'
import axios from 'axios'
import { bangumiApiUrl } from '../axios'

axios.defaults.baseURL = bangumiApiUrl

export function createSearch() {
  const subject = {
    /**
     * 条目搜索
     * @param keywords 关键词 URL Encode
     * @param params
     */
    async get(keywords: string, params: Partial<SearchParams> = {}) {
      // not start with 'v0'
      const res = await axios.get<{
        list: Subject[]
        results: number
      }>('/search/subject' + `/${keywords}`, { params })
      const { data } = res
      return data
    },
  }

  return {
    subject,
  }
}
