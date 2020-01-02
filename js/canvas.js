const canvas = document.querySelector('#stations__canvas');
const ctx = canvas.getContext('2d');

// Redimensionnement
canvas.height = 500;
canvas.width = 500;

let painting = false;

function startPosition(e) {
	painting = true;
	draw(e);
}

function finishedPosition() {
	painting = false;
	ctx.beginPath();
}

function draw(e) {
	if (!painting) return;
	ctx.lineWidth = 5;
	ctx.lineCap = 'round';

	ctx.lineTo(e.clientX, e.clientY);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(e.clientX, e.clientY);
}

// EvenListeners
canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', finishedPosition);
canvas.addEventListener('mousemove', draw);
