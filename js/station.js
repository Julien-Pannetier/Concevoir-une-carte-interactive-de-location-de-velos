class Station {

	constructor(contractName, apiKey, carte, reservation) {
		this.contractName = contractName; // Nom du contrat JCDecaux
		this.apiKey = apiKey; // Clé de l'API
		this.carte = carte; // Objet carte
		this.reservation = reservation; // Objet réservation

		this.getStations();
	}

	// Récupération des données des stations
	getStations() {
		const self = this;
		$.getJSON('https://api.jcdecaux.com/vls/v1/stations?contract=' + this.contractName + '&apiKey=' + this.apiKey, function(stations) {
			stations.forEach(station => {
				// Personnalisation des icônes des marqueurs
				let iconsColor;
				if (station.status === "CLOSED") {
					iconsColor = "red";
				} else if (station.status === "OPEN" && station.available_bikes === 0) {
					iconsColor = "orange";
				} else if (station.status === "OPEN" && station.available_bikes > 0) {
					iconsColor = "green";
				}
				let icons = L.icon({
					iconUrl: 'images/marker__icon_' + iconsColor + '.png'
				});
				// Ajout des marqueurs à la carte
				self.carte.addMarkers(station.position.lat, station.position.lng, {icon: icons});
				// Création d'un événement personnalisé au click sur le marqueur
				self.carte.addCustomEvent(self.carte.marker, 'click', self.stationClick(station).bind(self));
			})
		})
	}

	// Affichage des informations de la station au click sur le marqueur
	stationClick = station => () => {
		const infoStation = {
			name: document.getElementById('stations__name'),
			address: document.getElementById('stations__address'),
			status: document.getElementById('stations__status'),
			bikes: document.getElementById('stations__available_bikes'),
			stands: document.getElementById('stations__available_bike_stands')
		};
		this.reservation.closeReservationBox();
		$('.stations__reservation').show();
		infoStation.name.innerHTML = station.name;
		infoStation.address.innerHTML = station.address;
		infoStation.status.innerHTML = station.status;
		infoStation.bikes.innerHTML = station.available_bikes;
		infoStation.stands.innerHTML = station.available_bike_stands;
		if (station.status === "CLOSED") {
			document.getElementById("stations__reservation_comment").innerHTML = "Cette station est actuellement fermée.";
			$('.stations__form').hide();
		} else if (station.status === "OPEN" && station.available_bikes === 0) {
			document.getElementById("stations__reservation_comment").innerHTML = "Il n'y a plus de vélo disponible à cette station.";
			$('.stations__form').hide();
		} else if (station.status === "OPEN" && station.available_bikes > 0) {
			document.getElementById("stations__reservation_comment").innerHTML = "Veuillez compléter les champs Nom et Prénom :";
			$('.stations__form').show();
		}
	}
}