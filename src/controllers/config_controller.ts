import { Controller } from "@hotwired/stimulus"

import { getState } from '../state'

export default class extends Controller {
  static targets = ["token"]

  declare readonly hasTokenTarget: boolean
  declare readonly tokenTarget: HTMLInputElement

  setToken() {
    const state = getState()
    state.updateToken(this.tokenTarget.value)

    if(state.hasToken) {
      this.dispatch('tokenChanged')
    }
  }
}
