# Informe Final - Proyecto Backend III

Proyecto: API de adopciones de mascotas
Carpeta de entrega: `proyecto-final`
Repositorio del proyecto: `https://github.com/candelanati/Entrega-Back-III.git`
DockerHub user: `andelanati`
Imagen Docker publica: `https://hub.docker.com/r/andelanati/proyecto-final-adopciones`

Este informe resume la entrega final del proyecto Backend III. El proyecto implementa una API con Express y MongoDB/Mongoose para gestionar adopciones, pruebas funcionales sobre todos los endpoints del router de adopciones, documentacion Swagger/OpenAPI y Dockerizacion optimizada para ejecucion en contenedor.

## 1. Estructura del proyecto

La entrega final corresponde unicamente a la carpeta `proyecto-final`.

```txt
proyecto-final/
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
  .dockerignore
  .env.example
  .gitignore
  Dockerfile
  package.json
  package-lock.json
  README.md
  FINAL_REPORT.md
```

Archivos principales:

- `src/app.js`: crea la aplicacion Express, registra JSON middleware, health check, Swagger, router de adopciones y middleware de errores.
- `src/server.js`: conecta a la base de datos y levanta el servidor en el puerto configurado.
- `src/config/env.config.js`: carga variables de entorno con `dotenv` y define valores por defecto seguros, incluyendo `PORT=8080`.
- `src/config/db.config.js`: conecta MongoDB/Mongoose usando `DATABASE` o `MONGO_URI`.
- `src/routes/adoption.router.js`: define los endpoints de adopciones y sus anotaciones OpenAPI.
- `src/docs/swagger.js`: configura Swagger/OpenAPI y expone la documentacion usada por `/api/docs`.
- `test/adoption.router.test.js`: contiene las pruebas funcionales del router de adopciones.

Variables de entorno esperadas:

```env
PORT=8080
DATABASE=mongodb+srv://<user>:<password>@<cluster>/<database>?retryWrites=true&w=majority
DOCKERHUB_URL=https://hub.docker.com/r/andelanati/proyecto-final-adopciones
```

No se incluyen credenciales reales en el repositorio. El archivo `.env` local debe crearse manualmente a partir de `.env.example`.

## 2. Tests funcionales

El proyecto incluye pruebas funcionales con Mocha, Chai, Supertest y Sinon sobre todos los endpoints reales definidos en `src/routes/adoption.router.js`.

Endpoints cubiertos:

| Metodo | Ruta | Resultado principal |
| --- | --- | --- |
| GET | `/api/adoptions` | Devuelve todas las adopciones |
| GET | `/api/adoptions/:aid` | Devuelve una adopcion por ID |
| POST | `/api/adoptions/:uid/:pid` | Crea una adopcion entre usuario y mascota |

Casos validados:

- `GET /api/adoptions` responde `200` con el listado de adopciones.
- `GET /api/adoptions/:aid` responde `200` cuando la adopcion existe.
- `GET /api/adoptions/:aid` responde `404` cuando la adopcion no existe.
- `GET /api/adoptions/:aid` responde `400` cuando el ID de adopcion es invalido.
- `POST /api/adoptions/:uid/:pid` responde `201` cuando la adopcion se crea correctamente.
- `POST /api/adoptions/:uid/:pid` responde `404` cuando el usuario no existe.
- `POST /api/adoptions/:uid/:pid` responde `404` cuando la mascota no existe.
- `POST /api/adoptions/:uid/:pid` responde `400` cuando la mascota ya esta adoptada.
- `POST /api/adoptions/:uid/:pid` responde `400` cuando algun ID de ruta es invalido.

Las pruebas inyectan un servicio falso en `createApp({ adoptionService })`, por lo que validan el comportamiento HTTP del router/controlador sin depender de una conexion real a MongoDB.

Comando:

```bash
npm test
```

Evidencia real de ejecucion:

```txt
PS D:\00-cande\2_CURSOS\coderhouse\6_Programacion_Backend_III\proyecto-final-completo\proyecto-final> npm test

> proyecto-final-adopciones@1.0.0 test
> mocha "test/**/*.test.js" --timeout 10000



  pruebas funcionales de adoption.router
    GET /api/adoptions
      ✔ devuelve todas las adopciones (42ms)
    GET /api/adoptions/:aid
      ✔ devuelve una adopcion cuando existe
      ✔ devuelve 404 cuando la adopcion no existe
      ✔ devuelve 400 cuando el id de adopcion es invalido
    POST /api/adoptions/:uid/:pid
      ✔ crea una adopcion y marca la mascota como adoptada
      ✔ devuelve 404 cuando el usuario no existe
      ✔ devuelve 404 cuando la mascota no existe
      ✔ devuelve 400 cuando la mascota ya esta adoptada
      ✔ devuelve 400 cuando un id de ruta es invalido


  9 passing (121ms)
```

