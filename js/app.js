function begin() {
  var btnRegistry = $('#btnRegistry');
  var btnAccess = $('#btnAccess');
  var tempAccess = false;
  registry();
  login();
  verifySesion();

  /* Función para crear registro de usuario en Firebase*/
  function registry() {
    var validateNames = false;
    var validateEmail = false;
    var validatePassword = false;
    var validateChecked = false;
    var $checked = $('input[type="checkbox"]');

    /**  Validar todos los campos **/

    /* Activar Boton registrar */
    function activeButton() {
      if (validateNames && validateEmail && validatePassword && validateChecked) {
        btnRegistry.attr('disabled', false);
      }
    }
    /* Desactivar Boton registrar */
    function desactiveButton() {
      btnRegistry.attr('disabled', true);
    }

    /* Validar al escribir en nombres */
    $('#names').on('input', function () {
      var NAMES = /^([A-z ñáéíóú]{2,8})$/;
      if (NAMES.test($(this).val())) {
        validateNames = true;
        activeButton();
      } else {
        desactiveButton();
      }
    });
    /* Validar al escribir correo */
    $('#email').on('input', function () {
      var exp = /^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/;
      if (exp.test($(this).val())) {
        validateEmail = true;
        activeButton();
      } else {
        desactiveButton();
      }
    });
    /* Validar al escribir contraseña */
    $('#password').on('input', function () {
      if ($(this).val().length > 6) {
        validatePassword = true;
        activeButton();
      } else {
        desactiveButton();
      }
    });

    $checked.on('click', function (event) {
      if ($checked.prop('checked')) {
        validateChecked = true;
        activeButton();
      } else {
        desactiveButton();
      }
    });
    /* Registro en firebase */
    btnRegistry.on('click', function (event) {
      event.preventDefault();
      var email = $('#email').val();
      var password = $('#password').val();
      var names = $('#names').val();
      localStorage.nombres = $('#names').val();
      localStorage.email = $('#email').val();
      localStorage.password = $('#password').val();


      firebase.auth().createUserWithEmailAndPassword(email, password).then(function (result) {
        var newUser = {
          uid: result.uid,
          names: localStorage.nombres,
          email: localStorage.email
        };

        firebase.database().ref('registro/' + result.uid).set(newUser);

        alert('Registro OK');
      }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert('Usuario ya registrado');
      });

      $('#names').val('');
      $('#email').val('');
      $('#password').val('');
      $checked.prop('checked', false);
    });
  }

  /* Función para identificar sign in en Firebase.*/
  function login() {
    var validateEmail = false;
    var validatePassword = false;

    /* Validar al escribir correo */
    $('#user').on('input', function () {
      var exp = /^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/;
      if (exp.test($(this).val())) {
        validateEmail = true;
        activeButton();
      } else {
        desactiveButton();
      }
    });

    /* Validar al escribir contraseña */
    $('#key').on('input', function () {
      if ($(this).val().length > 6) {
        validatePassword = true;
        activeButton();
      } else {
        desactiveButton();
      }
    });

    /* Activar Boton registrar */
    function activeButton() {
      if (validateEmail && validatePassword) {
        btnAccess.attr('disabled', false);
      }
    }

    /* Desactivar Boton registrar */
    function desactiveButton() {
      btnAccess.attr('disabled', true);
    }
    /* Comparar correo y password */
    btnAccess.on('click', function (event) {
      event.preventDefault();
      var email = $('#user').val();
      var password = $('#key').val();
      firebase.auth().signInWithEmailAndPassword(email, password).then(function (result) {
        $('.title-header').html(
          '<div id="title-header" class="collapse navbar-collapse title-header" id="bs-example-navbar-collapse-1">' +
          '<ul class="nav navbar-nav navbar-right">' +
          '<li class="dropdown">' +
          '<a href="" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">' + localStorage.nombres + '<span class="caret"></span></a>' +
          '<ul class="dropdown-menu">' +
          '<li><a href="views/profile.html">Perfil</a></li>' +
          '<li><a href="index.html">Cerrar Sesión</a></li>' +
          '</ul>' +
          '</li>' +
          '</ul>' +
          '</div>'
        );
        tempAccess = true;
        localStorage.tempAccess = tempAccess;
      }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode) {
          alert(errorMessage);
        }
      });

    });
  };

  /* Funcion para verificar inicio de sesion o close sesion */
  function verifySesion() {
    var index;
    console.log(jQuery(location).attr('href'));
    if (localStorage.tempAccess === 'true') {
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

  /* Estrella  */
  var $searchForm = $('#search-form');
  var $moviesSelected = $('#movies-selected');
  var $clickMoviePredetermined = $('.click-movie-predetermined');
  var idMovieSelected;
  var movieSearch;
  var searchText;
  var divMovieParent;

  // Event for predetermined movies which is in the main page
  $clickMoviePredetermined.on('click', function () {
    // Save id movie at variable
    var movieIdClick = $(this).parent().find('p').text();
    console.log(movieIdClick);
    // Make a request for a user with a given ID
    axios.get('http://www.omdbapi.com/?i=' + movieIdClick + '&apikey=3a0eede3')
      .then(function (response) {
        console.log(response.data);
        localStorage.saveTitlePicked = response.data.Title;
        localStorage.savePosterPicked = response.data.Poster;
        localStorage.idPicked = response.data.imdbID;
        $(location).attr('href', 'views/movie.html');
      })
      .catch(function (error) {
        console.log(error);
      });
  });

  // Event for capture the movie that want to search 
  $searchForm.on('submit', function (event) {
    searchText = $searchForm.find('input').val();
    // console.log(searchText);
    // Le paso la función getMovies que buscará en el API de OMDB
    getMovies(searchText);
    event.preventDefault();
  });

  // Function for get the movie by title
  function getMovies(searchText) {
    console.log(searchText);
    axios.get('http://www.omdbapi.com/?s=' + searchText + '&apikey=3a0eede3')
      .then(function (response) {
        // Un array con todos los títulos que coinciden
        console.log(response);
        console.log(response.data.Search);
        movieSearch = response.data.Search;
        var output = '';
        $('#predetermined-movies').hide();
        $.each(movieSearch, function (index, value) {
          // console.log(index); // devuelve posición, 0, 1, 2, etc    
          output += `
            <div class="col-xs-6 col-md-3 clearfix">
              <div class="movie-box text-center">
                <img src="${value.Poster}">
                <button type="button" class="btn btn-info pick-this-movie">${value.Title}</button>
                <p class="hidden">${value.imdbID}</p>
              </div>
            </div>
          `;
        });
        $moviesSelected.html(output);

        // Function fot get the movie's info
        $('.pick-this-movie').on('click', function () {
          divMovieParent = $(this).parent();
          console.log(divMovieParent.find('p').text());
          idMovieSelected = divMovieParent.find('p').text();
          console.log(idMovieSelected);
          axios.get('http://www.omdbapi.com/?i=' + idMovieSelected + '&apikey=3a0eede3')
            .then(function (response) {
              console.log(response.data);
              localStorage.saveTitlePicked = response.data.Title;
              localStorage.savePosterPicked = response.data.Poster;
              localStorage.idPicked = idMovieSelected;
              console.log(idMovieSelected);
              $(location).attr('href', 'views/movie.html');
            })
            .catch(function (error) {
              console.log(error);
            });
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  /* Alejandra Hoces */
  /* ------------ FUNCIONALIDAD PARA SUBIR FOTOS ------------*/
  /** Función para postear  */
  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (event) {
        $('#image1')
          .attr('src', event.target.result);
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
}
$(document).ready(begin);