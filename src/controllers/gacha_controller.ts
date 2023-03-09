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

    let prediction
    for await (prediction of this.model.generate()) {
      this.setStatus('Processing...')
    }

    const renderable = this.hasCardTarget && prediction
    if (!renderable) {
      this.setStatus('Failed')
      return
    }

    const imageBlob =  await fetch(prediction).then(res => res.blob())
    const image = await createImageBitmap(imageBlob)
    const ctx = this.cardTarget.getContext('2d')

    ctx?.drawImage(image, 0, 0)
    this.setStatus('Completed')
  }

  private setStatus(content: string) {
    if(!this.hasStatusTarget) {
      return
    }

    this.statusTarget.innerText = content
  }
}
