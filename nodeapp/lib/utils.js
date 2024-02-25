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

module.exports = {pregunta};