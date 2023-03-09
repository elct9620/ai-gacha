import { afterAll, beforeAll, describe, it } from 'vitest'
import { preview } from 'vite'
import type { PreviewServer } from 'vite'
import { chromium } from 'playwright'
import type { Browser, Page } from 'playwright'
import { expect } from '@playwright/test'

describe('GachaController', async () => {
  let server: PreviewServer
  let browser: Browser
  let page: Page

  beforeAll(async () => {
    server = await preview({ preview: { port: 3000 } })
    browser = await chromium.launch()
    page = await browser.newPage()
  })

  afterAll(async () => {
    await browser.close()
    await new Promise<void>((resolve, reject) => {
      server.httpServer.close(error => error ? reject(error) : resolve())
    })
  })

  it('is expected to display processing when click Gacha button', async () => {
    await page.route('http://localhost:3000/ai/predictions', async (route) => {
      await route.fulfill({ json: { id: 'ufawqhfynnddngldkgtslldrkq' }})
    })

    await page.route('http://localhost:3000/ai/predictions/ufawqhfynnddngldkgtslldrkq', async (route) => {
      await route.fulfill({ json: { status: 'succeeded', output: ['https://replicate.delivery/pbxt/5cvqlrCdze3YPKB8uJVwb4fTX1DhHE43hsQnft5MUBNrsSHhA/out-0.png'] }})
    })

    await page.goto('http://localhost:3000')
    const token = page.getByTestId("token")
    await token.fill("TEST")

    const button = page.getByRole('button', { name: /製作/ })
    await expect(button).toBeVisible()
    await button.click()

    const status = page.getByTestId('status')
    await expect(status).toHaveText('完成')
  }, 60_000)
})
