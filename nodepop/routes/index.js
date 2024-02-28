var express = require('express');
var router = express.Router();
const Anuncio = require('../models/Anuncio');
const {listado, renombrarImagen} = require('../lib/utils');
const { validacionPrecio, validacionVenta, validacionTags, validacionPrecioMin, validacionPrecioMax, validacionNombre, validacionNoFieldsWeb } = require('../lib/validaciones');
const { validationResult } = require('express-validator');
const multer = require('multer');
const upload = multer({dest: './public/images'});


// GET home page
router.get('/', [validacionPrecio, validacionVenta, validacionTags, validacionPrecioMin, validacionPrecioMax, validacionNombre, validacionNoFieldsWeb], async function(req, res, next) {
  try {
    validationResult(req).throw(); // lanza el error si alguna validación no ha pasado
    const anuncios = await listado(req, Anuncio);
    res.render('index', { title: 'Nodepop', anuncios: anuncios, error: false });
 
  } catch (error) {
    if (error.array) {
      const errorInfo = error.array({})[0];
      error.message = `Campo no válido - ${errorInfo.type} ${errorInfo.path} in ${errorInfo.location} ${errorInfo.msg}`;
      error.status = 422;
    }
    
    res.render('index', {title: 'Nodepop', error: error});
  }
});

// POST home page
// crear anuncio con datos del formulario
router.post('/', upload.single('foto'), async function(req, res, next) {
  try {   
    const data = req.body;
    const file = req.file;
    
    // ponemos el campo foto con el nombre de la imagen para crear el anuncio
    data.foto = file.originalname;
    // renombramos la imagen recibida del formulario para que se guarde en la carpeta images
    renombrarImagen(req.file);
    console.log(req.file, data);

    // creamos una instancia del anuncio
    const anuncio = new Anuncio(data);
    
    // lo guardamos en la BD
    await anuncio.save();
    
    res.redirect('/');    
    
  } catch (error) {
    res.render('index', {title: 'Nodepop', error: error});
  }
})

module.exports = router;
