import { Controller } from "@hotwired/stimulus"

import { getState } from '../state'
import { OptionService } from '../services'
import { AttributeNames, AttributeOptions, AttributeSetters } from '../config/attributes'

export default class extends Controller {
  static targets = ["token", "attribute"]

  declare readonly hasTokenTarget: boolean
  declare readonly tokenTarget: HTMLInputElement

  setToken() {
    const state = getState()
    state.updateToken(this.tokenTarget.value)

    if(state.hasToken) {
      this.dispatch('tokenChanged')
    }
  }

  attributeTargetConnected(target: HTMLDivElement) {
    const attrType = target.dataset.configType as AttributeNames
    if(!attrType) {
      return
    }


    const options = AttributeOptions[attrType]
    if(!options) {
      return
    }

    const option = new OptionService(target, attrType, options)
    option.reset()
    option.build(getState().currentCard)
  }

  setAttribute(evt: InputEvent) {
    const target = (evt.target as HTMLInputElement)
    const setter = AttributeSetters[target.name as AttributeNames]
    if(!setter) {
      return
    }

    setter(getState(), Number(target.value))
  }
}
