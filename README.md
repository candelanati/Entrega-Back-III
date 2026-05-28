# Proyecto Final Backend III - API de Adopciones

Proyecto final de Backend III desarrollado con Express, MongoDB/Mongoose, documentacion Swagger, pruebas funcionales y Docker.

## Descripcion

Este proyecto implementa una API enfocada en la gestion de adopciones de mascotas. Incluye documentacion OpenAPI/Swagger para los endpoints de adopcion, pruebas funcionales sobre el router de adopciones y una imagen Docker optimizada para ejecucion en entorno productivo.

## Tecnologias

- Node.js 20
- Express
- MongoDB Atlas + Mongoose
- dotenv
- Mocha, Chai, Supertest y Sinon
- swagger-jsdoc y swagger-ui-express
- Docker con `node:20-alpine`

## Estructura del proyecto

```txt
src/
  app.js
  server.js
  config/
    db.config.js
    env.config.js
  docs/
    swagger.js
  routes/
    adoption.router.js
  controllers/
    adoption.controller.js
  services/
    adoption.service.js
  models/
    adoption.model.js
    pet.model.js
    user.model.js
  repositories/
    adoption.repository.js
    pet.repository.js
    user.repository.js
  middlewares/
    error.middleware.js
test/
  adoption.router.test.js
```

## Variables de entorno

Crear un archivo `.env` a partir de `.env.example`:

```env
PORT=8080
DATABASE=mongodb+srv://<user>:<password>@<cluster>/<database>?retryWrites=true&w=majority
DOCKERHUB_URL=https://hub.docker.com/r/andelanati/proyecto-final-adopciones
```

## Instalacion

```bash
npm install
```

## Scripts

### `npm run dev`

Inicia la aplicacion en modo desarrollo usando `node --watch` sobre `src/server.js`.

```bash
npm run dev
```

### `npm start`

Inicia la aplicacion en modo ejecucion normal a partir de `src/server.js`.

```bash
npm start
```

### `npm test`

Ejecuta las pruebas funcionales definidas en `test/**/*.test.js` con Mocha.

```bash
npm test
```

## Pruebas funcionales

Las pruebas cubren todos los endpoints de `src/routes/adoption.router.js`:

- `GET /api/adoptions`
- `GET /api/adoptions/:aid`
- `POST /api/adoptions/:uid/:pid`

Tambien validan respuestas de error para adopcion inexistente, IDs invalidos, usuario inexistente, mascota inexistente y mascota ya adoptada.

## Aclaracion sobre pruebas

Las pruebas funcionales aislan las dependencias externas y de base de datos mediante dobles de prueba como mocks, stubs o fakes. Por ese motivo, `npm test` no requiere una conexion real a MongoDB Atlas para ejecutarse.

Resultado confirmado: `9 passing`.

## Swagger

Con la aplicacion corriendo, la documentacion Swagger queda disponible en:

```txt
http://localhost:8080/api/docs
```

## Endpoints principales

| Metodo | Ruta | Descripcion |
| --- | --- | --- |
| GET | `/api/adoptions` | Lista todas las adopciones |
| GET | `/api/adoptions/:aid` | Obtiene una adopcion por ID |
| POST | `/api/adoptions/:uid/:pid` | Crea una adopcion entre usuario y mascota |

## Docker

La imagen Docker del proyecto utiliza como base `node:20-alpine` y expone el puerto `8080`.

Construir la imagen:

```bash
docker build -t andelanati/proyecto-final-adopciones:1.0.0 .
```

Ejecutar el contenedor:

```bash
docker run --env-file .env -p 8080:8080 andelanati/proyecto-final-adopciones:1.0.0
```

Publicar en DockerHub:

```bash
docker push andelanati/proyecto-final-adopciones:1.0.0
```

Build, ejecucion y publicacion confirmados.

URL publica de DockerHub:

```txt
https://hub.docker.com/r/andelanati/proyecto-final-adopciones
```

## Notas de entrega

- URL del repositorio: `<repository-url>`
- URL publica de DockerHub: `https://hub.docker.com/r/andelanati/proyecto-final-adopciones`
- URL de Swagger: `http://localhost:8080/api/docs`
- Puerto por defecto: `8080`

## Reproduccion rapida

1. Instalar dependencias.

```bash
npm install
```

2. Crear el archivo `.env` a partir de `.env.example`.

3. Ejecutar la aplicacion.

```bash
npm start
```

4. Abrir Swagger en:

```txt
http://localhost:8080/api/docs
```

5. Ejecutar las pruebas funcionales cuando se quiera validar el router de adopciones.

```bash
npm test
```
