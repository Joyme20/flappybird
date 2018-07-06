export default class Bird {
  constructor(img, x, y, speed, a, ctx) {
    this.img = img  //
    this.x = x  //
    this.y = y//
    this.speed = speed//移动的速读
    this.a = a//
    this.ctx = ctx

    this.index = 0
    this.durgather = 0
  }
  draw() {
    this.ctx.save();

    this.ctx.translate(this.x, this.y);
    this.ctx.rotate((Math.PI / 6) * this.speed / 0.3); //bird上仰俯冲

    //drawImage(Image,sx,sy,sw,sh,dx,dy,dw,dh)s是源位置，d是目标位置
    this.ctx.drawImage(this.img, 
    52 * this.index, 0, 52, 45,  //源位置
    -52 / 2, -45 / 2, 52, 45)  //目标位置
    this.ctx.restore();
  }

  update(dur){  //dur只是传入的一个常数
    this.durgather += dur
    if (this.durgather > 100){
      this.index++
      if(this.index == 2){
        this.index = 0
      }
      this.durgather -= 100
    }
    this.speed = this.speed + this.a*dur
    this.y = this.y+this.speed*(dur-5) //-5可以减缓下坠速度

  }

}