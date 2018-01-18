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
        console.log(response); 
        console.log(response.data.Search); 
        var movieSearch = response.data.Search;
        var output = '';
        // Recorrer en un lugar de for
        $.each(movieSearch, function(index, value) {
          // console.log(index); // devuelve posición, 0, 1, 2, etc    
          // console.log(value); //Objeto que contiene tittle, year, etc
          // console.log(movieSearch[index]);
          // console.log(movieSearch);
          output += `
            <div class="col-xs-6 col-md-3 clearfix">
              <div class="movie-box text-center">
                <img src="${value.Poster}">
                <button type="button" class="btn btn-info pick-this-movie">${value.Title}</button>
              </div>
            </div>
          `;
        });
        $moviesSelected.html(output);
        
        
        // Función para jalar el contenido del botón al hacer click
        $('.pick-this-movie').on('click', function() {
          var posterMoviePicked = $(this).parent();
          console.log(posterMoviePicked.find('img').attr('src'));
          var titlePicked = $(this).text();
          // Almacenando temporalmente el nombre del título y la foto
          localStorage.saveTitlePicked = titlePicked;
          $(location).attr('href','views/movie.html');
        });

      })
      .catch(function(err) {
        console.log(err);
      });
  };


});