import { Controller } from "@hotwired/stimulus"
import Replicate from 'replicate-js'

import { getState } from '../state'
import { PredictService } from '../services'
import { PredictState } from '../entities'

export default class extends Controller {
  static targets = ["subscriber", "drawButton", "downloadButton"]

  private predictor?: PredictService

  declare readonly hasSubscriberTarget: boolean
  declare readonly subscriberTargets: Element[]
  declare readonly drawButtonTarget: HTMLButtonElement
  declare readonly downloadButtonTarget: HTMLButtonElement

  setupClient() {
    const state = getState()
    if(!state.hasToken) {
      return
    }

    const replicate = new Replicate({ token: state.token })
    replicate.baseUrl = `${window.location.origin}/ai`

    this.predictor = new PredictService(replicate, import.meta.env.VITE_MODEL_VERSION)
    this.enableDraw()
  }

  async draw() {
    if(!this.predictor) {
      return
    }

   this.disableButton()
    this.subscriberTargets.forEach(target => {
      this.dispatch("start", { target })
    })

    const state = getState()
    state.useSeed(Math.floor(10**16 * Math.random()))

    let prediction: PredictState = new PredictState(false)
    for await (prediction of this.predictor.predict(state.currentCard)) {
      if(prediction.hasOutput) {
        this.subscriberTargets.forEach(target => {
          this.dispatch("processing", { target, detail: { url: prediction.outputURL } })
        })
      }
    }
    this.enableButton()

    if (!prediction.hasOutput) {
      this.subscriberTargets.forEach(target => {
        this.dispatch("failed", { target })
      })
      this.disableDownload()
      return
    }

    this.subscriberTargets.forEach(target => {
      this.dispatch("success", { target, detail: { url: prediction.outputURL }})
    })
  }

  download() {
    this.subscriberTargets.forEach(target => {
      this.dispatch("download", { target })
    })
  }

  enableDraw() {
    this.drawButtonTarget.disabled = false
  }

  enableDownload() {
    this.downloadButtonTarget.disabled = false
  }

  enableButton() {
    this.enableDraw()
    this.enableDownload()
  }

  disableDraw() {
    this.drawButtonTarget.disabled = true
  }

  disableDownload() {
    this.downloadButtonTarget.disabled = true
  }

  disableButton() {
    this.disableDraw()
    this.disableDownload()
  }
}