Resultado confirmado: `9 passing`.

## 3. Dockerizacion

El proyecto incluye un `Dockerfile` optimizado para produccion.

```dockerfile
FROM node:20-alpine AS production

WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev --ignore-scripts && npm cache clean --force

COPY src ./src
COPY .env.example ./.env.example

EXPOSE 8080
CMD ["node", "src/server.js"]
```

Optimizaciones aplicadas:

- Imagen base liviana: `node:20-alpine`.
- Instalacion reproducible con `npm ci`.
- Instalacion solo de dependencias de produccion mediante `--omit=dev`.
- Limpieza de cache de npm.
- Exclusion de archivos innecesarios con `.dockerignore`.
- Puerto expuesto: `8080`, consistente con `PORT=8080` y la documentacion.

Archivo `.dockerignore`:

```txt
node_modules
npm-debug.log
.git
.gitignore
.env
coverage
test
FINAL_REPORT.md
```

Comando para construir la imagen:

```bash
docker build -t andelanati/proyecto-final-adopciones:1.0.0 .
```

Evidencia real de build:

```txt
PS D:\00-cande\2_CURSOS\coderhouse\6_Programacion_Backend_III\proyecto-final-completo\proyecto-final> docker build -t andelanati/proyecto-final-adopciones:1.0.0 .
[+] Building 23.3s (12/12) FINISHED                                                                           docker:desktop-linux
 => [internal] load build definition from Dockerfile                                                                          0.1s
 => => transferring dockerfile: 293B                                                                                          0.0s
 => [internal] load metadata for docker.io/library/node:20-alpine                                                             2.4s
 => [auth] library/node:pull token for registry-1.docker.io                                                                   0.0s
 => [internal] load .dockerignore                                                                                             0.1s
 => => transferring context: 119B                                                                                             0.0s
 => [1/6] FROM docker.io/library/node:20-alpine@sha256:fb4cd12c85ee03686f6af5362a0b0d56d50c58a04632e6c0fb8363f609372293       6.5s
 => => resolve docker.io/library/node:20-alpine@sha256:fb4cd12c85ee03686f6af5362a0b0d56d50c58a04632e6c0fb8363f609372293       0.1s
 => => sha256:fff4e2c1b189bf87d63ad8bd07f7f4eb288d6f2b6a07a8bb44c60e8c075d2096 445B / 445B                                    0.2s
 => => sha256:b2cbbfe903b0821005780971ddc5892edcc4ce74c5a48d82e1d2b382edac3122 1.26MB / 1.26MB                                0.5s
 => => sha256:4feea04c154301db6f4a496efa397b3db96603b1c009c797cfdde77bea8b3287 43.23MB / 43.23MB                              4.2s
 => => sha256:6a0ac1617861a677b045b7ff88545213ec31c0ff08763195a70a4a5adda577bb 3.86MB / 3.86MB                                1.4s
 => => extracting sha256:6a0ac1617861a677b045b7ff88545213ec31c0ff08763195a70a4a5adda577bb                                     0.4s
 => => extracting sha256:4feea04c154301db6f4a496efa397b3db96603b1c009c797cfdde77bea8b3287                                     1.9s
 => => extracting sha256:b2cbbfe903b0821005780971ddc5892edcc4ce74c5a48d82e1d2b382edac3122                                     0.1s
 => => extracting sha256:fff4e2c1b189bf87d63ad8bd07f7f4eb288d6f2b6a07a8bb44c60e8c075d2096                                     0.0s
 => [internal] load build context                                                                                             0.2s
 => => transferring context: 147.95kB                                                                                         0.1s
 => [2/6] WORKDIR /app                                                                                                        0.2s
 => [3/6] COPY package*.json ./                                                                                               0.1s
 => [4/6] RUN npm ci --omit=dev --ignore-scripts && npm cache clean --force                                                   7.9s
 => [5/6] COPY src ./src                                                                                                      0.2s 
 => [6/6] COPY .env.example ./.env.example                                                                                    0.1s 
 => exporting to image                                                                                                        5.6s 
 => => exporting layers                                                                                                       2.6s 
 => => exporting manifest sha256:fc07e81c74ac66552207b441ec47279361595130ec30411fc6e34edec15f7ff9                             0.0s 
 => => exporting config sha256:5ee9e46215497f46304c18e9de4e5c9921e7e351c38ed8d3070895378d9b99ac                               0.0s 
 => => exporting attestation manifest sha256:bbef052e70922e17bdf2bcf54e1a97e8fc270cfa3d0aaedff4861cf13aa4c131                 0.0s
 => => exporting manifest list sha256:711c2f059b438a063bde34724d2f5203b5bf34b18eb3fd75b55442faa2aaf68a                        0.0s
 => => naming to docker.io/andelanati/proyecto-final-adopciones:1.0.0                                                         0.0s
 => => unpacking to docker.io/andelanati/proyecto-final-adopciones:1.0.0
```

