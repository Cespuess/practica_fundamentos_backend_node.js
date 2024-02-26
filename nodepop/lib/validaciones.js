'use strict';

const {query} = require('express-validator');

// Validar que el precio, precio_min y precio_max sea numérico
const validacionPrecio = query('precio').isNumeric().optional().withMessage('Tiene que ser numérico.');
const validacionPrecioMin = query('precio_min').isNumeric().optional().withMessage('Tiene que ser numérico.');
const validacionPrecioMax = query('precio_max').isNumeric().optional().withMessage('Tiene que ser numérico.');

// Validar que "venta" sea bool
const validacionVenta = query('venta').isBoolean().optional().withMessage('Tiene que ser true o false');

// Validar tags
const tags = ['work', 'lifestyle', 'motor', 'mobile'];
const validacionTags = query('tags').custom(value => {
  return tags.includes(value);
}).optional().withMessage('El tag tiene que ser uno de los siguientes: work, lifestyle, motor, mobile.')

// Validamos que los tags que nos ha introducido esten en la array de tags.
function validarTagsBody(body) {
  const arrayTags = ['work', 'lifestyle', 'motor', 'mobile']
  if (Array.isArray(body.tags)) {
    if (!body.tags.every(tag => arrayTags.includes(tag))) throw new Error ('Tag incorrecto: (work, lifestyle, motor, mobile)');  
  } else {
    if (!tags.includes(body.tags)) throw new Error ('Tag incorrecto: (work, lifestyle, motor, mobile)');    
  }
}




module.exports = {validacionPrecio, validacionVenta, validacionTags, validacionPrecioMin, validacionPrecioMax, validarTagsBody};