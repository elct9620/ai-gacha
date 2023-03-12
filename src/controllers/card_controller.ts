import { Controller } from "@hotwired/stimulus"
import fetch from 'node-fetch'

import { EventDetail, PredictionPayload } from '../events'
import { RenderService } from '../services'
import { getState } from '../state'

import cardFrameURL from '../assets/frame.png'

export default class extends Controller<HTMLCanvasElement> {
  private renderer?: RenderService

  connect() {
    const ctx = this.element.getContext('2d')

    if(ctx) {
      this.renderer = new RenderService(ctx, this.element.width, this.element.height)
    }
  }

  clear() {
    this.renderer?.clear()
  }

  async draw({ detail: { url } } : EventDetail<PredictionPayload>) {
    if(!this.renderer) {
      return
    }

    const image =  await fetch(url)
      .then(res => res.blob())
      .then(blob => createImageBitmap(blob))

    const frame = await fetch(cardFrameURL)
      .then(res => res.blob())
      .then(blob => createImageBitmap(blob))

    this.renderer.draw(image)
    this.renderer.draw(frame)
  }

  download() {
    const state = getState()
    const tempElement = document.createElement('a')
    tempElement.href = this.element.toDataURL()
    tempElement.download = `${state.currentCard.seed}.png`
    tempElement.click()
    tempElement.remove()
  }

  async share() {
    const state = getState()
    const image = await fetch(this.element.toDataURL()).then(res => res.blob())
    await navigator.share({
      title: 'AI Gacha',
      url: 'https://ai-gacha.aotoki.dev',
      files: [
        new File(
          [image],
          `${state.currentCard.seed}.png`,
          { type: "image/png" }
        )
      ]
    })
  }
}
