import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Proyecto Final - API de Adopciones',
      version: '1.0.0',
      description: 'Documentacion Swagger para los endpoints de adopcion de mascotas.'
    },
    servers: [
      {
        url: 'http://localhost:8080',
        description: 'Servidor local de desarrollo'
      }
    ],
    components: {
      schemas: {
        Adopcion: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '6652604f063f7b15d8826a4a' },
            owner: { type: 'string', example: '6652604f063f7b15d8826a48' },
            pet: { type: 'string', example: '6652604f063f7b15d8826a49' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        SuccessResponse: {
          type: 'object',
          properties: {
            status: { type: 'string', example: 'success' }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            status: { type: 'string', example: 'error' },
            error: { type: 'string', example: 'Adopcion no encontrada' }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js']
};

export const swaggerSpecs = swaggerJSDoc(swaggerOptions);
