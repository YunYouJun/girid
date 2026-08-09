interface EdgeFunctionContext {
  request: Request
}

const allowedImageHost = 'lain.bgm.tv'

function textResponse(message: string, status: number, headers?: HeadersInit) {
  return new Response(message, {
    status,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      ...headers,
    },
  })
}

export async function onRequest({ request }: EdgeFunctionContext) {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return textResponse('Method Not Allowed', 405, {
      Allow: 'GET, HEAD',
    })
  }

  const source = new URL(request.url).searchParams.get('url')
  if (!source)
    return textResponse('Need Url', 400)

  let imageUrl: URL
  try {
    imageUrl = new URL(source)
  }
  catch {
    return textResponse('Invalid Url', 400)
  }

  if (imageUrl.protocol !== 'https:' || imageUrl.hostname !== allowedImageHost)
    return textResponse('Forbidden', 403)

  const upstream = await fetch(imageUrl, {
    method: request.method,
    headers: {
      Accept: request.headers.get('Accept') || 'image/*',
    },
  })

  const headers = new Headers({
    'Cache-Control': 'public, s-maxage=43200',
  })
  const contentType = upstream.headers.get('Content-Type')
  if (contentType)
    headers.set('Content-Type', contentType)

  return new Response(request.method === 'HEAD' ? null : upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers,
  })
}
