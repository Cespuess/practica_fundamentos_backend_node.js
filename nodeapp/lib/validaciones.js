'use strict';

const {query} = require('express-validator');

const validacionPrecio = query('precio').isNumeric().optional().withMessage('Tiene que ser numérico.');

module.exports = {validacionPrecio};