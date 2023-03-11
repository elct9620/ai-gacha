export class RenderService {
  public readonly width: number
  public readonly height: number

  private ctx: CanvasRenderingContext2D

  constructor(ctx: CanvasRenderingContext2D, width: number, height: number ){
    this.ctx = ctx
    this.width = width
    this.height = height
  }

  draw(image: ImageBitmap) {
    this.ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, this.width, this.height)
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height)
  }
}

export default RenderService
