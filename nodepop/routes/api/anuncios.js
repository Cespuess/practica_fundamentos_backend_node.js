var express = require('express');
var router = express.Router();
const Anuncio = require('../../models/Anuncio');
const {listado} = require('../../lib/utils');
const {validationResult} = require('express-validator');
const {validacionPrecio, validacionVenta, validacionTags, validacionPrecioMin, validacionPrecioMax, validarTagsBody} = require('../../lib/validaciones');

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
  try {
    const data = req.body;

    // verificamos que los tags que nos ha introducido esten en la array de tags.
    validarTagsBody(data)
    
    // creamos una instancia del anuncio
    const anuncio = new Anuncio(data);
    
    // lo guardamos en la BD
    const anuncioGuardado = await anuncio.save();

    res.send(`Anuncio guardado satisfactoriamente: \n ${anuncioGuardado }`);
  
    
  } catch (error) {
      next(error);
  }
})


// PUT /api/anuncios/<_id>  (body)
// Actualizar un anuncio

router.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;

    // verificamos que los tags que nos ha introducido esten en la array de tags.
    validarTagsBody(data)

    const anuncioActualizado = await Anuncio.findByIdAndUpdate( id, data, {new: true})
    
    res.send(`Anuncio modificado satisfactioriamente \n ${anuncioActualizado}`);

  } catch (error) {
    next(error);
  }
})

// DELETE /api/anuncios/<_id>
// Eliminar un anuncio
router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const producto = await Anuncio.find({_id: id});
    await Anuncio.deleteOne({_id: id});
    res.send(`Producto "${producto[0].nombre}" eliminado.`)
  } catch (error) {
    next(error);
  }
})

module.exports = router;
