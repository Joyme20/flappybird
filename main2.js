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

var bird = 0
var sky1 = 0
var sky2 = 0
var pipe = []
var land = []
var globalGameover = false



export default class Main2{
  constructor(gameover){
    this.checkLoad(imglist)
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


  load(imgEls){
    console.log("load")
    bird = new Bird(imgEls["birds"], 150, 100, 0.0003, 0.0006, ctx)
    sky1 = new Sky(imgEls["sky"], 0, speed, w, h, ctx)
    sky2 = new Sky(imgEls["sky"], w, speed, w, h, ctx)

    for(let i=0; i<5; i++){
      pipe[i] = new Pipe(imgEls["pipe2"], imgEls["pipe1"], 400+200*i, speed, h, ctx)
    }

    for (let i = 0; i < 4; i++) {
      land[i] = new Land(imgEls["land"], 336*i, speed, h, ctx)
    }
    console.log("beforerun")
    this.run()
    
  }
 
  run() {
    run2()
    function run2(){
      console.log(sky1, sky2)
      // var now = Date.now();
      // let dt = now - preTime;

      // preTime = now;
      // console.log(now,dt,preTime)
      var dt = 15

      ctx.clearRect(0, 0, w, h);
      //图片绘制
      sky1.update(dt)
      sky1.draw()
      sky2.update(dt);
      sky2.draw()
      sky1.setCount(2);

      for (let i = 0; i < 5; i++) {
        pipe[i].update(dt);
        pipe[i].draw();
      }
      pipe[0].setCount(5, 200);
      for (let i = 0; i < 4; i++) {
        land[i].update(dt);
        land[i].draw();
      }
      land[0].setCount(4);

      bird.update(dt)
      bird.draw()

      //碰撞检测
      var gameover = false
      // let _this = this
      for (let i = 0; i < 5; i++) {
        // console.log("0",this.pipe[0])
        gameover = gameover || pipe[i].hitTest(bird.x, bird.y)
      }
      for (let i = 0; i < 4; i++) {
        gameover = gameover || land[i].hitTest(bird.x, bird.y);
      }
      if (bird.y < 0 || bird.y > h - 45 / 2) {
        gameover = true;
      }
      var aniId
      if (!gameover) {
        // let clonerun = this.run(this)
        console.log("before run request")
        window.requestAnimationFrame(run);
        console.log("aniId:", aniId)
        console.log("after run request")
      }

      if (gameover) {
        cvs.removeEventListener("click", birdclick)  //有错
        var img = wx.createImage()
        // img = imgEls["restart"]
        img.src = "./res/xin.png"
        ctx.drawImage(img, w / 2, h / 2)
        let that = this
        console.log("aniId:", aniId)
        cancelAnimationFrame(aniId)

        cvs.addEventListener("click", function () {

          ctx.clearRect(0, 0, w, h);
          bird.x = 0
          bird.y = 0


          // aniId = requestAnimationFrame(run)
          // console.log("aniId:", aniId)
        })

      }
      function birdclick(event) {
        bird.speed = -0.2;  //在function里面  要引用外面的this
        console.log(bird.y)
      }
      cvs.addEventListener("click", birdclick)

    }
    requestAnimationFrame(run)

    

  }

  // let clonerun = this.run(this)
  

    
  


}