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

    // 將攝影機影像顯示在畫布中間
    let x = (width - capture.width) / 2;
    let y = (height - capture.height) / 2;
    image(capture, x, y, capture.width, capture.height);
}

function windowResized() {
    // 當視窗大小改變時，調整畫布大小
    resizeCanvas(windowWidth, windowHeight);
}
