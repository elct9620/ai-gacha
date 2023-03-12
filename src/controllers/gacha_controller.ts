import { Controller } from "@hotwired/stimulus"
import Replicate from 'replicate-js'

import { getState } from '../state'
import { PredictService, TraitService } from '../services'
import { PredictState } from '../entities'

export default class extends Controller {
  static targets = ["subscriber", "drawButton", "downloadButton", "shareButton"]

  private predictor?: PredictService

  declare readonly hasSubscriberTarget: boolean
  declare readonly subscriberTargets: Element[]
  declare readonly drawButtonTarget: HTMLButtonElement
  declare readonly downloadButtonTarget: HTMLButtonElement
  declare readonly shareButtonTarget: HTMLButtonElement

  connect() {
    if(!navigator.canShare) {
      this.shareButtonTarget.classList.add('hidden')
    }
  }

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

    this.scrollToTop()
    this.disableButton()
    this.subscriberTargets.forEach(target => {
      this.dispatch("start", { target })
    })

    const trait = new TraitService()
    const state = getState()
    state.useSeed(Math.floor(10**16 * Math.random()))
    state.useTraits(trait.shuffle())

    let prediction: PredictState = new PredictState(false)
    try {
      for await (prediction of this.predictor.predict(state.currentCard)) {
        if(prediction.hasOutput) {
          this.subscriberTargets.forEach(target => {
            this.dispatch("processing", { target, detail: { url: prediction.outputURL } })
          })
        }
      }
    } catch(e) {
      this.subscriberTargets.forEach(target => {
        this.dispatch("failed", { target })
      })
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

  share() {
    this.subscriberTargets.forEach(target => {
      this.dispatch("share", { target })
    })
  }

  scrollToTop() {
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100)
  }

  enableDraw() {
    this.drawButtonTarget.disabled = false
  }

  enableDownload() {
    this.downloadButtonTarget.disabled = false
  }

  enableShare() {
    this.shareButtonTarget.disabled = false
  }

  enableButton() {
    this.enableDraw()
    this.enableDownload()
    this.enableShare()
  }

  disableDraw() {
    this.drawButtonTarget.disabled = true
  }

  disableDownload() {
    this.downloadButtonTarget.disabled = true
  }

  disableShare() {
    this.shareButtonTarget.disabled = true
  }

  disableButton() {
    this.disableDraw()
    this.disableDownload()
    this.disableShare()
  }
}
