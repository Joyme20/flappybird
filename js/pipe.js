export default class Pipe {
  constructor(upImage, downImage, x, speed, h, ctx) {
    this.upImage = upImage
    this.downImage = downImage
    this.x = x
    this.speed = speed
    this.h = h
    this.ctx = ctx

    this.r = Math.random() * this.h * 0.2 + this.h * 0.2
    this.dw = 52 * this.h / 500
    this.dh = 420 * this.h / 500
  }
  draw() {
    this.ctx.drawImage(this.upImage, this.x, this.r - 420 * this.h / 500, this.dw, this.dh)
    this.ctx.drawImage(this.downImage, this.x, this.r + this.h * 0.3, this.dw, this.dh)
  }
  setCount(count, gap) {
    Pipe.count = count
    Pipe.gap = gap
  }
  update(dur) {
    this.x = this.x + this.speed * dur
    if (this.x < -this.dw) {
      this.x = this.x + Pipe.count * Pipe.gap
      this.r = Math.random() * this.h * 0.2 + this.h * 0.2
    }
  }
  hitTest(x, y) {
    return (x > this.x && x < this.x + this.dw) &&
      (!(y > this.r && y < this.r + this.h * 0.3))

  }
}