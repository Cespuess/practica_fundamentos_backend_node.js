const mongoose = require('mongoose');

// definimos el esquema de los anuncios
const anuncioSchema = mongoose.Schema({
  nombre: { type: String, required: true, index: true},
  venta: { type: Boolean, required: true, index: true}, 
  precio: { type: Number, required: true, index: true},
  foto: { type: String, required: true},
  tags: { type: [String], required:true, index: true}
});

// método listar que utilizaremos para paginar la búsqueda
anuncioSchema.statics.listar = function(filtro, skip, limit, sort, fields) {
  const query = Anuncio.find(filtro);
  query.skip(skip);
  query.limit(limit);
  query.sort(sort);
  query.select(fields);

  return query.exec(); // devuelve una promesa
}

// creamos el modelo de anuncio
const Anuncio = mongoose.model('Anuncio', anuncioSchema);

// exportamos el modelo
module.exports = Anuncio;
