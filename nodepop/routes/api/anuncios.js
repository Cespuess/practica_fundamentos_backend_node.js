var express = require('express');
var router = express.Router();
const Anuncio = require('../../models/Anuncio');
const {listado} = require('../../lib/utils');
const {validationResult} = require('express-validator');
const {validacionPrecio, validacionVenta, validacionTags, validacionPrecioMin, validacionPrecioMax, validacionBodyTags, validacionBodyNombre, validacionBodyVenta, validacionBodyPrecio, validacionBodyFoto, validacionNombre} = require('../../lib/validaciones');

// GET users listing

// devuelve una lista de anuncios entera o con filtros
router.get('/', [validacionPrecio, validacionVenta, validacionTags, validacionPrecioMin, validacionPrecioMax, validacionNombre], 
async function (req, res, next) {
  try {
    validationResult(req).throw(); // lanza el error si alguna validación no ha pasado
    const anuncios = await listado(req, Anuncio);
    res.json({ resultados: anuncios });

  } catch (error) {
    next(error);
  }
});

// devuelve la lista de tags disponibles
router.get('/listatags', function (req, res, next) {
  const tagsDisponibles = ['work', 'lifestyle', 'motor', 'mobile'];
  res.json({resultado: tagsDisponibles});
});


// POST /api/anuncios

// crear un anuncio
router.post('/',[validacionBodyTags, validacionBodyNombre, validacionBodyVenta, validacionBodyPrecio, validacionBodyFoto], async (req, res, next) => {
  try {
    if (!('tags' in req.body)) throw new Error('Hay que poner almenos un tag de la lista: work, lifestyle, motor, mobile.'); // controlamos que no cree anuncios sin tags
    
    validationResult(req).throw();
    const data = req.body;

    
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

router.put('/:id', [validacionBodyTags, validacionBodyNombre, validacionBodyVenta, validacionBodyPrecio, validacionBodyFoto], async (req, res, next) => {
  try {
    validationResult(req).throw();
    const id = req.params.id;
    const data = req.body;

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
