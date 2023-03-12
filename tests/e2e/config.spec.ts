import { afterAll, beforeAll, describe, it } from 'vitest'
import { preview } from 'vite'
import type { PreviewServer } from 'vite'
import { chromium } from 'playwright'
import type { Browser, Page } from 'playwright'
import { expect } from '@playwright/test'

import { Race } from '../../src/entities/prompt'

describe('Config', async () => {
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

  it('is expected to have race option', async () => {
    await page.goto('http://localhost:3000')

    const demon = page.locator("label", { hasText: /惡魔/ })
    await demon.click()

    expect(await page.getByLabel(/天使/).isChecked()).toBeFalsy()
    expect(await page.getByLabel(/惡魔/).isChecked()).toBeTruthy()
  }, 60_000)

  it('is expected to have hair length option', async () => {
    await page.goto('http://localhost:3000')

    const hair = page.locator("label", { hasText: /長髮/ })
    await hair.click()

    expect(await page.getByLabel(/短髮/).isChecked()).toBeFalsy()
    expect(await page.getByLabel(/長髮/).isChecked()).toBeTruthy()
  }, 60_000)

  it('is expected to have hair color option', async () => {
    await page.goto('http://localhost:3000')

    const options = page.locator('[data-config-type=hairColor]')

    const hair = options.locator("label", { hasText: /金/ })
    await hair.click()

    expect(await options.getByLabel(/白/).isChecked()).toBeFalsy()
    expect(await options.getByLabel(/金/).isChecked()).toBeTruthy()
  }, 60_000)

  it('is expected to have eye color option', async () => {
    await page.goto('http://localhost:3000')

    const options = page.locator('[data-config-type=eyeColor]')

    const hair = options.locator("label", { hasText: /紅/ })
    await hair.click()

    expect(await options.getByLabel(/金/).isChecked()).toBeFalsy()
    expect(await options.getByLabel(/紅/).isChecked()).toBeTruthy()
  }, 60_000)

  it('is expected to have hires option', async () => {
    await page.goto('http://localhost:3000')

    const options = page.locator('[data-config-type=isHires]')

    const hair = options.locator("label", { hasText: /是/ })
    await hair.click()

    expect(await options.getByLabel(/否/).isChecked()).toBeFalsy()
    expect(await options.getByLabel(/是/).isChecked()).toBeTruthy()
  }, 60_000)
})
