var express = require('express');
var router = express.Router();
const Anuncio = require('../../models/Anuncio');
const {listado} = require('../../lib/utils');
const {validationResult} = require('express-validator');
const {validacionPrecio, validacionVenta, validacionTags, validacionPrecioMin, validacionPrecioMax} = require('../../lib/validaciones');

// GET users listing

// devuelve una lista de anuncios entera o con filtros
router.get('/', [validacionPrecio, validacionVenta, validacionTags, validacionPrecioMin, validacionPrecioMax], 
async function (req, res, next) {
  try {
    validationResult(req).throw(); // lanza el error si alguna validación no ha pasado
    const anuncios = await listado(req, Anuncio);
    res.json({ resultados: anuncios });

  } catch (error) {
    next(error);
  }
});

// POST /api/anuncios

// crear un anuncio
router.post('/', async (req, res, next) => {
  const tags = ['work', 'lifestyle', 'motor', 'mobile']
  try {
    const data = req.body;
    console.log(data.tags);
    if (data.tags.every(tag => tags.includes(tag))) { // verificamos que los tags que nos ha introducido esten en la array de tags.
      // creamos una instancia del anuncio
      const anuncio = new Anuncio(data);
      
      // lo guardamos en la BD
      const anuncioGuardado = await anuncio.save();
  
      res.send(`Anuncio guardado satisfactoriamente: \n ${anuncioGuardado }`);
    } else {
      throw new Error ('Tag incorrecto: (work, lifestyle, motor, mobile)');
    }
  } catch (error) {
      next(error);
  }
})



module.exports = router;
