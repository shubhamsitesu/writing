const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const clearButton = document.getElementById('clearButton');
const saveButton = document.getElementById('saveButton');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 100;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
ctx.lineWidth = 5;

function startDrawing(e) {
    isDrawing = true;
    [lastX, lastY] = getMousePos(e);
}

function stopDrawing() {
    isDrawing = false;
    ctx.beginPath();
}

function draw(e) {
    if (!isDrawing) return;

    ctx.strokeStyle = colorPicker.value;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    const [x, y] = getMousePos(e);
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
    [lastX, lastY] = [x, y];
}

function getMousePos(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.touches ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = e.touches ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    return [x, y];
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    startDrawing(e);
});
canvas.addEventListener('touchend', stopDrawing);
canvas.addEventListener('touchmove', draw);
clearButton.addEventListener('click', clearCanvas);

function saveCanvas() {
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'drawing.png';
    link.click();
}

saveButton.addEventListener('click', saveCanvas);
