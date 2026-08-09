import { createBangumiApi } from 'bangumi-api'
import pkg from '../../../../package.json'

export const bangumiApi = createBangumiApi({
  userAgent: `YunYouJun/girid (${pkg.repository.url})`,
})

/**
 * Route Bangumi CDN images through the colocated Nuxt API so canvas export
 * remains same-origin in development and production.
 */
export function getImageWithoutCors(imageUrl: string) {
  if (imageUrl.startsWith('https://lain.bgm.tv'))
    return `/api/bgm/cors?url=${encodeURIComponent(imageUrl)}`
  else
    return imageUrl
}
