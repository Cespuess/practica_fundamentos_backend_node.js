'use strict';

const {query, body} = require('express-validator');


// Validadores query----------------------------------------------------------------------------------------
const valQuery = {
  // Validar que el precio, precio_min y precio_max sea numérico
  precio: query('precio').isNumeric().optional().withMessage('Tiene que ser numérico.'),
  precioMin: query('precio_min').isNumeric().optional().withMessage('Tiene que ser numérico.'),
  precioMax: query('precio_max').isNumeric().optional().withMessage('Tiene que ser numérico.'),
  
  // Validar que "venta" sea bool
  venta: query('venta').isBoolean().optional().withMessage('Tiene que ser true o false'),
  
  // Validar nombre
  nombre: query('nombre').optional().notEmpty().withMessage('Tienes que poner algo como nombre a buscar.'),
  
  // No dejar buscar por fields
  noFieldsWeb: query('fields').not().exists().withMessage('Esta opción no está disponible en la web, solo en la API.'),
  
  // Validar tags que esten en la lista 
  tags: query('tags').custom(value => {
    const tags = ['work', 'lifestyle', 'motor', 'mobile'];
    if (Array.isArray(value)) { // si lo que recibimos es un array comprobamos si cada elemento está en la lista de tags
      if (value.every(tag => tags.includes(tag))) return true;  
    } else {
      if (tags.includes(value)) return true;    
    }
  }).optional().withMessage('El tag tiene que estar en la lista siguiente: work, lifestyle, motor, mobile.')
}

// Validadores body------------------------------------------------------------------------------------------------------
const valBody = {
  // Validamos tags que esten en la lista en peticiones 
  tags: body('tags').custom(value => {
    const arrayTags = ['work', 'lifestyle', 'motor', 'mobile'];
    if (Array.isArray(value)) {
      if (value.every(tag => arrayTags.includes(tag))) return true;  
    } else {
      if (arrayTags.includes(value)) return true; 
    }
  }).optional().withMessage('El tag tiene que ser uno de los siguientes: work, lifestyle, motor, mobile.'),
  
  // Validar nombre
  nombre: body('nombre').optional().notEmpty().withMessage('El producto tiene que tener un nombre.'),
  
  // Validar que "venta" sea bool
  venta: body('venta').optional().isBoolean().withMessage('El valor del campo Venta tiene que ser true o false.'),
  
  // Validar precio
  precio: body('precio').isNumeric().optional().withMessage('El precio tiene que ser un número.'),
  
  // Validar foto
  foto: body('foto').optional().notEmpty().withMessage('Tienes que poner una foto del producto.'),  
}  




module.exports = {valBody, valQuery};