class Scrollspy {

	constructor(ratio, spies) {
		this.ratio = ratio;
		this.spies = spies;
		this.observer = null;

		window.addEventListener('resize', this.scrollspy.bind(this));
		
		this.scrollspy();
	}

	scrollspy() {
		if (this.observer !== null) {
			elements.forEach(element => {
				this.observer.unobserve(element);
			})
		}
		const y = Math.round(window.innerHeight * this.ratio);
		this.observer = new IntersectionObserver(this.callback, {
			// Création d'une zone d'intersection de 1px
			rootMargin: `-${window.innerHeight - y - 1}px 0px -${y}px 0px`,
		});
		this.spies.forEach(element => {
			this.observer.observe(element);
		})
	}

	callback(entries) {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				// récupère l'id
				const id = entry.target.getAttribute('id');
				// recherche le lien qui pointe vers cet id
				const anchor = document.querySelector(`a[href="#${id}"]`);
				if (anchor === null) {
					return null;
				}
				// retire la classe active de l'élément précédent
				anchor.parentElement.parentElement
					.querySelectorAll('.active')
					.forEach(node => node.classList.remove('active'))
				// ajoute la classe active à l'élément visible à l'écran	
				anchor.classList.add('active');
			}
		})
	}
}