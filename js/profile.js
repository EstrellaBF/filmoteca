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
        '<li><a href="../index.html">Cerrar Sesión</a></li>' +
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
      '<li><a href="../index.html" id="close">Cerrar Sesión</a></li>' +
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
}
$(document).ready(begin);