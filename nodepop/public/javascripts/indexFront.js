// Checkbox formulario: almenos uno marcado
const form = document.querySelector('form');
const validador = document.getElementById('validador');

form.addEventListener('submit', e => {
  const cb = document.querySelectorAll('.form__campo__tags input:checked');
  if (cb.length === 0) {
    validador.innerHTML = 'Tienes que marcar al menos una categoría.'
    e.preventDefault();
  }
})

// Validar imagen tipo .jpg, .jpeg, .png
const imagen = document.getElementById('foto');

imagen.addEventListener('change', e => {
  console.log(e.target.files[0]);
  if (e.target.files[0].type !== 'image/jpeg' && e.target.files[0].type !== 'image/png'){
    validador.innerHTML = 'Solo se aceptan imagenes con formatos .jpg, .jpeg y .png.';
    imagen.value = ''; // deseleccionamos el archivo que no es el requerido
  }
})