Build confirmado correctamente.

Comando para ejecutar el contenedor:

```bash
docker run --env-file .env -p 8080:8080 andelanati/proyecto-final-adopciones:1.0.0
```

Evidencia real de ejecucion:

```txt
PS D:\00-cande\2_CURSOS\coderhouse\6_Programacion_Backend_III\proyecto-final-completo\proyecto-final> docker run --env-file .env -p 8080:8080 andelanati/proyecto-final-adopciones:1.0.0
◇ injected env (0) from .env // tip: ⌘ suppress logs { quiet: true }
(node:1) [MONGOOSE] DeprecationWarning: Mongoose: the `strictQuery` option will be switched back to `false` by default in Mongoose 7. Use `mongoose.set('strictQuery', false);` if you want to prepare for this change. Or use `mongoose.set('strictQuery', true);` to suppress this warning.
(Use `node --trace-deprecation ...` to show where the warning was created)
Servidor escuchando en el puerto 8080

got 3 SIGTERM/SIGINTs, forcefully exiting
```
(El contenedor fue detenido manualmente)

Ejecucion del contenedor confirmada correctamente.

Una vez iniciado el contenedor, Swagger debe estar disponible en:

```txt
http://localhost:8080/api/docs
```

## 4. Imagen Docker

Nombre/tag preparado para la imagen:

```txt
andelanati/proyecto-final-adopciones:1.0.0
```

URL publica de DockerHub:

```txt
https://hub.docker.com/r/andelanati/proyecto-final-adopciones
```

Comandos manuales para publicar la imagen:

```bash
docker login
docker push andelanati/proyecto-final-adopciones:1.0.0
```

Publicacion de la imagen confirmada correctamente.

Importante: no se deben inventar credenciales ni publicar desde un entorno no autorizado.

## 5. Ejecucion del proyecto

Instalar dependencias:

```bash
npm install
```

Crear `.env` a partir de `.env.example` y completar los valores reales:

```env
PORT=8080
DATABASE=mongodb+srv://<user>:<password>@<cluster>/<database>?retryWrites=true&w=majority
DOCKERHUB_URL=https://hub.docker.com/r/andelanati/proyecto-final-adopciones
```

Ejecutar en desarrollo:

```bash
npm run dev
```

Ejecutar en modo normal:

```bash
npm start
```

Ejecutar pruebas:

```bash
npm test
```

URLs locales:

- API base: `http://localhost:8080`
- Health check: `http://localhost:8080/health`
- Swagger/OpenAPI: `http://localhost:8080/api/docs`
- Adopciones: `http://localhost:8080/api/adoptions`

Endpoints de adopciones:

| Metodo | Ruta |
| --- | --- |
| GET | `/api/adoptions` |
| GET | `/api/adoptions/:aid` |
| POST | `/api/adoptions/:uid/:pid` |

## 6. README

El archivo `README.md` queda preparado como guia profesional del proyecto e incluye:

- Descripcion del proyecto.
- Tecnologias usadas.
- Estructura de carpetas.
- Variables de entorno requeridas.
- Scripts disponibles en `package.json`.
- Alcance de las pruebas funcionales.
- URL de Swagger: `http://localhost:8080/api/docs`.
- Endpoints principales de adopciones.
- Comandos Docker para build, run y push.
- URL publica real de DockerHub.
- URL del repositorio del proyecto.
