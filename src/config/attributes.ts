import {
  Race,
  HairLength,
  HairColor,
  EyeColor,
} from '../entities'
import { State } from '../state'

export type AttributeNames = "race" | "hairLength" | "hairColor" | "eyeColor" | "isHires"
export type AttributeItem = Record<number, string>
export const AttributeOptions: Record<AttributeNames, AttributeItem> = {
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
  "isHires": {
    0: '否',
    1: '是',
  },
}

export type AttributeSetter = (state: State, value: number) => void
export const AttributeSetters: Record<AttributeNames, AttributeSetter> = {
  "race": (state: State, value: number) => { state.setRace(value as Race) },
  "hairLength": (state: State, value: number) => { state.setHairLength(value as HairLength) },
  "hairColor": (state: State, value: number) => { state.setHairColor(value as HairColor) },
  "eyeColor": (state: State, value: number) => { state.setEyeColor(value as EyeColor) },
  "isHires": (state: State, value: number) => { state.setHires(value == 1) },
}
