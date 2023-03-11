export class PredictState {
  public readonly outputURL?: string

  constructor(outputURL?: string) {
    this.outputURL = outputURL
  }

  get hasOutput() {
    return this.outputURL != undefined && this.outputURL!.length > 0
  }
}
