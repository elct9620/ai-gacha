export class TraitService {
  shuffle(prompts: string[], amount: number = 2): number[] {
    const size = prompts.length
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
