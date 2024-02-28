var express = require('express');
var router = express.Router();
const Anuncio = require('../models/Anuncio');
const {listado} = require('../lib/utils');
const { validacionPrecio, validacionVenta, validacionTags, validacionPrecioMin, validacionPrecioMax, validacionNombre, validacionNoFieldsWeb } = require('../lib/validaciones');
const { validationResult } = require('express-validator');


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
router.post('/', async function(req, res, next) {
  try {   
    const data = req.body;

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
