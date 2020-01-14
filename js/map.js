class Carte {

  constructor(idMap, latLng, zoom) {
    this.idMap = idMap; // Identifiant de la carte
    this.latLng = latLng; // Coordonnées de la carte
    this.zoom = zoom; // Niveau de zoom de la carte

    this.addMap();
    this.markerCluster();
  }

  // Ajout de la carte
  addMap() {
    // Initialisation de la carte
    this.map = L.map(this.idMap).setView(this.latLng, this.zoom);
    // Chargement des "tuiles"
    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
      minZoom: 1,
      maxZoom: 20,
      attribution: '&copy; Openstreetmap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);  
  }

  // Ajout de marqueurs à la carte
  addMarkers(lat, lng, icon) {
    this.marker = L.marker([lat, lng], icon);
    this.markerCluster.addLayer(this.marker);
  }

  // Regroupement des marqueurs
  markerCluster() {
    this.markerCluster = L.markerClusterGroup();
    this.map.addLayer(this.markerCluster);  
  }

// ------------------------------------------

  infoStation(name, address, status, bikes, stands) {
    this.marker.on('click', () => {
      const nom = document.getElementById('stations__name');
      nom.innerHTML = name;
      const adresse = document.getElementById('stations__address');
      adresse.innerHTML = address;
      const statut = document.getElementById('stations__status');
      statut.innerHTML = status;
      const velos = document.getElementById('stations__available_bikes');
      velos.innerHTML = bikes;
      const places = document.getElementById('stations__available_bike_stands');
      places.innerHTML = stands;
    })
  }
}