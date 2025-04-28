let capture;
let overlayGraphics;

function setup() {
    // 建立全視窗畫布，背景顏色為 a9def9
    createCanvas(windowWidth, windowHeight);
    background('#a9def9');

    // 啟用攝影機，設定寬高為視窗大小的 80%
    capture = createCapture(VIDEO);
    capture.size(windowWidth * 0.8, windowHeight * 0.8);
    capture.hide(); // 隱藏原始的 HTML 視訊元素

    // 建立與攝影機影像相同大小的 Graphics 物件
    overlayGraphics = createGraphics(capture.width, capture.height);
    overlayGraphics.clear(); // 確保背景透明
}

function draw() {
    background('#a9def9'); // 每次繪製時重設背景顏色

    // 更新 overlayGraphics 的內容
    overlayGraphics.clear();
    overlayGraphics.fill(255, 0, 0, 100); // 半透明紅色
    overlayGraphics.noStroke();
    overlayGraphics.ellipse(overlayGraphics.width / 2, overlayGraphics.height / 2, 100, 100); // 畫一個紅色圓形

    // 在 overlayGraphics 上繪製文字
    overlayGraphics.fill(0); // 黑色文字
    overlayGraphics.textSize(32); // 設定文字大小
    overlayGraphics.textAlign(CENTER, CENTER); // 文字置中對齊
    overlayGraphics.text('這是我的影像', overlayGraphics.width / 2, overlayGraphics.height / 2 - 60); // 繪製文字

    // 將攝影機影像左右翻轉並顯示
    push();
    translate(width / 2, height / 2); // 將原點移到畫布中心
    scale(-1, 1); // 水平翻轉影像
    image(capture, -capture.width / 2, -capture.height / 2, capture.width, capture.height);
    pop();

    // 將 overlayGraphics 顯示在攝影機影像上方
    let x = (width - capture.width) / 2;
    let y = (height - capture.height) / 2;
    image(overlayGraphics, x, y, capture.width, capture.height);
}

function windowResized() {
    // 當視窗大小改變時，調整畫布大小
    resizeCanvas(windowWidth, windowHeight);
}
