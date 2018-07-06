import './js/libs/weapp-adapter'

import Load from './js/load'
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
    "src": "res/restart.png"
  }
];
var speed = -0.2  //设定速度
var canvas = wx.createCanvas();
// var cvs = canvas
var w = canvas.width  //适配手机屏幕
var h = canvas.height

console.log(canvas.height)
var ctx = canvas.getContext('2d')
console.log("ctx")

var imgEls = {};
var imgCount = imglist.length;
for (var i = 0; i < imgCount; i++) {
  var name = imglist[i].name;
  // var newImg = new Image();
  var newImg = wx.createImage();
  newImg.src = imglist[i].src;
  imgEls[name] = newImg;
}


// Load(imglist, function (imgEls) {
  var bird = new Bird(imgEls["birds"], 150, 100, 0.0003, 0.0006, ctx)
  var sky1 = new Sky(imgEls["sky"], 0, speed, w, h, ctx)
  var sky2 = new Sky(imgEls["sky"], w, speed, w, h, ctx)

  var pipe = []
  for (let i = 0; i < 5; i++) {
    pipe[i] = new Pipe(imgEls["pipe2"], imgEls["pipe1"], 400 + 200 * i, speed, h, ctx)
  }

  var land = []
  for (let i = 0; i < 4; i++) {
    land[i] = new Land(imgEls["land"], 336 * i, speed, h, ctx)
  }
  console.log("beforerun")
  console.log(sky1, sky2)

  var gameover = false

  restart()

  function restart() {
    bird = new Bird(imgEls["birds"], 150, 20, 0.0003, 0.0006, ctx)
    sky1 = new Sky(imgEls["sky"], 0, speed, w, h, ctx)
    sky2 = new Sky(imgEls["sky"], w, speed, w, h, ctx)

    // pipe = []
    for (let i = 0; i < 5; i++) {
      pipe[i] = new Pipe(imgEls["pipe2"], imgEls["pipe1"], 400 + 200 * i, speed, h, ctx)
    }

    // land = []
    for (let i = 0; i < 4; i++) {
      land[i] = new Land(imgEls["land"], 336 * i, speed, h, ctx)
    }


    gameover = false
    window.cancelAnimationFrame(aniId);
    aniId = window.requestAnimationFrame(run)

  }

  //主循环
  // var preTime = Date.now();
var aniId = 0

function run() {
  // var now = Date.now();
  // let dt = now - preTime;

  // preTime = now;
  console.log("run")
  var dt = 15

  ctx.clearRect(0, 0, w, h);
  console.log("sky1:", sky1)
  sky1.update(dt)
  sky1.draw()
  sky2.update(dt);
  sky2.draw()
  console.log(sky2)
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

  // console.log("gameover")
  //碰撞检测
  
  // let _this = this
  for (let i = 0; i < 5; i++) {
    // console.log("0",pipe[0])
    gameover = gameover || pipe[i].hitTest(bird.x, bird.y)
  }
  for (let i = 0; i < 4; i++) {
    gameover = gameover || land[i].hitTest(bird.x, bird.y);
  }
  if (bird.y < 0 || bird.y > h - 45 / 2) {
    gameover = true;
  }

  if (!gameover) {
    aniId = window.requestAnimationFrame(run);
  }
  if (gameover) {
    canvas.removeEventListener("click", birdclick)
    var img = wx.createImage()
    img = imgEls["restart"]
    // img.src = "./res/xin.png"
    ctx.drawImage(img, w / 2 - img.width / 2, h / 2 -img.height / 2)
    console.log("img.width:", img.width)
    
    canvas.addEventListener("click", restartclick)

    function restartclick(){
      window.cancelAnimationFrame(aniId)
      canvas.removeEventListener("click", restartclick)
      restart()
      canvas.addEventListener("click", birdclick)
    }
    
  }

}
// requestAnimationFrame(run)

function birdclick(event) {
  bird.speed = -0.3;
  console.log("birdclick")
}

canvas.addEventListener("click", birdclick)

// })




