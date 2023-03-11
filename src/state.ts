import {
  Card,
  Race,
} from './entities'

type Schema = {
  token?: string
  race?: Race
}

let store: Schema = {}

class State {
  get hasToken(): boolean {
    return store.token != undefined && store.token!.length > 0
  }

  get token() {
    return store.token
  }

  get currentCard(): Card {
    return new Card({
      race: store.race
    })
  }

  updateToken(token: string) {
    store.token = token
  }

  setRace(race: Race) {
    store.race = race
  }
}

export function resetState() {
  store = {}
}

export function getState() {
  return new State()
}
