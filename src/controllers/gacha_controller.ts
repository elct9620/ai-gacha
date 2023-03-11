import { Controller } from "@hotwired/stimulus"
import Replicate from 'replicate-js'

import PredictService from '../domains/predict_service'

type TokenChangedPayload = {
  token: string
}

export default class extends Controller {
  static targets = ["status", "subscriber"]

  private predictor?: PredictService

  declare readonly hasStatusTarget: boolean
  declare readonly statusTarget: HTMLDivElement
  declare readonly hasSubscriberTarget: boolean
  declare readonly subscriberTargets: Element[]

  setupClient({ detail: { token } }: { detail: TokenChangedPayload }) {
    const replicate = new Replicate({ token })
    replicate.baseUrl = `${window.location.origin}/ai`

    this.predictor = new PredictService(replicate, import.meta.env.VITE_MODEL_VERSION)
  }

  async draw() {
    if(!this.predictor) {
      return
    }

    this.subscriberTargets.forEach(target => {
      this.dispatch("start", { target })
    })

    let prediction: string | null = null
    for await (prediction of this.predictor.predict()) {
      this.setStatus('生成中⋯⋯')
    }

    if (!prediction) {
      this.setStatus('失敗')
      return
    }

    this.subscriberTargets.forEach(target => {
      this.dispatch("success", { target, detail: { url: prediction }})
    })

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
