$(document).ready(function() {
  var $searchForm = $('#search-form');
  var $moviesSelected = $('#movies-selected')
  console.log($moviesSelected);
  // 
  $searchForm.on('submit', function(event) {
    var searchText = $searchForm.find('input').val();
    // console.log(searchText);
    // Le paso la función getMovies que buscará en el API de OMDB
    getMovies(searchText);
    event.preventDefault();
  });

  // Función para buscar la película por título
  function getMovies(searchText) {
    console.log(searchText);
    axios.get('http://www.omdbapi.com/?s=' + searchText +'&apikey=3a0eede3')
      .then(function(response) {
        // Un array con todos los títulos que coinciden
        console.log(response.data.Search); 
        var movieSearch = response.data.Search;
        var output = '';
        // Recosrrer en un lugar de for
        $.each(movieSearch, function(index, value) {
          // console.log(index); // devuelve posición, 0, 1, 2, etc    
          // console.log(value); //Objeto que contiene tittle, year, etc
          console.log(movieSearch[index]);
          output += `
            <div class="col-xs-6 col-md-3">
              <div class="movie-box text-center">
                <img src="${value.Poster}">
                <h5>${value.Title}</h5>
              </div>
            </div>
          `;
          // $moviesSelected.append('<div class="col-xs-6"><div class="movie-wrap"><img src=""><h4><a href=""></div></div>');
          // $('.movie-wrap').find('img').prop('src', movieSearch[index].Poster)
        });
        $moviesSelected.html(output);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

});