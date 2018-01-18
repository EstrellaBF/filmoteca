$(document).ready(function() {
  var $movieInfoPicked = $('#movie-info-picked');

  // Pluggin
  $('#star1').rating('votar.php', {maxvalue: 5, curvalue:1, id:20});

  // Cojiendo el valor del título
  $movieInfoPicked.find('h4').text(localStorage.saveTitlePicked);
});