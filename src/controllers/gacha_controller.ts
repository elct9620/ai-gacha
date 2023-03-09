import { Controller } from "@hotwired/stimulus"
import Replicate from 'replicate-js'

import Model from '../vendor/replicate'

export default class extends Controller {
  static targets = ["token", "result"]

  private model?: Model

  declare readonly hasTokenTarget: boolean
  declare readonly tokenTarget: HTMLInputElement
  declare readonly hasResultTarget: boolean
  declare readonly resultTarget: HTMLDivElement

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
      this.refreshResult('Processing...')
    }

    this.refreshResult(prediction || 'Failed!')
  }

  private refreshResult(content: string) {
    if(!this.hasResultTarget) {
      return
    }

    this.resultTarget.innerText = content
  }
}
