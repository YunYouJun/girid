import type { IncomingMessage, ServerResponse } from 'node:http'
import { Buffer } from 'node:buffer'

interface ApiRequest extends IncomingMessage {
  body?: unknown
}

interface ApiResponse extends ServerResponse {
  send: (body: unknown) => ApiResponse
  status: (statusCode: number) => ApiResponse
}

const allowedImageHost = 'lain.bgm.tv'

/**
 * /api/bgm/cors?url=xxx
 * @param request
 * @param response
 */
async function handler(request: ApiRequest, response: ApiResponse) {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.setHeader('Allow', 'GET, HEAD')
    response.status(405).send('Method Not Allowed')
    return
  }

  const source = request.url
    ? new URL(request.url, 'https://girid.invalid').searchParams.get('url')
    : null
  if (!source) {
    response.status(400).send('Need Url')
    return
  }

  let imageUrl: URL
  try {
    imageUrl = new URL(source)
  }
  catch {
    response.status(400).send('Invalid Url')
    return
  }

  if (imageUrl.protocol !== 'https:' || imageUrl.hostname !== allowedImageHost) {
    response.status(403).send('Forbidden')
    return
  }

  const upstream = await fetch(imageUrl, {
    method: request.method,
    headers: {
      Accept: request.headers.accept || 'image/*',
    },
  })

  response.setHeader('Cache-Control', 'public, s-maxage=43200')
  const contentType = upstream.headers.get('Content-Type')
  if (contentType)
    response.setHeader('Content-Type', contentType)

  if (request.method === 'HEAD') {
    response.status(upstream.status).end()
    return
  }

  const body = Buffer.from(await upstream.arrayBuffer())
  response.status(upstream.status).send(body)
}

export default handler
