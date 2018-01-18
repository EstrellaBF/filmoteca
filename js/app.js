function begin() {
  var btnRegistry = $('#btnRegistry');
  var btnAccess = $('#btnAccess');
  registry();
  login();
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
    $('#names').on('input', function() {
      var NAMES = /^([A-z ñáéíóú]{2,8})$/;
      if (NAMES.test($(this).val())) {
        validateNames = true;
        activeButton();
      } else {
        desactiveButton();
      }
    });
    /* Validar al escribir correo */
    $('#email').on('input', function() {
      var exp = /^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/;
      if (exp.test($(this).val())) {
        validateEmail = true;
        activeButton(); 
      } else {
        desactiveButton();
      }
    });
    /* Validar al escribir contraseña */
    $('#password').on('input', function() {
      if($(this).val().length > 6) {
        validatePassword = true;
        activeButton(); 
      } else {
        desactiveButton();
      }
    });

    $checked.on('click', function(event) {
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
      firebase.auth().createUserWithEmailAndPassword(email, password).then(()=> {
        firebase.database().ref('registrito')
        .set({
          nombres: names
        });
        alert('Registro OK');
      }).catch(function(error) {
        /** Handle Errors here. */
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        alert(errorMessage);
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
    $('#user').on('input', function() {
      var exp = /^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/;
      if (exp.test($(this).val())) {
        validateEmail = true;
        activeButton(); 
      } else {
        desactiveButton();
      }
    });

    /* Validar al escribir contraseña */
    $('#key').on('input', function() {
      if($(this).val().length > 6) {
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
    btnAccess.on('click', function(event) {
      event.preventDefault();
      var email2 = $('#user').val();
      var password2 = $('#key').val();
      /*
      firebase.auth().signInWithEmailAndPassword(email2, password2).then(()=>{
        aler("ssdsd");
      }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
      
    }); */
    firebase.auth().signInWithEmailAndPassword(email2, password2).then(()=> {
      $( "span.content-header" ).html( '<h5>'+localStorage.nombres+'</h5>' );
    }).catch(function(error) {
      // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode) {
          alert(errorMessage);
        }
      });

    });    
  };
}
$(document).ready(begin);