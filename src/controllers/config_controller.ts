import { Controller } from "@hotwired/stimulus"

import {
  Race,
  HairLength,
  HairColor,
  EyeColor,
} from '../entities'
import { getState, State } from '../state'

type AttributeNames = "race" | "hairLength" | "hairColor" | "eyeColor" | "hires"
type AttributeItem = Record<number, string>
const AttributeOptions: Record<AttributeNames, AttributeItem> = {
  "race": {
    [Race.Angel]: '天使',
    [Race.Demon]: '惡魔',
    [Race.Vampire]: '吸血鬼',
    [Race.Dragon]: '龍',
    [Race.Elf]: '精靈',
    [Race.Human]: '人類 '
  },
  "hairLength": {
    [HairLength.Short]: '短髮',
    [HairLength.Medium]: '及肩',
    [HairLength.Long]: '長髮'
  },
  "hairColor": {
    [HairColor.White]: '白',
    [HairColor.Blue]: '藍',
    [HairColor.Cyan]: '青',
    [HairColor.Green]: '綠',
    [HairColor.Red]: '紅',
    [HairColor.Purple]: '紫',
    [HairColor.Golden]: '金',
    [HairColor.Brown]: '棕'
  },
  "eyeColor": {
    [EyeColor.Golden]:  '金',
    [EyeColor.Blue]: '藍',
    [EyeColor.Green]: '綠',
    [EyeColor.Red]: '紅'
  },
  "hires": {
    0: '否',
    1: '是',
  },
}

type Setter = (state: State, value: number) => void
const AttributeSetters: Record<AttributeNames, Setter> = {
  "race": (state: State, value: number) => { state.setRace(value as Race) },
  "hairLength": (state: State, value: number) => { state.setHairLength(value as HairLength) },
  "hairColor": (state: State, value: number) => { state.setHairColor(value as HairColor) },
  "eyeColor": (state: State, value: number) => { state.setEyeColor(value as EyeColor) },
  "hires": (state: State, value: number) => { state.setHires(value == 1) },
}

const createInput = (type: string, id: string) => {
  const input = document.createElement('input') as HTMLInputElement

  input.id = `${type}-${id}`
  input.type = 'radio'
  input.dataset.action = 'config#setAttribute'
  input.className = 'hidden peer'
  input.name = `${type}`
  input.value = id
  return input
}

const createLabel = (type: string, id: string, name: string) => {
  const label = document.createElement('label') as HTMLLabelElement

  label.className = 'input selectable'
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
    const fragment = document.createDocumentFragment()

    for(let id in options) {
      const name = options[id]
      const option = document.createElement('span') as HTMLSpanElement
      const input = createInput(attrType, id)
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
