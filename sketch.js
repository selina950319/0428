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
          let brightnessValue = (r + g + b) / 3; // 亮度

          // 根據亮度決定方塊大小
          let maxSize = 20;
          let size = map(brightnessValue, 0, 255, 0, maxSize);

          overlayGraphics.noFill();
          overlayGraphics.stroke(r, g, b); // 方塊框線顏色 = 原色
          overlayGraphics.strokeWeight(2); // 可以調整線條粗細
          overlayGraphics.push();
          overlayGraphics.translate(x + 10, y + 10);
          overlayGraphics.rotate(PI / 4); // 旋轉45度變成菱形
          overlayGraphics.rect(0, 0, size, size);
          overlayGraphics.pop();
        }
      }
    }

    // 顯示 overlay
    let x = (width - capture.width) / 2;
    let y = (height - capture.height) / 2;
    image(overlayGraphics, x, y, capture.width, capture.height);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
