class Carte {

  constructor(idMap, lngLat, contractName, apiKey) {
    this.idMap = idMap; // Identifiant de la carte
    this.lngLat = lngLat; // Coordonnées de la carte
    this.contractName = contractName; // Nom du contrat
    this.apiKey = apiKey; // Clé de l'API

    this.addMap();
    this.addMarkers();
  }

  addMap() {
    // Initialisation de la carte
    this.map = L.map(this.idMap).setView(this.lngLat, 14);
    // Chargement des "tuiles"
    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
      minZoom: 1,
      maxZoom: 20,
      attribution: '&copy; Openstreetmap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }  

  addMarkers() {
    let markers = L.markerClusterGroup();
    //Personnalisation des marqueurs
    let iconsColor;
    // Récupération des informations sur les stations
    $.getJSON('https://api.jcdecaux.com/vls/v1/stations?contract=' + this.contractName + '&apiKey=' + this.apiKey, function(stations) {
      // Affichage des stations
      for(let station in stations) {
        // Création d'un marqueur et d'une popup pour chaque station
        if (stations[station].status === "CLOSED") {
          iconsColor = "red"
        } else if (stations[station].status === "OPEN" && stations[station].available_bikes === 0) {
          iconsColor = "orange"
        } else if (stations[station].status === "OPEN" && stations[station].available_bikes > 0) {
          iconsColor = "green"
        }
        let icons = L.icon({
          iconUrl: 'images/marker__icon_' + iconsColor + '.png'
        });
        let marker = L.marker([stations[station].position.lat, stations[station].position.lng], {icon: icons});
        marker.bindPopup('<p>' + stations[station].name + '</p>');
        // Affichage des informations de la station au clic sur le marqueur
        marker.on('click', (e) => {
          $('.stations__name').append(' '+ stations[station].name)
          $('.stations__address').append(' '+ stations[station].address)
          $('.stations__status').append(' '+ stations[station].status)          
          $('.stations__available_bike_stands').append(' '+ stations[station].available_bike_stands)
          $('.stations__available_bikes').append(' '+ stations[station].available_bikes)
        })
        markers.addLayer(marker);
      }
    })
    this.map.addLayer(markers);
  }
}