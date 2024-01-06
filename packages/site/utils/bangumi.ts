import { createBangumiApi } from 'bangumi-api'
import pkg from '../../../package.json'

export const bangumiApi = createBangumiApi({
  userAgent: `YunYouJun/girid (${pkg.repository.url})`,
})

/**
 * use vercel cors proxy
 */
export function getImageWithoutCors(imageUrl: string) {
  if (imageUrl.startsWith('https://lain.bgm.tv'))
    return `${import.meta.env.DEV ? '' : ''}/api/bgm/cors?url=${imageUrl}`
  else
    return imageUrl
}
