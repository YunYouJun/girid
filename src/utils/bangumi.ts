import { createBangumiApi } from 'bangumi-api'
import pkg from '../../package.json'

export const bangumiApi = createBangumiApi({
  userAgent: `YunYouJun/girid (${pkg.repository.url})`,
})
