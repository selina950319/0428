let capture;
let overlayGraphics;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background('#a9def9');

    capture = createCapture(VIDEO);
    capture.size(windowWidth * 0.8, windowHeight * 0.8);
    capture.hide();

    overlayGraphics = createGraphics(capture.width, capture.height);
    overlayGraphics.clear();
}

function draw() {
    background('#a9def9');

    // 更新 overlayGraphics 的內容
    overlayGraphics.clear();
    overlayGraphics.background(0); // 設定背景為黑色

    // 每隔 20 繪製圓形，顏色取自 capture 的相對位置
    for (let y = 0; y < overlayGraphics.height; y += 20) {
        for (let x = 0; x < overlayGraphics.width; x += 20) {
            let col = capture.get(x, y); // 從攝影機影像取得顏色
            overlayGraphics.fill(col); // 設定圓形顏色
            overlayGraphics.noStroke();
            overlayGraphics.ellipse(x + 10, y + 10, 15, 15); // 繪製圓形，中心偏移 10
        }
    }

    // 顯示攝影機影像
    push();
    translate(width / 2, height / 2);
    scale(-1, 1);
    image(capture, -capture.width / 2, -capture.height / 2, capture.width, capture.height);
    pop();

    // 疊加 overlayGraphics
    let x = (width - capture.width) / 2;
    let y = (height - capture.height) / 2;
    image(overlayGraphics, x, y, capture.width, capture.height);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
