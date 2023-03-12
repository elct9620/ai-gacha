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

export const TraitPrompt = [
  'indoors', 'dimly lit', 'upper body','close-up', 'straight on', 'face focus',
  'serene expression', 'chains', 'beam', 'energy' , 'chaos', 'throne room', 'fantasy'
]
