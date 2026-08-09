import { fileURLToPath } from 'node:url'
import { getBrowser, setup, url } from '@nuxt/test-utils/e2e'
import { isWindows } from 'std-env'
import { describe, expect, it, vi } from 'vitest'
import { suggestedTableFilename } from '../../apps/web/app/config'

await setup({
  // test context options
  rootDir: fileURLToPath(new URL('../../apps/web', import.meta.url)),
  browser: true,
  setupTimeout: (isWindows ? 360 : 120) * 1000,
  teardownTimeout: (isWindows ? 360 : 120) * 1000,
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

  it('serves the Bangumi image proxy through Nuxt with strict origin checks', async () => {
    const missingUrl = await page.request.get(url('/api/bgm/cors'))
    expect(missingUrl.status()).toBe(400)
    expect(await missingUrl.text()).toBe('Need Url')

    const forbiddenUrl = await page.request.get(url('/api/bgm/cors?url=https%3A%2F%2Fexample.com%2Favatar.png'))
    expect(forbiddenUrl.status()).toBe(403)

    const forbiddenPort = await page.request.get(url('/api/bgm/cors?url=https%3A%2F%2Flain.bgm.tv%3A444%2Favatar.png'))
    expect(forbiddenPort.status()).toBe(403)

    const unsupportedMethod = await page.request.post(url('/api/bgm/cors'))
    expect(unsupportedMethod.status()).toBe(405)
    expect(unsupportedMethod.headers().allow).toBe('GET, HEAD')
  })

  it('migrates image drafts from localStorage to IndexedDB', async () => {
    await page.goto(url('/'), { waitUntil: 'networkidle' })
    await page.evaluate(async () => {
      await new Promise<void>((resolve, reject) => {
        const request = indexedDB.open('girid', 1)
        request.onupgradeneeded = () => request.result.createObjectStore('drafts')
        request.onerror = () => reject(request.error)
        request.onsuccess = () => {
          const transaction = request.result.transaction('drafts', 'readwrite')
          transaction.objectStore('drafts').delete('girid-user-items')
          transaction.oncomplete = () => {
            request.result.close()
            resolve()
          }
          transaction.onerror = () => reject(transaction.error)
        }
      })

      localStorage.setItem('girid-user-items', JSON.stringify([{
        title: '迁移草稿',
        title_en: 'Migrated draft',
        avatar: 'data:image/png;base64,aW1hZ2U=',
      }]))
    })

    await page.reload({ waitUntil: 'networkidle' })
    await page.waitForFunction(() => localStorage.getItem('girid-user-items') === null)

    const migratedTitle = await page.evaluate(async () => {
      return await new Promise<string | undefined>((resolve, reject) => {
        const request = indexedDB.open('girid', 1)
        request.onerror = () => reject(request.error)
        request.onsuccess = () => {
          const transaction = request.result.transaction('drafts', 'readonly')
          const getRequest = transaction.objectStore('drafts').get('girid-user-items')
          getRequest.onsuccess = () => {
            request.result.close()
            resolve(getRequest.result?.[0]?.title)
          }
          getRequest.onerror = () => reject(getRequest.error)
        }
      })
    })

    expect(migratedTitle).toBe('迁移草稿')
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

  it('opens the character picker as an accessible mobile sheet', async () => {
    for (const colorScheme of ['light', 'dark'] as const) {
      await page.setViewportSize({ width: 375, height: 812 })
      await page.emulateMedia({ colorScheme })
      await page.goto(url('/'), { waitUntil: 'networkidle' })
      await page.evaluate(scheme => document.documentElement.classList.toggle('dark', scheme === 'dark'), colorScheme)
      await page.locator('.character-gird img').first().click()

      const dialog = page.getByRole('dialog')
      await dialog.waitFor({ state: 'visible' })
      await dialog.evaluate(async el => Promise.all(el.getAnimations().map(animation => animation.finished)))

      const dialogBox = await dialog.boundingBox()
      const searchBox = await dialog.getByRole('searchbox').boundingBox()
      const closeButton = dialog.getByRole('button').first()
      const closeBox = await closeButton.boundingBox()
      const sheetStyle = await dialog.evaluate((el) => {
        const style = getComputedStyle(el)
        return { position: style.position, bottom: style.bottom }
      })
      const scrollBackground = await dialog.locator('.scroll-content').evaluate(el => getComputedStyle(el).backgroundColor)

      expect(dialogBox).not.toBeNull()
      expect(searchBox).not.toBeNull()
      expect(closeBox).not.toBeNull()

      expect(dialogBox?.width).toBe(375)
      expect(sheetStyle).toEqual({ position: 'fixed', bottom: '0px' })
      expect(searchBox?.height).toBe(44)
      expect(closeBox?.width).toBe(44)
      expect(closeBox?.height).toBe(44)
      expect(scrollBackground).toBe(colorScheme === 'dark' ? 'rgb(60, 60, 60)' : 'rgb(233, 233, 233)')
      expect(await closeButton.evaluate(el => el === document.activeElement)).toBe(true)
      expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBe(0)

      await page.keyboard.press('Escape')
      await dialog.waitFor({ state: 'hidden' })
    }
  })

  it('keeps the character picker centered on desktop', async () => {
    for (const colorScheme of ['light', 'dark'] as const) {
      await page.setViewportSize({ width: 1280, height: 800 })
      await page.emulateMedia({ colorScheme })
      await page.goto(url('/'), { waitUntil: 'networkidle' })
      await page.evaluate(scheme => document.documentElement.classList.toggle('dark', scheme === 'dark'), colorScheme)
      await page.locator('.character-gird img').first().click()

      const dialog = page.getByRole('dialog')
      await dialog.waitFor({ state: 'visible' })
      await dialog.evaluate(async el => Promise.all(el.getAnimations().map(animation => animation.finished)))

      const dialogBox = await dialog.boundingBox()
      const scrollBackground = await dialog.locator('.scroll-content').evaluate(el => getComputedStyle(el).backgroundColor)
      expect(dialogBox).not.toBeNull()
      expect(dialogBox?.width).toBe(640)
      expect(dialogBox?.height).toBe(640)
      expect(dialogBox?.x).toBe(320)
      expect(dialogBox?.y).toBe(80)
      expect(scrollBackground).toBe(colorScheme === 'dark' ? 'rgb(60, 60, 60)' : 'rgb(233, 233, 233)')
      expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBe(0)

      await page.keyboard.press('Escape')
      await dialog.waitFor({ state: 'hidden' })
    }
  })

  it('keeps settings actions touch friendly on mobile', async () => {
    await page.setViewportSize({ width: 320, height: 568 })
    await page.goto(url('/settings'), { waitUntil: 'networkidle' })

    const actions = await page.locator('.settings-action').all()
    expect(actions).toHaveLength(3)

    for (const action of actions) {
      const box = await action.boundingBox()
      expect(box?.width).toBe(44)
      expect(box?.height).toBe(44)
      expect(await action.getAttribute('aria-label')).toBeTruthy()
    }

    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBe(0)
  })
})
