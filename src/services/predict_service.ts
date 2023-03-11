import Replicate from 'replicate-js'

import { Card, PredictState } from '../entities'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export class PredictService {
  static readonly PendingState = ["starting", "processing"]

  public readonly version: string
  public readonly client: Replicate

  constructor(client: Replicate, version: string) {
    this.client = client
    this.version = version
  }

  async *predict(card: Card): AsyncGenerator<any, void, unknown> {
    const input = {
      prompt: card.toPrompt(),
      neg_prompt: card.toNegativePrompt(),
      width: Card.WIDTH,
      height: Card.HEIGHT,
      hires: card.isHires,
    };


    const predict = await this.client.startPrediction(this.version, input)
    while(true) {
      const nextPredict = await this.client.getPrediction(predict.id)
      if(!nextPredict) { return }

      const res = nextPredict.output?.pop()
      if (PredictService.PendingState.includes(nextPredict.status)) {
        yield new PredictState(res)
        await sleep(this.client.pollingInterval || 1000)
      } else {
        yield new PredictState(res)
        return
      }
    }
  }
}
