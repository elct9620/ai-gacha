import { TraitPrompt } from '../entities'

export class TraitService {
  shuffle(amount: number = 2): number[] {
    const size = TraitPrompt.length
    const traits: number[] = []

    while(amount > traits.length) {
      const idx = Math.floor(Math.random() * size)
      if(traits.includes(idx)) {
        continue
      }

      traits.push(idx)
    }

    return traits
  }
}
