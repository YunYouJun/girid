import type { VercelRequest, VercelResponse } from '@vercel/node'
import type { Method } from 'axios'
import axios from 'axios'

/**
 * /api/bgm/cors?url=xxx
 * @param request
 * @param response
 * @returns
 */
async function handler(request: VercelRequest, response: VercelResponse) {
  if (!request.url) {
    response.status(404).send('Need Url')
    return
  }

  const imageUrl = decodeURIComponent(request.url.replace('/api/bgm/cors?url=', ''))

  if (!imageUrl.startsWith('https://lain.bgm.tv')) {
    response.status(403).send('Forbidden')
    return
  }

  const config = {
    method: request.method as Method,
    url: imageUrl,
  }

  if (request.body)
    (config as any).data = request.body

  const res = await axios({
    ...config,
    responseType: 'arraybuffer',
  })
  response.setHeader('Cache-Control', 's-maxage=43200')
  response.setHeader('Content-Type', res.headers['content-type'])
  response.status(res.status).send(res.data)
}

export default handler
