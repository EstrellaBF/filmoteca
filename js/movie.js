$(document).ready(function () {
  var $movieInfoPicked = $('#movie-info-picked');
  var $viewedButton = $('#viewed-button');
  var $movieDataInfo = $('#movie-data-info');
  var imdbIDSelected;
  var $textAreaComment = $('#text-area-comment');
  var $publishCommentButton = $('#publish-comment-button');
  var getComment;
  verifySesion();

  /* Funcion para verificar inicio de sesion o close sesion */
  function verifySesion() {
    console.log(jQuery.type(localStorage.tempAccess));
    if (localStorage.tempAccess === 'true') {
      console.log('Ingresa al true de tempAccess');
      $('.title-header').html(
        '<div id="title-header" class="collapse navbar-collapse title-header" id="bs-example-navbar-collapse-1">' +
        '<ul class="nav navbar-nav navbar-right">' +
        '<li class="dropdown">' +
        '<a href="" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">' + localStorage.nombres + '<span class="caret"></span></a>' +
        '<ul class="dropdown-menu">' +
        '<li><a href="views/profile.html">Perfil</a></li>' +
        '<li><a href="index.html" id="close">Cerrar Sesión</a></li>' +
        '</ul>' +
        '</li>' +
        '</ul>' +
        '</div>'
      );
    } else {
      console.log('Ingresa al false de tempAccess');
      $('.title-header').html(
        '<ul class="nav navbar-nav navbar-right">' +
        '<li>' +
        '<a href="#modal-sesion" data-toggle="modal">Iniciar Sesión</a>' +
        '</li>' +
        '<li>' +
        '<a href="#modal-registry" data-toggle="modal" class="t-w">Registrate</a>' +
        '</li>' +
        '</ul>'
      );
    }

    /* Evento cerrar sesion */
    $('#close').on('click', function () {
      localStorage.tempAccess = false;
    });
  }
  
  // Pluggin
  // $('#star1').rating('votar.php', { maxvalue: 5, curvalue: 1, id: 20 });

  // Grab the title and saving at localStorage
  $movieInfoPicked.find('h4').text(localStorage.saveTitlePicked);

  // console.log(localStorage.idPicked);
  axios.get('http://www.omdbapi.com/?i=' + localStorage.idPicked + '&apikey=3a0eede3')
    .then(function (response) {
      // console.log(response.data.Ratings[0]);
      // console.log(response.data.Ratings[0].Source);
      console.log(response);
      var infoById = response.data;
      // console.log(infoById);
      // añadiendo la imagen correspondiente
      $('#movie-info-picked').find('img').attr('src', response.data.Poster);
      // Añadiendo a los div correspondientes
      $('#plot p').text(infoById.Plot);
      $('#actors p').text(infoById.Actors);
      $('#awards p').text(infoById.Awards);
      $('#year p').text(infoById.Year);
      $('#genre p').text(infoById.Genre);
      $('#imdb span').text(infoById.Ratings[0].Source);
      $('#imdb p').text(infoById.Ratings[0].Value);
      $('#rotten-Tomatoes span').text(infoById.Ratings[1].Source);
      $('#rotten-Tomatoes p').text(infoById.Ratings[1].Value);
      $('#metacritic span').text(infoById.Ratings[2].Source);
      $('#metacritic p').text(infoById.Ratings[2].Value);
    })
    .catch(function (error) {
      console.log(error);
    });

  // Function to comment
  console.log($textAreaComment);
  console.log($publishCommentButton);

  // Evento para el texto que se ingresa en el área de comentarios
  // function commentValue(){  }
  $textAreaComment.on('click', function(event) {
    getComment = $(this).val();
  })

});