import {
  Gender, GenderPrompt,
  HairLength, HairLengthPrompt,
  HairColor, HairColorPrompt,
  EyeColor, EyeColorPrompt,
  Race, RacePrompt,
  HairStylePrompt,
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
  hairStyle?: number,
  eyeColor?: EyeColor
  race?: Race,
  hires?: boolean,
  traits: number[],
  seed: number
}

export class Card {
  static readonly WIDTH = 320
  static readonly HEIGHT = 576

  public gender: Gender
  public hairLength: HairLength
  public hairColor: HairColor
  public hairStyle: number
  public eyeColor: EyeColor
  public race: Race
  public traits: number[]
  public seed: number

  private _hires: boolean

  constructor(attributes?: CardAttribute) {
    this.gender = attributes?.gender || Gender.Female
    this.hairLength = attributes?.hairLength || HairLength.Long
    this.hairColor = attributes?.hairColor || HairColor.White
    this.hairStyle = attributes?.hairStyle || 0
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
      ...[HairStylePrompt[this.hairStyle]],
      ...EyeColorPrompt[this.eyeColor],
      ...RacePrompt[this.race],
      ...this.traits.map(idx => TraitPrompt[idx]).filter(trait => trait)
    ].filter(p => p.length > 0 ).join(', ')
  }

  toNegativePrompt(): string {
    return NEGATIVE_PROMPT.join(', ')
  }

  get isHires() {
    return this._hires
  }
}
