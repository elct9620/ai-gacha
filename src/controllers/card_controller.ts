import { Controller } from "@hotwired/stimulus"
import fetch from 'node-fetch'

import { EventDetail, PredictionPayload } from '../events'
import { RenderService } from '../services'

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

    this.renderer.draw(image)
  }

  download() {
    const tempElement = document.createElement('a')
    tempElement.href = this.element.toDataURL()
    tempElement.download = "card.png"
    tempElement.click()
    tempElement.remove()
  }
}
