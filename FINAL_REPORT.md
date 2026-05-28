# Informe Final - Proyecto Backend III

Proyecto: API de adopciones de mascotas
Carpeta de entrega: `proyecto-final`
Repositorio del proyecto: `[PENDIENTE: insertar URL real del repositorio]`
DockerHub user: `[PENDIENTE: insertar usuario real de DockerHub]`
Imagen Docker publica: `[PENDIENTE: insertar URL publica real de DockerHub]`

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
DOCKERHUB_URL=https://hub.docker.com/r/<dockerhub-user>/proyecto-final-adopciones
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
[PENDIENTE: pegar aqui el log real completo de npm test]
```

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
docker build -t <dockerhub-user>/proyecto-final-adopciones:1.0.0 .
```

Evidencia real de build:

```txt
[PENDIENTE: pegar aqui el log real de docker build]
```

Comando para ejecutar el contenedor:

```bash
docker run --env-file .env -p 8080:8080 <dockerhub-user>/proyecto-final-adopciones:1.0.0
```

Evidencia real de ejecucion:

```txt
[PENDIENTE: pegar aqui el log real de docker run]
```

Una vez iniciado el contenedor, Swagger debe estar disponible en:

```txt
http://localhost:8080/api/docs
```

## 4. Imagen Docker

Nombre/tag preparado para la imagen:

```txt
<dockerhub-user>/proyecto-final-adopciones:1.0.0
```

URL publica de DockerHub:

```txt
[PENDIENTE: reemplazar por https://hub.docker.com/r/<dockerhub-user>/proyecto-final-adopciones]
```

Comandos manuales para publicar la imagen:

```bash
docker login
docker push <dockerhub-user>/proyecto-final-adopciones:1.0.0
```

Importante: el usuario de DockerHub y la URL publica final deben reemplazarse manualmente con valores reales antes de entregar. No se deben inventar credenciales ni publicar desde un entorno no autorizado.

## 5. Ejecucion del proyecto

Instalar dependencias:

```bash
npm install
```

Crear `.env` a partir de `.env.example` y completar los valores reales:

```env
PORT=8080
DATABASE=mongodb+srv://<user>:<password>@<cluster>/<database>?retryWrites=true&w=majority
DOCKERHUB_URL=https://hub.docker.com/r/<dockerhub-user>/proyecto-final-adopciones
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
- Placeholders para URL del repositorio y URL publica de DockerHub.

Datos pendientes para completar manualmente antes de la entrega:

- Repositorio del proyecto: `[PENDIENTE: insertar URL real del repositorio]`
- DockerHub user: `[PENDIENTE: insertar usuario real de DockerHub]`
- Imagen Docker publica: `[PENDIENTE: insertar URL publica real de DockerHub]`
- Evidencia `npm test`: `[PENDIENTE: pegar log real]`
- Evidencia `docker build`: `[PENDIENTE: pegar log real]`
- Evidencia `docker run`: `[PENDIENTE: pegar log real]`
