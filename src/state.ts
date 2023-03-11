import {
  Card,
  Race,
  HairLength,
  HairColor,
} from './entities'

type Schema = {
  token?: string
  race?: Race,
  hairLength?: HairLength,
  hairColor?: HairColor,
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
}

export function resetState() {
  store = {}
}

export function getState() {
  return new State()
}
