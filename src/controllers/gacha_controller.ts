import { Controller } from "@hotwired/stimulus"
import fetch from 'node-fetch'
import Replicate from 'replicate-js'

import Model from '../vendor/replicate'

export default class extends Controller {
  static targets = ["token", "status", "card"]

  private model?: Model

  declare readonly hasTokenTarget: boolean
  declare readonly tokenTarget: HTMLInputElement
  declare readonly hasStatusTarget: boolean
  declare readonly statusTarget: HTMLDivElement
  declare readonly hasCardTarget: boolean
  declare readonly cardTarget: HTMLCanvasElement

  configure() {
    if(!this.hasTokenTarget) {
      return
    }

    if(this.tokenTarget.value.length == 0) {
      this.model = undefined
      return
    }

    const replicate = new Replicate({ token: this.tokenTarget.value })
    replicate.baseUrl = `${window.location.origin}/ai`

    this.model = new Model(replicate, import.meta.env.VITE_MODEL_VERSION)
  }

  async draw() {
    if(!this.model) {
      return
    }

    const ctx = this.cardTarget.getContext('2d')
    ctx?.clearRect(0, 0, this.cardTarget.width, this.cardTarget.height)

    let prediction
    for await (prediction of this.model.generate()) {
      this.setStatus('生成中⋯⋯')
    }

    const renderable = this.hasCardTarget && prediction
    if (!renderable) {
      this.setStatus('失敗')
      return
    }

    const imageBlob =  await fetch(prediction).then(res => res.blob())
    const image = await createImageBitmap(imageBlob)

    ctx?.drawImage(image, 0, 0)
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
