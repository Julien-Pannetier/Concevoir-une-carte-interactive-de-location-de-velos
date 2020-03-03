class Reservation {

	constructor() {
		this.canvas = new Canvas(document.querySelector("#canvas"), document.querySelector("#canvas").getContext('2d'), 150, 280, "#777777", 4, "round", "round");
		
		this.userLastName = document.getElementById("user__lastName");
		this.userFirstName = document.getElementById("user__firstName");
		this.stationName = document.getElementById("stations__name");
		this.stationAddress = document.getElementById("stations__address");
		this.timerElt = document.getElementById('timer');
		this.observer = null;

		$('.reservation__button').click(this.startReservation.bind(this));
		$('.stations__button_close').click(this.closeReservationBox.bind(this));
		$('.canvas__button_validate').click(this.completeReservation.bind(this));
		$('.reservation__button_cancel').click(this.cancelReservation.bind(this));

		this.checkReservation();
	}

	checkReservation() {
		// Récupération du nom et prénom de l'utilisateur dans le local storage
		this.userLastName.value = localStorage.getItem('userLastName');
		this.userFirstName.value = localStorage.getItem('userFirstName');
		// Vérification de l'existence d'une réservation en cours
		if (JSON.parse(sessionStorage.getItem('date')) > 0 ) {
			this.reservationDisplay();
			this.setTimer();
		}
	}

	startReservation() {
		if (!!this.userLastName.value && !!this.userFirstName.value) {
			// Enregistrement du Nom et Prénom en local 
			localStorage.setItem('userLastName', this.userLastName.value);
			localStorage.setItem('userFirstName', this.userFirstName.value);
			// Affichage du canvas
			document.getElementById("stations__reservation_comment").innerHTML = "Veuillez apposer votre signature :";
			$('.stations__form').hide();
			$('.stations__canvas').show();
		} else {
			alert("Pour réserver un vélo, veuillez compléter les champs Nom et Prénom.");
		}
	}

	completeReservation() {
		if (this.canvas.signature === true) {
			if (typeof this.decompte !== 'undefined') {
  				// Si decompte est défini, on annule le compte à rebours
				this.decompte.clearCountdown();
			}
			sessionStorage.clear();
			sessionStorage.setItem('date', new Date().getTime());
			sessionStorage.setItem('stationName', this.stationName.innerHTML);
			sessionStorage.setItem('stationAddress', this.stationAddress.innerHTML);
			this.closeReservationBox();
			this.reservationDisplay();
			this.setTimer();
			$('html, body').animate({
				scrollTop: $("#reservation").offset().top
			}, 1000);
		} else {
			alert("Veuillez apposer votre signature.");
		}
	}

	closeReservationBox() {
		$('.stations__reservation').hide();
		$('.stations__canvas').hide();
		this.canvas.clear();
	}

	// Affichage des informations de la réservation
	reservationDisplay() {
		this.lastName = localStorage.getItem('userLastName');
		this.firstName = localStorage.getItem('userFirstName');
		this.station = sessionStorage.getItem('stationName');
		this.address = sessionStorage.getItem('stationAddress');
		this.timerElt.innerHTML = ' '+this.lastName+' '+this.firstName+', un vélo vous est réservé à la station '+this.station+' située '+this.address+'.';
		$('.reservation__button_cancel').show();
	}

	setTimer() {
		const self = this;
		this.decompte = new Decompte(document.getElementById("countdown"), JSON.parse(sessionStorage.getItem('date')), 1200000);
		this.decompte.countdown();
		// Selectionne le noeud dont les mutations seront observées
		let targetNode = document.getElementById("countdown");
		// Options de l'observateur (quelles sont les mutations à observer)
		let config = { childList: true };
		// Fonction callback à éxécuter quand une mutation est observée
		let callback = function(mutations) {
			for(let mutation of mutations) {
				if ($("#countdown").text() === "Temps restant : 00 minute 00 seconde.") {
					setTimeout(function() {
						self.timerElt.innerHTML = "Votre réservation vient d'expirer.";
						self.clearReservationInformation();
					}, 1000)
				}
			}
		};
		// Créé une instance de l'observateur lié à la fonction de callback
		this.observer = new MutationObserver(callback);
		// Commence à observer le noeud cible pour les mutations précédemment configurées
		this.observer.observe(targetNode, config);
	}

	cancelReservation() {
		this.timerElt.innerHTML = "Votre réservation a bien été annulée.";
		// Arrête l'observation
		this.observer.disconnect();
		this.clearReservationInformation();
	}

	clearReservationInformation() {
		const self = this;
		this.decompte.timerElt.innerHTML = "";
		$('.reservation__button_cancel').hide();
		this.decompte.clearCountdown();
		sessionStorage.clear();
		setTimeout(function() {
			self.timerElt.innerHTML = "Aucune réservation en cours.";
		}, 5000);
	}
}