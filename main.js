import Load from './js/load'
import Sky from "./js/sky"
import Land from "./js/land.js"
import Pipe from "./js/pipe.js"
import Bird from "./js/bird.js"

module.exports = function(){
  

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

console.log(cvs.height)
var ctx = cvs.getContext('2d')


Load(imglist, function (imgEls) {
  var bird = new Bird(imgEls["birds"], 150, 100, 0.0003, 0.0006, ctx)
  var sky1 = new Sky(imgEls["sky"], 0, speed, w, h, ctx)
  var sky2 = new Sky(imgEls["sky"], w, speed, w, h, ctx)

  var pipe1 = new Pipe(imgEls["pipe2"], imgEls["pipe1"], 400, speed, h, ctx)
  var pipe2 = new Pipe(imgEls["pipe2"], imgEls["pipe1"], 600, speed, h, ctx)
  var pipe3 = new Pipe(imgEls["pipe2"], imgEls["pipe1"], 800, speed, h, ctx)
  var pipe4 = new Pipe(imgEls["pipe2"], imgEls["pipe1"], 1000, speed, h, ctx)
  var pipe5 = new Pipe(imgEls["pipe2"], imgEls["pipe1"], 1200, speed, h, ctx)

  var land1 = new Land(imgEls["land"], 0, speed, h, ctx)
  var land2 = new Land(imgEls["land"], 336, speed, h, ctx)
  var land3 = new Land(imgEls["land"], 336 * 2, speed, h, ctx)
  var land4 = new Land(imgEls["land"], 336 * 3, speed, h, ctx)


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
    //图片绘制
    sky1.update(dt);
    sky1.draw()
    console.log(sky1)
    sky2.update(dt);
    sky2.draw()
    sky1.setCount(2);

    pipe1.update(dt);
    pipe1.draw();
    pipe2.update(dt);
    pipe2.draw();
    pipe3.update(dt);
    pipe3.draw();
    pipe4.update(dt);
    pipe4.draw();
    pipe5.update(dt);
    pipe5.draw();
    pipe1.setCount(5, 200);

    land1.update(dt);
    land1.draw();
    land2.update(dt);
    land2.draw();
    land3.update(dt);
    land3.draw();
    land4.update(dt);
    land4.draw();
    land1.setCount(4);

    bird.update(dt)
    bird.draw()

    var gameover = false
    gameover = gameover || pipe1.hitTest(bird.x, bird.y);
    gameover = gameover || pipe2.hitTest(bird.x, bird.y);
    gameover = gameover || pipe3.hitTest(bird.x, bird.y);
    gameover = gameover || pipe4.hitTest(bird.x, bird.y);
    gameover = gameover || pipe5.hitTest(bird.x, bird.y);

    gameover = gameover || land1.hitTest(bird.x, bird.y);
    gameover = gameover || land2.hitTest(bird.x, bird.y);
    gameover = gameover || land3.hitTest(bird.x, bird.y);
    gameover = gameover || land4.hitTest(bird.x, bird.y);

    if (bird.y < 0 || bird.y > h - 45 / 2) {
      gameover = true;
    }

    if (!gameover) {
      requestAnimationFrame(run);
    }
    if (gameover) {
      cvs.removeEventListener("click",birdclick)
      var img = wx.createImage()
      img = imgEls["restart"]
      // img.src = "./res/xin.png"
      ctx.drawImage(img, w / 2, h / 2)
      cvs.addEventListener("click", function () {
        
        cancelAnimationFrame(aniId)
        aniId = requestAnimationFrame(run)
      })

    }
  }
  requestAnimationFrame(run)

  function birdclick(event){
    bird.speed = -0.2;
    console.log(bird.y)
  }

  cvs.addEventListener("click", birdclick)

})




}