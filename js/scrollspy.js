/*class Scrollspy {

	constructor(ratio, spies) {
		this.ratio = ratio;
		this.spies = spies;
		this.observer = null;

		if (this.spies.length > 0) {
			this.scrollspy(this.spies);
			windows.addEventListener('resize', function() {  // fonctionne même si l'utilisateur modifie la taille de la fenêtre
				this.scrollspy(this.spies);
			})
		}
	}

	callback(entries) {
		entries.forEach(function (entry) {
			if (entry.isIntersecting) {
				const id = entry.target.getAttribute('id'); // récupère l'id
				const anchor = document.querySelector(`a[href="#${id}"]`);  // recherche le lien qui pointe vers cet id
				if (anchor === null) {
					return null;
				}
				anchor.parentElement.parentElement // retire la classe active de l'élément précédent
					.querySelectorAll('.active')
					.forEach(node => node.classList.remove('active'))
				anchor.classList.add('active');  // ajoute la classe active à l'élément visible à l'écran
			}
		})
	}

	scrollspy(elements) {
		if (this.observer !== null) {
			elements.forEach(element => this.observer.unobserve(element));
		}
		const y = Math.round(window.innerHeight * this.ratio);
		this.observer = new IntersectionObserver(this.callback(entries), {
		  rootMargin: `-${window.innerHeight - y - 1}px 0px -${y}px 0px`  // crée une zone d'intersection de 1px
		})
		this.spies.forEach(element => this.observer.observe(element));
	}
}
*/
/*class Scrollspy {
	

  const ratio = .6;
  const spies = document.querySelectorAll('.scrollspy');

  let observer = null;

  const activate = function (elem) {
  const id = elem.getAttribute('id') // récupère l'id
  const anchor = document.querySelector(`a[href="#${id}"]`)  // recherche le lien qui pointe vers cet id
  if (anchor === null) {
    return null
  }
  anchor.parentElement.parentElement // retire la classe active de l'élément précédent
    .querySelectorAll('.active')
    .forEach(node => node.classList.remove('active'))
  anchor.classList.add('active')  // ajoute la classe active à l'élément visible à l'écran
  }

  const callback = function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        activate(entry.target)
      }
    })
  }

  const observe = function(elems) {
    if (observer !== null) {
      elems.forEach(elem => observer.unobserve(elem))
    }
    const y = Math.round(window.innerHeight * ratio);
    observer = new IntersectionObserver(callback, {
      rootMargin: `-${window.innerHeight - y - 1}px 0px -${y}px 0px`  // crée une zone d'intersection de 1px
    })
    spies.forEach(elem => observer.observe(elem))
  }

  if (spies.length > 0) {
    observe(spies)
    windows.addEventListener('resize', function() {  // fonctionne même si l'utilisateur modifie la taille de la fenêtre
      observe(spies)
    })
  }
}
*/