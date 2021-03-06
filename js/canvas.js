class Canvas {

	constructor(canvas, ctx, canvasHeight, canvasWidth, strokeStyle, lineWidth, lineCap, lineJoin) {
		this.canvas = canvas; // Identifiant du canvas
		this.ctx = ctx; // Définition du contexte du canvas
		this.canvas.width = canvasWidth; // Définition de la largeur du canvas  	
		this.canvas.height = canvasHeight; // Définition de la hauteur du canvas
		this.ctx.strokeStyle = strokeStyle; // Définition de la couleur du trait
		this.ctx.lineWidth = lineWidth; // Définition de la taille du trait
		this.ctx.lineCap = lineCap; // Définition du type d'extrémités du trait
		this.ctx.lineJoin = lineJoin; // Définition du type de jointure entre deux segments
		this.painting = false;
		this.signature = false;

		this.canvas.addEventListener('mousedown', this.startPosition.bind(this));
		this.canvas.addEventListener('mouseup', this.endPosition.bind(this));
		this.canvas.addEventListener('mousemove', this.mouseMove.bind(this));
		this.canvas.addEventListener("mouseout", this.endPosition.bind(this))
		
		// Gestion des événements tactiles / Touch events
		this.canvas.addEventListener('touchstart', this.startPosition.bind(this));
		this.canvas.addEventListener('touchend', this.endPosition.bind(this));
		this.canvas.addEventListener('touchmove', this.touchMove.bind(this));

		$('.canvas__button_clear').click(this.clear.bind(this));
	}

	startPosition(e) {
		e.preventDefault();		
		this.painting = true;		
		this.ctx.beginPath();		
		this.mouseMove(e);
	}

	endPosition(e) {
		e.preventDefault();
		this.painting = false;
	}

	mouseMove(e) {
		if (this.painting === true) {
			this.ctx.lineTo(e.offsetX, e.offsetY);
			this.ctx.stroke();
			this.signature = true;			
		};
	}

	touchMove(e) {
		e.preventDefault();
		if (this.painting === true) {
			this.ctx.lineTo(e.touches[0].clientX - canvas.getBoundingClientRect().left, e.touches[0].clientY - canvas.getBoundingClientRect().top);
			this.ctx.stroke();
			this.signature = true;
		}
	}

	// Efface le canvas
	clear() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.signature = false;
	}
}
