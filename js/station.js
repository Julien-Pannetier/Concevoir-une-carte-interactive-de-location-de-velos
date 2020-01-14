class Station {

  constructor(contractName, apiKey, carte) {
    this.contractName = contractName; // Nom du contrat JCDecaux
    this.apiKey = apiKey; // Clé de l'API
    this.carte = carte; // Objet carte
    this.name = "";
    this.address = "";
    this.lat = "";
    this.lng = "";
    this.status = "test";
    this.bikes = "";
    this.stands = "";

    this.getStations();
  }
  
  // Récupération des données des stations 
  getStations() {
    const self = this;
    $.getJSON('https://api.jcdecaux.com/vls/v1/stations?contract=' + this.contractName + '&apiKey=' + this.apiKey, function(stations) {
      for(let station in stations) {
        // Personnalisation des icônes des marqueurs
        let iconsColor;
        if (stations[station].status === "CLOSED") {
          iconsColor = "red";
          } else if (stations[station].status === "OPEN" && stations[station].available_bikes === 0) {
          iconsColor = "orange";
          } else if (stations[station].status === "OPEN" && stations[station].available_bikes > 0) {
          iconsColor = "green";
          }
        let icons = L.icon({
          iconUrl: 'images/marker__icon_' + iconsColor + '.png'
        });
        self.carte.addMarkers(stations[station].position.lat, stations[station].position.lng, {icon: icons});
        self.carte.infoStation(stations[station].name, stations[station].address, stations[station].status, stations[station].available_bikes, stations[station].available_bike_stands);
      }
    })
  }
}