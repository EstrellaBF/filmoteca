$(document).ready(function() {
  var $searchForm = $('#search-form');
  console.log($searchForm);
  // 
  $searchForm.on('submit', function(event) {
    var searchText = $searchForm.find('input').val();
    // console.log(searchText);
    // Le paso la función getMovies que buscará en el API de OMDB
    getMovies(searchText);
    event.preventDefault();
  });


  function getMovies(searchText) {
    console.log(searchText);
    axios.get('http://www.omdbapi.com/?s=' + searchText+'&apikey=3a0eede3')
      .then(function(response) {
        console.log(response);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  
  // var $searchMovieInput = $('#search-movie-input');
  

  // omdb.set_default('apikey', 3a0eede3)
  // // Capturando el contenido del input
  // $searchMovieInput.on('input', getTheMovie);

  // // Función para capturar el evento del input
  // function getTheMovie() {
  //   $(this).val();
  // }

  // // Función para llamar al API de OMDB
  // function apiCall() {
  //   $.getJSON('https://www.omdbapi.com/?t=' + encodeURI('batman')).then(function(response) {
  //     console.log(response);
  //   });
  // }

  // apiCall();
});