const allowedImageHost = 'lain.bgm.tv'
const cacheMaxAge = 12 * 60 * 60

function textResponse(message: string, status: number, headers?: HeadersInit) {
  return new Response(message, {
    status,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      ...headers,
    },
  })
}

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  if (method !== 'GET' && method !== 'HEAD') {
    return sendWebResponse(event, textResponse('Method Not Allowed', 405, {
      Allow: 'GET, HEAD',
    }))
  }

  const source = getQuery(event).url
  if (typeof source !== 'string' || !source)
    return sendWebResponse(event, textResponse('Need Url', 400))

  let imageUrl: URL
  try {
    imageUrl = new URL(source)
  }
  catch {
    return sendWebResponse(event, textResponse('Invalid Url', 400))
  }

  const usesAllowedOrigin = imageUrl.protocol === 'https:'
    && imageUrl.hostname === allowedImageHost
    && (!imageUrl.port || imageUrl.port === '443')
    && !imageUrl.username
    && !imageUrl.password

  if (!usesAllowedOrigin)
    return sendWebResponse(event, textResponse('Forbidden', 403))

  let upstream: Response
  try {
    upstream = await fetch(imageUrl, {
      method,
      redirect: 'error',
      headers: {
        Accept: getRequestHeader(event, 'accept') || 'image/*',
      },
    })
  }
  catch {
    return sendWebResponse(event, textResponse('Bad Gateway', 502))
  }

  const headers = new Headers({
    'Cache-Control': `public, max-age=${cacheMaxAge}, s-maxage=${cacheMaxAge}, stale-while-revalidate=86400`,
  })
  const contentType = upstream.headers.get('Content-Type')
  if (contentType)
    headers.set('Content-Type', contentType)

  return sendWebResponse(event, new Response(method === 'HEAD' ? null : upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers,
  }))
})
