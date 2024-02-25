const mongoose = require('mongoose');

// definimos el esquema de los anuncios
const anuncioSchema = mongoose.Schema({
  nombre: String,
  venta: Boolean, 
  precio: Number,
  foto: String, 
  tags: [String]
});

// creamos el modelo de anuncio
const Anuncio = mongoose.model('Anuncio', anuncioSchema);

// exportamos el modelo
module.exports = Anuncio;
