import { fileURLToPath } from 'node:url'
import { describe, expect, it, vi } from 'vitest'
import { getBrowser, setup, url } from '@nuxt/test-utils/e2e'
import { isWindows } from 'std-env'
import { suggestedTableFilename } from '../../packages/site/config'

await setup({
  // test context options
  rootDir: fileURLToPath(new URL('../../packages/site', import.meta.url)),
  browser: true,
  setupTimeout: (isWindows ? 360 : 120) * 1000,
})

describe('e2e', async () => {
  // const page = await createPage('/')
  const browser = await getBrowser()
  const page = await browser.newPage()

  it('/', async () => {
    await page.goto(url('/'), { waitUntil: 'networkidle' })

    const bodyHTML = await page.innerHTML('body')

    expect(bodyHTML).toContain('Girid')
    expect(await page.locator('.girid-btn').all()).toHaveLength(3)
  })

  it('download image', async () => {
    await page.goto(url('/'), { waitUntil: 'networkidle' })

    let suggestedFilename = ''
    page.on('download', (download) => {
      suggestedFilename = download.suggestedFilename()
    })

    await page.getByLabel('Download Image').click()
    await vi.waitFor(() => {
      if (!suggestedFilename)
        throw new Error('Download not triggered')
      expect(suggestedFilename).toBe(suggestedTableFilename)
    })
  })
})
