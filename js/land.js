export default class Land {
  constructor(img, x, speed, h, ctx) {
    this.img = img
    this.x = x
    this.speed = speed
    this.h = h
    this.ctx = ctx
  }
  draw() {
    this.ctx.drawImage(this.img, this.x, this.h*0.8)
  }
  setCount(count) {
    Land.count = count
  }
  update(dur) {
    this.x = this.x + this.speed * dur
    if (this.x < -336) {
      this.x = this.x + Land.count * 336
    }
  }
  hitTest(x,y){
    return (y > this.h * 0.8)
  }
}