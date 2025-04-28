let capture;
let overlayGraphics;
let captureReady = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  capture = createCapture(VIDEO, () => {
    captureReady = true;
    capture.size(windowWidth * 0.8, windowHeight * 0.8);
    capture.hide();
    overlayGraphics = createGraphics(capture.width, capture.height);
  });
}

function draw() {
  background(0); // 黑色背景

  if (captureReady) {
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

          let maxSize = 20;
          let size = map(brightnessValue, 0, 255, 0, maxSize);

          overlayGraphics.push();
          overlayGraphics.translate(x + 10, y + 10);
          overlayGraphics.rotate(PI / 4); // 旋轉45度
          overlayGraphics.noFill();
          overlayGraphics.stroke(r, g, b);
          overlayGraphics.strokeWeight(2);
          overlayGraphics.rectMode(CENTER); // 以中心點畫正方形！
          overlayGraphics.rect(0, 0, size, size);
          overlayGraphics.pop();
        }
      }
    }

    let x = (width - capture.width) / 2;
    let y = (height - capture.height) / 2;
    image(overlayGraphics, x, y, capture.width, capture.height);
  } else {
    // 捕捉還沒好時顯示提示
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(24);
    text('Loading camera...', width / 2, height / 2);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
