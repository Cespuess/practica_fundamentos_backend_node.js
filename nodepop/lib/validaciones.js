'use strict';

const {query} = require('express-validator');

// Validar que el precio sea numérico
const validacionPrecio = query('precio').isNumeric().optional().withMessage('Tiene que ser numérico.');

// Validar que "venta" sea bool
const validacionVenta = query('venta').isBoolean().optional().withMessage('Tiene que ser true o false');

// Validar tags
const tags = ['work', 'lifestyle', 'motor', 'mobile'];
const validacionTags = query('tags').custom(value => {
  return tags.includes(value);
}).optional().withMessage('El tag tiene que ser uno de los siguientes: work, lifestyle, motor, mobile.')

module.exports = {validacionPrecio, validacionVenta, validacionTags};