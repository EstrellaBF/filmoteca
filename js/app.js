/* ------------ FUNCIONALIDAD PARA SUBIR FOTOS ------------*/
/** Función para postear  */
function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function(e) {
      $('#image1')
        .attr('src', e.target.result);
    };
    reader.readAsDataURL(input.files[0]);
  }
}
