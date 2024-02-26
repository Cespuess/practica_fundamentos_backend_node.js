'use strict';

const {query} = require('express-validator');

// Validar que el precio, precio_min y precio_max sea numérico
const validacionPrecio = query('precio').isNumeric().optional().withMessage('Tiene que ser numérico.');
const validacionPrecioMin = query('precio_min').isNumeric().optional().withMessage('Tiene que ser numérico.');
const validacionPrecioMax = query('precio_max').isNumeric().optional().withMessage('Tiene que ser numérico.');

// Validar que "venta" sea bool
const validacionVenta = query('venta').isBoolean().optional().withMessage('Tiene que ser true o false');

// Validar tags que esten en la lista en peticiones GET 
const validacionTags = query('tags').custom(value => {
  const tags = ['work', 'lifestyle', 'motor', 'mobile'];
  if (Array.isArray(value)) { // si lo que recibimos es un array comprobamos si cada elemento está en la lista de tags
    if (value.every(tag => tags.includes(tag))) return true;  
  } else {
    if (tags.includes(value)) return true;    
  }
}).optional().withMessage('El tag tiene que ser uno de los siguientes: work, lifestyle, motor, mobile.')


// Validamos tags que esten en la lista en peticiones POST y PUT
function validarTagsBody(body) {
  const arrayTags = ['work', 'lifestyle', 'motor', 'mobile']
  if (Array.isArray(body.tags)) {
    if (!body.tags.every(tag => arrayTags.includes(tag))) throw new Error ('Tag incorrecto: (work, lifestyle, motor, mobile)');  
  } else {
    if (!tags.includes(body.tags)) throw new Error ('Tag incorrecto: (work, lifestyle, motor, mobile)');    
  }
}




module.exports = {validacionPrecio, validacionVenta, validacionTags, validacionPrecioMin, validacionPrecioMax, validarTagsBody};