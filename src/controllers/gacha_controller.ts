import { Controller } from "@hotwired/stimulus"
import fetch from 'node-fetch'
import Replicate from 'replicate-js'

import PredictService from '../domains/predict_service'
import RenderService from '../domains/render_service'

export default class extends Controller {
  static targets = ["token", "status", "card"]

  private predictor?: PredictService
  private renderer?: RenderService

  declare readonly hasTokenTarget: boolean
  declare readonly tokenTarget: HTMLInputElement
  declare readonly hasStatusTarget: boolean
  declare readonly statusTarget: HTMLDivElement
  declare readonly hasCardTarget: boolean
  declare readonly cardTarget: HTMLCanvasElement

  connect() {
    if(this.hasCardTarget) {
      const ctx = this.cardTarget.getContext('2d')
      if(ctx) {
        this.renderer = new RenderService(ctx, this.cardTarget.width, this.cardTarget.height)
      }
    }
  }

  configure() {
    if(!this.hasTokenTarget) {
      return
    }

    if(this.tokenTarget.value.length == 0) {
      this.predictor = undefined
      return
    }

    const replicate = new Replicate({ token: this.tokenTarget.value })
    replicate.baseUrl = `${window.location.origin}/ai`

    this.predictor = new PredictService(replicate, import.meta.env.VITE_MODEL_VERSION)
  }

  async draw() {
    if(!this.predictor) {
      return
    }

    this.renderer?.clear()

    let prediction
    for await (prediction of this.predictor.predict()) {
      this.setStatus('生成中⋯⋯')
    }

    const renderable = this.hasCardTarget && prediction
    if (!renderable) {
      this.setStatus('失敗')
      return
    }

    const imageBlob =  await fetch(prediction).then(res => res.blob())
    const image = await createImageBitmap(imageBlob)

    this.renderer?.draw(image)
    this.setStatus('完成')
    this.hideStatus()
  }

  private setStatus(content: string) {
    if(!this.hasStatusTarget) {
      return
    }

    this.statusTarget.classList.remove('hidden')
    this.statusTarget.classList.add('animate-pulse')
    this.statusTarget.innerText = content
  }

  private hideStatus() {
    if(!this.hasStatusTarget) {
      return
    }

    this.statusTarget.classList.add('hidden')
  }
}
