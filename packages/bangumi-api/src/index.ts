import { bangumiApiUrl, bangumiAxios } from './axios'
import { characters } from './characters'
import type { BangumiApiOptions } from './types'

export const defaultOptions: BangumiApiOptions = {
  version: 'v0',
}

/**
 * generate bangumi api instance
 * @param options
 */
export const createBangumiApi = (options: Partial<BangumiApiOptions> = {}) => {
  options = Object.assign(options, defaultOptions)
  bangumiAxios.defaults.baseURL = `${bangumiApiUrl}/${options.version}`

  return {
    axios: bangumiAxios,
    characters,
  }
}
