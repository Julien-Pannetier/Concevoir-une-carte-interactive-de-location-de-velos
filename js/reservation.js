class Reservation {

  constructor(station) {
    this.station = station;

    this.userLastName = document.getElementById("user__lastName");
    this.userFirstName = document.getElementById("user__firstName");
    this.stationName = document.getElementById("stations__name");
    this.stationAddress = document.getElementById("stations__address");

    $('.reservation__button').click(this.save.bind(this))

  }


  addReservation() {

    // Affichage d'un message si la station est fermée

    document.getElementById("stations__comment").innerHTML = "Cette station est actuellement fermée. Veuillez sélectionner une autre station.";
    

    // Affichage d'un message si la station est ouverte mais qu'aucun vélo n'est disponible

    document.getElementById("stations__comment").innerHTML = "Cette station n'a plus de vélo disponible. Veuillez sélectionner une autre station.";


    // Affichage du formulaire avec nom et prénom + bouton Réserver



    // Au clic, faire apparaître le canvas

    // Validation de la réservation

    // Réservation valable pendant 20min
  }




  // Vérification du stockage en local du nom et prénom de l'utilisateur


  // Vérification si une réservation est en cours


  // Enregistrement des informations nécessaires à la réservation en local
  save() {
    localStorage.setItem('userLastName', this.userLastName.value);
    localStorage.setItem('userFirstName', this.userFirstName.value);
    sessionStorage.setItem('stationName', this.stationName.innerHTML);
    sessionStorage.setItem('stationAddress', this.stationAddress.innerHTML);
  }

  // Vérification si les données nom et prénom sont déjà stockées
  storage() {
    this.userLastName.value = localStorage.getItem('userLastName');
    this.userFirstName.value = localStorage.getItem('userFirstName');
  }

  // Suppression des informations contenues dans le local storage
  clearLocalStorage () {
    localStorage.clear();
  }

}