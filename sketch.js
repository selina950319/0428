let capture;

function setup() {
    // 建立全視窗畫布，背景顏色為 a9def9
    createCanvas(windowWidth, windowHeight);
    background('#a9def9');

    // 啟用攝影機，設定寬高為視窗大小的 80%
    capture = createCapture(VIDEO);
    capture.size(windowWidth * 0.8, windowHeight * 0.8);
    capture.hide(); // 隱藏原始的 HTML 視訊元素
}

function draw() {
    background('#a9def9'); // 每次繪製時重設背景顏色

    // 將攝影機影像左右翻轉
    push();
    translate(width / 2, height / 2); // 將原點移到畫布中心
    scale(-1, 1); // 水平翻轉影像
    image(capture, -capture.width / 2, -capture.height / 2, capture.width, capture.height);
    pop();
}

function windowResized() {
    // 當視窗大小改變時，調整畫布大小
    resizeCanvas(windowWidth, windowHeight);
}
