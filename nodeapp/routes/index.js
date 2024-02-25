var express = require('express');
var router = express.Router();
const Anuncio = require('../models/Anuncio');
const {listado} = require('../lib/utils');


/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    const anuncios = await listado(req, Anuncio);
    res.render('index', { title: 'Nodepop', anuncios: anuncios, error: false });

  
  } catch (error) {
    res.render('index', {title: 'Nodepop', error: error});
  }
});


module.exports = router;
