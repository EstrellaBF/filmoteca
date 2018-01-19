$(document).ready(function() {
  var $movieInfoPicked = $('#movie-info-picked');
  var $viewedButton = $('#viewed-button');

  // Pluggin
  $('#star1').rating('votar.php', { maxvalue: 5, curvalue: 1, id : 20 });

  // Cojiendo el valor del título
  $movieInfoPicked.find('h4').text(localStorage.saveTitlePicked);

  // Make a request for a user with a given ID
  axios.get('http://www.omdbapi.com/?s=' + localStorage.saveTitlePicked + '&apikey=3a0eede3')
    .then(function(response) {
      var movieSearch2 = response.data.Search;
      $.each(movieSearch2, function(index, value) {
        // console.log(index);
        // console.log(value);
        // console.log(value.Title);
        if (value.Title === localStorage.saveTitlePicked) {
          console.log(value.Poster);
          // console.log($movieInfoPicked.find('img').prop('src'));
          $movieInfoPicked.find('img').attr('src', value.Poster)
        }
      });
    })
    .catch(function(error) {
      console.log(error);
    });

  // Evento para el boton de visto
  $viewedButton.on('click', function() {

  });

});