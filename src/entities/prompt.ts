export enum Gender {
  Male,
  Female
}

export const GenderPrompt = {
  [Gender.Male]: ['1boy'],
  [Gender.Female]: ['1girl']
}

export enum HairLength {
  Short,
  Medium,
  Long
}

export const HairLengthPrompt = {
  [HairLength.Short]: ['short hair'],
  [HairLength.Medium]: ['medium hair'],
  [HairLength.Long]: ['long hair']
}

export enum HairColor {
  White,
  Blue,
  Cyan,
  Green,
  Red,
  Purple,
  Golden,
  Brown
}

export const HairColorPrompt = {
  [HairColor.White]: ['white hair'],
  [HairColor.Blue]: ['blue hair'],
  [HairColor.Cyan]: ['cyan hair'],
  [HairColor.Green]: ['green hair'],
  [HairColor.Red]: ['red hair'],
  [HairColor.Purple]: ['purple hair'],
  [HairColor.Golden]: ['golden hair'],
  [HairColor.Brown]: ['brown hair']
}

export enum EyeColor {
  Golden,
  Blue,
  Green,
  Red
}

export const EyeColorPrompt = {
  [EyeColor.Golden]: ['golden eyes'],
  [EyeColor.Blue]: ['blue eyes'],
  [EyeColor.Green]: ['green eyes'],
  [EyeColor.Red]: ['red eyes']
}

export enum Race {
  Angel,
  Demon,
  Vampire,
  Elf,
  Dragon,
  Human
}

export const RacePrompt = {
  [Race.Angel]: ['angel', 'halo', 'wings'],
  [Race.Demon]: ['demon'],
  [Race.Vampire]: ['vampire'],
  [Race.Elf]: ['elf'],
  [Race.Dragon]: ['dragon'],
  [Race.Human]: ['human']
}

/**
 * Can convert to configurable options
 * Reference: https://blogcake.net/hair-style/
 */
export const HairStylePrompt = [
  '',
  'bob hair', 'pixie hair', 'lob hair', 'shag hair', 'mohawk hair', 'buzz cut hair', 'crew cut hair',
  'french braid hair', 'dutch braid hair', 'fishtail braid hair', 'top knot hair', 'ponytail hair',
  'chignon hair', 'afro hair', 'perm hair', 'cornrows hair', 'dreadlocks hair', 'undercut hair',
  'slicked back hair', 'side part hair', 'beach waves hair', 'bowl cut hair', 'flipped ends hair',
  'layered cut hair', 'taper cut hair', 'updo hair', 'braided crown hair', 'side-swept bangs hair',
  'feathered hair hair', 'long layers hair', 'finger waves hair', 'pin curls hair', 'twisted updo hair',
  '360 waves hair', 'high top fade hair', 'comb over hair', 'space buns hair',
  'bob with bangs hair', 'curtain bangs hair', 'wavy bob hair', 'side undercut hair'
]

export const TraitPrompt = [
  'indoors', 'dimly lit', 'upper body','close-up', 'straight on', 'face focus',
  'serene expression', 'chains', 'beam', 'energy' , 'chaos', 'throne room', 'fantasy',
  'sword', 'wizard', 'priest', 'hero', 'gem', 'crystal'
]
