# NodeApp

Instalar dependencias

```js
npm install
```

Inicializar la base de datos:

* CUIDADO, el siguiente comando borra TODA la base de datos!!!

```sh
npm run init-db
```

## Desarrollo

Para ejecutar la aplicación en modo desarrollo utilizar:

```js
npm run dev
```


## API

#### Para consultar la lista completa:

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

#### Consultar con posibilidad de paginación y ordenación:

- GET /api/anuncios?skip=2&limit=6&sort=precio

#### Consultar por campos: 

- GET /api/anuncios?precio=55

#### Consultar por rangos de precio:

- GET /api/anuncios?precio_min=110&precio_max=600

Si se especifica en la query el campo precio junto con precio_min y/o precio_max, se dará prioridad a la búsqueda por rango de precio. Los valores tendrán que ser de tipo numérico.

#### Consultar por nombre:

- GET /api/anuncios?nombre=logi

No hace falta especificar el nombre entero, solo escribir una parte que contenga el título del producto ya es suficiente.

#### Consultar solo los campos seleccionados:

- GET /api/anuncios?fields=nombre%20-_id

Con este ejemplo recibimos solo los nombres de los productos sin el _id.

```js
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

#### Crear un anuncio:

- POST /api/anuncios (body)

Body:

![alt text](image-2.png)

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

#### Modificar un anuncio:

- PUT /api/anuncios/<_id>  (body)

Body:

![alt text](image-1.png)

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

