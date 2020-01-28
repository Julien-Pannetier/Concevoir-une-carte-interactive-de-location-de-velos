class Reservation {

  constructor() {
    this.canvas = new Canvas(document.querySelector("#stations__canvas"), document.querySelector("#stations__canvas").getContext('2d'), 200, 200, "black", 5, "round", "round");

    this.userLastName = document.getElementById("user__lastName");
    this.userFirstName = document.getElementById("user__firstName");
    this.stationName = document.getElementById("stations__name");
    this.stationAddress = document.getElementById("stations__address");

    this.counter = 5;
    this.timerElt = document.getElementById('timer');

    $('.reservation__button').click(this.save.bind(this))
    $('.canvas__button_validate').click(this.setReservation.bind(this))
  }

  checkInformation() {
    // Vérification de l'existence des données nom et prénom dans le local storage
    this.userLastName.value = localStorage.getItem('userLastName');
    this.userFirstName.value = localStorage.getItem('userFirstName');
    // Vérification de l'existence d'une réservation en cours
  }

 save() {
    if (!!this.userLastName.value && !!this.userFirstName.value) {
   // Enregistrement du Nom et Prénom en local 
      localStorage.setItem('userLastName', this.userLastName.value);
      localStorage.setItem('userFirstName', this.userFirstName.value);
      // Affichage du canvas
      document.getElementById("stations__comment").innerHTML = "Veuillez apposer votre signature.";
      $('#stations__form').hide();
      $('#stations__canvas').show();
      $('.canvas__button_validate').show();
      $('.canvas__button_clear').show();
    } else {
      alert("Veuillez compléter les champs Nom et Prénom.")
    }
  }

  setReservation() {
    if (this.canvas.signature === true) {
      $('.stations__reservation').removeClass('active')
      sessionStorage.setItem('date', new Date().getTime());
      sessionStorage.setItem('stationName', this.stationName.innerHTML);
      sessionStorage.setItem('stationAddress', this.stationAddress.innerHTML);
      $('.reservation__button_cancel').show();
      this.setDate();
    } else {
      alert("Veuillez apposer votre signature.")
    }
  }

  setDate(){
    const self = this;
    this.timer = setInterval(function() {
      self.timerElt.innerHTML = self.counter;
      self.counter--;
      if (self.counter === 0) {
        setTimeout(function(){
          self.timerElt.innerHTML = "Aucune réservation en cours";
          clearInterval(self.timer);
        }, 1000);
      };
    }, 1000);
  }


/*
  setDate() {
    // Récupération de la date actuelle
    this.now = new Date().getTime();
    // Récupération de la date de la réservation dans le session storage   
    this.reservationDate = sessionStorage.getItem('date') + 10000;
    // Comparaison des deux dates et création du décompte
    this.seconde = (this.reservationDate - this.now)/1000;
    this.minute = Math.floor(this.seconde / 60);
    this.seconde -= this.minute * 60;
    this.seconde = Math.floor(this.seconde);
    // Affichage du décompte
    this.timerElt.innerHTML = 'Votre réservation expire dans '+this.seconde
    //'Votre réservation expire dans '+this.minute+' minute'+(this.minute>1?'s':'')+' et '+this.seconde' seconde'+(this.seconde>1?'s':'');
    setTimeout(this.setDate(), 1000);
  }
*/


    // Au clic sur le bouton "Réserver", faire apparaître le canvas



    //Stockage des informations de la station dans un session storage




    // Validation de la réservation

    // Réservation valable pendant 20min





  // Vérification du stockage en local du nom et prénom de l'utilisateur


  // Vérification si une réservation est en cours






  // Suppression des informations contenues dans le local storage
  clearLocalStorage () {
    localStorage.clear();
  }

}