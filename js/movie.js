$(document).ready(function() {
  var $movieInfoPicked = $('#movie-info-picked');

  // Pluggin
  $('#star1').rating('votar.php', {maxvalue: 5, curvalue:1, id:20});

  // Cojiendo el valor del título
  $movieInfoPicked.find('h4').text(localStorage.saveTitlePicked);

  // Make a request for a user with a given ID
  axios.get('http://www.omdbapi.com/?s=' + localStorage.saveTitlePicked +'&apikey=3a0eede3')
    .then(function (response) {
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


  // axios.get('http://www.omdbapi.com/?s=' + searchText +'&apikey=3a0eede3')
  // .then(function(response) {
  //   // Un array con todos los títulos que coinciden
  //   console.log(response.data.Search); 
  //   var movieSearch = response.data.Search;
  //   var output = '';
  //   // Recorrer en un lugar de for
  //   $.each(movieSearch, function(index, value) {
  //     // console.log(index); // devuelve posición, 0, 1, 2, etc    
  //     // console.log(value); //Objeto que contiene tittle, year, etc
  //     // console.log(movieSearch[index]);
  //     // console.log(movieSearch);
  //     output += `
  //       <div class="col-xs-6 col-md-3 clearfix">
  //         <div class="movie-box text-center">
  //           <img src="${value.Poster}">
  //           <button type="button" class="btn btn-info pick-this-movie">${value.Title}</button>
  //         </div>
  //       </div>
  //     `;
      // $moviesSelected.append('<div class="col-xs-6"><div class="movie-wrap"><img src=""><h4><a href=""></div></div>');
      // $('.movie-wrap').find('img').prop('src', movieSearch[index].Poster)   

    // });







});