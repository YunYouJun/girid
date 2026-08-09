import type { Method } from 'axios'
import type { IncomingMessage, ServerResponse } from 'node:http'
import axios from 'axios'

interface ApiRequest extends IncomingMessage {
  body?: unknown
}

interface ApiResponse extends ServerResponse {
  send: (body: unknown) => ApiResponse
  status: (statusCode: number) => ApiResponse
}

/**
 * /api/bgm/cors?url=xxx
 * @param request
 * @param response
 */
async function handler(request: ApiRequest, response: ApiResponse) {
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
  const contentType = res.headers['content-type']
  if (typeof contentType === 'string')
    response.setHeader('Content-Type', contentType)
  response.status(res.status).send(res.data)
}

export default handler
