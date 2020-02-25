class Slider {

	constructor(sliderContainer, sliderSlide, interval) {
		this.sliderContainer = sliderContainer; // Identifiant du slider 
		this.sliderSlide = sliderSlide; // Identifiant des slides
		this.interval = interval; // Délai en millisecondes
		this.index = "";        
		this.automaticSlider = "";
		this.move = false;

		this.play();

		$('.slider__chevron_right').click(this.next.bind(this));
		$('.slider__chevron_left').click(this.prev.bind(this));
		$('.slider__button_play').click(this.play.bind(this));
		$('.slider__button_pause').click(this.pause.bind(this));

		$('body').keydown(this.keydown.bind(this));
	}

	next() {
		if (this.move === true) {
			clearInterval(this.automaticSlider);
			this.automaticSlider = setInterval(this.next.bind(this), this.interval);
		}
		this.goToSlide(this.index++);
	}

	prev() {
		if (this.move === true) {
			clearInterval(this.automaticSlider);
			this.automaticSlider = setInterval(this.next.bind(this), this.interval);
		}
		this.goToSlide(this.index--);
	}

	play() {
		$('.slider__button_play').removeClass('active');
		$('.slider__button_pause').addClass('active');
		this.move = true;
		this.automaticSlider = setInterval(this.next.bind(this), this.interval);
	}

	pause() {
		$('.slider__button_play').addClass('active');
		$('.slider__button_pause').removeClass('active');
		this.move = false;
		clearInterval(this.automaticSlider);
	}

	goToSlide () {
		if (this.index < 0 ) {
			this.index = this.sliderSlide.length -1;
		} else if (this.index > this.sliderSlide.length - 1) {
			this.index = 0;
		}
		this.sliderSlide.removeClass('active');
		let currentSlide = this.sliderSlide.eq(this.index);
		currentSlide.addClass('active');
	}

	keydown(e) {
		if (e.key === 'ArrowRight') {
			this.next();
		} else if (e.key === 'ArrowLeft') {
			this.prev();
		}
	}
}