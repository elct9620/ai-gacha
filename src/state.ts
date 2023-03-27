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
  hairStyle?: number,
  eyeColor?: EyeColor
  hires?: boolean,
  traits: number[],
  seed: number
}

let store: Schema = { seed: 0, traits: [] }

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
      hairStyle: store.hairStyle,
      eyeColor: store.eyeColor,
      hires: store.hires,
      traits: store.traits,
      seed: store.seed,
    })
  }

  updateToken(token: string) {
    store.token = token
  }

  useSeed(seed: number) {
    store.seed = seed
  }

  useTraits(traits: number[]) {
    store.traits = traits
  }

  useHairStyle(styles: number[]) {
    store.hairStyle = styles[0] || 0
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
  store = { seed: 0, traits: [] }
}

export function getState() {
  return new State()
}
