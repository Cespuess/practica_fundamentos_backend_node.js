# Nodepop

## Pasos a seguir para poder utilizar la aplicación

#### <u> Instalar MongoDB en vuestro dispositivo: </u>

Descargar MongoDB de su [página web](https://www.mongodb.com/try/download/community).

Después de instalar MongoDB, inicia el servidor y mantenlo en ejecución.

#### <u> Clonar el repositorio: </u>

Copiar el siguiente comando en el directorio de vuestra elección:

```sh
git clone git@github.com:Cespuess/practica_fundamentos_backend_node.js.git
```

#### <u> Instalar dependencias: </u>

```sh
cd nodepop

npm install
```

#### <u> Inicializar la base de datos:</u>

⚠️ **CUIDADO**, el siguiente comando borra **TODA** la base de datos!!!

```sh
npm run init-db
```

## Desarrollo

Para ejecutar la aplicación en modo desarrollo utilizar:

```sh
npm run dev
```

## API

#### <u> Para consultar la lista completa:</u>

- GET /api/anuncios

```json
{
  "resultados": [
    {
      "_id": "65db0c0e30f2a9b2148b947e",
      "nombre": "ratón Logitech",
      "venta": true,
      "precio": 55,
      "foto": "raton.jpg",
      "tags": [
      "work"
      ]
    }
  ]
}
```

#### <u>Consultar con posibilidad de paginación y ordenación:</u>

- GET /api/anuncios?skip=2&limit=6&sort=precio

Términos de paginación y ordenación:
- **skip**: Es la cantidad de anuncios que se ignoran al principio. Tiene que ser numérico.
- **limit**: Es la cantidad de anuncios que se mostrarán como máximo. Tiene que ser numérico. 
- **sort**: Es el campo por el que se ordenarán los resultados. Los campos son: *_id, nombre, venta, precio, foto y tags.*



#### <u>Consultar por campos:</u> 

- GET /api/anuncios?venta=true

Indicamos el campo con el valor que queramos buscar.

#### <u>Consultar por rangos de precio:</u>

- GET /api/anuncios?precio_min=110&precio_max=600

Si se especifica en la query el campo *precio* junto con *precio_min* y/o *precio_max*, se dará prioridad a la búsqueda por rango de precio. Los valores tendrán que ser de tipo numérico.

#### <u>Consultar por nombre:</u>

- GET /api/anuncios?nombre=logi

No hace falta especificar el nombre entero, solo escribir una parte que contenga el título del producto ya es suficiente.

#### <u>Consultar solo los campos seleccionados:</u>

- GET /api/anuncios?fields=nombre%20-_id

Con este ejemplo recibimos solo los nombres de los productos sin el _id.

```json
{
  "resultados": [
    {
    "nombre": "Móvil OPPO A78"
    },
    {
    "nombre": "Móvil Iphone 13"
    },
  ]
}
```

#### <u>Crear un anuncio:</u>

- POST /api/anuncios (body)

Body:

![alt text](./public/images/readme/crearAnuncio.png)

Respuesta:

```html
Anuncio guardado satisfactoriamente:
{
  nombre: 'monitor',
  venta: true,
  precio: 300,
  foto: 'monitor.jpg',
  tags: [ 'work', 'lifestyle' ],
  _id: new ObjectId('65dc93763a42132fb7e79100'),
  __v: 0
}
```

#### <u>Modificar un anuncio:</u>

- PUT /api/anuncios/<_id>  (body)

Body:

![alt text](./public/images/readme/modificarAnuncio.png)

Respuesta:

```html
Anuncio guardado satisfactoriamente:
{
  nombre: 'avion',
  venta: true,
  precio: 300,
  foto: 'monitor.jpg',
  tags: [ 'lifestyle' ],
  _id: new ObjectId('65dca5f9a9b88ee29187de50'),
  __v: 0
}
```

#### <u>Eliminar un anuncio:</u>

- DELETE /api/anuncios/<_id>

![alt text](./public/images/readme/eliminarAnuncio.png)

```html
Producto "Fiat 500" eliminado.
```