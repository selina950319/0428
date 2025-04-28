let capture;
let overlayGraphics;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  capture = createCapture(VIDEO);
  capture.size(windowWidth * 0.8, windowHeight * 0.8);
  capture.hide();

  overlayGraphics = createGraphics(capture.width, capture.height);
  overlayGraphics.clear();
}

function draw() {
  background(0); // 黑色背景

  if (capture.loadedmetadata) {
    overlayGraphics.clear();
    overlayGraphics.background(0);

    capture.loadPixels();
    if (capture.pixels.length > 0) {
      for (let y = 0; y < capture.height; y += 20) {
        for (let x = 0; x < capture.width; x += 20) {
          let i = (y * capture.width + x) * 4;
          let r = capture.pixels[i];
          let g = capture.pixels[i + 1];
          let b = capture.pixels[i + 2];
          let gray = (r + g + b) / 3; // 灰階

          // 根據灰階決定圓圈大小
          let maxSize = 20; // 最大直徑
          let diameter = map(gray, 0, 255, 0, maxSize);

          overlayGraphics.noStroke();
          overlayGraphics.fill(255); // 全部是白色圓圈
          overlayGraphics.ellipse(x + 10, y + 10, diameter, diameter);
        }
      }
    }

    // 顯示攝影機畫面（這裡可以不顯示原影像）
    // push();
    // translate(width / 2, height / 2);
    // scale(-1, 1);
    // image(capture, -capture.width / 2, -capture.height / 2, capture.width, capture.height);
    // filter(GRAY);
    // pop();

    // 顯示 overlay
    let x = (width - capture.width) / 2;
    let y = (height - capture.height) / 2;
    image(overlayGraphics, x, y, capture.width, capture.height);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
