var express = require('express');
var router = express.Router();
const Anuncio = require('../../models/Anuncio');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    const anuncios = await Anuncio.find();
    res.json({ resultados: anuncios});
  } catch (error) {
    next(error);
  }
});

module.exports = router;
