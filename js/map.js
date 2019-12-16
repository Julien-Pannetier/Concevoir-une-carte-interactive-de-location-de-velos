// Leaflet
  var markersArray = [];

  // Initialisation de la carte
  var mymap = L.map('stations__map').setView([-27.470125, 153.021072], 13);

  // Chargement des "tuiles"
  var OpenStreetMap_France = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
    minZoom: 1,
    maxZoom: 20,
    attribution: '&copy; Openstreetmap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(mymap);

  // Personnalisation des marqueurs
  // A venir...

  //var icons = L.markerClusterGroup();

  //$.get(
  //  'https://api.jcdecaux.com/vls/v1/stations?contract=brisbane&apiKey=041b1c06fd60ac243abd1cadf02347e0fe8a5103',
  //  'false',
  //  testInitialisation,
  //  'json'
  //)

  $.ajax({
    url: 'https://api.jcdecaux.com/vls/v1/stations?contract=brisbane&apiKey=041b1c06fd60ac243abd1cadf02347e0fe8a5103',    
    type: 'GET',
    datatype: 'json',
    success: function(stations) {
      // Affichage des stations
      for(station in stations) {
        // Création d'un marqueur et d'une popup pour chaque station
        var marker = L.marker([stations[station].position.lat, stations[station].position.lng]).addTo(mymap);
        marker.bindPopup("<p>"+stations[station].name+"</p>");
        //icons.addLayer(marker);

        // Ajout du marqueur au tableau
        //markersArray.push(marker);
      }
    }
  })

  // Regroupement des marqueurs dans un groupe Leaflet
  //var group = new L.featureGroup(markersArray);

  // Adaptation du zoom au group
  //mymap.fitBounds(group.getBounds().pad(0.5));

  //mymap.addLayer(icons);