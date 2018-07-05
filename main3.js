// import Load from './js/load'
import Sky from "./js/sky"
import Land from "./js/land.js"
import Pipe from "./js/pipe.js"
import Bird from "./js/bird.js"

var imglist = [
  {
    "name": "birds",
    "src": "res/birds.png"
  },
  {
    "name": "land",
    "src": "res/land.png"
  },
  {
    "name": "pipe1",
    "src": "res/pipe1.png"
  },
  {
    "name": "pipe2",
    "src": "res/pipe2.png"
  },
  {
    "name": "sky",
    "src": "res/sky.png"
  },
  {
    "name": "restart",
    "src": "res/xin.png"
  }
];
var speed = -0.2  //设定速度
var cvs = wx.createCanvas();
var w = cvs.width  //适配手机屏幕
var h = cvs.height
var that = this

console.log(cvs.height)
var ctx = cvs.getContext('2d')




export default class Main2 {
  constructor(gameover) {
    this.bird = 0
    this.sky1 = 0
    this.sky2 = 0
    this.pipe = []
    this.land = []
    this.checkLoad(imglist)
    // this.gameoverFun()
    // this.a(1)
    // this.restart
    this.gameover = gameover



  }

  checkLoad(source) {
    var imgEls = {};
    var imgCount = source.length;
    for (var i = 0; i < imgCount; i++) {
      var name = source[i].name;
      // var newImg = new Image();
      var newImg = wx.createImage();
      newImg.src = source[i].src;
      imgEls[name] = newImg;
      let _this = this
      imgEls[name].addEventListener("load", function () {
        imgCount--;
        if (imgCount == 0) {
          // console.log(typeof(this.a(111)))
          _this.load(imgEls)
          // return imgEls
        }
      })
    }
  }


  load(imgEls) {
    console.log("load")
    this.bird = new Bird(imgEls["birds"], 150, 100, 0.0003, 0.0006, ctx)
    this.sky1 = new Sky(imgEls["sky"], 0, speed, w, h, ctx)
    this.sky2 = new Sky(imgEls["sky"], w, speed, w, h, ctx)

    for (let i = 0; i < 5; i++) {
      this.pipe[i] = new Pipe(imgEls["pipe2"], imgEls["pipe1"], 400 + 200 * i, speed, h, ctx)
    }

    for (let i = 0; i < 4; i++) {
      this.land[i] = new Land(imgEls["land"], 336 * i, speed, h, ctx)
    }
    console.log("beforerun")
    console.log(this.sky1, this.sky2)
    // let _this = this
    // _this.sky1.update(15);
    this.run()
    // requestAnimationFrame(this.run)
    // this.run(1)
    // console.log("afterrun")
    // this.a(1)

  }

  run() {

    console.log(this.sky1)
    // var now = Date.now();
    // let dt = now - preTime;

    // preTime = now;
    // console.log(now,dt,preTime)
    var dt = 15

    ctx.clearRect(0, 0, w, h);
    //图片绘制
    this.sky1.update(dt)
    this.sky1.draw()
    this.sky2.update(dt);
    this.sky2.draw()
    console.log(this.sky2)
    this.sky1.setCount(2);

    for (let i = 0; i < 5; i++) {
      this.pipe[i].update(dt);
      this.pipe[i].draw();
    }
    this.pipe[0].setCount(5, 200);

    for (let i = 0; i < 4; i++) {
      this.land[i].update(dt);
      this.land[i].draw();
    }
    this.land[0].setCount(4);

    this.bird.update(dt)
    this.bird.draw()
    // console.log("1",this.pipe[0])

    // let _this = this
    this.gameoverFun()

  }

  gameoverFun() {
    console.log("gameover")
    //碰撞检测
    var gameover = false
    // let _this = this
    for (let i = 0; i < 5; i++) {
      // console.log("0",this.pipe[0])
      gameover = gameover || this.pipe[i].hitTest(this.bird.x, this.bird.y)
    }
    for (let i = 0; i < 4; i++) {
      gameover = gameover || this.land[i].hitTest(this.bird.x, this.bird.y);
    }
    if (this.bird.y < 0 || this.bird.y > h - 45 / 2) {
      gameover = true;
    }

    if (!gameover) {
      // let clonerun = this.run(this)
      console.log("before run request")
      requestAnimationFrame(() => this.run);
    }
    // let clonerun = this.run(this)
    requestAnimationFrame(() => this.run)

    let _this = this
    function birdclick(event) {
      _this.bird.speed = -0.2;  //在function里面  要引用外面的this
      console.log(_this.bird.y)
    }
    cvs.addEventListener("click", birdclick)
  }


}