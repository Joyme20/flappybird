module.exports = function (source,callback) {
  var imgEls = {};
  var imgCount = source.length;
  for (var i = 0; i < imgCount; i++) {
    var name = source[i].name;
    // var newImg = new Image();
    var newImg = wx.createImage();
    newImg.src = source[i].src;
    imgEls[name] = newImg;
    imgEls[name].addEventListener("load", function () {
      imgCount--;
      if (imgCount == 0) {
        callback(imgEls);
        // return imgEls
      }
    })
  }
}