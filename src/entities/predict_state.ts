export class PredictState {
  public readonly completed: boolean
  public readonly outputURL?: string

  constructor(completed: boolean, outputURL?: string) {
    this.completed = completed
    this.outputURL = outputURL
  }

  get isCompleted() {
    return this.completed
  }

  get hasOutput() {
    return this.outputURL != undefined && this.outputURL!.length > 0
  }
}
