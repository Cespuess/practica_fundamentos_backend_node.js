var express = require('express');
var router = express.Router();
const Anuncio = require('../../models/Anuncio');
const {listado} = require('../../lib/utils');
const {validationResult} = require('express-validator');
const {validacionPrecio} = require('../../lib/validaciones');

// GET users listing

// devuelve una lista de anuncios entera o con filtros
router.get('/', validacionPrecio, async function(req, res, next) {
  try {
    validationResult(req).throw(); // lanza el error si alguna validación no ha pasado
    const anuncios = await listado(req, Anuncio);
    res.json({ resultados: anuncios });
  
  } catch (error) {
    next(error);
  }
});

module.exports = router;
