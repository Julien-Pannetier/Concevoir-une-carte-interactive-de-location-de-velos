$(function() {

  //const scrollspy = new Scrollspy(0.6, $(".scrollspy"));
  const slider = new Slider($(".slider__container"));

  const carte = new Carte("stations__map", [-27.470125, 153.021072], 14);
  const reservation = new Reservation();
  const station = new Station("brisbane", "041b1c06fd60ac243abd1cadf02347e0fe8a5103", carte, reservation);

});