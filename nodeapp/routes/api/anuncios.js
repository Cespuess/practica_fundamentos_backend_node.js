var express = require('express');
var router = express.Router();
const Anuncio = require('../../models/Anuncio');

// GET users listing

// devuelve una lista de anuncios entera o con filtros
router.get('/', async function(req, res, next) {
  try {
    // describimos los tipos de filtrado
    const filterByNombre = req.query.nombre;
    const filterByVenta = req.query.venta;
    const filterByPrecio = req.query.precio;
    const filterByTags = req.query.tags;

    // paginación
    const skip = req.query.skip;
    const limit = req.query.limit;

    // ordenación
    const sort = req.query.sort;

    // seleccionar por campos
    const fields = req.query.fields;

    // Creamos un objeto filter para introducir los filtros que nos pasen para la consulta
    const filter = {};

    if (filterByNombre) {
      filter.nombre = filterByNombre;
    }
    if (filterByVenta) {
      filter.venta = filterByVenta;
    }
    if (filterByPrecio) {
      filter.precio = filterByPrecio;
    }
    if (filterByTags) {
      filter.tags = filterByTags;
    }

    const anuncios = await Anuncio.listar(filter, skip, limit, sort, fields);
    res.json({ resultados: anuncios });
  
  } catch (error) {
    next(error);
  }
});

module.exports = router;
