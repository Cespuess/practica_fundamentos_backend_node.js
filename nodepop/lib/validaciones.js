'use strict';

const {query} = require('express-validator');

// Validar que el precio sea numérico
const validacionPrecio = query('precio').isNumeric().optional().withMessage('Tiene que ser numérico.');

// Validar que "venta" sea bool
const validacionVenta = query('venta').isBoolean().optional().withMessage('Tiene que ser true o false');

module.exports = {validacionPrecio, validacionVenta};