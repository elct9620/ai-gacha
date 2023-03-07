import { Controller } from "@hotwired/stimulus"
import Replicate from 'replicate-js'

export default class extends Controller {
  static targets = [
    "token"
  ]

  private replicate?: Replicate

  declare readonly hasTokenTarget: boolean
  declare readonly tokenTarget: HTMLInputElement

  configure() {
    if(!this.hasTokenTarget) {
      return
    }

    if(this.tokenTarget.value.length == 0) {
      this.replicate = undefined
      return
    }

    this.replicate = new Replicate({ token: this.tokenTarget.value })
    this.replicate.baseUrl = `${window.location.origin}/ai`
  }

  async draw() {
    if(!this.replicate) {
      return
    }

    await this.replicate.getModel('elct9620/pastel-mix')
  }
}
