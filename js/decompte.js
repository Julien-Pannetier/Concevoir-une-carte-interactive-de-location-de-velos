class Decompte {

	constructor(timerElt, targetTime, countdownDuration) {
		this.timerElt = timerElt; // Element HTML où est affiché le compte à rebours
		this.targetTime = targetTime; // Date cible du compte à rebours
		this.countdownDuration = countdownDuration; // Durée du compte à rebours en millisecondes
	}

	countdown() {
		const self = this;
		this.timer = setInterval(function() {	
			// Récupération de la date actuelle
			this.now = new Date().getTime();
			// Comparaison de la date actuelle avec la date cible et calcul du temps restant
			this.secondes = ((self.targetTime + self.countdownDuration) - this.now)/1000;
			this.minutes = Math.floor(this.secondes / 60);
			this.secondes -= this.minutes * 60;
			this.secondes = Math.floor(this.secondes);
			// Affichage du compte à rebours
			self.timerElt.innerHTML = 'Temps restant : '+(this.minutes<10?'0':'')+this.minutes+' minute'+(this.minutes>1?'s':'')+' '+(this.secondes<10?'0':'')+this.secondes+' seconde'+(this.secondes>1?'s':'')+'.';	
			if (this.minutes === 0 && this.secondes === 0) {
				self.clearCountdown();
			};
		}, 1000)
	}

	clearCountdown() {
		clearInterval(this.timer);
	}
}