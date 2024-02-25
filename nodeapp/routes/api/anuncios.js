var express = require('express');
var router = express.Router();
const Anuncio = require('../../models/Anuncio');
const {listado} = require('../../lib/utils');

// GET users listing

// devuelve una lista de anuncios entera o con filtros
router.get('/', async function(req, res, next) {
  try {
    const anuncios = await listado(req, Anuncio);
    res.json({ resultados: anuncios });
  
  } catch (error) {
    next(error);
  }
});

module.exports = router;
