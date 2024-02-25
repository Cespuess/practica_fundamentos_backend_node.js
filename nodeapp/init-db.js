'use strict';

const connection = require('./lib/connectMongoose');
const Anuncio = require('./models/Anuncio');
const {pregunta} = require('./lib/utils');

async function main() {
  // Espera a que se conecte a la base de datos para reinicializar la BBDD
  try {
    // esperar a que se conecte a la BBDD
    await new Promise((resolve) => connection.once('open', resolve));
  
    // hacer la pregunta para no borrar todos los documentos por error
    const borrar = await pregunta('Estas seguro que quieres borrar el contenido de esta BD (no): ');
    if (!borrar) {
      process.exit();
    }
  
    await inicializaAnuncios();
  
    // cerramos la conexión con la BBDD
    connection.close();    
  } catch (error) {
    console.log('Hubo un error', error);
  }
}

async function inicializaAnuncios() {
  // Reinicializará la BBDD 

  // primero borrarmos todos los documento que pueda haber en la BBDD y mostramos en consola el número de documentos eliminados
  const eliminados = await Anuncio.deleteMany();
  console.log(`Eliminados ${eliminados.deletedCount} anuncios`);

  // creamos los anuncios iniciales y mostramos en consola la cantidad de documentos creados
  const insertados = await Anuncio.insertMany([
    {
      "nombre" : "Móvil OPPO A78",
      "venta" : true,
      "precio" : 199,
      "foto" : "oppo_a78.jpg",
      "tags" : [ "mobile", "work" ]
    },
    {
      "nombre" : "Móvil Iphone 13",
      "venta" : false,
      "precio" : 949,
      "foto" : "iphone_13.jpg",
      "tags" : [ "mobile", "work" ]
    },
    {
      "nombre" : "Bambas Munich Mini Track",
      "venta" : true,
      "precio" : 30,
      "foto" : "munich_mini_track.jpg",
      "tags" : [ "lifestyle" ]
    },
    {
      "nombre" : "Portátil Acer Nitro",
      "venta" : true,
      "precio" : 949,
      "foto" : "acer_nitro.jpg",
      "tags" : [ "work" ]
    },
    {
      "nombre" : "Logitech Marathon Mouse",
      "venta" : false,
      "precio" : 42.99,
      "foto" : "marathon_mouse.jpg",
      "tags" : [ "work" ]
    },
    {
      "nombre" : "Iphone 13",
      "venta" : false,
      "precio" : 949,
      "foto" : "iphone_13.jpg",
      "tags" : [ "mobile", "work" ]
    },
    {
      "nombre" : "Fiat 500",
      "venta" : true,
      "precio" : 14800,
      "foto" : "fiat_500.jpg",
      "tags" : [ "motor" ]
    },
    {
      "nombre" : "Pantalones tejanos talla: 44",
      "venta" : false,
      "precio" : 15,
      "foto" : "tejanos.jpg",
      "tags" : [ "lifestyle" ]
    },
    {
      "nombre" : "Honda Civic",
      "venta" : false,
      "precio" : 12350,
      "foto" : "honda_civic.jpg",
      "tags" : [ "motor" ]
    },
    {
      "nombre" : "Móvil Samsung A14",
      "venta" : true,
      "precio" : 450,
      "foto" : "samsung_a14.jpg",
      "tags" : [ "mobile" ]
    },
    {
      "nombre" : "Camiseta blanca talla XL",
      "venta" : false,
      "precio" : 5.50,
      "foto" : "camiseta_blanca.jpg",
      "tags" : [ "lifestyle" ]
    },
    {
      "nombre" : "Teclado mecánico EASYTAO",
      "venta" : true,
      "precio" : 220,
      "foto" : "camiseta_blanca.jpg",
      "tags" : [ "lifestyle" ]
    }
     
  ]);
  console.log(`Creados ${insertados.length} anuncios`);
}


// ---------------------------------------------------------------------

main()