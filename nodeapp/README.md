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

GET /api/anuncios

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