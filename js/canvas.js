class Canvas {

	constructor(canvas, ctx, canvasHeight, canvasWidth, strokeStyle, lineWidth, lineCap) {
		this.canvas = canvas; // Identifiant du canvas
		this.ctx = ctx; // Définition du contexte du canvas
		this.canvas.width = canvasWidth; // Définition de la largeur du canvas  	
		this.canvas.height = canvasHeight; // Définition de la hauteur du canvas
		this.ctx.strokeStyle = strokeStyle; // Définition de la couleur du trait
		this.ctx.lineWidth = lineWidth; // Définition de la taille du trait
		this.ctx.lineCap = lineCap; // Définition du type d'extrémités du trait
		this.painting = false;

		this.canvas.addEventListener('mousedown', this.startPosition.bind(this));
		this.canvas.addEventListener('mouseup', this.finishedPosition.bind(this));
		this.canvas.addEventListener('mousemove', this.draw.bind(this));
	}

	startPosition(e) {
		this.painting = true;
		this.ctx.beginPath()
		this.draw(e);
	}

	finishedPosition() {
		this.painting = false;
	}

	draw(e) {
		if (!this.painting) return;
		this.ctx.lineTo(e.clientX, e.clientY);
		this.ctx.stroke();
	}
}
