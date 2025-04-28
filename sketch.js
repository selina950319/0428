let capture;
let overlayGraphics;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0); // 背景黑色

    capture = createCapture(VIDEO);
    capture.size(windowWidth * 0.8, windowHeight * 0.8);
    capture.hide();

    overlayGraphics = createGraphics(capture.width, capture.height);
    overlayGraphics.clear();
}

function draw() {
    background(0); // 畫布背景黑色

    if (capture.loadedmetadata) {
        // 更新 overlayGraphics
        overlayGraphics.clear();
        overlayGraphics.background(0);

        capture.loadPixels(); // 先讀取影像像素
        if (capture.pixels.length > 0) {
            for (let y = 0; y < capture.height; y += 20) {
                for (let x = 0; x < capture.width; x += 20) {
                    let i = (y * capture.width + x) * 4;
                    let r = capture.pixels[i];
                    let g = capture.pixels[i + 1];
                    let b = capture.pixels[i + 2];
                    let gray = (r + g + b) / 3; // 計算灰階
                    overlayGraphics.noStroke();
                    overlayGraphics.fill(gray);
                    overlayGraphics.ellipse(x + 10, y + 10, 15, 15);
                }
            }
        }

        // 顯示灰階的攝影機畫面
        push();
        translate(width / 2, height / 2);
        scale(-1, 1);
        image(capture, -capture.width / 2, -capture.height / 2, capture.width, capture.height);
        filter(GRAY); // 攝影機畫面也灰階化
        pop();

        // 疊加灰階的圓圈
        let x = (width - capture.width) / 2;
        let y = (height - capture.height) / 2;
        image(overlayGraphics, x, y, capture.width, capture.height);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
