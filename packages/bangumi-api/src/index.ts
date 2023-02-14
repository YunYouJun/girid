import { bangumiApiUrl, bangumiAxios } from './axios'
import { characters } from './characters'
import type { BangumiApiOptions } from './types'
import { createSearch } from './search'
import { subjects } from './subjects'

export * from './search'
export * from './types'

export const defaultOptions: BangumiApiOptions = {
  version: 'v0',
  userAgent: 'YunYouJun/bangumi-api',
}

/**
 * generate bangumi api instance
 * @param options
 */
export const createBangumiApi = (options: Partial<BangumiApiOptions> = {}) => {
  options = Object.assign(defaultOptions, options)
  bangumiAxios.defaults.baseURL = `${bangumiApiUrl}/${options.version}`
  bangumiAxios.defaults.headers['User-Agent'] = options.userAgent || ''

  const search = createSearch()

  return {
    axios: bangumiAxios,
    search,
    characters,
    subjects,
  }
}
