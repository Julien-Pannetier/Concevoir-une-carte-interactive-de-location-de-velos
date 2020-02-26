class Reservation {

	constructor() {
		this.canvas = new Canvas(document.querySelector("#canvas"), document.querySelector("#canvas").getContext('2d'), 150, 280, "#777777", 4, "round", "round");

		this.userLastName = document.getElementById("user__lastName");
		this.userFirstName = document.getElementById("user__firstName");
		this.stationName = document.getElementById("stations__name");
		this.stationAddress = document.getElementById("stations__address");
		this.timerElt = document.getElementById('timer');

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
			clearInterval(this.timer);
			sessionStorage.clear();
			sessionStorage.setItem('date', new Date().getTime());
			sessionStorage.setItem('stationName', this.stationName.innerHTML);
			sessionStorage.setItem('stationAddress', this.stationAddress.innerHTML);
			this.closeReservationBox();
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

	setTimer() {
		const self = this;
		this.timer = setInterval(function() {
			// Récupération de la date actuelle
			this.now = new Date().getTime();
			// Récupération de la date de la réservation dans session storage   
			this.reservationDate = JSON.parse(sessionStorage.getItem('date'));
			// Comparaison des deux dates et création du décompte
			this.secondes = ((this.reservationDate + 1200000) - this.now)/1000;
			this.minutes = Math.floor(this.secondes / 60);
			this.secondes -= this.minutes * 60;
			this.secondes = Math.floor(this.secondes);
			// Affichage du décompte
			this.lastName = localStorage.getItem('userLastName');
			this.firstName = localStorage.getItem('userFirstName');
			this.station = sessionStorage.getItem('stationName');
			this.address = sessionStorage.getItem('stationAddress');
			self.timerElt.innerHTML = ' '+this.lastName+' '+this.firstName+', un vélo vous est réservé à la station '+this.station+' située '+this.address+ '.<br>Cette réservation expire dans '+this.minutes+' minute'+(this.minutes>1?'s':'')+' et '+this.secondes+' seconde'+(this.secondes>1?'s':'')+'.';
			$('.reservation__button_cancel').show();	
			if (this.minutes === 0 && this.secondes === 0) {
				setTimeout(function() {
					self.timerElt.innerHTML = "Votre réservation vient d'expirer.";
					$('.reservation__button_cancel').hide();
					clearInterval(self.timer);
					sessionStorage.clear();
					setTimeout(function() {
						self.timerElt.innerHTML = "Aucune réservation en cours.";
					}, 5000);
				}, 1000);
			};
		}, 1000);
	}

	cancelReservation() {
		const self = this;
		this.timerElt.innerHTML = "Votre réservation a bien été annulée.";    
		$('.reservation__button_cancel').hide();
		clearInterval(this.timer);
		sessionStorage.clear();
		setTimeout(function() {
			self.timerElt.innerHTML = "Aucune réservation en cours.";
		}, 5000);
	}
}