const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const thicknessSlider = document.getElementById('thicknessSlider');
const thicknessValue = document.getElementById('thicknessValue');
const clearButton = document.getElementById('clearButton');
const saveButton = document.getElementById('saveButton');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 100; // Adjust height to fit the toolbar


let isDrawing = false;
let lastX = 0;
let lastY = 0;
ctx.lineWidth = thicknessSlider.value;

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

    ctx.strokeStyle = colorPicker.value === "#FFFFFF" ? "#f0f0f0" : colorPicker.value; // Use background color for erasing
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    const [x, y] = getMousePos(e);
    ctx.lineWidth = thicknessSlider.value; // Set line width based on slider value
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
    [lastX, lastY] = [x, y];
}

function getMousePos(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX || e.touches[0].clientX;
    const y = e.clientY || e.touches[0].clientY;

    return [Math.max(0, Math.min(x - rect.left, canvas.width)), Math.max(0, Math.min(y - rect.top, canvas.height))];
}
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function saveCanvas() {
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'drawing.png';
    link.click();
}

// Event listeners
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Prevent scrolling
    startDrawing(e);
});
canvas.addEventListener('touchend', stopDrawing);
canvas.addEventListener('touchmove', draw);

clearButton.addEventListener('click', clearCanvas);
saveButton.addEventListener('click', saveCanvas);

// Update the displayed thickness value
thicknessSlider.addEventListener('input', () => {
    thicknessValue.textContent = thicknessSlider.value;
});
