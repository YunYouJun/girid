import type { VercelRequest, VercelResponse } from '@vercel/node'
import type { Method } from 'axios'
import axios from 'axios'

async function handler(request: VercelRequest, response: VercelResponse) {
  if (!request.url)
    return

  if (!request.url.startsWith('/api/bgm/images/'))
    return

  let url = request.url.split('/api/bgm/images/').join('')
  url = `https://lain.bgm.tv/${url}`

  const config = {
    method: request.method as Method,
    url,
  }

  if (request.body)
    (config as any).data = request.body

  const res = await axios(config)
  response.status(res.status).send(res.data)
}

export default handler
