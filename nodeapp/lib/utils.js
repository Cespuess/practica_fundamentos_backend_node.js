'use strict';

const readline = require('node:readline');

function pregunta(texto) {  
  // Hace la pregunta para asegurarnos de que no borramos sin querer la BBDD en main()
  return new Promise((resolve, reject) => {
    // conectar readline con la consola
    const ifc = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    ifc.question(texto, respuesta => {
      ifc.close();
      resolve(respuesta.toLowerCase() === 'si');
    })
  });
}

function listado(req, modelo) {
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

   const anuncios = modelo.listar(filter, skip, limit, sort, fields);
   
   return anuncios;
}

module.exports = {pregunta, listado};