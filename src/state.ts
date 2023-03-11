import {
  Card,
  Race,
  HairLength,
  HairColor,
  EyeColor,
} from './entities'

type Schema = {
  token?: string
  race?: Race,
  hairLength?: HairLength,
  hairColor?: HairColor,
  eyeColor?: EyeColor
  hires?: boolean
}

let store: Schema = {}

export class State {
  get hasToken(): boolean {
    return store.token != undefined && store.token!.length > 0
  }

  get token() {
    return store.token
  }

  get currentCard(): Card {
    return new Card({
      race: store.race,
      hairLength: store.hairLength,
      hairColor: store.hairColor,
      eyeColor: store.eyeColor,
      hires: store.hires,
    })
  }

  updateToken(token: string) {
    store.token = token
  }

  setRace(race: Race) {
    store.race = race
  }

  setHairLength(hairLength: HairLength) {
    store.hairLength = hairLength
  }

  setHairColor(hairColor: HairColor) {
    store.hairColor = hairColor
  }

  setEyeColor(eyeColor: EyeColor) {
    store.eyeColor = eyeColor
  }

  setHires(hires: boolean) {
    store.hires = hires
  }
}

export function resetState() {
  store = {}
}

export function getState() {
  return new State()
}
