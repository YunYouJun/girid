import { createBangumiApi } from 'bangumi-api'
import pkg from '../../package.json'

export const bangumiApi = createBangumiApi()
bangumiApi.axios.defaults.headers.common['User-Agent'] = `YunYouJun/girid + (${pkg.repository.url})`
