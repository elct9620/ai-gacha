import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["token"]

  declare readonly hasTokenTarget: boolean
  declare readonly tokenTarget: HTMLInputElement

  private token: string = '';

  setToken() {
    this.token = this.tokenTarget.value

    if(this.token.length > 0) {
      this.dispatch('tokenChanged', { detail: { token: this.token } })
    }
  }
}
