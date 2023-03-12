import {
  Gender, GenderPrompt,
  HairLength, HairLengthPrompt,
  HairColor, HairColorPrompt,
  EyeColor, EyeColorPrompt,
  Race, RacePrompt,
  TraitPrompt,
} from './prompt'

const BASE_PROMPT = [
  'mksks style',  'masterpiece',  'best quality',  'ultra-detailed',  'illustration', 'portrait', 'looking at viewer',
]

const NEGATIVE_PROMPT = [
  'lowres', '((bad anatomy))', '((bad hands))', 'text', 'missing finger', 'extra digits', 'fewer digits',
  'blurry', '((mutated hands and fingers))', '(poorly drawn face)', '((mutation))', '((deformed face))',
  '(ugly)', '((bad proportions))', '((extra limbs))', 'extra face', '(double head)', '(extra head)', '((extra feet))',
  'monster', 'logo', 'cropped', 'worst quality', 'low quality', 'normal quality', 'jpeg', 'humpbacked', 'long body',
  'long neck', '((jpeg artifacts))'
]

export type CardAttribute = {
  gender?: Gender
  hairLength?: HairLength
  hairColor?: HairColor
  eyeColor?: EyeColor
  race?: Race,
  hires?: boolean,
  traits: number[],
  seed: number
}

export class Card {
  static readonly WIDTH = 448
  static readonly HEIGHT = 640

  public gender: Gender
  public hairLength: HairLength
  public hairColor: HairColor
  public eyeColor: EyeColor
  public race: Race
  public traits: number[]
  public seed: number

  private _hires: boolean

  constructor(attributes?: CardAttribute) {
    this.gender = attributes?.gender || Gender.Female
    this.hairLength = attributes?.hairLength || HairLength.Long
    this.hairColor = attributes?.hairColor || HairColor.White
    this.eyeColor = attributes?.eyeColor || EyeColor.Golden
    this.race = attributes?.race || Race.Angel
    this.traits = attributes?.traits || []
    this.seed = attributes?.seed || 0
    this._hires = attributes?.hires || false
  }

  toPrompt(): string {
    return [
      ...BASE_PROMPT,
      ...GenderPrompt[this.gender],
      ...HairLengthPrompt[this.hairLength],
      ...HairColorPrompt[this.hairColor],
      ...EyeColorPrompt[this.eyeColor],
      ...RacePrompt[this.race],
      ...this.traits.map(idx => TraitPrompt[idx]).filter(trait => trait)
    ].join(', ')
  }

  toNegativePrompt(): string {
    return NEGATIVE_PROMPT.join(', ')
  }

  get isHires() {
    return this._hires
  }
}
