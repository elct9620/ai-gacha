import { Controller } from "@hotwired/stimulus"

import { Card } from '../entities'
import { getState } from '../state'
import { AttributeNames, AttributeOptions, AttributeSetters } from '../config/attributes'

const createInput = (type: string, id: string, card: Pick<Card, AttributeNames>) => {
  const input = document.createElement('input') as HTMLInputElement
  const currentValue = card[type as AttributeNames]

  input.id = `${type}-${id}`
  input.type = 'radio'
  input.dataset.action = 'config#setAttribute'
  input.className = 'hidden peer'
  input.name = `${type}`
  input.value = id
  input.checked = currentValue == Number(id)
  return input
}

const createLabel = (type: string, id: string, name: string) => {
  const label = document.createElement('label') as HTMLLabelElement

  label.className = 'input selectable m-2'
  label.htmlFor = `${type}-${id}`
  label.innerText = name
  return label
}

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

    while(target.lastChild) { target.removeChild(target.lastChild) }

    const currentCard = getState().currentCard
    const fragment = document.createDocumentFragment()
    for(let id in options) {
      const name = options[id]
      const option = document.createElement('span') as HTMLSpanElement
      const input = createInput(attrType, id, currentCard)
      const label = createLabel(attrType, id, name)

      option.appendChild(input)
      option.appendChild(label)

      fragment.appendChild(option)
    }

    target.appendChild(fragment)
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
