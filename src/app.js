import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpecs } from './docs/swagger.js';
import createAdoptionRouter from './routes/adoption.router.js';
import { errorMiddleware } from './middlewares/error.middleware.js';

export const createApp = ({ adoptionService } = {}) => {
  const app = express();

  app.use(express.json());
  app.get('/health', (_req, res) => res.status(200).json({ status: 'success', message: 'API en ejecucion' }));
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
  app.use('/api/adoptions', createAdoptionRouter(adoptionService));
  app.use(errorMiddleware);

  return app;
};

export default createApp;
