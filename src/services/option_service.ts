import { Card } from '../entities'

type AttributeList = Record<number, string>

export class OptionService {
  public readonly parent: HTMLDivElement
  public readonly name: string
  public readonly attributes: AttributeList

  constructor(parent: HTMLDivElement, name: string, attributes: AttributeList) {
    this.parent = parent
    this.name = name
    this.attributes = attributes
  }

  reset() {
    while(this.parent.lastChild) {
      this.parent.removeChild(this.parent.lastChild)
    }
  }

  build(card: Card) {
    const fragment = document.createDocumentFragment()

    for(let id in this.attributes) {
      const text = this.attributes[id]
      const group = document.createElement('span') as HTMLSpanElement
      const radio = this.buildRadio(id, card)
      const label = this.buildLabel(id, text)

      group.appendChild(radio)
      group.appendChild(label)

      fragment.appendChild(group)
    }

    this.parent.appendChild(fragment)
  }

  private buildRadio(id: string, card: Record<string, any>): HTMLInputElement {
    const input = document.createElement('input') as HTMLInputElement
    const currentValue = card[this.name]

    input.id = `${this.name}-${id}`
    input.type = 'radio'
    input.dataset.action = 'config#setAttribute'
    input.className = 'hidden peer'
    input.name = `${this.name}`
    input.value = id
    input.checked = currentValue == Number(id)
    return input
  }

  private buildLabel(id: string, text: string): HTMLLabelElement {
    const label = document.createElement('label') as HTMLLabelElement

    label.className = 'input selectable m-2'
    label.htmlFor = `${this.name}-${id}`
    label.innerText = text
    return label
  }
}
