export default class Sky{

  constructor(img, x, speed, w, h, ctx) {
    this.img = img
    this.x = x
    this.speed = speed
    this.w = w
    this.h = h
    this.ctx = ctx
  }
  draw = function() {
    this.ctx.drawImage(this.img, this.x, 0, this.w, this.h)
  }
  setCount = function(count) {
    Sky.count = count
    // console.log(Sky.count)
  }
  update(dur) {
    this.x = this.x + this.speed * dur
    if (this.x < -this.w) {
      this.x = this.x + Sky.count * this.w
    }
  }

}